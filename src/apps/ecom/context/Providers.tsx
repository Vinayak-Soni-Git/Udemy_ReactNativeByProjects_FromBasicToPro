import { FC, ReactNode } from 'react'
import CartProvider from './CartProvider.tsx'
import AuthProvider from './AuthProvider.tsx'
import FavProvider from './FavouriteProvider.tsx'

interface Props {
    children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
    return (
        <AuthProvider>
            <FavProvider>
                <CartProvider>{children}</CartProvider>
            </FavProvider>
        </AuthProvider>
    )
}

export default Providers
