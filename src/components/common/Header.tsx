import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import NavigationButtons from './NavigationButtons'

export default function Header() {

    return (
        <AppBar
            position='sticky'
            color='primary'
            sx={{
                height:'7vh' //Particular al header. Es un número medio raro.
            }}
            enableColorOnDark
        >
            <Toolbar
                sx={{
                    height:'100%' //No parece necesitar más que esto.
                }}
            >
                <NavigationButtons  />
            </Toolbar>
        </AppBar>
    )
}