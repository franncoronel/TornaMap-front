import { Box, Typography } from '@mui/material'
import '../interactive-page.css'
import { Outlet } from 'react-router-dom'

export default function Form() {
    return (
        <Box className='interactive-page'>
            <Typography variant="h4">
                Formulario
            </Typography>
            
            <Outlet />
        </Box>
    )
}