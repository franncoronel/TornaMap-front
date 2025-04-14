import { Stack} from "@mui/material"
import { ProfileButton } from "./ProfileButton"

export default function Profile() {
  return (
    <Stack
        flexGrow='1'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={6}
    >
      <ProfileButton>Agregar Tipo de Aula</ProfileButton>
      <ProfileButton>Editar Aula</ProfileButton>
      <ProfileButton>Habilitar Solicitud Clase</ProfileButton>
      <ProfileButton>Agregar Clase</ProfileButton>
      <ProfileButton>Editar Clase</ProfileButton>
    </Stack>
  )
}