import { Box, Typography } from '@mui/material'
import '../interactive-page.css'
import { Outlet, useLocation,} from 'react-router-dom'
import { useState } from 'react'
import BackButton from '@/components/common/BackButton'
export interface FormContext {
  setTitle: (title: string) => void
  setIcon: (icon: JSX.Element | null) => void
}

export default function Form() {
  const [title, setTitle] = useState<string>('')
  // Quiero que se pueda guardar en icon el siguiente ícono <CalendarStar size={32} /> con useState
  const [icon, setIcon] = useState<JSX.Element | null>(null)

  const isEditing = useLocation().pathname.includes('/editar')

  return (
    <Box className="interactive-page">
      <header className="interactive-page-header">
        <BackButton />
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
