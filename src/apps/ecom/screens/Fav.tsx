import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {}

const FavScreen: FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text>FavScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default FavScreen
