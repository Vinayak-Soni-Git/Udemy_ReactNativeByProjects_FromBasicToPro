import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import AppNavigationButton from './AppNavigationButton'

interface Props {
    message?: string
    onPressOkButton?(): void
}

const SorryForInconvenience: FC<Props> = ({ message, onPressOkButton }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/lottie/sorry_for_error.json')}
                autoPlay={true}
                loop={true}
                style={styles.lottieAnimation}
            />
            <Text style={styles.text}>{message}</Text>
            <AppNavigationButton title={'OK'} onPress={onPressOkButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: '80%',
        padding: 10,
        gap: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        color:'black',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'PTSerif-Regular',
    },
    lottieAnimation: {
        width: 300,
        height: 200,
        alignSelf: 'center',
    },
})

export default SorryForInconvenience
