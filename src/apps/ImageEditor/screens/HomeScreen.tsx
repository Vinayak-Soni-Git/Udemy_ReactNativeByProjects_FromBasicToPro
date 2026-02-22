import { FC } from 'react'
import { Platform, StyleSheet, View, Alert } from 'react-native'
import UserFirstVisit from '../components/UserFirstVisit.tsx'
import { requestImageReadWritePermissions } from '../utils/Permissions.ts'

interface Props {}

const HomeScreen: FC<Props> = () => {
    const handleOnCapturePress = async () => {
        Alert.alert(
            'Needs Your attention',
            'This app must be have permission for media',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', style: 'default' },
                { text: 'Ok', style: 'destructive' },
            ],
            {
                cancelable: true,
            },
        )

        try {
            if (Platform.OS === 'android') {
                const result = await requestImageReadWritePermissions()
                if (result?.never_ask) {
                } else {
                }
            }
        } catch (error) {}
    }

    return (
        <View style={styles.container}>
            <UserFirstVisit onCapturePress={handleOnCapturePress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181c14',
    },
})

export default HomeScreen
