import { Box, Button, Typography, CircularProgress, Alert, TextField, Paper } from '@mui/material'
import { DownloadSimple, Buildings, MagnifyingGlass } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { classroomService } from '@/data/services/ClassroomService'
import { normalize } from '@/data/mapper/buildingMapper'
import { floorToPath, floorToLabel } from '@/data/mapper/levelMapper'
import { IClassroom } from '@/data/domain/Classroom'
import QRCode from 'qrcode'

// ─── Config ──────────────────────────────────────────────────────────────────

const APP_BASE_URL = 'http://localhost:5173'
const CARD_W = 370
const CARD_H = 280

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildClassroomUrl(classroom: IClassroom): string {
  const buildingPath = normalize(classroom.building.name)
  const levelPath = floorToPath(classroom.floor)
  return `${APP_BASE_URL}/mapa/${buildingPath}/${levelPath}?aula=${classroom.code}`
}

async function generateQRDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 160, margin: 1,
    color: { dark: '#0d2040', light: '#ffffff' }
  })
}

// ─── Tarjeta de aula (para PDF) ───────────────────────────────────────────────

function ClassroomCard({ classroom, qrDataUrl }: { classroom: IClassroom; qrDataUrl: string }) {
  return (
    <div style={{
      width: CARD_W, height: CARD_H, background: '#ffffff',
      border: '1px solid #e0e0e0', borderRadius: 12,
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      padding: '20px 24px', gap: 20,
      fontFamily: "'Saira', sans-serif", boxSizing: 'border-box',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: 'linear-gradient(to bottom, #2b7de9, #4fc3f7)' }} />
      <div style={{ flexShrink: 0, background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 6 }}>
        <img src={qrDataUrl} width={148} height={148} alt={`QR ${classroom.code}`} style={{ display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 8 }}>
        <span style={{ display: 'inline-block', background: '#e8f4fd', color: '#2b7de9', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, alignSelf: 'flex-start' }}>
          {classroom.building.name}
        </span>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#0d2040', lineHeight: 1, letterSpacing: -0.5 }}>{classroom.code}</div>
        {classroom.name && classroom.name !== classroom.code && (
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.3 }}>{classroom.name}</div>
        )}
        <div style={{ fontSize: 12, color: '#888' }}>{floorToLabel(classroom.floor)} · Capacidad aproximada: {classroom.capacity} personas</div>
        <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#2b7de9', fontWeight: 500, lineHeight: 1.4 }}>
          📅 Escaneá para ver qué pasa en esta aula hoy<br />
        </div>
      </div>
    </div>
  )
}

// ─── Action Card (patrón compartido) ─────────────────────────────────────────

