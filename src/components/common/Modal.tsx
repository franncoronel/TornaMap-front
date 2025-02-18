import { Modal, Box, Typography, Divider, IconButton, Fade } from "@mui/material";
import React from "react";
import {X} from '@phosphor-icons/react'


type ModalProps = {
  children: React.ReactNode  // Permite múltiples hijos de cualquier tipo
  open: boolean             // Propiedad para manejar el estado del Modal
  handleClose: () => void    // Función para cerrar el Modal
  classroom:string
  classroomType:string
}


export default function ClassInfoModal({ children, open, handleClose,classroom,classroomType }: ModalProps){
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          maxHeight: '80vh',
          minHeight: '85vh',
          width: '90vw',
          overflowY: 'auto',
          borderRadius: '24px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          bgcolor: 'background.paper',
          boxShadow: 3,
          transform: 'translate(-50%, -55%)'
        }}
        >
      <Fade in={open}>
        <Box sx={{

          bgcolor: 'background.paper',
          width: '100%',
          minHeight: '100%',
          p: 4,
          }}>

          <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" >
              {classroom} <br /> {classroomType}
            </Typography>
            <IconButton
                  aria-label='Cerrar Ventana'
                  onClick={handleClose}
                  edge="end">

              <X weight='bold'/>
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <>
            {children}
          </>
        </Box>
      </Fade>
    </Modal>

  )

}