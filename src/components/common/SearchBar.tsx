import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import subjects from '@/data/mock/Subjects'

interface SeachBarProps {
  onSearch: (query: string) => void
}

export default function SeachBar({ onSearch }: SeachBarProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searched, setSearched] = useState(false)
  const handleSearch = () => {
    setSearched(true)
    onSearch(searchValue)
  }
  const resetSearch = () => {
    setSearchValue('')
    if (searchValue.length === 0 && searched) return
    setSearched(false)
    onSearch('')
  }

  const isQuery = searchValue.length > 0 && searched

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pb: '1rem' }}>
      <Autocomplete
        freeSolo
        id="filled-hidden-label-normal"
        disableClearable
        fullWidth
        inputValue={searchValue}
        options={subjects.map((option) => option.subject)}
        onInputChange={(event, newInputValue) => setSearchValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Clase / Comisión / Profesor / Carrera"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault() // Evita el comportamiento por defecto
                handleSearch()
              }
            }}
            sx={{
              '& .MuiInputLabel-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '200px',
                textOverflow: 'ellipsis',
                '@media (min-width: 450px)': {
                  maxWidth: 'none',
                  textOverflow: 'unset',
                  whiteSpace: 'normal'
                }
              },
              '& .MuiInputLabel-shrink': {
                // Estilos cuando el label se eleva (flotante)
                overflow: 'visible',
                maxWidth: 'none'
              }
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
                endAdornment: (
                  <InputAdornment position="end">
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      sx={{
                        padding: 1,
                        fontSize: 32,
                        height: '56px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      aria-label="Buscar"
                      onClick={handleSearch}
                    >
                      {!isQuery && (
                        <MagnifyingGlass size={32} alt="Lupa" color="#5f83b1" />
                      )}
                      {isQuery && (
                        <X
                          size={32}
                          alt="Cerrar búsqueda"
                          color="#5f83b1"
                          onClick={resetSearch}
                        />
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
