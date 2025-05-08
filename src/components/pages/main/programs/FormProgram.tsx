import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { FloppyDisk } from '@phosphor-icons/react'
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap'
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare'
import { useEffect, useState } from 'react'

type FormProgramProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (data: { name: string; description: string }) => void
  initialData?: { name: string; description: string }
  isEdit?: boolean
}

export default function FormProgram({
  open,
  handleClose,
  onSubmit,
  initialData,
  isEdit = false
}: FormProgramProps) {
  const [formValues, setFormValues] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initialData) {
      setFormValues(initialData);
    } else {
      setFormValues({ name: '', description: '' });
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    const newErrors: { [key: string]: boolean } = {
      name: formValues.name.trim() === '',
      description: formValues.description.trim() === ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((v) => v);

    if (!hasErrors) {
      onSubmit(formValues);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        <GraduationCap size={32} />
        {isEdit ? 'Editar Programa' : 'Agregar Programa'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          value={formValues.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          helperText={errors.name && 'El nombre es requerido'}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={formValues.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          helperText={errors.description && 'La descripción es requerida'}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <XSquare size={32} />
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleFormSubmit}>
          <FloppyDisk size={32} />
          {isEdit ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
