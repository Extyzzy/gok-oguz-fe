import { useInputChanged } from '@/components/Admin/react/hooks/useInputChanged'
import { InputValidation } from '@/components/Admin/react/validation'
import { nameToLabel } from '@/library/utils'

export type UseInputProps = { name: string; label?: string } & InputValidation

const useInput = ({ state = {}, ...props }: UseInputProps) => {
  const { changed, setChanged } = useInputChanged({ state })

  const label = props.label || nameToLabel(props.name)

  const errorMessage =
    props.name && state.errors && state.errors[props.name] ? state.errors[props.name] : []

  const isInvalid = !!props.name && state.errors && Boolean(state.errors[props.name]) && !changed

  return { label, errorMessage, isInvalid, setChanged }
}

export default useInput
