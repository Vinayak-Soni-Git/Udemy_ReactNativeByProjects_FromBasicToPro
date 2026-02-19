import AuthProvider from '../context/AuthProvider.tsx'
import EcomNavigator from '../navigators/EcomNavigator.tsx'

export default function EcomAppScreen() {
    return (
        <AuthProvider>
            <EcomNavigator />
        </AuthProvider>
    )
}

