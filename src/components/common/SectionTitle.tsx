import React from 'react'

export default function SectionTitle({ title }: { title: string }) {
  const capitalizeText = (text: string) => {
    return text.toUpperCase()
  }

  return (
    <h2
      style={{
        textAlign: 'center',
        fontSize: '1.25rem', // Tamaño similar al de Typography variant="h5"
        fontWeight: 'bold'
      }}
    >
      {capitalizeText(title)}
    </h2>
  )
}