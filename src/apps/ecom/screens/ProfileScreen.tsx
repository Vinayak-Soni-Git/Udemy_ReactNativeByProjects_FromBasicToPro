import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../context/AuthProvider.tsx'

interface Props {}

const ProfileScreen: FC<Props> = () => {
    const { logout } = useAuth()
    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image source={{ uri: '' }} style={styles.profileImage} />
            </View>
            <Text style={styles.userName}></Text>

            <Pressable style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileImageContainer: {
        alignSelf: 'center',
        borderWidth: 6,
        borderColor: 'gray',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileImage: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    userName: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    logoutButton: {
        alignSelf: 'center',
        paddingTop: 5,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
})

export default ProfileScreen
