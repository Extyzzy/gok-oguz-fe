import { forwardRef, useMemo } from 'react'
import { AutocompleteSelect, AutocompleteSelectProps } from '@/components/Admin/Autocomplete'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'

export const CategoryAutocomplete = forwardRef<HTMLInputElement, Partial<AutocompleteSelectProps>>(
  (props, ref) => {
    const { data: categories, isLoading } = useCategoriesQuery()

    const mappedCategories = useMemo(() => {
      if (!categories) return []
      return categories.map(({ id, name_ru }) => ({ id: String(id), name_ru }))
    }, [categories])

    if (isLoading) {
      return <div>Loading...</div>
    }

    return <AutocompleteSelect ref={ref} items={mappedCategories} {...props} />
  },
)

CategoryAutocomplete.displayName = 'CategoryAutocomplete'
