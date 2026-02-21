import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props<T> {
    data: T[]
    renderItem:ListRenderItem<T>
}

const CategoryList = <T extends unknown>(props: Props<T>) => {
    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={props.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 20 }}
                renderItem={props.renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default CategoryList
