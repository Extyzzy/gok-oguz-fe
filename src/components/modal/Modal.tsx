import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { useModal, UseModalProps } from './useModal'
import { cn } from '@/library/utils'
import { CloseIcon } from '../icons/CloseIcon'

export type ModalProps = PropsWithChildren<UseModalProps & { className?: string }>

export const Modal = ({ children, className, ...props }: ModalProps) => {
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
      <div className={cn('relative z-40 w-full max-w-2xl rounded-md p-10', className)}>
        <button onClick={onClose} className='absolute top-4 right-4 z-30' type='button'>
          <CloseIcon className='w-10 h-10 cursor-pointer' />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
