import { FC, useState } from 'react'
import FormInput from '../components/FormInput.tsx'
import FormContainer from '../components/FormContainer.tsx'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { AuthStackNavigator } from './SignInScreen.tsx'
import { AxiosError } from 'axios'
import ErrorMessage from '../components/ErrorMessage.tsx'
import client from '../api/Client.ts'
import { useAuth } from '../context/AuthProvider.tsx'

interface Props {}
export type errorType = Record<string, string[] | undefined>

const SignUpScreen: FC<Props> = () => {
    const [signUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState<errorType>({})
    const [error, setError] = useState('')

    const navigation = useNavigation<NavigationProp<AuthStackNavigator>>()
    const { login } = useAuth()

    const handleSubmit = async () => {
        setError('')
        setErrors({})
        try {
            await client.post(`/auth/sign-up`, signUpInfo)
            await login({ email: signUpInfo.email, password: signUpInfo.password })
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

    return (
        <FormContainer
            btnTitle={'Sign Up'}
            navLinkTitle={`Already have an account? sign in`}
            onSubmit={handleSubmit}
            onNavLinkPress={() => navigation.navigate('SignInScreen')}>
            {error ? <ErrorMessage size={18} message={error} /> : null}
            <FormInput
                label={'Name'}
                placeholder={'John Doe'}
                errors={errors.name}
                onChangeText={name => setSignUpInfo({ ...signUpInfo, name })}
            />
            <FormInput
                label={'Email'}
                placeholder={'email@example.com'}
                autoCapitalize={'none'}
                errors={errors.email}
                keyboardType={'email-address'}
                onChangeText={email => setSignUpInfo({ ...signUpInfo, email })}
            />
            <FormInput
                label={'Password'}
                placeholder={'******'}
                secureTextEntry={true}
                errors={errors.password}
                autoCapitalize={'none'}
                onChangeText={password =>
                    setSignUpInfo({ ...signUpInfo, password })
                }
            />
        </FormContainer>
    )
}

export default SignUpScreen
