import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { nameToLabel } from '@/library/utils'
import { Key } from '@react-types/shared'

export type ItemType = {
  id: string
  name_ru: string
}

export type AutocompleteSelectProps = Partial<AutocompleteProps> & {
  items?: ItemType[]
  defaultValue?: string
  selectKey?: Key | null
  name_ru?: string
  label?: string
}

export const AutocompleteSelect = forwardRef<HTMLInputElement, AutocompleteSelectProps>(
  ({ items = [], label, name_ru, defaultValue, selectKey, ...props }, ref) => {
    const { contains } = useFilter({ sensitivity: 'base' })

    const [inputValue, setInputValue] = useState('')
    const [selectedKey, setSelectedKey] = useState<Key | null>(selectKey ?? defaultValue ?? null)

    useEffect(() => {
      if (selectKey !== undefined) {
        setSelectedKey(selectKey)
      }
    }, [selectKey])

    const filteredItems = useMemo(() => items.filter((item) => item.name_ru), [items, inputValue])

    const handleSelectionChange = useCallback((key: Key | null) => {
      setSelectedKey(key)
      props.onSelectionChange?.(key)
    }, [])

    const handleInputChange = useCallback((value: string) => {
      setInputValue(value)
    }, [])

    return (
      <>
        {name_ru && <input type='hidden' name={name_ru} value={selectedKey?.toString() ?? ''} />}
        <Autocomplete
          ref={ref}
          className='overflow-hidden'
          name={undefined}
          size='sm'
          label={label ?? (name_ru ? nameToLabel(name_ru) : undefined)}
          selectedKey={selectedKey}
          onSelectionChange={handleSelectionChange}
          onInputChange={handleInputChange}
          {...props}
        >
          {filteredItems.map((item) => (
            <AutocompleteItem key={item.id} textValue={item.name_ru}>
              {item.name_ru}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </>
    )
  },
)

AutocompleteSelect.displayName = 'AutocompleteSelect'
