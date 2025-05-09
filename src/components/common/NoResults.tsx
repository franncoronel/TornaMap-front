import React from 'react';
import { WarningCircle } from '@phosphor-icons/react/dist/icons/WarningCircle';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';

const NoResults: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                gap: '1rem',
            }}
        >
            <WarningCircle size={32} color="#FFB74D" />
            <Typography
                variant="h6"
                sx={{
                    color: '#333',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                No se encontraron resultados
            </Typography>
        </Box>
    );
};

export default NoResults;