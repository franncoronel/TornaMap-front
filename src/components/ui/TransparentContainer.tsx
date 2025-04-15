import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export function TransparentContainer({
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
        width: { xs: '80%', sm: '75%', md: '50%', lg: '25%' },
        alignSelf: 'center'
      }}
    >
      {children}
    </Box>
  )
}
