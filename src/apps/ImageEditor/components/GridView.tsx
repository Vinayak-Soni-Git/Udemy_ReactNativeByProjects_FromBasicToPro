import { ReactNode, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

interface Props<T> {
    data: T[]
    renderItem(item: T): ReactNode
    numOfColumns?: number
}

const GAP = 10

const GridView = <T extends unknown>({
    data,
    numOfColumns = 2,
    renderItem,
}: Props<T>) => {
    const [containerWidth, setContainerWidth] = useState(0)
    return (
        <View
            style={styles.container}
            onLayout={event =>
                setContainerWidth(event.nativeEvent.layout.width)
            }>
            <FlatList
                numColumns={numOfColumns}
                contentContainerStyle={styles.contentContainerStyle}
                data={data}
                renderItem={({ item, index }) => {
                    const size =
                        (containerWidth - GAP * (numOfColumns - 1)) /
                        numOfColumns
                    return (
                        <View
                            style={{
                                width: size,
                                height: size,
                                marginRight:
                                    (index + 1) % numOfColumns === 0 ? 0 : GAP,
                            }}>
                            {renderItem(item)}
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    itemContainer: {
        height: 200,
    },
    contentContainerStyle: {
        gap: GAP,
    },
})

export default GridView
