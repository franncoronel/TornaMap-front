import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box/Box'

interface LoaderContextProps {
  setLoader: Dispatch<SetStateAction<boolean>>
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined)

export const LoaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loader, setLoader] = useState<boolean>(false)

  return (
    <LoaderContext.Provider value={{ setLoader }}>
      {children}
      {loader && (
        <Box className="loader-container">
          <span className="loader-unsam">UNSAM</span>
          <CircularProgress className="loader" size={250} />
        </Box>
      )}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader debe ser usado dentro de un LoaderProvider')
  }
  return context
}
