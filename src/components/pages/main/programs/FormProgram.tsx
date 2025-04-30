import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  
  type FormProgramProps = {
    open: boolean;
    handleClose: () => void;
    onSubmit: (data: { name: string; description: string }) => void;
    initialData?: { name: string; description: string };
    isEdit?: boolean;
  };
  
  export default function FormProgram({
    open,
    handleClose,
    onSubmit,
    initialData,
    isEdit = false
  }: FormProgramProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ name: false, description: false });
  
    useEffect(() => {
      if (initialData) {
        setName(initialData.name);
        setDescription(initialData.description);
      } else {
        setName('');
        setDescription('');
      }
    }, [initialData, open]);
  
    const handleFormSubmit = () => {
      const newErrors = {
        name: name.trim() === '',
        description: description.trim() === ''
      };
  
      setErrors(newErrors);
  
      if (!newErrors.name && !newErrors.description) {
        onSubmit({ name, description });
        handleClose();
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{display:'flex', justifyContent:'center'}}>{isEdit ? 'Editar Programa' : 'Agregar Programa'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            helperText={errors.name && 'El nombre es requerido'}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description && 'La descripción es requerida'}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {isEdit ? 'Guardar cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  