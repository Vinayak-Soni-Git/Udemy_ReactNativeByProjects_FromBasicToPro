import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
    message?: string
    size?:number
}

const ErrorMessage: FC<Props> = ({ message, size=12 }) => {
    return <Text style={[styles.error, { fontSize: size }]}>{message}</Text>
}

const styles = StyleSheet.create({
    error: {
        fontSize: 12,
        color: 'red',
    },
})

export default ErrorMessage
