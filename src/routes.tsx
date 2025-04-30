/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { ProtectedRoute } from './components/common/ProtectedRoute'
import EventForm from './components/pages/form/components/EventForm'

// Lazy Components
// const Register = lazy(() => import('@/components/pages/register/Register'))
const Login = lazy(() => import('@/components/pages/login/Login'))
const Main = lazy(() => import('@/components/pages/main/Main'))
const Map = lazy(() => import('@/components/pages/map/Map'))
const NotFound = lazy(() => import('@/components/pages/notFound/NotFound'))
const Profile = lazy(() => import('@/components/pages/main/profile/Profile'))
const Search = lazy(() => import('@/components/pages/search/Search'))
const Welcome = lazy(() => import('@/components/pages/welcome/Welcome'))
const Form = lazy(() => import('@/components/pages/form/Form'))
const CourseForm = lazy(
  () => import('@/components/pages/form/components/CourseForm')
)

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
    children: [
      {
        path: 'perfil',
        element: <Profile />
      },
      {
        path: 'asignatura',
        element: <Form />,
        children: [
          {
            path: 'agregar',
            element: <CourseForm />
          },
          {
            path: 'editar/:id',
            element: <CourseForm />
          }
        ]
      },
      {
        path: 'evento',
        element: <Form />,
        children: [
          {
            path: 'agregar',
            element: <EventForm />
          },
          {
            path: 'editar/:id',
            element: <EventForm />
          }
        ]
      },
      {
        path: 'horario',
        element: <Form />,
        children: [
          {
            path: 'agregar',
            element: <EventForm />
          },
          {
            path: 'editar/:id',
            element: <EventForm />
          }
        ]
      }
      // {
      //   path: 'horario',
      //   element: <Form />,
      //   children: [
      //     {
      //       path: 'agregar',
      //       element: <ScheduleForm />
      //     },
      //     {
      //       path: 'editar/:id',
      //       element: <ScheduleForm />
      //     }
      //   ]
      // }
    ]
  },
  { path: '*', element: <NotFound /> }
]
