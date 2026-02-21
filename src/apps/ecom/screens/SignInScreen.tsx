import { FC, useState } from 'react'
import FormInput from '../components/FormInput.tsx'
import FormContainer from '../components/FormContainer.tsx'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { errorType } from './SignUpScreen.tsx'
import { AxiosError } from 'axios'
import ErrorMessage from '../components/ErrorMessage.tsx'
import { useAuth } from '../context/AuthProvider.tsx'

interface Props {}

export type AuthStackNavigator = {
    SignInScreen: undefined
    SignUpScreen: undefined
    HomeScreen: { profile: { name: string; email: string } }
}

const SignInScreen: FC<Props> = () => {
    const [signInInfo, setSignInInfo] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState<errorType>({})
    const [error, setError] = useState('')
    const {login} = useAuth()

    const handleSubmit = async () => {
        setError('')
        setErrors({})
        try {
            await login(signInInfo)
        } catch (error) {
            if (error instanceof AxiosError) {
                const responseData = error.response?.data
                if (responseData.errors) {
                    setErrors(error.response?.data.errors)
                }
                if (responseData.error) {
                    setError(responseData.error)
                }
            }
        }
    }

    const navigation = useNavigation<NavigationProp<AuthStackNavigator>>()
    return (
        <FormContainer
            btnTitle={'Sign In'}
            navLinkTitle={`Don't have an account? create one`}
            onNavLinkPress={() => navigation.navigate('SignUpScreen')}
            onSubmit={handleSubmit}>
            {error ? <ErrorMessage message={error} size={18} /> : null}
            <FormInput
                label={'Email'}
                placeholder={'email@example.com'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                errors={errors.email}
                onChangeText={email => setSignInInfo({ ...signInInfo, email })}
            />
            <FormInput
                label={'Password'}
                placeholder={'******'}
                secureTextEntry={true}
                autoCapitalize={'none'}
                errors={errors.password}
                onChangeText={password =>
                    setSignInInfo({ ...signInInfo, password })
                }
            />
        </FormContainer>
    )
}

export default SignInScreen
