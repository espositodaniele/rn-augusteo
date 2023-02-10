import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Archivo-Regular': require('./assets/fonts/Archivo-Regular.ttf'),
        'Archivo-Bold': require('./assets/fonts/Archivo-Bold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
