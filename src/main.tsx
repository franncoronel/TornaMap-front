import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import unsamTheme from '@/styles/theme.ts'
import { ThemeProvider} from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={unsamTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
