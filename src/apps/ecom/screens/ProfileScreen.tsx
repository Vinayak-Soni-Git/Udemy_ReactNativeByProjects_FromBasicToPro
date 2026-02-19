import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {}

const ProfileScreen: FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default ProfileScreen
