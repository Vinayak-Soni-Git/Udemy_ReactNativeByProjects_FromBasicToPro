import { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import AppText from './AppText.tsx'

interface Props {
    title?: string
    onCancel?(): void
    onConfirm?(): void
    regularBtnTitle?:string
    destructiveBtnTitle:string
}

const ConfirmOptionsModal: FC<Props> = ({ title, onCancel, onConfirm, regularBtnTitle, destructiveBtnTitle }) => {
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>{title}</AppText>
            <View style={styles.buttonsContainer}>
                <Pressable
                    onPress={onConfirm}
                    style={[styles.button, styles.destructive]}>
                    <AppText style={styles.buttonText}>{destructiveBtnTitle}</AppText>
                </Pressable>
                <Pressable
                    onPress={onCancel}
                    style={[styles.button, styles.regular]}>
                    <AppText style={styles.buttonText}>{regularBtnTitle}</AppText>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: '90%',
        padding: 10,
        gap: 20,
        backgroundColor: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    regular: {
        backgroundColor: '#181c14',
    },
    destructive: {
        backgroundColor: 'purple',
    },
    buttonText: {
        fontSize: 18,
    },
})

export default ConfirmOptionsModal
