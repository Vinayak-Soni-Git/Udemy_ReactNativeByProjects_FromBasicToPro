import { ComponentProps, FC, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import AppText from './AppText.tsx'

type IconName = ComponentProps<typeof FontAwesome>['name']

interface Props {
    iconName:IconName
    title:string
    onPress?():void
}

const StartButton: FC<Props> = ({iconName, title, onPress}) => {
    const [pressed, setPressed] = useState(false)
    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => {
                setPressed(true)
            }}
            onPressOut={() => {
                setPressed(false)
            }}
            style={[styles.startButton, pressed && styles.pressedStartButton]}>
            <FontAwesome name={iconName} size={40} color={'white'} />
            <AppText style={styles.startButtonTitle} >{title}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressedStartButton: {
        backgroundColor: 'purple',
    },
    startButton: {
        borderRadius: 8,
        padding: 30,
        backgroundColor: 'black',
        gap:5,
        alignItems:'center',
        justifyContent:'center'
    },
    startButtonTitle:{
        fontSize:20,
        fontFamily:'BetaniaPatmosIn-Regular'
    }
})

export default StartButton
