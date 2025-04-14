import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { TransparentContainer } from '@/components/ui/TransparentContainer'
import { useNavigate } from 'react-router-dom'
import { CompassRose, FingerprintSimple, SignIn } from '@phosphor-icons/react'
import logoUnsamBlanco from '@/assets/logos/logo-unsam-blanco.png'
import '../background-image.css'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
export function Welcome() {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if(isAuthenticated) {
        navigate('/buscar')
    }
  },[])

  return (
    <Box
      data-testid="welcome-box"
      className='welcome-page'
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
          {!isAuthenticated && <>
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
              // disabled
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
            </>
          }
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