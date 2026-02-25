import React, { FC, useRef, useState } from 'react'
import { View, Image, Pressable, StyleSheet, Animated } from 'react-native'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { BlurView } from '@react-native-community/blur'

interface Props {
    source: string
    onDeleteImage?(): void
    onEditImage?(): void
    onPress?(): void
}

const GridViewImage: FC<Props> = ({
    source,
    onDeleteImage,
    onEditImage,
    onPress,
}) => {
    const [showOverlay, setShowOverlay] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current

    const handleLongPress = () => {
        setShowOverlay(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start()
    }

    const hideOverlay = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setShowOverlay(false))
    }

    return (
        <Pressable
            style={styles.container}
            onLongPress={handleLongPress}
            onPress={onPress}
            delayLongPress={300}>
            <Image source={{ uri: source }} style={styles.image} />

            {showOverlay && (
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="dark"
                        blurAmount={10}
                    />

                    <View style={styles.iconContainer}>
                        <Pressable
                            onPress={onEditImage}
                            style={styles.iconButton}>
                            <FontAwesome name="edit" size={22} color="#fff" />
                        </Pressable>

                        <Pressable
                            onPress={onDeleteImage}
                            style={styles.iconButton}>
                            <FontAwesome name="trash" size={22} color="#fff" />
                        </Pressable>
                    </View>

                    {/* Tap outside to close */}
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={hideOverlay}
                    />
                </Animated.View>
            )}
        </Pressable>
    )
}

export default GridViewImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        flex: 1,
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 25,
        zIndex: 10,
    },
    iconButton: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 12,
        borderRadius: 30,
    },
})
