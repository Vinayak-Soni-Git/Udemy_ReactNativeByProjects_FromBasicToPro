import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from './AppText.tsx'

interface Props {
    title?: string
}

const ConfirmOptionsModal: FC<Props> = ({ title }) => {
    return (
        <View style={styles.container}>
            <AppText style={styles.text} >{title}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
        width: '80%',
        padding: 10,
        gap: 20,
        backgroundColor: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:16,
        textAlign:'center',
    }
})

export default ConfirmOptionsModal
