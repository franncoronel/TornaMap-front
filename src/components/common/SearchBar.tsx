import { Autocomplete, Box, Divider, IconButton, InputAdornment, TextField} from "@mui/material"
import { useState } from "react"
import { MagnifyingGlass} from '@phosphor-icons/react'
import subjects from "@/data/mock/Subjects"

interface SeachBarProps {
  onSearch: (query: string) => void
}

export default function SeachBar({ onSearch }:SeachBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <Box  sx={{ display: 'flex', alignItems: 'center', mx: 2,p: 2,}}>
      <Autocomplete
        freeSolo
        id="filled-hidden-label-normal"
        disableClearable
        fullWidth
        options={subjects.map((option) => option.subject)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Clase / Comisión / Profesor / Carrera'
            sx={{
              '& .MuiInputLabel-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '200px',
                textOverflow: 'ellipsis',
              },
              '& .MuiInputLabel-shrink': {
                // Estilos cuando el label se eleva (flotante)
                overflow: 'visible',
                maxWidth: 'none',
              }
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
                endAdornment: 
                  <InputAdornment position="end">
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        sx={{ padding: 1,
                          fontSize: 32,
                          height: '56px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        color='secondary'
                        aria-label="Buscar"
                        onClick={handleSearch}>
                    <MagnifyingGlass size={32} alt='Lupa' color='#5f83b1'/>
                    </IconButton> 
                  </InputAdornment>
              },
            }}
            aria-label='Ingresar búsqueda'
          />
        )}
      />
    </Box>
  )

}