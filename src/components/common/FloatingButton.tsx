import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type FloatingButtonProps = {
  onClick: () => void;
};

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Tooltip title="Agregar" placement="left">
      <Fab
        color="primary"
        aria-label="add"
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 65,
          right: 24,
          zIndex: 1000,

        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}
