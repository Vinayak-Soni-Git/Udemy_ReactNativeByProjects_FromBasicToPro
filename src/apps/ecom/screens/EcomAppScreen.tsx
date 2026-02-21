import EcomNavigator from '../navigators/EcomNavigator.tsx'
import Providers from '../context/Providers.tsx'

export default function EcomAppScreen() {
    return (
        <Providers>
            <EcomNavigator />
        </Providers>
    )
}
