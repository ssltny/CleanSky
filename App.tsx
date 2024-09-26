/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { LoginScreen } from "./src/screens/Login.js";
import { CleanerScreen } from './src/screens/Cleaner.js';

export const ThemeContext = createContext();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

    const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode}} >
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={ LoginScreen } />
                    <Stack.Screen name="Cleaner" component={ CleanerScreen } />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    );
}

export default App;
