import '../interactive-page.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CaretLeft } from '@phosphor-icons/react/dist/icons/CaretLeft'
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'
export interface FormContext {
  setTitle: (title: string) => void
  setIcon: (icon: JSX.Element | null) => void
}

export default function Form() {
  const [title, setTitle] = useState<string>('')
  // Quiero que se pueda guardar en icon el siguiente ícono <CalendarStar size={32} /> con useState
  const [icon, setIcon] = useState<JSX.Element | null>(null)

  const isEditing = useLocation().pathname.includes('/editar')
  const navigate = useNavigate()

  return (
    <Box className="interactive-page">
      <header className="interactive-page-header">
        <CaretLeft size={32} onClick={() => navigate(-1)} />
        <Typography variant="h1" className="interactive-page-title">
          {icon}
          {isEditing ? 'Editar' : 'Agregar'}
          {title && ` ${title}`}
        </Typography>
      </header>

      <Outlet context={{ ...({ setTitle } as FormContext), setIcon }} />
    </Box>
  )
}
