import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from '../screens/MainScreen'
import Header from '../components/common/headerComponent'

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='AddTodo'
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='main'
                    component={MainScreen}
                    options={{title:"Main Screen"}}
                 />
                {/* 
                <Stack.Screen
                    name='AddTodo'
                    component={AddTodo}
                    options={{ title: 'AddTodo' }}
                />
                <Stack.Screen
                    name='EditTodo'
                    component={EditTodo}
                    options={{ title: 'EditTodo' }}
                />
                <Stack.Screen
                    name='ViewTodos'
                    component={ViewTodos}
                    options={{ title: 'ViewTodos' }}
                />
 */}
        </Stack.Navigator>
    </NavigationContainer>)
}
