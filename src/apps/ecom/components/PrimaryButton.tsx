import { FC } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

interface Props {
    title?: string
    style?:StyleProp<ViewStyle>
    onPress?(): void
}

const PrimaryButton: FC<Props> = ({ title,style, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => ([{
                ...styles.container,
                opacity: pressed ? 0.5 : 1,
            }, style])}
            onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#FFA500',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
})

export default PrimaryButton
