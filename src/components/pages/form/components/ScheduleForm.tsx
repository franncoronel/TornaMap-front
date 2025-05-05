import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { FormContext } from '../Form'
import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { ISchedule } from '@/data/domain/Schedule'

type ScheduleFormValues = ISchedule

export default function ScheduleForm() {
    const { setTitle } = useOutletContext<FormContext>()
    const [openConfirm, setOpenConfirm] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ScheduleFormValues>({
        defaultValues: { startTime: '', endTime: '', weekDay: null, date: null, isVirtual: false, professors: [], classroom: { id: '' } }
    })

    useEffect(() => {
        setTitle('Horario')
    }, [id])

    return (
        <>
            <Box
                component="form"
            >

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

            </Box>

            {/* ---------- DIALOG DE CONFIRMACIÓN ---------- */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
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
            </Dialog>
        </>
    )
}