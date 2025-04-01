import { AppBar, Toolbar } from "@mui/material"
import './nav.css'
import NavigationButtons from "../NavigationButtons"
export default function Nav() {

  return (
    <AppBar
      className="footer-nav-bar" // Particular al footer
      position="sticky"
      color="primary"
      sx={{
          top: 'auto',  // Particular al footer
          bottom: 0,    // Particular al footer
          height: '10vh'// Particular al footer
      }}
      enableColorOnDark
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  )
}