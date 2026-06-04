import { Box, Button, Typography, useTheme, Divider, Dialog, DialogContent, IconButton } from '@mui/material'
import { DownloadSimple, QrCode, Eye, X } from '@phosphor-icons/react'
import { useRef, useState, useEffect } from 'react'
import campusPhoto from '@/assets/fondos/fondo-tornavias.jpg'
import BackButton from '@/components/common/BackButton'

// ─── Constantes ─────────────────────────────────────────────────────────────

const CAMPUS_PHOTO_URL = campusPhoto

const QR_B64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQAAAAB1xeIbAAAByUlEQVR4nO2aQY7bMAxFH2sDXcrAHGCOYt+sV7NuZC0HkPG7oDTJdNNZ1JUdSwsjsh6QD4khKTIm/j7ij29A0KlOXYhKVsaSzIDdiDZS346tdN2CGiRJgpCB9FPMyjBLkrZ2uu5BFfMGbKkP/0EsTXW9NjU+T9KESLtBesttdd2Xiu/5G9S//MY7Um73NdEc8vM0CEhtdN2F2j2hAcAWBtmSRohmZja10/XqFHoa2yCtQeIz9/GxnlX9tSl8x7UNdcd9+mW17/2RVHz/MK2ALeHDzKZ6AB51T67+ohRSvUeVG9UG7ngeF6xu94dQFHcTJK1Ux+OfgurCWdVfm0La6gHM1elXk8/gR3FW9demajQFtIZMqew8FrrdH0bVHHMDt3u39pDRCt3fH0mVvV9DrhHWrb24m+7vD6TGUkEDDMasOA1AGgF2Y17b6LoD9fVeW0KvG7/fsrrPOZJ69K0A4lRCr08b6roF9dy3sl9b2Xat7L13ciTlNWTz8nF6k8VpqA2UlrpuR3l2s1up4gSJ2Hvl/4nardSQ0wjztlvJNlvrek3qj76VjAAQNiwalOlZ1V+f+uxbubWXlRJ/U/c5R1HW/xPYqRtSvwFVMkCdrubZwAAAAABJRU5ErkJggg=='

const APP_URL = 'https://tornamap.web.app/'

const FLYER_W = 794  // px ~ A4 ancho a 96dpi
const FLYER_H = 1123 // px ~ A4 alto  a 96dpi

// ─── Flyer (componente reutilizado en preview y en captura PDF) ───────────────

