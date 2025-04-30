
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';

type DeleteModalProps = {
  open: boolean;
  value: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({
  open,
  value,
  onConfirm,
  onCancel

}: DeleteModalProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogContent>
      <Typography variant="body1">
        ¿Estás seguro de querer eliminar <strong>{value}</strong>?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancelar
      </Button>
      <Button onClick={onConfirm} variant="contained" color="error">
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
  );
}
