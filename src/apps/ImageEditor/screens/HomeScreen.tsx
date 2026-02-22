import { FC, useState } from 'react'
import { Linking, Platform, StyleSheet, View } from 'react-native'
import UserFirstVisit from '../components/UserFirstVisit.tsx'
import { requestImageReadWritePermissions } from '../utils/Permissions.ts'
import NeverAskPermissionsAlertBox from '../components/NeverAskPermissionsAlertBox.tsx'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { saveImageToLocalDirectory } from '../utils/FileHandler.ts'

interface Props {}

const HomeScreen: FC<Props> = () => {
    const [showPermissionAlert, setShowPermissionAlert] = useState(false)
    const [isNeverAsk, setIsNeverAsk] = useState(false)
    const handleOnCapturePress = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await requestImageReadWritePermissions()
                if (!result?.valid && !result?.never_ask) {
                    return setShowPermissionAlert(true)
                } else if (result?.never_ask) {
                    setIsNeverAsk(true)
                    return setShowPermissionAlert(true)
                }
            }
            const { didCancel, assets, errorMessage } = await launchCamera({
                mediaType: 'photo',
            })
            if (!didCancel && assets) {
                console.log(assets)
            }
        } catch (error) {}
    }
    const hidePermissionModal = () => setShowPermissionAlert(false)

    const handleOpenSettings = () => {
        Linking.openSettings()
    }
    const handleAskPermissionAgain = () => {
        setShowPermissionAlert(false)
        handleOnCapturePress()
    }

    const handleOnSelectPress = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await requestImageReadWritePermissions()
                if (!result?.valid && !result?.never_ask) {
                    return setShowPermissionAlert(true)
                } else if (result?.never_ask) {
                    setIsNeverAsk(true)
                    return setShowPermissionAlert(true)
                }
            }
            const { didCancel, assets, errorMessage } =
                await launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: 1,
                })
            if (!didCancel && assets) {
                const image = assets[0]
                if(image.uri){
                    await saveImageToLocalDirectory(image.uri)
                }
            }
        } catch (error) {}
    }

    return (
        <View style={styles.container}>
            <UserFirstVisit
                onSelectPress={handleOnSelectPress}
                onCapturePress={handleOnCapturePress}
            />
            <NeverAskPermissionsAlertBox
                visible={showPermissionAlert}
                onClose={hidePermissionModal}
                buttonProps={{
                    titleOne: 'Close',
                    titleTwo: isNeverAsk ? 'Open Settings' : 'Ask Me Again',
                    onPressOne: hidePermissionModal,
                    onPressTwo: isNeverAsk
                        ? handleOpenSettings
                        : handleAskPermissionAgain,
                }}
            />
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
