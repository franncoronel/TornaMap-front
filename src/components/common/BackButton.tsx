import { CaretLeft } from '@phosphor-icons/react'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{ alignSelf: 'flex-start', cursor: 'pointer' }}
    >
      <CaretLeft size={isMobile ? 22 : 26} />
    </IconButton>
  )
}
