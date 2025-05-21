// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CurrentWeatherScreen from './src/screens/CurrentWeatherScreen';
import ForecastScreen from './src/screens/ForecastScreen';

// Navigator’ın kullanacağı ekran isimleri ve parametre tipleri
export type RootStackParamList = {
  Current: undefined;
  Forecast: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Current">
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
  );
}