function ActionCard({
  icon, title, description, badge, children
}: {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{
          background: 'rgba(43,125,233,0.08)', borderRadius: 2,
          p: 1.2, display: 'flex', flexShrink: 0
        }}>
          {icon}
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
              {title}
            </Typography>
            {badge && (
              <Box sx={{
                background: 'rgba(43,125,233,0.08)', color: '#2b7de9',
                fontSize: 11, fontWeight: 700, px: 1, py: 0.3,
                borderRadius: 10, lineHeight: 1.5
              }}>
                {badge}
              </Box>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" lineHeight={1.4}>
            {description}
          </Typography>
        </Box>
      </Box>
      {/* Content */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
        {children}
      </Box>
    </Paper>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function QrClassrooms() {
  const [classrooms, setClassrooms] = useState<IClassroom[]>([])
  const [qrMap, setQrMap] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const singleCardRef = useRef<HTMLDivElement>(null)
  const [singleCode, setSingleCode] = useState('')
  const [singleClassroom, setSingleClassroom] = useState<IClassroom | null>(null)
  const [singleQr, setSingleQr] = useState('')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleError, setSingleError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await classroomService.getAll()
        const data = res.data as IClassroom[]
        setClassrooms(data)
        const entries = await Promise.all(
          data.map(async (c) => {
            const url = buildClassroomUrl(c)
            const dataUrl = await generateQRDataUrl(url)
            return [c.code, dataUrl] as [string, string]
          })
        )
        setQrMap(Object.fromEntries(entries))
      } catch (e) {
        console.error(e)
        setError('Error al cargar las aulas. Revisá la conexión con el servidor.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSingleDownload = async () => {
    if (!singleCode.trim()) return
    setSingleLoading(true)
    setSingleError(null)
    setSingleClassroom(null)
    setSingleQr('')
    try {
      const res = await classroomService.getById(singleCode.trim().toUpperCase())
      const classroom = res.data as IClassroom
      const url = buildClassroomUrl(classroom)
      const qrDataUrl = await generateQRDataUrl(url)
      setSingleClassroom(classroom)
      setSingleQr(qrDataUrl)
      await new Promise(r => setTimeout(r, 300))
      if (!singleCardRef.current) return
      const { default: html2canvas } = await import('html2canvas')
      const { default: jsPDF } = await import('jspdf')
      const canvas = await html2canvas(singleCardRef.current, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const margin = 12
      const cardW = pdfW - margin * 2
      const cardH = (cardW * CARD_H) / CARD_W
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', margin, (pdfH - cardH) / 2, cardW, cardH)
      pdf.save(`tornamap-qr-${classroom.code}.pdf`)
    } catch (e) {
      console.error(e)
      setSingleError('No se encontró el aula. Verificá el código e intentá de nuevo.')
    } finally {
      setSingleLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!gridRef.current) return
    setGenerating(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const { default: jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const margin = 12
      const cardW = pdfW - margin * 2
      const cardH = (pdfH - margin * 3) / 2
      const cards = gridRef.current.querySelectorAll<HTMLDivElement>('[data-card]')
      let row = 0
      for (const card of Array.from(cards)) {
        if (row === 2) { pdf.addPage(); row = 0 }
        const canvas = await html2canvas(card, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin + row * (cardH + margin), cardW, cardH)
        row++
      }
      pdf.save('tornamap-qr-aulas.pdf')
    } catch (e) {
      console.error('Error generando PDF:', e)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

      {/* Card 1 — Todas las aulas */}
      <ActionCard
        icon={<Buildings size={24} color="#2b7de9" />}
        title="Todas las aulas"
        description="Generá un PDF con los QR de todas las aulas del campus, 2 por hoja A4"
        badge={loading ? '...' : `${classrooms.length} aulas`}
      >
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button
          variant="contained"
          size="medium"
          fullWidth
          startIcon={generating ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <DownloadSimple size={18} />}
          onClick={handleDownloadPDF}
          disabled={loading || generating || classrooms.length === 0}
          sx={{ borderRadius: 2 }}
        >
          {generating ? 'Generando PDF...' : 'Descargar PDF con todas las aulas'}
        </Button>
      </ActionCard>

      {/* Card 2 — Aula individual */}
      <ActionCard
        icon={<MagnifyingGlass size={24} color="#2b7de9" />}
        title="Aula en particular"
        description="Ingresá el código del aula para descargar su QR individual en una hoja A4"
      >
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start' }}>
          <TextField
            label="Código del aula"
            value={singleCode}
            onChange={(e) => { setSingleCode(e.target.value); setSingleError(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleSingleDownload()}
            placeholder="Ej: TOR-A27"
            size="small"
            error={!!singleError}
            helperText={singleError ?? 'Presioná Enter o hacé click en Descargar'}
            sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
          />
          <Button
            variant="contained"
            size="medium"
            startIcon={singleLoading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <DownloadSimple size={18} />}
            onClick={handleSingleDownload}
            disabled={singleLoading || !singleCode.trim()}
            sx={{ borderRadius: 2, height: 40, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {singleLoading ? 'Generando...' : 'Descargar QR'}
          </Button>
        </Box>
      </ActionCard>

      {/* Elementos ocultos para captura PDF */}
      <Box sx={{ position: 'absolute', left: -9999, top: -9999, pointerEvents: 'none' }}>
        {singleClassroom && singleQr && (
          <div ref={singleCardRef}>
            <ClassroomCard classroom={singleClassroom} qrDataUrl={singleQr} />
          </div>
        )}
      </Box>
      <Box sx={{ position: 'absolute', left: -9999, top: -9999, pointerEvents: 'none' }}>
        <div ref={gridRef}>
          {classrooms.map((c) => (
            <div key={c.code} data-card style={{ margin: 8 }}>
              <ClassroomCard classroom={c} qrDataUrl={qrMap[c.code] ?? ''} />
            </div>
          ))}
        </div>
      </Box>

    </Box>
  )
}