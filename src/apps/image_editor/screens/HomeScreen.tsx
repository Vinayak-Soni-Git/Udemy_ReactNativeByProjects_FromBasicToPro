import { FC, useEffect, useState } from 'react'
import { Linking, Platform, Pressable, StyleSheet } from 'react-native'
import UserFirstVisit from '../components/UserFirstVisit.tsx'
import { requestImageReadWritePermissions } from '../utils/Permissions.ts'
import NeverAskPermissionsAlertBox from '../components/NeverAskPermissionsAlertBox.tsx'
import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker'
import {
    getLocalImages,
    LocalImage,
    removeFile,
    saveImageToLocalDirectory,
} from '../utils/FileHandler.ts'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppText from '../components/AppText.tsx'
import Loader from '../components/Loader.tsx'
import GridView from '../components/GridView.tsx'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import CustomAlertBox from '../components/CustomAlertBox.tsx'
import GridViewImage from '../components/GridViewImage.tsx'
import ConfirmOptionsModal from '../components/ConfirmOptionsModal.tsx'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { ImageEditorStackNavigatorProps } from '../navigators/ImageEditorStackNavigatorProps.tsx'

interface Props {}

const HomeScreen: FC<Props> = () => {
    const [showPermissionAlert, setShowPermissionAlert] = useState(false)
    const [isNeverAsk, setIsNeverAsk] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [isFirstVisit, setIsFirstVisit] = useState(false)
    const [images, setImages] = useState<LocalImage[]>([])
    const [showConfirmOptions, setShowConfirmOptions] = useState(false)
    const [selectedImage, setSelectedImage] = useState<LocalImage | null>(null)
    const navigation =
        useNavigation<NavigationProp<ImageEditorStackNavigatorProps>>()

    const navigateToEditingCanvas = (imageUri: string) => {
        navigation.navigate('ImageEditorEditingCanvasScreen', {
            image: imageUri,
        })
    }

    const handleAfterImageSelection = async (data: ImagePickerResponse) => {
        const { assets, didCancel } = data
        if (!didCancel && assets) {
            const asset = assets[0]
            if (asset.uri) {
                await saveImageToLocalDirectory(asset.uri)
                navigateToEditingCanvas(asset.uri)
            }
        }
    }

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
            const res = await launchCamera({
                mediaType: 'photo',
            })
            handleAfterImageSelection(res)
        } catch (error) {
            console.log()
            console.log(error)
        }
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
            const res = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
            })
            handleAfterImageSelection(res)
        } catch (error) {
            console.log(error)
        }
    }

    const scanLocalFiles = async () => {
        return await getLocalImages().then(res => {
            if (!res.length) {
                setIsFirstVisit(true)
            } else {
                setImages(res)
            }
        })
    }

    const hideConfirmOptions = () => {
        setShowConfirmOptions(false)
        setSelectedImage(null)
    }

    useEffect(() => {
        scanLocalFiles().finally(() => {
            setTimeout(() => {
                setIsReady(true)
            }, 2000)
        })
    }, [])

    const handleOnImageRemove = async () => {
        if (!selectedImage) return
        await removeFile(selectedImage.path)
        await scanLocalFiles()
        hideConfirmOptions()
    }

    if (!isReady)
        return (
            <SafeAreaView style={styles.container}>
                <Loader />
            </SafeAreaView>
        )

    if (isFirstVisit)
        return (
            <SafeAreaView style={styles.container}>
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
            </SafeAreaView>
        )

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Pressable style={styles.addNewProjectButton}>
                    <FontAwesome
                        name={'plus-square'}
                        color={'white'}
                        size={35}
                    />
                </Pressable>
                <AppText style={styles.previousProjectText}>
                    Previous Projects
                </AppText>
                <GridView
                    data={images}
                    renderItem={item => (
                        <GridViewImage
                            onPress={() => navigateToEditingCanvas(item.path)}
                            onDeleteImage={() => {
                                setSelectedImage(item)
                                setShowConfirmOptions(true)
                            }}
                            source={item.path}
                        />
                    )}
                />
            </SafeAreaView>
            <CustomAlertBox
                visible={showConfirmOptions}
                onClose={hideConfirmOptions}>
                <ConfirmOptionsModal
                    regularBtnTitle={'Cancel'}
                    destructiveBtnTitle={'Confirm'}
                    onCancel={hideConfirmOptions}
                    onConfirm={handleOnImageRemove}
                    title={
                        'Are you sure to delete the project it will remove all saved progress?'
                    }
                />
            </CustomAlertBox>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181c14',
        padding: 16,
    },
    imagesContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        borderRadius: 8,
    },
    previousProjectText: {
        fontSize: 18,
        marginBottom: 10,
    },
    addNewProjectButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HomeScreen