function FlyerContent({ innerRef }: { innerRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={innerRef}
      style={{
        width: FLYER_W,
        height: FLYER_H,
        fontFamily: "'Saira', sans-serif",
        background: '#0d2040',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Barra acento superior */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 7,
        background: 'linear-gradient(90deg, #2b7de9, #4fc3f7, #2b7de9)'
      }} />

      {/* HERO — foto del campus */}
      <div style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
        <img
          src={CAMPUS_PHOTO_URL}
          alt="Campus UNSAM"
          crossOrigin="anonymous"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            filter: 'brightness(0.72) saturate(1.1)',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,30,60,0.2) 0%, rgba(10,30,60,0.15) 40%, rgba(10,30,60,0.7) 75%, rgba(10,30,60,1) 100%)'
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 52px 36px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 400, fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(160,200,255,0.9)' }}>
            Universidad Nacional de San Martín
          </p>
          <div style={{ fontWeight: 900, fontSize: 86, lineHeight: 0.9, color: '#fff', letterSpacing: -1, textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}>
            Torna<span style={{ color: '#4fc3f7' }}>Map</span>
          </div>
          <p style={{ margin: '10px 0 0', fontWeight: 300, fontSize: 17, color: 'rgba(200,225,255,0.92)', letterSpacing: 0.5, lineHeight: 1.4 }}>
            El mapa inteligente del campus · Sabé qué pasa en cada aula, en tiempo real
          </p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '44px 52px 40px', position: 'relative' }}>
        <p style={{ fontWeight: 700, fontSize: 34, color: '#fff', lineHeight: 1.1, marginBottom: 28, letterSpacing: 0.3 }}>
          ¿Buscás un aula?{' '}
          <span style={{ color: '#4fc3f7' }}>Ya lo podés saber.</span>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🗺️', title: 'Mapa del campus', desc: 'Navegá el campus de forma visual e intuitiva' },
            { icon: '📅', title: 'Eventos por aula', desc: 'Tocá cualquier aula y ves qué clase o evento hay ese día' },
            { icon: '🔍', title: 'Buscador', desc: 'Buscá tu materia o profesor y encontrá dónde están' }
          ].map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(79,195,247,0.2)', borderRadius: 10, padding: '18px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{f.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#4fc3f7', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontWeight: 300, fontSize: 12.5, color: 'rgba(200,220,255,0.8)', lineHeight: 1.45 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36, background: 'rgba(43,125,233,0.12)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: 14, padding: '28px 32px' }}>
          <div style={{ flexShrink: 0, background: '#fff', padding: 10, borderRadius: 10 }}>
            <img src={QR_B64} width={130} height={130} alt="QR TornaMap" style={{ display: 'block', borderRadius: 4 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 26, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
              Sumate ahora.<br />Es gratis para todos.
            </div>
            <div style={{ fontWeight: 300, fontSize: 13.5, color: 'rgba(180,215,255,0.85)', lineHeight: 1.5, marginBottom: 14 }}>
              Escaneá el QR o ingresá desde tu celular.<br />
              Disponible para estudiantes, docentes y no-docentes.
            </div>
            <span style={{ display: 'inline-block', background: '#2b7de9', color: '#fff', fontWeight: 600, fontSize: 14, padding: '7px 18px', borderRadius: 30, letterSpacing: 0.3 }}>
              {APP_URL}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#081525', padding: '18px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 400, fontSize: 11.5, color: 'rgba(120,160,200,0.7)', letterSpacing: 1, textTransform: 'uppercase' }}>
          Proyecto universitario UNSAM · 2025
        </span>
        <span style={{ fontWeight: 600, fontSize: 11, color: '#4fc3f7', letterSpacing: 2, textTransform: 'uppercase', border: '1px solid rgba(79,195,247,0.35)', padding: '4px 12px', borderRadius: 20 }}>
          Beta v0.1.0
        </span>
      </div>
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function QrFlyers() {
  const theme = useTheme()
  const flyerRef = useRef<HTMLDivElement>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [modalScale, setModalScale] = useState(1)

  useEffect(() => {
    const maxH = window.innerHeight * 0.82  // 82% del alto de pantalla
    const maxW = window.innerWidth * 0.88   // 88% del ancho de pantalla
    const scaleByH = maxH / FLYER_H
    const scaleByW = maxW / FLYER_W
    setModalScale(Math.min(scaleByH, scaleByW))
  }, [previewOpen])

  const handleDownloadPDF = async () => {
    const { default: html2canvas } = await import('html2canvas')
    const { default: jsPDF } = await import('jspdf')

    if (!flyerRef.current) return

    const canvas = await html2canvas(flyerRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#0d2040'
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pdfW = pdf.internal.pageSize.getWidth()
    const pdfH = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)
    pdf.save('tornamap-flyer.pdf')
  }

  return (
    <Box sx={{ p: { xs: 3, sm: 4 }, maxWidth: 900, mx: 'auto' }}>

      <Box sx={{ display: { xs: 'flex', sm: 'block' }, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        <BackButton />
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 2, mb: 1, mt: { xs: 1, sm: 0 } }}>
        <QrCode size={36} color={theme.palette.primary.main} />
        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: 28, sm: 32 } }}>
          QR y Flyers
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        Descargá el flyer oficial de TornaMap para imprimir y pegar en carteleras del campus.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Acciones */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<DownloadSimple size={22} />}
          onClick={handleDownloadPDF}
          sx={{ borderRadius: 2, px: 4, width: { xs: '100%', sm: 'auto' } }}
        >
          Descargar flyer A4 (PDF)
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Eye size={22} />}
          onClick={() => setPreviewOpen(true)}
          sx={{ borderRadius: 2, px: 4, width: { xs: '100%', sm: 'auto' } }}
        >
          Ver vista previa
        </Button>
      </Box>

      {/* Flyer oculto para captura PDF — fuera de pantalla */}
      <Box sx={{ position: 'absolute', left: -9999, top: -9999, pointerEvents: 'none' }}>
        <FlyerContent innerRef={flyerRef} />
      </Box>

      {/* Modal de vista previa */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            background: '#111',
            m: 2,
            maxHeight: '95vh',
            maxWidth: '95vw',
            borderRadius: 3,
            overflow: 'hidden',
          }
        }}
      >
        {/* Header del modal */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 3, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography variant="subtitle1" fontWeight={600} color="white">
            Vista previa — Flyer A4
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<DownloadSimple size={16} />}
              onClick={() => { handleDownloadPDF(); setPreviewOpen(false) }}
              sx={{ borderRadius: 2 }}
            >
              Descargar PDF
            </Button>
            <IconButton onClick={() => setPreviewOpen(false)} sx={{ color: 'white' }}>
              <X size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Flyer escalado para entrar en el modal */}
        <DialogContent sx={{ p: 3, overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
          {/* Wrapper exactamente del tamaño del flyer escalado */}
          <Box
            sx={{
              width: FLYER_W * modalScale,
              height: FLYER_H * modalScale,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 1,
              flexShrink: 0,
            }}
          >
            <Box sx={{
              position: 'absolute', top: 0, left: 0,
              width: FLYER_W, height: FLYER_H,
              transformOrigin: 'top left',
              transform: `scale(${modalScale})`,
            }}>
              <FlyerContent />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  )
}