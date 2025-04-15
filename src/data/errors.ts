import axios from "axios"
import { Response } from "./domain/Response"

const INTERNAL_SERVER_ERROR = 500

export const displayErrorMessage = (error: Response<any>) => {
    const status = error.status
    const errorMessage = status >= INTERNAL_SERVER_ERROR
        ? 'Ocurrió un error. Consulte al administrador del sistema'
        : axios.isAxiosError(error) && !status
            ? 'Ocurrió un error al conectarse al servidor. Consulte al administrador del sistema'
            : error.data.message
    if (status >= INTERNAL_SERVER_ERROR) {
        console.error(error)
    }
    return errorMessage
}