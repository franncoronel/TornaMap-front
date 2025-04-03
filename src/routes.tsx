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
import AularioNave3PlantaAlta from './components/pages/map/components/AularioNave3PlantaAlta'
import AularioNave3PlantaBaja from './components/pages/map/components/AularioNave3PlantaBaja'
import TornaviasPrimerPiso from './components/pages/map/components/TornabiasPrimerPiso'

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
      { path: 'tornavias-primer-piso', element: <TornaviasPrimerPiso /> },
      { path: 'tornavias-planta-baja', element: <TornaviasSubsuelo /> },
      { path: 'aulario-nave-3-planta-baja', element: <AularioNave3PlantaBaja /> },
      { path: 'aulario-nave-3-planta-alta', element: <AularioNave3PlantaAlta /> },
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
