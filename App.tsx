import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './lib/core/redux/store';
import HomeScreen from './lib/ui/screens/HomeScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from './lib/ui/screens/MapScreen';
import {KeyboardAvoidingView, Platform} from 'react-native';
import requestLocationPermission from './lib/utils/requestPermision';
export default function App() {
  const Stack = createNativeStackNavigator();
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
