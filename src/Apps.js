import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View } from 'react-native'
import AppNavigationButton from './components/AppNavigationButton'
import useClickSound from './hooks/useSound'
import { ApplicationRoutes } from './constants/Routes'

export default function Apps({ navigation }) {
    function navigateToAppScreen(appScreenName) {
        navigation.navigate(appScreenName)
    }
    const audioFileName = 'click.wav'

    const playClickSound = useClickSound(audioFileName)

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'right', 'bottom', 'top']}>
            <View style={styles.outerBorder}>
                <View style={styles.innerBorder}>
                    <View style={styles.headerBanner}>
                        <Text style={styles.headerText}>Apps</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <AppNavigationButton
                            title={'Calculator'}
                            onPress={() =>
                                navigateToAppScreen(
                                    ApplicationRoutes.CalculatorApp,
                                )
                            }
                            clickIn={playClickSound}
                            clickOut={playClickSound}
                        />
                        <AppNavigationButton
                            title={'Ecom App'}
                            onPress={() =>
                                navigateToAppScreen(
                                    ApplicationRoutes.EcomAppScreen,
                                )
                            }
                            clickIn={playClickSound}
                            clickOut={playClickSound}
                        />
                        <AppNavigationButton
                            title={'Image Editor'}
                            onPress={null}
                            clickIn={playClickSound}
                            clickOut={playClickSound}
                        />
                    </View>
                    <View style={styles.bottomText}>
                        <Text>Made with love by Vinayak Soni</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    buttonsContainer: {
        padding: 32,
        flex: 1,
        gap: 20,
        backgroundColor: 'cyan',
        justifyContent: 'flex-start',
    },
    outerBorder: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: 'black',
        padding: 6,
    },
    innerBorder: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 16,
        padding: 12,
        backgroundColor: 'cyan',
    },
    headerWrapper: {
        alignSelf: 'flex-start',
        marginBottom: 14,
    },

    headerBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },

    headerText: {
        fontFamily: 'Orbitron-ExtraBold',
        color: 'white',
        fontSize: 17,
        letterSpacing: 0.5,
    },
    bottomText: {
        alignSelf: 'baseline',
    },
})
