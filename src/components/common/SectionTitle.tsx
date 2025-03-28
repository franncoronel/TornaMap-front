import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

export default function SectionTitle({ title, children }: { title: string, children?: ReactNode }) {
  const capitalizeText = (text: string) => {
    return text.toUpperCase()
  }

  return (
    <Box>
    <h2
      style={{
        textAlign: 'center',
        fontSize: '1.25rem', // Tamaño similar al de Typography variant="h5"
        fontWeight: 'bold'
      }}>{capitalizeText(title)}</h2>
      {children}
      </Box>
  )
}