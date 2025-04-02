import { AppBar, Toolbar } from "@mui/material"
import './nav.css'
import NavigationButtons from "../NavigationButtons"
export default function Nav() {

  return (
    <AppBar
      className="appbar" // Particular al footer
      position="sticky"
      color="primary"
      enableColorOnDark
    >
      <Toolbar
        className="toolbar"
      >
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  )
}