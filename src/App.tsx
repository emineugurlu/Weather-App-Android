// App.tsx
import React from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import ForecastScreen        from './screens/ForecastScreen';

export type RootStackParamList = {
  Current:  undefined;
  Forecast: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Current">
        <Stack.Screen name="Current"  component={CurrentWeatherScreen} options={{ title: 'Anlık Hava' }} />
        <Stack.Screen name="Forecast" component={ForecastScreen}        options={{ title: '5 Günlük Tahmin' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
