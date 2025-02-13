import { Stack, Typography } from "@mui/material"
import { ProfileButton } from "./ProfileButton"

export default function Profile() {
  return (
    <main>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={6}
        padding={3}
      >
        <Typography variant='h5' fontWeight='bold'>PERFIL</Typography>
        <ProfileButton>Agregar Tipo de Aula</ProfileButton>
        <ProfileButton>Editar Aula</ProfileButton>
        <ProfileButton>Habilitar Solicitud Clase</ProfileButton>
        <ProfileButton>Agregar Clase</ProfileButton>
        <ProfileButton>Editar Clase</ProfileButton>
      </Stack>
    </main>
  )
}