import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
    label?: string
    active?: boolean
    onPress?(): void
}

const CategoryBtn: FC<Props> = ({ label, active, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.commonContainer,
                active ? styles.containerActive : styles.container,
            ]}>
            <Text style={active ? styles.labelActive : styles.label}>
                {label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    commonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    container: {
        backgroundColor: '#edf4ff',
    },
    label: {
        color: 'black',
    },
    containerActive: {
        backgroundColor: '#black',
    },
    labelActive: {
        color: 'white',
    },
})

export default CategoryBtn
