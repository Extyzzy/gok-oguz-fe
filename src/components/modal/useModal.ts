import { useControlledState } from '@react-stately/utils'
import { useCallback } from 'react'

export interface UseModalProps {
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  onChange?: (isOpen: boolean) => void
}

export const useModal = (props: UseModalProps = {}) => {
  const {
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange = () => {},
  } = props

  const [isOpen, setIsOpen] = useControlledState(isOpenProp, false, onChange)

  const onClose = useCallback(() => {
    setIsOpen(false)
    onCloseProp?.()
  }, [onCloseProp, setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
    onOpenProp?.()
  }, [onOpenProp, setIsOpen])

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen

    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
  }
}

export type UseModalReturn = ReturnType<typeof useModal>
