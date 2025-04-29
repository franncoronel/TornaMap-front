import { Box, Typography } from '@mui/material'
import '../interactive-page.css'
import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'

export interface FormContext {
    setTitle: (title: string) => void
}

export default function Form() {
    const [title, setTitle] = useState<string>('')
    const isEditing = useLocation().pathname.includes('/editar')

    return (
        <Box className='interactive-page'>
            <Typography variant="h4">
            {isEditing ? 'Editar' : 'Agregar'}
            {title && ` ${title}`}
            </Typography>
            
            <Outlet context={{ setTitle } as FormContext}/>

        </Box>
    )
}