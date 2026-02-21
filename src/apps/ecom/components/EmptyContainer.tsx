import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    text?:string
}

const EmptyContainer: FC<Props> = ({text}) => {
    return (
        <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListTitle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyListContainer: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListTitle: { fontSize: 30, color: 'black' },
})

export default EmptyContainer
