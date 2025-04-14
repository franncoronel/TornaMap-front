import { Button, ButtonProps } from "@mui/material"

export const ProfileButton = (props: ButtonProps) => {
  return <Button
    variant="contained"
    sx={
      {
        width: { xs: '90%', sm: '60%', lg: '35%', xl: '25%' }
      }}
    {...props}
  />
}