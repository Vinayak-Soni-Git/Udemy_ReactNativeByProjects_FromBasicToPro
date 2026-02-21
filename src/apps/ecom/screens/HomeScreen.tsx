import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FC, useEffect, useState } from 'react'
import { AuthStackNavigator } from './SignInScreen.tsx'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import client from '../api/Client.ts'
import ProductCard, { offset, Product } from '../components/ProductCard.tsx'
import CategoryList from '../components/CategoryList.tsx'
import CategoryBtn from '../components/CategoryBtn.tsx'
import { useNavigation } from '@react-navigation/core'
import { ApplicationRoutes } from '../../../constants/Routes'

type Props = NativeStackScreenProps<AuthStackNavigator, 'HomeScreen'>

const HomeScreen: FC<Props> = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [fetching, setFetching] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await client.get<{ products: Product[] }>(
                    '/product/products',
                )
                setProducts(data.products)
            } catch (error) {
                console.log(error)
            }
        }

        const fetchCategories = async () => {
            try {
                const { data } = await client.get<{ categories: string[] }>(
                    '/product/products',
                )
                setCategories(['All', ...data.categories])
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts().finally(() => setFetching(false))
        fetchCategories()
    }, [])

    const handleOnCategorySelect = async (category: string) => {
        setSelectedCategory(category)
        try {
            if (category === 'All') {
                category = ''
            }
            const { data } = await client.get<{ products: Product[] }>(
                '/product/products/' + category,
            )
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }

    if (fetching)
        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListTitle}>Fetching products...</Text>
            </View>
        )

    return (
        <View>
            <CategoryList
                data={categories}
                renderItem={({ item }) => {
                    return (
                        <CategoryBtn
                            label={item}
                            onPress={() => handleOnCategorySelect(item)}
                            active={selectedCategory === item}
                        />
                    )
                }}
            />

            <FlatList
                data={products}
                contentContainerStyle={styles.container}
                keyExtractor={product => product.id.toString()}
                renderItem={({ item: product }) => {
                    return (
                        <ProductCard
                            onPress={() =>
                                navigation.navigate(
                                    ApplicationRoutes.EcomSingleProductScreen,
                                    { id: product.id },
                                )
                            }
                            product={product}
                        />
                    )
                }}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListTitle}>
                            Oops there is nothing
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={<View style={styles.separator} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: offset,
    },
    emptyListContainer: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListTitle: { fontSize: 30, color: 'black' },
    separator: {
        width: '30%',
        marginHorizontal: 'auto',
        height: 4,
        backgroundColor: 'lightgray',
        marginVertical: 10,
    },
})

export default HomeScreen
