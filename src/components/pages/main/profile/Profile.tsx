import { Box, Stack} from "@mui/material"
import { ProfileButton } from "./ProfileButton"
import SectionTitle from "@/components/common/SectionTitle"

export default function Profile() {
  return (
    <main>
      <Box sx={{ flexShrink: 0, paddingTop: '2rem' }}>
        <SectionTitle title="perfil" />
      </Box>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={6}
        padding={3}
      >
        {/* <Typography variant='h5' fontWeight='bold'>PERFIL</Typography> */}
        
        <ProfileButton>Agregar Tipo de Aula</ProfileButton>
        <ProfileButton>Editar Aula</ProfileButton>
        <ProfileButton>Habilitar Solicitud Clase</ProfileButton>
        <ProfileButton>Agregar Clase</ProfileButton>
        <ProfileButton>Editar Clase</ProfileButton>
      </Stack>
    </main>
  )
}