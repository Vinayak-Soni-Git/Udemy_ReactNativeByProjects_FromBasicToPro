import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import AppText from './AppText.tsx'

interface Props {}

const Loader: FC<Props> = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assest/lottie/loader.json')}
                autoPlay={true}
                loop={true}
                style={styles.lottieLoader}
            />
            <AppText style={styles.loadingMessage} >Scanning Images...</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    lottieLoader:{
        width:300,
        height:200,
    },
    loadingMessage:{
        fontSize:20,
    }
})

export default Loader
