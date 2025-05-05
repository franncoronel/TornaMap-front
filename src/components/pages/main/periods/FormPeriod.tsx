import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
  } from '@mui/material'
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
  import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
  import { esES } from '@mui/x-date-pickers/locales'
  import moment from 'moment'
  import 'moment/locale/es'
  import { useEffect, useState } from 'react'
  import { validateAndSyncDates } from '@/data/utils/ValidateAndSyncDate'
  
  moment.locale('es')
  
  type FormPeriodsProps = {
    open: boolean
    handleClose: () => void
    onSubmit: (data: { title: string; startDate: string; endDate: string }) => void
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
      startDate: moment(),
      endDate: moment()
    })
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  
    useEffect(() => {
      if (initialData) {
        setFormValues({
          title: initialData.title,
          startDate: moment(initialData.startDate),
          endDate: moment(initialData.endDate)
        })
      } else {
        setFormValues({
          title: '',
          startDate: moment(),
          endDate: moment()
        })
      }
      setErrors({})
    }, [initialData, open])
  
    const handleChange = (field: string, value: any) => {
      let updated = { ...formValues, [field]: value }
      const { startDate, endDate } = validateAndSyncDates(updated.startDate, updated.endDate)
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
          startDate: formValues.startDate.format('YYYY-MM-DD'),
          endDate: formValues.endDate.format('YYYY-MM-DD')
        })
        handleClose()
      }
    }
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
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
            dateAdapter={AdapterMoment}
            adapterLocale="es"
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DatePicker
              label="Fecha de inicio"
              value={formValues.startDate}
              onChange={(value) => handleChange('startDate', value)}
              format="DD/MM/YYYY"
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
              format="DD/MM/YYYY"
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {isEdit ? 'Guardar cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  