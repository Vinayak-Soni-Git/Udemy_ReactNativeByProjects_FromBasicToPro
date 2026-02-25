import { StatusBar, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './src/navigators/RootNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App() {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        <GestureHandlerRootView style={styles.rootView}>
            <SafeAreaProvider>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <RootNavigator />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default App

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
})
