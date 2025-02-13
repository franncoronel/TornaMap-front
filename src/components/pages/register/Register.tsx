import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../data/domain/User'
import './register.css'
import { FingerprintSimple } from '@phosphor-icons/react'
type FormInputs = {
  name: string
  surname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, /* isSubmitSuccessful */ },
    watch,
    setError,
    trigger
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const createAccount = (userData: FormInputs) => {
    const newUser = new User(
      0,
      userData.name,
      userData.surname,
      userData.username,
      userData.email,
      userData.password
    )
    return newUser
  }

  const password = watch('password')

   const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const newAccount = createAccount(data)
      console.log('Datos del usuario:', newAccount)
      /*
       Se debería enviar este usuario a través
       del servicio de autenticación, con algún método como RegistrarUsuario,
       pero es una intuición, nunca trabajé con registro.
      */
      navigate('/ingresar')
    } catch (error) {
      setError('root', {
        type: 'server',
        message: 'Hubo un error al procesar su solicitud. Intente nuevamente.'
      })
    }
  }

  return (
    <main className='register-page'>
      <Container
        sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', padding: '2rem',
        backgroundColor: 'white',
        borderRadius: 2
      }}>
      <Box
        component='img'
        sx={{
          maxWidth: '100%',
          height: 'auto',
          padding: '1rem',
          margin: 0,
          alignSelf:'center',

        }}
        alt='Logo de la universidad.'
        src='/logo-unsam-largo.png'
      />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            variant='h5'
            fontWeight='bold'
          >
            Registro de Usuario
          </Typography>

          <Box component='form' role="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} aria-label="Formulario de registro">
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Debe ingresar un nombre' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Nombre'
                  onBlur={() => trigger('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  id='name'
                  aria-label='Nombre'
                  aria-required='true'
                  aria-describedby='name-helper-text'
                />
              )}
            />

            <Controller
              name='surname'
              control={control}
              rules={{ required: 'Debe ingresar una contraseña' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Apellido'
                  onBlur={() => trigger('surname')}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                  id='surname'
                  aria-label="Apellido"
                  aria-required='true'
                  aria-describedby='surname-helper-text'
                />
              )}
            />

            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Debe ingresar un nombre de usuario',
                minLength: {
                  value: 4,
                  message: 'El nombre de usuario debe tener al menos 4 caracteres'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Nombre de usuario'
                  onBlur={() => trigger('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  id='username'
                  aria-label="Nombre de usuario"
                  aria-required='true'
                  aria-describedby='username-helper-text'
                />
              )}
            />

            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Debe ingresar un email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingrese un email válido'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Email'
                  type='email'
                  onBlur={() => trigger('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id='email'
                  aria-label="Email"
                  aria-required='true'
                  aria-describedby='email-helper-text'
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Debe ingresar una contraseña',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Contraseña'
                  type='password'
                  onBlur={() => trigger('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  id='password'
                  aria-label="Contraseña"
                  aria-required='true'
                  aria-describedby='password-helper-text'
                />
              )}
            />

            <Controller
              name='confirmPassword'
              control={control}
              rules={{
                required: 'Debe confirmar la contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Confirmar contraseña'
                  type='password'
                  onBlur={() => trigger('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  id='confirmPassword'
                  aria-label="Confirmar contraseña"
                  aria-required='true'
                  aria-describedby='confirmPassword-helper-text'
                />
              )}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: "1.5rem", mb: "1.5rem" }}
              disabled={isSubmitting}
            >
              <FingerprintSimple size={32} alt='Registrarse' /> { isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
            <Typography>
              ¿Ya tenés una cuenta? <Link onClick={() => (navigate('/ingresar'))} tabIndex={0}>Iniciá sesión.</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      </main>
  )
}