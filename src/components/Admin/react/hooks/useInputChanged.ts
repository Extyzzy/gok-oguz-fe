import { useEffect, useState } from 'react'
import { InputValidation } from '@/components/Admin/react/validation'

export const useInputChanged = ({ state }: InputValidation) => {
  const [changed, setChanged] = useState<boolean>(false)

  useEffect(() => {
    setChanged(false)
  }, [state])

  return { changed, setChanged }
}
