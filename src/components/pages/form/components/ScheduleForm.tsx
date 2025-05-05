import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { FormContext } from '../Form'
import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ISchedule } from '@/data/domain/Schedule'
import { weekDayES, weekDayShort } from '@/data/utils/helpers'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { format, parse } from 'date-fns'
import { Trash } from '@phosphor-icons/react'

type ScheduleFormValues = Omit<ISchedule, 'id'> & {
    id?: string
    buildingId?: string
    classroomId?: string
}

export default function ScheduleForm() {
    const { setTitle } = useOutletContext<FormContext>()
    const [openConfirm, setOpenConfirm] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<ScheduleFormValues>({
        defaultValues: {
            startTime: '',
            endTime: '',
            weekDay: null,
            date: null,
            isVirtual: false,
            professors: [],
            classroomId: '',
            buildingId: ''
        }
    })

    const onSubmit: SubmitHandler<ScheduleFormValues> = async (data) => {
        try {
            console.log('Form data:', data)
        }
        catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    useEffect(() => {
        setTitle('Horario')
    }, [id])

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack
                    spacing={3}
                >
                    <Stack direction="row" spacing={1}>
                        {/* weekday */}
                        <Controller
                            name='weekDay'
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    sx={{ flex: 1 }}
                                    disabled={Boolean(watch('date'))}
                                >
                                    <InputLabel>Día</InputLabel>

                                    <Select
                                        label="Día"
                                        displayEmpty
                                        {...field}
                                    >
                                        <MenuItem value="">
                                            <em>---</em>
                                        </MenuItem>

                                        {weekDayES.map((d) => (
                                            <MenuItem key={d} value={d}>
                                                {weekDayShort[d]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {/* date */}
                        <Controller
                            name='date'
                            control={control}
                            render={({ field }) => (
                                <Box sx={{ flex: 1 }}>
                                    <DatePicker
                                        label="Fecha"
                                        disablePast
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        disabled={watch('weekDay') !== ''}
                                        slotProps={{
                                            textField: { fullWidth: true },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'accept']
                                            }
                                        }}
                                    />
                                </Box>
                            )}
                        />
                    </Stack>

                    {/* fila 2 */}
                    <Stack direction="row" spacing={1}>
                        {/* ─── Hora inicio ───────────────────────────────────────────── */}
                        <Controller
                            name='startTime'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TimePicker
                                    label="Inicio"
                                    /*  value: convierte el string guardado a Date  */
                                    value={
                                        field.value // '' | '18:00' …
                                            ? parse(field.value, 'HH:mm', new Date())
                                            : null // ←  TimePicker acepta null
                                    }
                                    /*  onChange: vuelve a string "HH:mm" para el form  */
                                    onChange={(val) =>
                                        field.onChange(
                                            val ? format(val as Date, 'HH:mm') : ''
                                        )
                                    }
                                    slotProps={{
                                        textField: { fullWidth: true } // mismo aspecto
                                    }}
                                />
                            )}
                        />

                        {/* ─── Hora fin ──────────────────────────────────────────────── */}
                        <Controller
                            name='endTime'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TimePicker
                                    label="Fin"
                                    value={
                                        field.value
                                            ? parse(field.value, 'HH:mm', new Date())
                                            : null
                                    }
                                    onChange={(val) =>
                                        field.onChange(
                                            val ? format(val as Date, 'HH:mm') : ''
                                        )
                                    }
                                    slotProps={{
                                        textField: { fullWidth: true }
                                    }}
                                />
                            )}
                        />
                    </Stack>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        alignItems="center"
                    >
                        {/* Virtual */}
                        <Controller
                            name='isVirtual'
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    sx={{ alignSelf: 'start' }}
                                    control={<Switch {...field} checked={field.value} />}
                                    label="Virtual"
                                />
                            )}
                        />
                        
                    </Stack>

                {/* BOTONES */}
                <Stack direction="column" spacing={2} justifyContent="space-between">
                    <Button variant="contained" type="submit">
                        {id ? 'Actualizar' : 'Crear'}
                    </Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                    {id && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenConfirm(true)}
                        >
                            Eliminar
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>

            {/* ---------- DIALOG DE CONFIRMACIÓN ---------- */ }
            < Dialog open = { openConfirm } onClose = {() => setOpenConfirm(false)
}>
                <DialogTitle>¿Eliminar horario?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Esta acción es irreversible. ¿Seguro que deseas eliminar el horario?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
                    <Button
                        color="error"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Sí, eliminar
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    )
}