import { useState, ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type CustomCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  expandable?: boolean;
  height?: number | string;
  width?: number | string;
};

export default function CustomCard({
  title,
  subtitle,
  children,
  onEdit,
  onDelete,
  expandable = false,
  height = 220,
  width = 400
}: CustomCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        width: width,
        height: expanded ? 'auto' : height,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: '#f5f5f5'
      }}
    >
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={
          subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )
        }
      />
      <CardContent
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 4,
          WebkitBoxOrient: 'vertical',
          flexGrow: 1,
        }}
      >
        {children}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        {expandable ? (
          <IconButton onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        ) : (
          <span />
        )}
        <div>
          {onEdit && (
            <Tooltip title="Editar">
              <IconButton color="primary" onClick={onEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Eliminar">
              <IconButton color="primary" onClick={onDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
