import { useOutletContext, useParams } from 'react-router-dom'
import { FormContext } from '../Form'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { ISchedule } from '@/data/domain/Schedule'

type ScheduleFormValues = ISchedule

export default function ScheduleForm() {
    const { setTitle } = useOutletContext<FormContext>()
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
                
            </Box>
        </>
    )
}