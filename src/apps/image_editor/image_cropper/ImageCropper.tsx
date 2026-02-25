import { FC, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppButton from '../components/AppButton.tsx'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImageEditorStackNavigatorProps } from '../navigators/ImageEditorStackNavigatorProps.tsx'
import { loadAndCalculateImageSize } from '../utils/Helper.ts'
import ResizeHandle, { cropHandles, HandleType } from './ResizeHandle.tsx'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

type Props = NativeStackScreenProps<
    ImageEditorStackNavigatorProps,
    'ImageEditorImageCropper'
>

const aspectRatios = ['original', 'free', '1:1', '16:9', '9:16'] as const
type AspectRatio = (typeof aspectRatios)[number]

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const containerWidth = SCREEN_WIDTH * 0.8
const containerHeight = SCREEN_HEIGHT * 0.8

const clamp = (val: number, min: number, max: number) => {
    'worklet'
    return Math.min(Math.max(val, min), max)
}

const ImageCropper: FC<Props> = ({ route }) => {
    const source = route.params.src
    const [imageWidth, setImageWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0)
    const [originalImageSize, setOriginalImageSize] = useState({
        width: 0,
        height: 0,
    })

    const [selectedAspectRatio, setSelectedAspectRatio] =
        useState<AspectRatio>('original')

    const [aspectRatio, setAspectRatio] = useState(0)
    const cropBoxWidth = useSharedValue(0)
    const cropBoxHeight = useSharedValue(0)
    const cropBoxX = useSharedValue(0)
    const cropBoxY = useSharedValue(0)

    const startX = useSharedValue(0)
    const startY = useSharedValue(0)
    const startWidth = useSharedValue(0)
    const startHeight = useSharedValue(0)
    const activeCorner = useSharedValue<HandleType | null>(null)

    const MIN_CROP_SIZE = 100
    const MAX_CROP_WIDTH = imageWidth
    const MAX_CROP_HEIGHT = imageHeight
    const MIN_X = 0
    const MIN_Y = 0

    const animatedCropBoxStyles = useAnimatedStyle(() => {
        return {
            width: cropBoxWidth.value,
            height: cropBoxHeight.value,
            left: cropBoxX.value,
            top: cropBoxY.value,
        }
    })

    useEffect(() => {
        const makeImageReady = async () => {
            const { width, height, actualSize } =
                await loadAndCalculateImageSize(
                    source,
                    containerWidth,
                    containerHeight,
                )
            setOriginalImageSize(actualSize)
            setImageWidth(width)
            setImageHeight(height)

            let newAspectRatio = width / height
            if (width > height) {
                newAspectRatio = height / width
            }

            setAspectRatio(newAspectRatio)

            cropBoxWidth.value = width
            cropBoxHeight.value = height
        }

        makeImageReady()
    }, [source])

    const resizeGesture = Gesture.Pan()
        .onStart(() => {
            startX.value = cropBoxX.value
            startY.value = cropBoxY.value
            startWidth.value = cropBoxWidth.value
            startHeight.value = cropBoxHeight.value
        })
        .onUpdate(event => {
            const { translationX, translationY } = event
            switch (activeCorner.value) {
                case 'top-left':
                    if (selectedAspectRatio === 'free') {
                        const newX = startX.value + translationX
                        const newY = startY.value + translationY
                        const clampedX = clamp(
                            newX,
                            MIN_X,
                            MAX_CROP_WIDTH - MIN_CROP_SIZE,
                        )
                        const clampedY = clamp(
                            newY,
                            MIN_Y,
                            MAX_CROP_HEIGHT - MIN_CROP_SIZE,
                        )

                        const newWidth =
                            startWidth.value - (clampedX - startX.value)
                        const newHeight =
                            startWidth.value - (clampedY - startY.value)

                        cropBoxX.value = clampedX
                        cropBoxY.value = clampedY

                        cropBoxWidth.value = clamp(
                            newWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                        cropBoxHeight.value = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_HEIGHT,
                        )
                    } else {
                        const deltaY = translationY
                        const newHeight = clamp(
                            startHeight.value - deltaY,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH / aspectRatio,
                        )
                        const newWidth = newHeight * aspectRatio
                        const widthDifference = startWidth.value - newWidth
                        const heightDifference = startWidth.value - newHeight

                        cropBoxWidth.value = newWidth
                        cropBoxHeight.value = newHeight

                        cropBoxX.value = clamp(
                            startX.value + widthDifference,
                            MIN_X,
                            MAX_CROP_WIDTH - newWidth,
                        )

                        cropBoxY.value = clamp(
                            startY.value + heightDifference,
                            MIN_Y,
                            MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE),
                        )
                    }
                    break
                case 'top-center':
                    if (selectedAspectRatio === 'free') {
                        const newY = startY.value + translationY
                        const newHeight =
                            startHeight.value - (newY - startY.value)

                        cropBoxHeight.value = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_HEIGHT,
                        )
                        cropBoxY.value = clamp(
                            newY,
                            MIN_Y,
                            MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE),
                        )
                    } else {
                        const newY = startY.value + translationY
                        const newHeight = startHeight.value - translationY

                        const clampedHeight = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_HEIGHT,
                        )
                        const clampedWidth = clampedHeight * aspectRatio
                        cropBoxY.value = clamp(
                            newY,
                            MIN_Y,
                            MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE),
                        )
                        cropBoxHeight.value = clampedHeight
                        cropBoxWidth.value = clampedWidth
                    }
                    break
                case 'top-right':
                    if (selectedAspectRatio === 'free') {
                        const newY = startY.value + translationY
                        const newWidth = startWidth.value + translationX
                        const newHeight = startHeight.value - translationY

                        cropBoxY.value = clamp(
                            newY,
                            MIN_Y,
                            MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE),
                        )
                        cropBoxHeight.value = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_HEIGHT,
                        )
                        cropBoxWidth.value = clamp(
                            newWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                    } else {
                        const deltaWidth = Math.max(
                            translationX,
                            -translationY * aspectRatio,
                        )
                        cropBoxY.value = clamp(
                            startY.value - deltaWidth / aspectRatio,
                            MIN_Y,
                            MAX_CROP_HEIGHT -
                                MIN_Y +
                                MIN_CROP_SIZE * aspectRatio,
                        )
                        const clampedWidth = clamp(
                            startWidth.value + deltaWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                        cropBoxWidth.value = clampedWidth
                        cropBoxHeight.value = clampedWidth / aspectRatio
                    }
                    break
                case 'right-center':
                    if (selectedAspectRatio === 'free') {
                        const newWidth = startWidth.value + translationX
                        cropBoxWidth.value = clamp(
                            newWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                    } else {
                        const newWidth = startWidth.value + translationX
                        let clampedWidth = clamp(
                            newWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                        let computedHeight = clampedWidth / aspectRatio
                        if (computedHeight > MAX_CROP_HEIGHT) {
                            computedHeight = MAX_CROP_HEIGHT
                            clampedWidth = computedHeight * aspectRatio
                        }
                        cropBoxWidth.value = clampedWidth
                        cropBoxHeight.value = computedHeight
                    }
                    break
                case 'bottom-right':
                    if (selectedAspectRatio === 'free') {
                        const newWidth = startWidth.value + translationX
                        const newHeight = startWidth.value + translationY

                        cropBoxHeight.value = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_HEIGHT,
                        )
                        cropBoxWidth.value = clamp(
                            newWidth,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH,
                        )
                    } else {
                    }
                default:
                    break
            }
        })
        .onEnd(() => {
            activeCorner.value = null
        })

    const applyAspectRatio = (ratio: AspectRatio) => {
        setSelectedAspectRatio(ratio)

        let newAspectRatio = 0
        let newHeight = cropBoxHeight.value
        if (ratio === 'original') {
            const { width, height } = originalImageSize
            let localRatio = 0
            if (width < height) {
                localRatio = height / width
                newAspectRatio = width / height
            } else {
                localRatio = width / height
                newAspectRatio = height / width
            }

            newHeight = cropBoxWidth.value * localRatio
        } else if (ratio === '1:1') {
            newHeight = cropBoxWidth.value
            newAspectRatio = 1
        } else if (ratio === '16:9') {
            newHeight = (9 / 16) * cropBoxWidth.value
            newAspectRatio = 16 / 9
        } else if (ratio === '9:16') {
            newHeight = (16 / 9) * cropBoxWidth.value
            newAspectRatio = 9 / 16

            if (newHeight > cropBoxHeight.value) {
                let fitHeight = newHeight - cropBoxHeight.value
                if (fitHeight < MIN_CROP_SIZE) {
                    fitHeight = newHeight - MIN_CROP_SIZE
                }
                const fitWidth = (9 / 16) * fitHeight

                cropBoxWidth.value = withTiming(fitWidth)
                newHeight = (16 / 9) * fitWidth
            }
        }

        cropBoxHeight.value = withTiming(newHeight)
        setAspectRatio(newAspectRatio)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppButton title={'Reset'} />
                <AppButton title={'Done'} />
            </View>

            <GestureDetector gesture={resizeGesture}>
                <Animated.View style={styles.animatedViewContainer}>
                    <View
                        style={[
                            styles.imageContainer,
                            { width: imageWidth, height: imageHeight },
                        ]}>
                        <Image
                            source={{ uri: source }}
                            style={{ width: imageWidth, height: imageHeight }}
                        />
                        <Animated.View
                            style={[styles.cropBox, animatedCropBoxStyles]}>
                            {cropHandles.map(item => {
                                return (
                                    <ResizeHandle
                                        onPressIn={value => {
                                            activeCorner.value = value
                                        }}
                                        key={item}
                                        type={item}
                                    />
                                )
                            })}
                        </Animated.View>
                    </View>
                    <View style={styles.footerContainer}>
                        {aspectRatios.map(item => {
                            return (
                                <AppButton
                                    active={item === selectedAspectRatio}
                                    onPress={() => applyAspectRatio(item)}
                                    key={item}
                                    title={item}
                                />
                            )
                        })}
                    </View>
                </Animated.View>
            </GestureDetector>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181c14',
    },
    animatedViewContainer: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#222',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    imageContainer: {
        alignSelf: 'center',
        marginVertical: 'auto',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#222',
        gap: 10,
    },
    cropBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'white',
    },
})

export default ImageCropper
