import { Button, ButtonProps } from '@mui/material'

interface ProfileButtonProps extends ButtonProps {
  centerText?: boolean
}

export const ProfileButton = ({ centerText, ...props }: ProfileButtonProps) => {

  return (
    <Button
      variant="contained"
      sx={{
        width: { xs: '90%', sm: '60%', lg: '35%', xl: '25%' },
        display: 'flex',              
        justifyContent: centerText ? 'center' : 'flex-start',  // Cambia el alineamiento si `centerText` es true
        alignItems: 'center',
        textAlign: centerText ? 'center' : 'left',  // Alinea el texto al centro si `centerText` es true
      }}
      {...props}
    />
  )
}
