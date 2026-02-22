import { FC, ReactNode } from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'

interface Props {
    children?: ReactNode
    visible?: boolean
    onClose?(): void
}

const CustomAlertBox: FC<Props> = ({ children, visible = false, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType={'slide'}>
            <Pressable style={styles.overlay} onPress={onClose}>
                {children}
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {},
    overlay: {

    },
})

export default CustomAlertBox
