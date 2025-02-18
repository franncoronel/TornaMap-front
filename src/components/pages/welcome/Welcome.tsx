import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { TransparentContainer } from '@/components/ui/TransparentContainer'
import { useNavigate } from 'react-router-dom'
import { CompassRose, FingerprintSimple, SignIn } from '@phosphor-icons/react'
import logoUnsamBlanco from '@/assets/logos/logo-unsam-blanco.png'
import fondoTornavias from '@/assets/fondos/fondo-tornavias.jpg'
export function Welcome() {
  const navigate = useNavigate()

  return (
    <Box
      data-testid="welcome-box"
      sx={{
        height: '90vh',
        width: '100%',
        backgroundImage:`url(${fondoTornavias})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        gap: '1rem'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoUnsamBlanco}
          alt="University Logo"
          style={{
            maxWidth: '300px',
            width: '100%',
            height: 'auto'
          }}
        />
      </Container>

      <TransparentContainer padding='1.5rem'>
        <Stack spacing={2} direction='column' width='100%'>
          <Button
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              alignItems: 'center'
            }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/ingresar')}
          >
            <SignIn size={32} /> Iniciá sesión
          </Button>
          <Button
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              alignItems: 'center'
            }}
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/registrar')}
          >
            <FingerprintSimple size={32} /> Registrate
          </Button>
          <Button
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              alignItems: 'center'
            }}
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/mapa/tornavias-subsuelo')}
          >
            <CompassRose size={32} /> Navegá el mapa
          </Button>
        </Stack>
      </TransparentContainer>
      <TransparentContainer padding='0.9rem'>
        <Typography color="#000000">
        ¡Informate sobre tus materias, aulas y profesores!
        </Typography>
        <Typography color="#000000" fontWeight={700}>
        Esto es una versión Beta Mobile
        </Typography>
      </TransparentContainer>
    </Box>
  )
}