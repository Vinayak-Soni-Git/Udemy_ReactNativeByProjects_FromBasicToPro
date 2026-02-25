import { FC } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImageEditorStackNavigatorProps } from '../navigators/ImageEditorStackNavigatorProps.tsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Canvas,
    Group,
    Image,
    useCanvasRef,
    useImage,
} from '@shopify/react-native-skia'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { saveBase64ImageToDevice } from '../utils/FileHandler.ts'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { calculateImageSize } from '../utils/Helper.ts'
import MaterialIcons from '@react-native-vector-icons/material-icons'

type Props = NativeStackScreenProps<
    ImageEditorStackNavigatorProps,
    'ImageEditorEditingCanvasScreen'
>

const tools = [
    { icon: 'crop', task: 'crop' },
    { icon: 'contrast', task: 'contrast' },
    { icon: 'brightness-medium', task: 'brightness' },
    { icon: 'photo-filter', task: 'filter' },
] as const

type EditTask = (typeof tools)[number]['task']

const { width } = Dimensions.get('window')
const padding = 10
const canvasSize = width - padding * 2

const EditingCanvasScreen: FC<Props> = ({ route }) => {
    const canvasRef = useCanvasRef()
    const image = useImage(route.params.image)
    const { canGoBack, goBack, navigate } =
        useNavigation<NavigationProp<ImageEditorStackNavigatorProps>>()

    const handleExport = () => {
        const imageSnapshot = canvasRef.current?.makeImageSnapshot()
        const base64Image = imageSnapshot?.encodeToBase64()
        if (base64Image) {
            saveBase64ImageToDevice(base64Image)
        }
    }

    const handleOnClose = () => {
        if (canGoBack()) goBack()
    }

    const handleOnToolPress = (task: EditTask) => {
        switch (task) {
            case 'crop':
                navigate('ImageEditorImageCropper', { src: route.params.image })
                break
            default:
                return
        }
    }

    const actualImageWidth = image?.width() || 0
    const actualImageHeight = image?.height() || 0

    const size = calculateImageSize(
        actualImageWidth,
        actualImageHeight,
        canvasSize,
        canvasSize,
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleOnClose} style={styles.button}>
                    <FontAwesome name={'close'} size={24} color={'white'} />
                </Pressable>
                <Pressable onPress={handleExport} style={styles.button}>
                    <FontAwesome name={'save'} size={18} color={'white'} />
                </Pressable>
            </View>
            <Canvas
                ref={canvasRef}
                style={[
                    styles.canvas,
                    { width: size.width, height: size.height },
                ]}>
                <Group>
                    <Image
                        fit={'contain'}
                        image={image}
                        width={size.width}
                        height={size.height}
                    />
                </Group>
            </Canvas>
            <View style={styles.toolsContainer}>
                {tools.map(item => {
                    return (
                        <Pressable
                            onPress={() => handleOnToolPress(item.task)}
                            key={item.task}
                            style={styles.toolButton}>
                            <MaterialIcons
                                name={item.icon}
                                size={20}
                                color={'white'}
                            />
                        </Pressable>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181c14',
        padding: padding,
    },
    canvas: {
        margin: 'auto',
    },
    button: {
        height: 45,
        width: 45,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    toolsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#222',
        marginTop: 'auto',
        borderRadius: 8,
        padding: 5,
        gap: 10,
    },
    toolButton: {
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        borderRadius: 4,
    },
})

export default EditingCanvasScreen
