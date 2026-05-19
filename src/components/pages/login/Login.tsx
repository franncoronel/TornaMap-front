import { MouseEvent } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.tsx'
import { LoginRequest } from '../../../data/domain/User.ts'
import { useEffect, useState } from 'react'
import { EyeSlash, Eye, SignIn, FingerprintSimple } from '@phosphor-icons/react'
import logoUnsam from '@/assets/logos/logo-unsam-largo.png'
import './login.css'
import '@/styles/background-image.css'
import SectionTitle from '@/components/common/SectionTitle.tsx'
import { useNotification } from '@/context/NotificationContext.tsx'
import { useLoader } from '@/context/LoaderContext.tsx'

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    setLoader(true)
    try {
      await login(data.email, data.password)
      setLoader(false)
      setNotificationState({
        title: 'Bienvenido',
        description: 'Has iniciado sesión correctamente',
        type: 'success'
      })
      navigate('/perfil')
    } catch (error) {
      setLoader(false)
      console.error('Error during login:', error)
      setNotificationState({
        title: 'Error',
        description: 'Credenciales incorrectas',
        type: 'error'
      })
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')

    if (isAuthenticated) {
      navigate('/perfil')
    }
  }, [])

  return (
    <main className="login-page">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="form"
      // sx={{
      //     maxWidth: 400,
      //     margin: '0 auto',
      //     border: '1px solid #ccc',
      // }}
      >
        <img
          src={logoUnsam}
          alt="Logo UNSAM"
          style={{ width: '100%', marginBottom: '0.2rem' }} //20px
        />
        {/* <h1>Ingresá</h1> */}
        <SectionTitle title="Ingresá" />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Debe ingresar un email',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Ingrese una dirección de email válida'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              placeholder="example@gmail.com"
              error={!!errors.email}
              helperText={
                errors.email?.message ? String(errors.email?.message) : ''
              }
              fullWidth
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Debe ingresar una contraseña',
            minLength: {
              value: 4,
              message: 'La contraseña debe tener al menos 6 caracteres'
            }
          }}
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth error={!!errors.password}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                data-testid="password-input"
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={showPassword ? 'Ocultar' : 'Mostrar'} arrow>
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        color="default"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          <SignIn size={32} alt="Ingresar" /> Ingresar
        </Button>

        {/* Register Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate('/registrar')}>
          <FingerprintSimple size={32} alt="Registrarse" /> Registrarse
        </Button>

      </Box>
    </main>
  )
}
