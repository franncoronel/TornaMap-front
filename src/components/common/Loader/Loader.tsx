import { Box, Typography } from '@mui/material';
import './loader.css';

export default function Loader() {
    return(
        <>
            <Box className="loader-container">
                <Typography className="loader" variant="h1" fontWeight="medium" color="primary">UNSAM</Typography>
            </Box>
        </>
    )
}