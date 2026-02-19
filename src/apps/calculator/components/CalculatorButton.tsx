import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { FC } from 'react'

interface Props {
    title?: string
    style?:StyleProp<ViewStyle>
    onPress?(): void
}

const CalcButton: FC<Props> = props => {
    return (
        <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={styles.buttonText} >{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color:'black',
        fontSize:20,
        fontFamily:'Orbitron-ExtraBold',
    }
})

export default CalcButton
