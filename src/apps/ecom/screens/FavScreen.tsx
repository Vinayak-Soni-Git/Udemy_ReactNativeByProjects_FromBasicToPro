import { FC } from 'react'
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { useFav } from '../context/FavouriteProvider.tsx'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { useNavigation } from '@react-navigation/core'

interface Props {}

const FavScreen: FC<Props> = () => {
    const favContext = useFav()
    const { navigate } = useNavigation()
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={favContext?.items}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() =>
                                navigate('SingleProductScreen', { id: item.id })
                            }
                            style={styles.productContainer}>
                            <Image
                                source={{ uri: item.poster }}
                                style={styles.image}
                            />
                            <Text numberOfLines={1} style={styles.title}>
                                {item.title}
                            </Text>
                            <Text numberOfLines={1} style={styles.price}>
                                {item.price.sale}
                            </Text>
                            <Pressable
                                onPress={() => favContext?.updateFavs(item)}
                                style={styles.favButton}>
                                <FontAwesome
                                    name={'heart'}
                                    size={20}
                                    color={'black'}
                                />
                            </Pressable>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    image: { width: '100%', height: 150, borderRadius: 8 },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },
    productContainer: {
        position: 'relative',
        flex: 1,
        padding: 5,
    },
    favButton: {
        position: 'absolute',
        top: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default FavScreen
