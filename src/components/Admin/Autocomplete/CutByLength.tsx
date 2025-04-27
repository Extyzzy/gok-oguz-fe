import { ReactNode } from 'react'
import { cutByLength } from '@/library/utils'
import { Tooltip } from '@nextui-org/react'

interface Props {
  text?: string
  length: number
  wrapper?: (text: string) => ReactNode
  dots?: string
}

export const CutByLength = ({ text, length, wrapper, dots = '..' }: Props) => {
  if (!text) {
    return ''
  }

  if (text.length > length) {
    return (
      <Tooltip content={text} color={'foreground'} size={'sm'}>
        {wrapper ? wrapper(cutByLength(text, length, dots)) : cutByLength(text, length, dots)}
      </Tooltip>
    )
  }

  return wrapper ? wrapper(text) : text
}
