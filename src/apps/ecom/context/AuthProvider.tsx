import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage.ts'
import client from '../api/Client.ts'

type Profile = {
    name: string
    email: string
}

type SignInInfo = {
    email:string,
    password:string,
}

interface DefaultAuthContext {
    isAuthenticated: boolean
    profile: Profile | null
    logout():void
    login(value:SignInInfo):void
}

export const AuthContext = createContext<DefaultAuthContext>({
    isAuthenticated: false,
    profile: null,
    logout(){},
    login(){}
})

interface Props {
    children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [profile, setProfile] = useState<DefaultAuthContext['profile']>(null)
    const [busy, setBusy] = useState(true)
    useEffect(() => {
        const readTokenFromAsyncStorage = async () => {
            const result = await AsyncStorage.getItem('auth_token')
            if (result) {
                const { data } = await client.get('/auth/is-auth', {
                    headers: {
                        Authorization: 'Bearer ' + result,
                    },
                })
                setIsAuthenticated(true)
                setProfile(data.profile)
            }
        }
        readTokenFromAsyncStorage().finally(()=>{
            setBusy(false)
        })

    }, [])

    const logout = async () =>{
        await AsyncStorage.removeItem('auth_token')
        setIsAuthenticated(false)
    }

    const login = async( value:SignInInfo)=>{
        const {data} = await client.post('/auth/sign-in', value)
        await AsyncStorage.setItem('auth_token', data.token)
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, profile, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
