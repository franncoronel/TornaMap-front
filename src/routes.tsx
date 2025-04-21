import { RouteObject } from 'react-router-dom'
import Login from '@/components/pages/login/Login'
import Main from '@/components/pages/main/Main'
import Map from '@/components/pages/map/Map'
// import Register from '@/components/pages/register/Register'
import NotFound from '@/components/pages/notFound/NotFound'
import { ProtectedRoute } from '@/components/common/ProtectedRoute.tsx'
import Profile from '@/components/pages/main/profile/Profile'
import { Search } from './components/pages/search/Search'
import { Welcome } from './components/pages/welcome/Welcome'

export const routes: RouteObject[] = [
  { path: '/', element: <Welcome /> },
  { path: '/ingresar', element: <Login /> },
  /* { path: '/registrar', element: <Register /> }, */
  { path: '/buscar', element: <Search /> },
  {
    path: '/mapa/:building/:level',
    element: <Map />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    children: [{ path: 'perfil', element: <Profile /> }]
  },
  { path: '*', element: <NotFound /> }
]
