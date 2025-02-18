import { RouteObject } from 'react-router-dom'
import Login from '@/components/pages/login/Login'
import Main from '@/components/pages/main/Main'
import Map from '@/components/pages/map/Map'
import Register from '@/components/pages/register/Register'
import NotFound from '@/components/pages/notFound/NotFound'
import { ProtectedRoute } from "@/components/common/ProtectedRoute.tsx"
import Profile from '@/components/pages/main/profile/Profile'
import TornaviasSubsuelo from '@/components/pages/map/components/TornaviasSubsuelo'
import { Search } from './components/pages/search/Search'
import { Welcome } from './components/pages/welcome/Welcome'

export const routes: RouteObject[] = [
  { path: '/', element: <Welcome /> },
  { path: '/ingresar', element: <Login /> },
  { path: '/registrar', element: <Register /> },
  { path: '/buscar', element: <Search /> },
  {
    path: '/mapa',
    element: <Map />,
    children: [
      { path: '', element: <TornaviasSubsuelo /> }, // ruta por defecto
      { path: 'tornavias-subsuelo', element: <TornaviasSubsuelo /> },
      { path: 'tornavias-primer-piso', element: <TornaviasSubsuelo /> },
      { path: 'tornavias-planta-baja', element: <TornaviasSubsuelo /> },
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    children: [
      { path: 'perfil', element: <Profile /> }
    ]
  },
  { path: '*', element: <NotFound /> }
]
