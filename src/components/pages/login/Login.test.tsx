import { describe, expect, it, vi} from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from './Login';
import { AuthProvider } from '@/context/AuthContext';

//Mock de Navegación
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('Login Page', () => {
  it('Renderización correcta del componente', async () => {
    render(<AuthProvider><BrowserRouter><Login /></BrowserRouter></AuthProvider>)
    //screen.debug() //Para ver que se renderiza por terminal

    const logoUnsam = screen.getByAltText(/Logo UNSAM/i)
    expect(logoUnsam).toBeInTheDocument()
    expect(logoUnsam).toHaveAttribute('src',expect.stringContaining('logo-unsam-largo.png'))

    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument()

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()

    const passwordInput = screen.getByTestId('password-input')
    expect(passwordInput).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('Mensaje de error por mail incorrecto o sin llenar', async () => {
    render(<AuthProvider><BrowserRouter><Login /></BrowserRouter></AuthProvider>)

    //simulo carga del input y envio el form
    fireEvent.input(screen.getByLabelText(/email/i), {target: { value: 'invalidemail' },})
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }))
    // verifica que se muestra el mensaje de error para el email
    await waitFor(() => {
      expect(
        screen.getByText(/Ingrese una dirección de email válida/i)).toBeInTheDocument()
    })

    fireEvent.input(screen.getByLabelText(/email/i), {target: { value: '' },})
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }))
    // verifica que se muestra el mensaje de error para el email
    await waitFor(() => {
      expect(
        screen.getByText(/Debe ingresar un email/i)).toBeInTheDocument()
    })

  })

  it('Mensaje de error por password demasiado corta o sin llenar', async () => {
    render(<AuthProvider><BrowserRouter><Login /></BrowserRouter></AuthProvider>)

    //simulo carga del input y envio el form
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } })

    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }))
    // verifica que se muestra el mensaje de error para el email
    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } })
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }))
    await waitFor(() => {
      expect(screen.getByText('Debe ingresar una contraseña')).toBeInTheDocument()
    })

  })

  it('Visibilidad de contraseña', async () => {
    render(<AuthProvider><BrowserRouter><Login /></BrowserRouter></AuthProvider>)

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
    const visibilityButton = screen.getByRole('button', { name: /display the password/i })

    expect(passwordInput.type).toBe('password')

    // Verifica si el ícono es el de mostrar contraseña
    expect(visibilityButton).toBeInTheDocument()
    expect(visibilityButton).toHaveAttribute('aria-label', 'display the password')

    //Muestro la contraseña
    fireEvent.click(visibilityButton)
    expect(passwordInput.type).toBe('text')

    // Verifica que el aria-label cambió a 'hide the password'
    expect(visibilityButton).toHaveAttribute('aria-label', 'hide the password')

    //Oculto la contraseña
    fireEvent.click(visibilityButton)
    expect(passwordInput.type).toBe('password')

    // Verifica que el aria-label volvió a 'display the password'
    expect(visibilityButton).toHaveAttribute('aria-label', 'display the password')
  })

  it('Ruteo correcto despues de la carga del form', async () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<AuthProvider><BrowserRouter><Login /></BrowserRouter></AuthProvider>)

    //cargo los inputs correctamente
    fireEvent.input(screen.getByLabelText(/email/i), {target: { value: 'test@example.com' },})
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })

    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }))

    // verifico que 'navigate' sea llamado después de enviar el formulario
    await waitFor(() => {expect(mockNavigate).toHaveBeenCalledWith('/')})

  })
})
