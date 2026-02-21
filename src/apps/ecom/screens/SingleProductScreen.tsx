import { FC, useEffect, useRef, useState } from 'react'
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ViewToken,
} from 'react-native'
import { StackScreenProps } from 'react-native-screens/src/components/gamma/stack'
import { AuthStackNavigator } from './SignInScreen.tsx'
import client from '../api/Client.ts'
import ProductPrice from '../components/ProductPrice.tsx'
import { formatPrice } from '../utils/Helper.ts'
import PrimaryButton from '../components/PrimaryButton.tsx'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { Product, useCart } from '../context/CartProvider.tsx'
import { useFav } from '../context/FavouriteProvider.tsx'

type Props = StackScreenProps<AuthStackNavigator, 'SingleProductScreen'>

const { width } = Dimensions.get('screen')
const imageSize = width - 10 * 2

const SingleProductScreen: FC<Props> = ({ route }) => {
    const [product, setProduct] = useState<Product>()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const cartContext = useCart()
    const favContext = useFav()
    const productId = route.params.id
    const onViewableItemChanged = useRef(
        (info: {
            viewableItems: ViewToken<string>[]
            changed: ViewToken<string>[]
        }) => {
            const activeIndex = info.viewableItems[0]?.index
            if (activeIndex != undefined && activeIndex !== null)
                setCurrentSlideIndex(activeIndex)
        },
    )
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    })

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await client.get<{
                    product: ProductDetail | null
                }>('/product/detail/' + productId)
                if (data.product) {
                    setProduct(data.product)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchProductDetails()
    }, [productId])

    if (!product)
        return (
            <View style={styles.container}>
                <Text>No Product Detail</Text>
            </View>
        )
    const images = [product.poster, ...product.images]

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <FlatList
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: imageSize,
                                    height: imageSize,
                                    borderRadius: 8,
                                }}
                                resizeMode={'cover'}
                            />
                        )
                    }}
                    onViewableItemsChanged={onViewableItemChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                />
                <View style={styles.images}>
                    {images.map((image, index) => {
                        return (
                            <Image
                                key={image + index}
                                source={{ uri: image }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    transform: [
                                        {
                                            scale:
                                                index === currentSlideIndex
                                                    ? 1
                                                    : 0.5,
                                        },
                                    ],
                                }}
                                resizeMode={'cover'}
                            />
                        )
                    })}
                </View>
            </View>

            <Text>Product Details</Text>
            <Text style={styles.title}>{product.title}</Text>
            <ProductPrice
                mrp={formatPrice(product.price.mrp)}
                sale={formatPrice(product.price.sale)}
            />
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.bulletPointsContainer}>
                <Text style={styles.keyTitle}>Key Features</Text>
                {product.bulletPoints.map(point => {
                    return (
                        <View style={styles.pointsContainer} key={point}>
                            <View style={styles.bullet} />
                            <Text style={styles.pointText}>{point}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.buttonsContainer}>
                <PrimaryButton style={{ flex: 1 }} title={'Buy Now'} />

                <View style={styles.actionButtonsWrapper}>
                    <Pressable
                        onPress={() => cartContext?.updateCart(product, 1)}
                        style={styles.actionButton}>
                        <FontAwesome
                            name={'shopping-cart'}
                            color={'black'}
                            size={20}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => favContext?.updateFavs(product)}
                        style={styles.actionButton}>
                        <FontAwesome
                            name={'heart'}
                            color={favContext?.isFav(product) ? 'red' : 'white'}
                            size={20}
                        />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 20,
    },
    bulletPointsContainer: {
        gap: 10,
    },
    keyTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    images: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
    },
    pointText: {},
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    actionButtonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SingleProductScreen
