import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { updatePageContent } from '../../endpoints'
import { useQueryClient } from '@tanstack/react-query'
import { PageContent } from '@/queries/usePageContentQuery'

type UseUpdatePageContentMutation = (
  options?:
    | Omit<
        UseMutationOptions<AxiosResponse<any, any>, AxiosError<any, any>, Partial<PageContent>>,
        'mutationFn'
      >
    | undefined,
) => UseMutationResult<AxiosResponse<any, any>, AxiosError<any, any>, Partial<PageContent>>

export const useUpdatePageContentMutation: UseUpdatePageContentMutation = (options) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updatePageContent(payload).then((response: any) => response),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] })

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
  })
}

