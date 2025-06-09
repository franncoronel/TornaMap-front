import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'

interface ActionCardProps {
  title: string
  icon: React.ReactNode
  onClick: () => void
}

export function ActionCard({ title, icon, onClick }: ActionCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ p: 2, textAlign: 'center' }}>
        <Box>{icon}</Box>
        <CardContent>
          <Typography variant="h6">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
