// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, darkTheme } from '../src/config/theme';

import CurrentWeatherScreen from '../src/screens/CurrentWeatherScreen';
import ForecastScreen        from '../src/screens/ForecastScreen';

export type RootStackParamList = {
  Current:  undefined;
  Forecast: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme === darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Current"
          screenOptions={{
            headerStyle:    { backgroundColor: theme.primary },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen
            name="Current"
            component={CurrentWeatherScreen}
            options={{ title: 'Anlık Hava' }}
          />
          <Stack.Screen
            name="Forecast"
            component={ForecastScreen}
            options={{ title: '5 Günlük Tahmin' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
