import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { useModal, UseModalProps } from './useModal'
import { cn } from '@/library/utils'
import { CloseIcon } from '../icons/CloseIcon'

export type ModalProps = PropsWithChildren<UseModalProps & { className?: string; title?: string }>

export const Modal = ({ children, className, title, ...props }: ModalProps) => {
  const { isOpen, onClose } = useModal(props)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-40 w-full max-w-2xl rounded-md p-10 bg-beige py-4 px-5 rounded-2xl',
          className,
        )}
      >
        <div className='flex items-center mb-2'>
          {title && <h1 className='text-center text-lg font-medium'>{title}</h1>}
          <button onClick={onClose} className='mr-0 mb-2 block ml-auto z-30' type='button'>
            <CloseIcon className='w-10 h-10 cursor-pointer' />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  )
}
