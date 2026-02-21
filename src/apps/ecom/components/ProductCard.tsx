import { FC } from 'react'
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import ProductPrice from './ProductPrice.tsx'
import { formatPrice } from '../utils/Helper.ts'

export type Product = {
    id: number
    title: string
    description: string
    category: string
    poster: string
    price: {
        mrp: number
        sale: number
    }
}

interface Props {
    product: Product
    onPress?():void
}


export const offset = 10
const { width } = Dimensions.get('screen')

const ProductCard: FC<Props> = ({ product, onPress }) => {
    const imageWidth = width - offset * 4
    const imageHeight = (imageWidth * 9) / 16
    const imageStyle = { width: width - 10 * 2, height: imageHeight }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: product.poster }}
                style={[imageStyle, styles.image]}
            />
            <Text style={styles.title}>{product.title}</Text>
            <ProductPrice mrp={formatPrice(product.price.mrp)} sale={formatPrice(product.price.sale)} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dedede',
        padding: offset,
        borderRadius: 8,
        gap: 5,
    },
    image: {
        borderRadius: 8,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
    },
})

export default ProductCard
