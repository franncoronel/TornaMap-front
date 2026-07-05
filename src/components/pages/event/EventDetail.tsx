import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material'
import { EventService } from '@/data/services/EventService'
import { IEvent } from '@/data/domain/Event'
import EventTabs from '@/components/common/EventTabs'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return
      try {
        const response = await new EventService().getDetailById(id)
        if (response.success && response.data) {
          setEvent(response.data)
        } else {
          setError('Evento no encontrado')
        }
      } catch (err) {
        setError('Error al cargar el evento')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error || !event) {
    return (
      <Box>
        <Typography variant="h4" color="error">
          {error || 'Evento no encontrado'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <EventTabs events={[event]} />
    </Box>
  )
}