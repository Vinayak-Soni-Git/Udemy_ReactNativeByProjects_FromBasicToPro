import { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'

interface Props {
    onDeletePress?():void
    onEditPress?():void
}

const ImageOptions: FC<Props> = ({onDeletePress, onEditPress}) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onDeletePress} style={styles.button}>
                <FontAwesome name={'trash'} color={'white'} size={28} />
            </Pressable>
            <Pressable onPress={onEditPress} style={styles.button}>
                <FontAwesome name={'edit'} color={'white'} size={28} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        padding: 10,
        borderRadius: 8,
        gap: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ImageOptions
