import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApplicationRoutes } from '../constants/Routes'
import Apps from '../Apps'
import { NavigationContainer } from '@react-navigation/native'
import CalculatorApp from '../apps/calculator/CalculatorApp'
import SignInScreen from '../apps/ecom/screens/SignInScreen'
import SignUpScreen from '../apps/ecom/screens/SignUpScreen'
import HomeScreen from '../apps/ecom/screens/HomeScreen'
import EcomAppScreen from '../apps/ecom/screens/EcomAppScreen'

const StackNavigator = createNativeStackNavigator()
export default function RootNavigator() {
    return (
        <NavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={ApplicationRoutes.AppsScreen}>
                <StackNavigator.Screen
                    options={{ headerShown: false }}
                    name={ApplicationRoutes.AppsScreen}
                    component={Apps}
                />
                <StackNavigator.Screen
                    name={ApplicationRoutes.CalculatorApp}
                    component={CalculatorApp}
                />
                <StackNavigator.Screen
                    name={ApplicationRoutes.EcomSignInScreen}
                    component={SignInScreen}
                />
                <StackNavigator.Screen
                    name={ApplicationRoutes.EcomAppScreen}
                    component={EcomAppScreen}
                    options={{headerShown:false}}
                />
                <StackNavigator.Screen
                    name={ApplicationRoutes.EcomSignUpScreen}
                    component={SignUpScreen}
                />
                <StackNavigator.Screen
                    name={ApplicationRoutes.EcomHomeScreen}
                    component={HomeScreen}
                />
            </StackNavigator.Navigator>
        </NavigationContainer>
    )
}
