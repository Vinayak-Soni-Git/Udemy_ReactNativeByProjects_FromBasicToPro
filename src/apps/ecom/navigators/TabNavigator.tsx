import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen.tsx'
import CartScreen from '../screens/CartScreen.tsx'
import ProfileScreen from '../screens/ProfileScreen.tsx'
import FavScreen from '../screens/Fav.tsx'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { View } from 'react-native'
import { ComponentProps } from 'react'

const Tab = createBottomTabNavigator()

type IconName = ComponentProps<typeof FontAwesome>['name']
const renderTab = (iconName: IconName, focused: boolean) => {
    return (
        <View>
            <FontAwesome
                name={iconName}
                size={28}
                color={focused ? 'black' : '#858597'}
            />
        </View>
    )
}

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => renderTab('home', focused),
                    tabBarLabel: () => null,
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        renderTab('shopping-cart', focused),
                    tabBarLabel: () => null,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        renderTab('user-circle', focused),
                    tabBarLabel: () => null,
                }}
            />

            <Tab.Screen
                name="Fav"
                component={FavScreen}
                options={{
                    tabBarIcon: ({ focused }) => renderTab('heart', focused),
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    )
}
