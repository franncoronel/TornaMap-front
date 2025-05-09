import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab/Fab'
import Tooltip from '@mui/material/Tooltip/Tooltip'

type FloatingButtonProps = {
  onClick: () => void
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Tooltip title="Agregar" placement="left">
      <Fab
        color="primary"
        aria-label="add"
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 75,
          right: 24,
          zIndex: 1000
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  )
}
