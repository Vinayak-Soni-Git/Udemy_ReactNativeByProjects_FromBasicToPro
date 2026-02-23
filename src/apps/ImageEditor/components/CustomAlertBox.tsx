import { FC, ReactNode } from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'

interface Props {
    children?: ReactNode
    visible?: boolean
    onClose?(): void
}

const CustomAlertBox: FC<Props> = ({ children, visible = false, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={onClose} animationType={'slide'}>
            <Pressable style={styles.overlay} onPress={onClose}>
                {children}
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        justifyContent:'flex-end'
    },
})

export default CustomAlertBox
