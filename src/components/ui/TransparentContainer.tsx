import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export default function TransparentContainer({
  children,
  padding
}: {
  children: ReactNode
  padding: string
}) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        p: { padding },
        width: { xs: '90%', sm: '60%', md: '50%', lg: '35%', xl: '25%' },
        alignSelf: 'center'
      }}
    >
      {children}
    </Box>
  )
}
