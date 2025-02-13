import { fireEvent, render, screen } from '@testing-library/react';
import { Welcome } from './Welcome';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

//Mock de Navegación
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})


describe('Welcome Page', () =>{
  it('Renderización correcta del componente', async () => {
    render(<BrowserRouter><Welcome /></BrowserRouter>,)

    //rendering del logo
    expect(screen.getByAltText(/University Logo/i)).toBeInTheDocument()

    //renderings de los botones
    expect(screen.getByRole('button', { name: /Iniciá sesión/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrate/i })).toBeInTheDocument()

    //rendering del texto de informativo
    expect(screen.getByText(/¡Informate sobre tus materias, aulas y profesores!/i)).toBeInTheDocument()

    //rendering del fondo
    expect(screen.getByTestId('welcome-box')).toHaveStyle('background-image: url("/fondo-tornavias.jpg")')
  })

  it('Navegación a la pagágina de Login y Registro',async()=>{
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<BrowserRouter><Welcome /></BrowserRouter>)

    const loginButton = screen.getByRole('button', { name: /Iniciá sesión/i })
    fireEvent.click(loginButton)
    expect(mockNavigate).toHaveBeenCalledWith('/ingresar')

    const registerButton = screen.getByRole('button', { name: /Registrate/i })
    fireEvent.click(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/registrar')
  })

})
