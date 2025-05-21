// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, darkTheme } from '../src/config/theme';

import CurrentWeatherScreen from '../src/screens/CurrentWeatherScreen';
import ForecastScreen       from '../src/screens/ForecastScreen';
import FavoritesScreen      from '../src/screens/FavoritesScreen';

export type RootStackParamList = {
  Current:   undefined;
  Forecast:  { city: string };
  Favorites: undefined;        // ← Burayı ekledik
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
            options={({ navigation }) => ({
              title: 'Anlık Hava',
              headerRight: () => (
                <Button
                  title="★"
                  onPress={() => navigation.navigate('Favorites')}
                  color="#fff"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Forecast"
            component={ForecastScreen}
            options={{ title: '5 Günlük Tahmin' }}
          />
          <Stack.Screen
            name="Favorites"                // ← ve burada
            component={FavoritesScreen}
            options={{ title: 'Favori Şehirler' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
