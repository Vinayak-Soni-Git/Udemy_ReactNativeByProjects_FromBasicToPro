import { FC } from 'react'
import { Pressable, StyleSheet, PressableProps } from 'react-native'
import AppText from './AppText.tsx'

interface Props extends PressableProps {
    title: string
    active?: boolean
}

const AppButton: FC<Props> = ({ title, active, ...rest }) => {
    return (
        <Pressable
            style={({ pressed }) => {
                return [
                    styles.button,
                    { backgroundColor: pressed ? 'purple' : '#333' },
                    active && styles.active,
                ]
            }}
            {...rest}>
            <AppText>{title}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    active: {
        backgroundColor: 'purple',
    },
})

export default AppButton
