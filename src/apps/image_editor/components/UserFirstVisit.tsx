import { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppText from './AppText.tsx'
import StartButton from './StartButton.tsx'

interface Props {
    onCapturePress?():void
    onSelectPress?():void
}

const UserFirstVisit: FC<Props> = ({onCapturePress, onSelectPress}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.defaultImage}
                    source={require('../assest/default.png')}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.titlesContainer}>
                    <AppText style={styles.title}>
                        Start editing your first image.
                    </AppText>
                    <AppText style={styles.subTitle}>
                        Pick an image from your gallery or capture a new one to
                        begin!.
                    </AppText>
                </View>

                <View style={styles.startButtonsContainer}>
                    <StartButton onPress={onCapturePress} iconName={'camera-retro'} title={'capture'} />
                    <StartButton onPress={onSelectPress} iconName={'image'} title={'gallery'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 20,
    },
    imageContainer: {},
    defaultImage: {
        margin: 'auto',
    },
    bottomContainer: {},
    titlesContainer: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'PTSerif-Regular',
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 5,
        fontFamily: 'PTSerif-Regular',
    },
    startButtonsContainer: {
        marginTop: 50,
        flexDirection: 'row',
        padding: 10,
        gap: 100,
        alignSelf: 'center',
    },
})

export default UserFirstVisit
