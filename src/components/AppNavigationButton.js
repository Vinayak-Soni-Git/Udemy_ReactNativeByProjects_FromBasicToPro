import React, { useState } from 'react'
import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native'

const OFFSET = 6
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
export default function AppNavigationButton({ title = 'Press Me', onPress, clickIn, clickOut }) {
    const [pressed, setPressed] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.shadow} />
            <Pressable
                onPress={onPress}
                onPressIn={() => {
                    setPressed(true)
                    clickIn()
                }}
                onPressOut={() => {
                    setPressed(false)
                    clickOut()
                }}
                style={[styles.button, pressed && styles.buttonPressed]}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },

    shadow: {
        position: 'absolute',
        backgroundColor: 'black',
        width: screenWidth * 0.7,
        height: '100%',
        top: OFFSET,
        left: OFFSET,
    },

    button: {
        width: screenWidth * 0.7,
        height: screenHeight * 0.05,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    buttonPressed: {
        transform: [{ translateX: OFFSET }, { translateY: OFFSET }],
    },

    text: {
        color: 'black',
        fontFamily:'Orbitron-ExtraBold',
        fontSize: 18,
        textAlign: 'center',
    },
})
