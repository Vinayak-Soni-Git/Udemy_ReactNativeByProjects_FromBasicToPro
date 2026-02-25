import { Image } from 'react-native'

type ImageSizeResult = {
    width: number
    height: number
    scale: number
    actualSize: {
        width: number
        height: number
    }
}

export const calculateImageSize = (
    width: number,
    height: number,
    desiredWidth: number,
    desiredHeight: number,
): ImageSizeResult => {
    if (width <= 0 || height <= 0 || desiredWidth <= 0 || desiredHeight <= 0)
        return {
            actualSize: { width: 0, height: 0 },
            height: 0,
            width: 0,
            scale: 0,
        }
    const widthFit = desiredWidth / width
    const heightFit = desiredHeight / height

    const scale = Math.min(widthFit, heightFit)

    const finalWidth = width * scale
    const finalHeight = height * scale

    return {
        actualSize: { width, height },
        height: finalHeight,
        width: finalWidth,
        scale,
    }
}

export const loadAndCalculateImageSize = async (
    src: string,
    desiredWidth: number,
    desiredHeight: number,
): Promise<ImageSizeResult> => {
    const { width, height } = await Image.getSize(src)

    return calculateImageSize(width, height, desiredWidth, desiredHeight)
}
