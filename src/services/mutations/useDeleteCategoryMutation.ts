import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { deleteCategory, DeleteProps } from '../../endpoints'
import { useQueryClient } from '@tanstack/react-query'

type UseDeleteCategoryMutation = (
  options?:
    | Omit<
        UseMutationOptions<AxiosResponse<any, any>, AxiosError<any, any>, DeleteProps>,
        'mutationFn'
      >
    | undefined,
) => UseMutationResult<AxiosResponse<any, any>, AxiosError<any, any>, DeleteProps>

export const useDeleteCategoryMutation: UseDeleteCategoryMutation = (options) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => deleteCategory(payload).then((response: any) => response),
    onSuccess: (data, variables, context) => {
      //@ts-ignore
      queryClient.invalidateQueries(['categories'])

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
  })
}
