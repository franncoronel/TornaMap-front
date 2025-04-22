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
        maxWidth: { xs: '80%', sm: '60%', md: '40%', lg: '30%', xl: '20%' },
        alignSelf: 'center'
      }}
    >
      {children}
    </Box>
  )
}
