import { AppBar, Toolbar } from "@mui/material"
import './nav.css'
import NavigationButtons from "../NavigationButtons"
export default function Nav() {

  return (
    <AppBar
      className="outer-container"
      position="sticky"
      color="primary"
      enableColorOnDark
    >
      <Toolbar
        className="inner-container"
      >
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  )
}