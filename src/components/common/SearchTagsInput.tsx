import {
  Autocomplete,
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

interface SearchTagsInputProps {
  onSearch: (tags: string[]) => void
  options: string[]
  value: string[]
}

const normalizeTags = (tags: string[]) => {
  const seen = new Set<string>()
  const result: string[] = []

  tags.forEach((tag) => {
    const trimmed = tag.trim()
    const key = trimmed.toLocaleLowerCase()
    if (!trimmed || seen.has(key)) return
    seen.add(key)
    result.push(trimmed)
  })

  return result
}

export default function SearchTagsInput({
  onSearch,
  options,
  value
}: SearchTagsInputProps) {
  const [inputValue, setInputValue] = useState('')

  const hasQuery = useMemo(
    () => value.length > 0 || inputValue.trim().length > 0,
    [inputValue, value.length]
  )

  const emitTags = (nextTags: string[]) => {
    onSearch(normalizeTags(nextTags))
  }

  const handleAddInputAsTag = () => {
    const next = inputValue.trim()
    if (!next) return
    emitTags([...value, next])
    setInputValue('')
  }

  const clearAll = () => {
    if (value.length === 0 && inputValue.trim().length === 0) return
    setInputValue('')
    emitTags([])
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', bg: 'white' }}>
      <Autocomplete
        multiple
        freeSolo
        fullWidth
        options={options}
        value={value}
        inputValue={inputValue}
        filterSelectedOptions
        forcePopupIcon={false}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        onChange={(_, newValue) => {
          emitTags(newValue)
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={`${option}-${index}`}
              size="small"
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Clase / Comisión / Profesor / Carrera"
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ',') return
              event.preventDefault()
              handleAddInputAsTag()
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
                endAdornment: (
                  <InputAdornment position="end">
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                      disableRipple
                      sx={{
                        padding: 1,
                        fontSize: 32,
                        height: '56px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      aria-label={
                        hasQuery && inputValue.trim().length === 0
                          ? 'Limpiar búsqueda'
                          : 'Agregar filtro de búsqueda'
                      }
                      onClick={() =>
                        inputValue.trim().length > 0 ? handleAddInputAsTag() : clearAll()
                      }
                    >
                      {hasQuery && inputValue.trim().length === 0 ? (
                        <X size={32} alt="Limpiar búsqueda" color="#5f83b1" />
                      ) : (
                        <MagnifyingGlass size={32} alt="Agregar búsqueda" color="#5f83b1" />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            aria-label="Ingresar búsqueda"
          />
        )}
      />
    </Box>
  )
}
