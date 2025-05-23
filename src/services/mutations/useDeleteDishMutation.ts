import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { deleteDish, DeleteProps } from '../../endpoints'
import { useQueryClient } from '@tanstack/react-query'

type UseDeleteDishMutation = (
  options?:
    | Omit<
        UseMutationOptions<AxiosResponse<any, any>, AxiosError<any, any>, DeleteProps>,
        'mutationFn'
      >
    | undefined,
) => UseMutationResult<AxiosResponse<any, any>, AxiosError<any, any>, DeleteProps>

export const useDeleteDishMutation: UseDeleteDishMutation = (options) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => deleteDish(payload).then((response: any) => response),
    onSuccess: (data, variables, context) => {
      //@ts-ignore
      queryClient.invalidateQueries(['dishes'])

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
  })
}
