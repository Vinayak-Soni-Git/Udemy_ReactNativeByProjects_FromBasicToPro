import { FC } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

interface Props {
    type: HandleType
    onPressIn(value:HandleType):void
}

export const cropHandles = [
    'top-left',
    'top-center',
    'top-right',
    'right-center',
    'bottom-right',
    'bottom-center',
    'bottom-left',
    'left-center',
] as const

export type HandleType = (typeof cropHandles)[number]

const handleSize = 25
const handleBorderSize = 4

const baseStyles: StyleProp<ViewStyle> = {
    width: handleSize,
    height: handleSize,
    position: 'absolute',
    zIndex: 10,
    borderColor: 'white',
}

const sizeSpecificStyles: Record<HandleType, StyleProp<ViewStyle>> = {
    'top-left': {
        borderTopWidth: handleBorderSize,
        borderLeftWidth: handleBorderSize,
        transform: [
            { translateX: -handleBorderSize },
            { translateY: -handleBorderSize },
        ],
    },
    'top-center': {
        position: 'relative',
        marginHorizontal: 'auto',
        borderTopWidth: handleBorderSize,
        transform: [{ translateY: -handleBorderSize }],
    },
    'top-right': {
        right: 0,
        borderTopWidth: handleBorderSize,
        borderRightWidth: handleBorderSize,
        transform: [
            { translateX: handleBorderSize },
            { translateY: -handleBorderSize },
        ],
    },
    'right-center': {
        right: 0,
        top: '50%',
        borderRightWidth: handleBorderSize,
        transform: [{ translateY: '-50%' }],
    },
    'bottom-right': {
        right: 0,
        bottom: 0,
        borderRightWidth: handleBorderSize,
        borderBottomWidth: handleBorderSize,
        transform: [
            { translateY: handleBorderSize },
            { translateX: handleBorderSize },
        ],
    },
    'bottom-center': {
        bottom: 0,
        left: '50%',
        borderBottomWidth: handleBorderSize,
        transform: [{ translateY: handleBorderSize }, { translateX: '-50%' }],
    },
    'bottom-left': {
        bottom: 0,
        borderBottomWidth: handleBorderSize,
        borderLeftWidth: handleBorderSize,
        transform: [
            { translateY: handleBorderSize },
            { translateX: -handleBorderSize },
        ],
    },
    'left-center': {
        left: 0,
        top: '50%',
        borderLeftWidth: handleBorderSize,
        transform: [{ translateY: '-50%' }, { translateX: -handleBorderSize }],
    },
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ResizeHandle: FC<Props> = ({ type, onPressIn }) => {
    const handleStyles = {
        ...baseStyles,
        ...(sizeSpecificStyles[type] as object),
    }
    return <AnimatedPressable onPressIn={()=>onPressIn(type)} style={handleStyles} />
}

export default ResizeHandle
