import { useParams } from 'next/navigation'
import { useCallback } from 'react'
import { useQuery } from '@/components/Admin/react/hooks/useQuery'

export interface Props<Result> {
  paramName: string
  action: (id: string) => Promise<Result>
}

export const useGetByIdQuery = <Result>({ paramName, action }: Props<Result>) => {
  const params = useParams()
  const id = String(params[paramName])

  const callback = useCallback(() => action(id), [id])

  return useQuery<Result | null>({
    action: callback,
  })
}
