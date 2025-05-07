import { forwardRef, useState } from 'react'
import { Input, InputProps } from '@nextui-org/react'

export const MoneyInput = forwardRef<HTMLInputElement, InputProps>(
  ({ defaultValue, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue ?? '')

    const onValueChange = (value: string) => {
      if (/^\d*(?:\.\d{0,2})?$/.test(value)) {
        setValue(value)
      }
    }

    return (
      <Input
        ref={ref}
        placeholder='0.00'
        value={value}
        onValueChange={onValueChange}
        startContent={
          <div className='pointer-events-none flex items-center'>
            <span className='text-small text-default-400'>L</span>
          </div>
        }
        {...props}
      />
    )
  },
)

MoneyInput.displayName = 'MoneyInput'
