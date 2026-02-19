import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { FC } from 'react'
import ErrorMessage from './ErrorMessage.tsx'

interface Props extends TextInputProps {
    label?: string
    errors?: string[]
}

const FormInput: FC<Props> = ({ label, errors, ...restProps }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput style={styles.textInput} {...restProps} />
            {errors?.map((err, index) => {
                return <ErrorMessage key={index} message={err} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#dedede',
    },
    textInput: {
        fontSize: 18,
    },
    inputLabel: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
    },
})

export default FormInput
