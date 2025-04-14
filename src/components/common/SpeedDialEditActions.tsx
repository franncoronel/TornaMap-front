import { Box, Backdrop, SpeedDialAction, SpeedDial, SpeedDialIcon } from '@mui/material';
import { Gear, PencilLine, Trash } from '@phosphor-icons/react';
import * as React from 'react';

const actions = [
  { icon: <PencilLine style={{ color: 'green' }}/>, name: 'Editar' },
  { icon: <Trash style={{ color: 'red' }}/>, name: 'Eliminar' },
]


export default function SpeedDialEditActions() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return(
    <Box>
      <Backdrop open={open} sx={{ zIndex: 1 }}/> {/*Para el fondo oscuro */}
      <SpeedDial
        ariaLabel='Menú de edición'
        sx={{ position: 'absolute',
              '& .MuiSpeedDial-fab': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:'none',
                boxShadow: 'none','&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                transform: 'scale(1.1)', 
            },
              }
           }}
        direction='right'
        icon={<SpeedDialIcon icon={<Gear size={30} weight="duotone" style={{color:'red'}}/>} />}  //El color hay que cambiarlo
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
