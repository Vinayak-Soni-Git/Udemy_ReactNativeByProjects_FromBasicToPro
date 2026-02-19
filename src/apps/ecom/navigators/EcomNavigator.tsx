import { AuthContext } from '../context/AuthProvider.tsx'
import { useContext } from 'react'
import TabNavigator from './TabNavigator.tsx'
import SignInScreen from '../screens/SignInScreen.tsx'

export default function EcomNavigator() {
    const authContext = useContext(AuthContext)
    return authContext.isAuthenticated ? <TabNavigator /> : <SignInScreen />
}
