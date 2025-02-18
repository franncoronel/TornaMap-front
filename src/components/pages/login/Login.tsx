import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText, } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../../../context/AuthContext.tsx";
import { LoginRequest } from '../../../data/domain/User.ts'
import React from 'react';
import { EyeSlash,Eye, SignIn, FingerprintSimple} from '@phosphor-icons/react'
import logoUnsam from '@/assets/logos/logo-unsam-largo.png'
import './login.css'
export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginRequest>()
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmit : SubmitHandler<LoginRequest> = (data) => {
        console.log('Login Data:', data)
        // Redirigir a la ruta "/"
        login()
        navigate('/perfil')
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }

    return (
        <main className='login-page'>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: '0 auto',
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    // Ajustes para pantallas pequeñas (tablet/mobile)
                    '@media (max-width:768px)': {
                        border: 'none',
                    }
                }}
            >
                <img
                    src={logoUnsam}
                    alt="Logo UNSAM"
                    style={{width: '100%', marginBottom: '20px'}}
                />
                <h1>Ingresá</h1>

                {/* Email Field */}
                <Controller
                    name="email"
                    control={control}
                    defaultValue="prueba@unsam.edu.ar"
                    rules={{
                        required: 'Debe ingresar un email',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Ingrese una dirección de email válida',
                        },
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            placeholder='example@gmail.com'
                            error={!!errors.email}
                            helperText={errors.email?.message ? String(errors.email?.message) : ''}
                            fullWidth
                        />
                    )}
                />

                {/* Password Field */}
                <Controller
                    name="password"
                    control={control}
                    defaultValue="prueba@unsam.edu.ar"
                    rules={{
                        required: 'Debe ingresar una contraseña',
                        minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres',
                        },
                    }}
                    render={({field}) => (
                        <FormControl
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                            {...field}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            data-testid="password-input"
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            />
                            {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                   <SignIn size={32} alt='Ingresar' /> Ingresar
                </Button>

                {/* Register Button */}
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/registrar')}
                >
                   <FingerprintSimple size={32} alt='Registrarse' /> Registrarse
                </Button>
            </Box>
        </main>
    )
}
