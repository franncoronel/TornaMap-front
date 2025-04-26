import { Box, Typography } from '@mui/material'
import '../interactive-page.css'
import { Outlet } from 'react-router-dom'
import { FormMode } from '@/data/types/FormMode'
import { useState } from 'react'

export interface FormContext {
    mode: FormMode
    setTitle: (title: string) => void
}

export default function Form({ mode }: {mode: FormMode}) {
    const [title, setTitle] = useState<string>('')

    return (
        <Box className='interactive-page'>
            <Typography variant="h4">
            {mode === 'add' ? 'Agregar' : 'Editar'}
            {title && ` ${title}`}
            </Typography>
            
            <Outlet context={{ mode, setTitle } as FormContext}/>

        </Box>
    )
}