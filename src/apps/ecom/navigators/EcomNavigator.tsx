import { useAuth } from '../context/AuthProvider.tsx'
import TabNavigator from './TabNavigator.tsx'
import SignInScreen from '../screens/SignInScreen.tsx'

export default function EcomNavigator() {
    const authContext = useAuth()
    return authContext.isAuthenticated ? <TabNavigator /> : <SignInScreen />
}
