import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FC, ReactNode } from 'react'
import PrimaryButton from '../components/PrimaryButton.tsx'

interface Props {
    children: ReactNode
    btnTitle: string
    navLinkTitle?: string
    onNavLinkPress?():void
    onSubmit?(): void
}

const FormContainer: FC<Props> = ({
    children,
    btnTitle,
    navLinkTitle,
    onNavLinkPress,
    onSubmit,
}) => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to Ecom App</Text>
                    <Text style={styles.subTitle}>Your online store</Text>
                </View>

                {children}

                <PrimaryButton title={btnTitle} onPress={onSubmit} />
                <View style={styles.navLinkContainer}>
                    <Text onPress={onNavLinkPress} style={styles.navLink}>{navLinkTitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        gap: 20,
        marginTop: 150,
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    titleContainer: {
        padding: 10,
    },
    navLinkContainer: {
        marginTop: 'auto',
        paddingVertical: 10,
    },
    navLink: {
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
})

export default FormContainer
