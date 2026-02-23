import { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import CustomAlertBox from './CustomAlertBox.tsx'
import AppText from './AppText.tsx'
import BulletList from './BulletList.tsx'

interface Props {
    visible: boolean
    onClose?():void
    buttonProps?: {
        titleOne: string
        titleTwo: string
        onPressOne?(): void
        onPressTwo?(): void
    },

}

const NeverAskPermissionsAlertBox: FC<Props> = ({ visible, buttonProps, onClose }) => {
    return (
        <CustomAlertBox visible={visible} onClose={onClose} >
            <View style={styles.container}>
                <AppText style={styles.title}>
                    To use the complete features of this app your must give this
                    app these permissions
                </AppText>
                <View>
                    <BulletList
                        data={['Camera', 'Reading Images', 'Writing Images']}
                        renderText={item => {
                            return (
                                <AppText style={styles.listItem}>
                                    {item}
                                </AppText>
                            )
                        }}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.button} onPress={buttonProps?.onPressOne} >
                        <AppText style={styles.btnText}>{buttonProps?.titleOne}</AppText>
                    </Pressable>

                    <Pressable style={styles.button} onPress={buttonProps?.onPressTwo} >
                        <AppText style={styles.btnText}>{buttonProps?.titleTwo}</AppText>
                    </Pressable>
                </View>
            </View>
        </CustomAlertBox>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        gap: 20,
        backgroundColor: '#060706',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
    },
    listItem: {
        fontSize: 18,
        fontWeight: '500',
    },
    button: {
        width: '50%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#181c14',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        textDecorationLine: 'underline',
        gap: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
})

export default NeverAskPermissionsAlertBox
