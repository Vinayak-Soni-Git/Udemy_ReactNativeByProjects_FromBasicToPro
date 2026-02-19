import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage.ts'

interface DefaultAuthContext {
    isAuthenticated: boolean
}

export const AuthContext = createContext<DefaultAuthContext>({
    isAuthenticated: false,
})

interface Props {
    children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const readTokenFromAsyncStorage = async () => {
            const result = await AsyncStorage.getItem('auth_token')
            if (result) setIsAuthenticated(true)
        }
        readTokenFromAsyncStorage()
    }, [])
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
