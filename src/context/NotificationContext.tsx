import { Alert, Snackbar } from '@mui/material'
import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react'

export interface Notification {
    title: string
    description?: string
    type: 'success' | 'error' | 'info' | 'warning'
    action: () => void
}

interface NotificationContextProps {
    notification: Notification | null
    setNotificationState: (notification: Notification | null) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [notification, setNotification] = useState<Notification | null>(null)

    const setNotificationState = (notification: Notification | null) => {
        setNotification(notification)

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    useEffect(() => {
        setNotification(null)
    }, [])

    return (
        <NotificationContext.Provider value={{ notification, setNotificationState  }}>
            {children}
            <Snackbar
                open={Boolean(notification)}
                autoHideDuration={5000}
                onClose={() => setNotificationState(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {notification && (
                <Alert
                    onClose={() => setNotificationState(null)}
                    severity={notification.type}
                    sx={{ width: '100%' }}
                >
                    {notification.title}
                    {notification.description && ` - ${notification.description}`}
                </Alert>
                )}
            </Snackbar>
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification debes er usado con un NotificationProvider')
    }
    return context
}
