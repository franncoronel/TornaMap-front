import {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode
} from 'react'
import { Snackbar, Alert } from '@mui/material'

export interface Notification {
  title: string
  description?: string
  type: 'success' | 'error' | 'info' | 'warning'
  action?: () => void
}

interface NotificationContextProps {
  notification: Notification | null
  setNotificationState: (notification: Notification | null) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
)

export const NotificationProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [notification, setNotification] = useState<Notification | null>(null)

  // Función para actualizar el estado de notificación.
  // La notificación se borrará automáticamente cuando se cierre el Snackbar.
  const setNotificationState = (notification: Notification | null) => {
    setNotification(notification)
  }

  // Si querés también limpiar la notificación al montar el provider:
  useEffect(() => {
    setNotification(null)
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notification, setNotificationState }}
    >
      {children}
      {/* Snackbar global */}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={5000}
        onClose={() => setNotificationState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {notification ? (
          <Alert
            onClose={() => setNotificationState(null)}
            severity={notification.type}
            sx={{ width: '100%' }}
          >
            {notification.title}
            {notification.description && ` - ${notification.description}`}
          </Alert>
        ) : undefined}
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification debe ser usado dentro de un NotificationProvider'
    )
  }
  return context
}
