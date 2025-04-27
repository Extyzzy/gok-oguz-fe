import { Key } from 'react'
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

interface Props {
  items: Record<string, any>[]
  keyName: string
  valueName: string
  onDeselect: (key: Key) => void
}

export const AutocompleteListBox = ({ items, keyName, valueName, onDeselect }: Props) => {
  const onClick = (key: Key) => () => onDeselect(key)

  return (
    <ScrollShadow className={twMerge(items.length ? 'h-[250px]' : '')}>
      <Listbox
        aria-label='Autocomplete List Box'
        variant='flat'
        disallowEmptySelection
        selectionMode='multiple'
        selectedKeys={'all'}
      >
        {items.map((item) => (
          <ListboxItem onClick={onClick(item[keyName])} key={item[keyName]}>
            {item[valueName]}
          </ListboxItem>
        ))}
      </Listbox>
    </ScrollShadow>
  )
}
