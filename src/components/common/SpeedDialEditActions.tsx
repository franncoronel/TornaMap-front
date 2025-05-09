import Backdrop from '@mui/material/Backdrop/Backdrop'
import Box from '@mui/material/Box/Box'
import SpeedDial from '@mui/material/SpeedDial/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon/SpeedDialIcon'
import { Gear } from '@phosphor-icons/react/dist/icons/Gear'
import { PencilLine } from '@phosphor-icons/react/dist/icons/PencilLine'
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash'
import { useState } from 'react'

const actions = [
  { icon: <PencilLine style={{ color: 'green' }} />, name: 'Editar' },
  { icon: <Trash style={{ color: 'red' }} />, name: 'Eliminar' }
]

export default function SpeedDialEditActions() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box>
      <Backdrop open={open} sx={{ zIndex: 1 }} /> {/*Para el fondo oscuro */}
      <SpeedDial
        ariaLabel="Menú de edición"
        sx={{
          position: 'absolute',
          '& .MuiSpeedDial-fab': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              transform: 'scale(1.1)'
            }
          }
        }}
        direction="right"
        icon={
          <SpeedDialIcon
            icon={<Gear size={30} weight="duotone" style={{ color: 'red' }} />}
          />
        } //El color hay que cambiarlo
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
            arrow
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
