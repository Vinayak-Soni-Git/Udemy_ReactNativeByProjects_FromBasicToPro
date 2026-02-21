import { createContext, FC, ReactNode, useContext, useState } from 'react'

export type Product = {
    id: string
    title: string
    description: string
    category: string
    poster: string
    price: {
        mrp: number
        sale: number
    }
    images: string[]
    bulletPoints: string[]
}

type cartItem = {
    product: Product
    count: number
}

interface ICartContext {
    items: cartItem[]
    updateCart(product: Product, quantity: number): void
    removeFromCart(product: Product): void
    clearCart(): void
    countAllItems(): number
    countTotalPrice(): number
}

const CartContext = createContext<ICartContext | null>(null)

interface Props {
    children: ReactNode
}

const CartProvider: FC<Props> = ({ children }) => {
    const [cartItems, setCartItems] = useState<cartItem[]>([])
    const updateCart = (product: Product, quantity: number) => {
        const finalCartItems = [...cartItems]
        const index = finalCartItems.findIndex(
            item => item.product.id === product.id,
        )
        if (index === -1) {
            finalCartItems.push({ count: quantity, product })
        } else {
            finalCartItems[index].count += quantity
        }
        if (finalCartItems[index]?.count <= 0) {
            removeFromCart(product)
        } else {
            setCartItems(finalCartItems)
        }
    }
    const removeFromCart = (product: Product) => {
        setCartItems(oldItems => {
            return oldItems.filter(item => item.product.id !== product.id)
        })
    }
    const clearCart = () => {
        setCartItems([])
    }
    const countAllItems = () => {
        return cartItems.reduce((acc, cartItem) => acc + cartItem.count, 0)
    }
    const countTotalPrice = () => {
        return cartItems.reduce(
            (acc, cartItems) =>
                acc + cartItems.count * cartItems.product.price.sale,
            0,
        )
    }
    return (
        <CartContext.Provider
            value={{
                items: cartItems,
                updateCart,
                removeFromCart,
                clearCart,
                countAllItems,
                countTotalPrice,
            }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
export default CartProvider
