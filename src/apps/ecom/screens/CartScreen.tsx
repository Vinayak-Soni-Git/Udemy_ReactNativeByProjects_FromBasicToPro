import { FC, useEffect } from 'react'
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { useCart } from '../context/CartProvider.tsx'
import { useNavigation } from '@react-navigation/core'
import { formatPrice } from '../utils/Helper.ts'
import EmptyContainer from '../components/EmptyContainer.tsx'

interface Props {}

const CartScreen: FC<Props> = () => {
    const cartContext = useCart()
    const cartItemsCount = cartContext?.countAllItems()
    const navigation = useNavigation()

    useEffect(() => {
        let tabBarBadge:string | undefined = undefined
        if (cartItemsCount) {
            tabBarBadge = cartItemsCount <= 9 ? cartItemsCount.toString() : '9+'
        }
        navigation.setOptions({
            tabBarBadge,
        })
    }, [navigation, cartItemsCount])

    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={
                    <EmptyContainer text={'Your cart is empty'} />
                }
                contentContainerStyle={styles.listContainer}
                data={cartContext?.items}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.productContainer}>
                            <Image
                                resizeMode={'cover'}
                                source={{ uri: item.product.poster }}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetailsContainer}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.productTitle}>
                                    {item.product.title}
                                </Text>
                                <View>
                                    <Text style={styles.priceText}>
                                        {formatPrice(item.product.price.sale)} x{' '}
                                        {item.count}
                                    </Text>
                                    <Text style={styles.totalPriceText}>
                                        {formatPrice(
                                            item.product.price.sale *
                                                item.count,
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.quantityControlsContainer}>
                                    <Pressable
                                        onPress={() =>
                                            cartContext?.updateCart(
                                                item.product,
                                                -1,
                                            )
                                        }
                                        style={styles.actionButton}>
                                        <Text>-</Text>
                                    </Pressable>
                                    <View
                                        style={styles.quantityDisplayContainer}>
                                        <Text style={styles.quantityCountText}>
                                            {item.count}
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() =>
                                            cartContext?.updateCart(
                                                item.product,
                                                1,
                                            )
                                        }
                                        style={styles.actionButton}>
                                        <Text>+</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={styles.totalPriceContainer}>
                <Pressable onPress={cartContext?.clearCart}>
                    <Text style={styles.clearCartButtonText}>Clear Cart</Text>
                </Pressable>
                <View style={styles.divider} />
                <Text style={styles.totalText}>
                    {formatPrice(cartContext?.countTotalPrice() || 0)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    listContainer: {
        gap: 15,
        paddingBottom: 10,
    },
    productContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productTitle: {
        fontWeight: '600',
    },
    priceText: {
        fontWeight: '500',
        color: 'gray style=styles.productDetailsContainer ',
    },
    totalPriceText: {
        fontWeight: '600',
        fontSize: 18,
    },
    productDetailsContainer: {
        flex: 1,
        gap: 5,
    },
    quantityControlsContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    actionButton: {
        height: 40,
        width: 40,
        borderRadius: 8,
    },
    quantityDisplayContainer: {
        height: 40,
        width: 40,
        borderRadius: 8,
        backgroundColor: '#ffa500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityCountText: {
        fontSize: 16,
    },
    totalPriceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    divider: {
        height: 2,
        backgroundColor: 'lightgray',
    },
    clearCartButtonText: {
        fontSize: 18,
        paddingVertical: 10,
    },
})

export default CartScreen
