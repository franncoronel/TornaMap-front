import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material'
import { periodsService } from '@/data/services/PeriodsService'
import { classroomService } from '@/data/services/ClassroomService'
import { aiAssistantService } from '@/data/services/AiAssistantService'
import {
  geminiService,
  AssignmentSuggestion
} from '@/data/services/GeminiService'
import { IPeriod } from '@/data/domain/Period'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import BackButton from '@/components/common/BackButton'

export default function AiAssistant() {
  const [periods, setPeriods] = useState<IPeriod[]>([])
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('')
  const [suggestions, setSuggestions] = useState<AssignmentSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPeriods, setLoadingPeriods] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    periodsService.getAll().then((res) => {
      setPeriods(res.data)
      setLoadingPeriods(false)
    })
  }, [])

  const handleGenerate = async () => {
    if (!selectedPeriodId) return
    setLoading(true)
    setError(null)
    setSuggestions([])

    try {
      const selectedPeriod = periods.find((p) => p.id === selectedPeriodId)!

      const [coursesRes, classroomsRes] = await Promise.all([
        aiAssistantService.getCoursesByPeriod(selectedPeriodId),
        classroomService.getAll()
      ])

      const courses = coursesRes.data.map((c) => ({
        name: c.name,
        students: c.students
      }))

      const classrooms = classroomsRes.data.map((c) => ({
        code: c.code,
        name: c.name,
        capacity: c.capacity,
        type: c.type
      }))

      if (courses.length === 0) {
        setError('No hay materias asociadas a este período.')
        return
      }

      const result = await geminiService.suggestDistribution(
        selectedPeriod.title,
        courses,
        classrooms
      )

      setSuggestions(result)
    } catch (e) {
      setError('Ocurrió un error al generar la sugerencia. Intentá de nuevo.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    const selectedPeriod = periods.find((p) => p.id === selectedPeriodId)
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text('Sugerencia de Distribución de Aulas', 14, 20)
    doc.setFontSize(11)
    doc.text(`Período: ${selectedPeriod?.title ?? ''}`, 14, 30)
    doc.text(`Generado: ${new Date().toLocaleDateString('es-AR')}`, 14, 37)

    autoTable(doc, {
      startY: 45,
      head: [['Materia', 'Alumnos', 'Aula', 'Capacidad', 'Justificación']],
      body: suggestions.map((s) => [
        s.courseName,
        s.students,
        `${s.classroomCode} - ${s.classroomName}`,
        s.capacity,
        s.justification
      ]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [25, 118, 210] },
      columnStyles: { 4: { cellWidth: 60 } }
    })

    doc.save(`distribucion-${selectedPeriod?.title ?? 'periodo'}.pdf`)
  }

  const getCapacityColor = (students: number, capacity: number) => {
    if (capacity < students) return 'error'
    if (capacity - students <= 10) return 'warning'
    return 'success'
  }

  return (
    <Box className="profile-page" sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto' }}>
      <BackButton />

      <Typography variant="h4" gutterBottom mt={2}>
        Asistente de Distribución de Aulas
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Seleccioná un período y el asistente sugerirá la distribución de
        materias según la capacidad de las aulas.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap'
        }}
      >
        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={selectedPeriodId}
            label="Período"
            onChange={(e) => {
              setSelectedPeriodId(e.target.value)
              setSuggestions([])
              setError(null)
            }}
            disabled={loadingPeriods}
          >
            {periods.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={!selectedPeriodId || loading}
          sx={{ height: 56 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Generar sugerencia'
          )}
        </Button>

        {suggestions.length > 0 && (
          <Button
            variant="outlined"
            onClick={handleDownloadPDF}
            sx={{ height: 56 }}
          >
            Descargar PDF
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {suggestions.length > 0 && (
        <Paper elevation={2} sx={{ overflowY: 'auto', maxHeight: '75vh' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Materia
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Alumnos
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Aula sugerida
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Capacidad
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Justificación
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestions.map((s, i) => (
                <TableRow key={i} hover>
                  <TableCell>{s.courseName}</TableCell>
                  <TableCell>{s.students}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {s.classroomCode}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {s.classroomName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.capacity}
                      color={getCapacityColor(s.students, s.capacity)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{s.justification}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  )
}
