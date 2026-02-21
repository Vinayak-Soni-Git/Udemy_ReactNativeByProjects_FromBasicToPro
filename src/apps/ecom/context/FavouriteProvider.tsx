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

interface IFavContext {
    favItems: Product[]
    updateFavs(product: Product): void
    isFav(product:Product): boolean
}

const FavContext = createContext<IFavContext | null>(null)

interface Props {
    children: ReactNode
}

const FavProvider: FC<Props> = ({ children }) => {
    const [favItems, setFavItems] = useState<Product[]>([])

    const updateFavs = (product: Product) => {
        const index = favItems.findIndex(({id}) => id === product.id)
        if(index === -1){
            setFavItems([...favItems, product])
        }else{
            setFavItems(old => old.filter(({id}) => id !== product.id))
        }
    }

    const isFav = (product:Product)=>{
        const itemFounded = favItems.find((item)=>item.id === product.id)
        return !!itemFounded
    }
    return (
        <FavContext.Provider
            value={{
                favItems: favItems,
                updateFavs: updateFavs,
                isFav:isFav
            }}>
            {children}
        </FavContext.Provider>
    )
}

export const useFav = () => useContext(FavContext)
export default FavProvider
