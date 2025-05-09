import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import { esES } from '@mui/x-date-pickers/locales'
import { useEffect, useState } from 'react'
import { format } from 'date-fns/format'
import { validateAndSyncDates } from '@/data/utils/ValidateAndSyncDate'
import { ClockClockwise } from '@phosphor-icons/react/dist/icons/ClockClockwise'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare'
import { FloppyDisk } from '@phosphor-icons/react/dist/ssr/FloppyDisk'

type FormPeriodsProps = {
  open: boolean
  handleClose: () => void
  onSubmit: (data: {
    title: string
    startDate: string
    endDate: string
  }) => void
  initialData?: { title: string; startDate: string; endDate: string }
  isEdit?: boolean
}

export default function FormPeriods({
  open,
  handleClose,
  onSubmit,
  initialData,
  isEdit = false
}: FormPeriodsProps) {
  const [formValues, setFormValues] = useState({
    title: '',
    startDate: new Date(),
    endDate: new Date()
  })
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (initialData) {
      setFormValues({
        title: initialData.title,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate)
      })
    } else {
      setFormValues({
        title: '',
        startDate: new Date(),
        endDate: new Date()
      })
    }
    setErrors({})
  }, [initialData, open])

  const handleChange = (field: string, value: string | PickerValue) => {
    const updated = { ...formValues, [field]: value }
    const { startDate, endDate } = validateAndSyncDates(
      updated.startDate,
      updated.endDate
    )
    setFormValues({ ...updated, startDate, endDate })
  }

  const handleFormSubmit = () => {
    const newErrors = {
      title: formValues.title.trim() === '',
      startDate: !formValues.startDate,
      endDate: !formValues.endDate
    }

    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some((v) => v)

    if (!hasErrors) {
      onSubmit({
        title: formValues.title,
        startDate: format(formValues.startDate, 'yyyy-MM-dd'),
        endDate: format(formValues.endDate, 'yyyy-MM-dd')
      })
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        <ClockClockwise size={32} />
        {isEdit ? 'Editar Periodo' : 'Agregar Periodo'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          value={formValues.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          helperText={errors.title && 'El título es requerido'}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={es}
          localeText={
            esES.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            label="Fecha de inicio"
            value={formValues.startDate}
            onChange={(value) => handleChange('startDate', value)}
            format="dd/MM/yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: errors.startDate,
                helperText: errors.startDate && 'La fecha es requerida'
              }
            }}
          />

          <DatePicker
            label="Fecha de fin"
            value={formValues.endDate}
            onChange={(value) => handleChange('endDate', value)}
            format="dd/MM/yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: errors.endDate,
                helperText: errors.endDate && 'La fecha es requerida'
              }
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {' '}
          <XSquare size={32} /> Cancelar
        </Button>
        <Button variant="contained" onClick={handleFormSubmit}>
          <FloppyDisk size={32} />
          {isEdit ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
