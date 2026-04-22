import { CaretLeft } from '@phosphor-icons/react'
import { IconButton,} from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function BackButton() {
  const navigate = useNavigate()
  const size=32

  return (
    <IconButton onClick={() => navigate(-1)}
                sx={{alignSelf: 'flex-start', cursor: 'pointer'}}>
      <CaretLeft size={size} />
    </IconButton>
  )
}
