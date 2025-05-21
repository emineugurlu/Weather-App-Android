// src/screens/CurrentWeatherScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchCurrentWeather } from '../services/weatherApi';
import WeatherIcon            from '../components/WeatherIcon';
import { RootStackParamList } from '../App';
import { useTheme }           from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Current'>;

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default function CurrentWeatherScreen({ navigation }: Props) {
  const theme = useTheme();
  const [inputCity, setInputCity]   = useState('Istanbul');
  const [city, setCity]             = useState('Istanbul');
  const [weather, setWeather]       = useState<WeatherResponse | null>(null);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadWeather = useCallback(async () => {
    try {
      const data = await fetchCurrentWeather(city);
      setWeather(data);
    } catch (err: any) {
      Alert.alert('Hata', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [city]);

  useEffect(() => {
    setLoading(true);
    loadWeather();
  }, [city, loadWeather]);

  const onRefresh = () => {
    setRefreshing(true);
    loadWeather();
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.primary}
        />
      }
    >
      <View style={styles.searchRow}>
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.primary, color: theme.text },
          ]}
          value={inputCity}
          onChangeText={setInputCity}
          placeholder="Şehir girin"
          placeholderTextColor={theme.secondaryText}
        />
        <Button
          title="Ara"
          onPress={() => setCity(inputCity.trim())}
          color={theme.primary}
        />
      </View>

      {weather ? (
        <>
          <WeatherIcon iconCode={weather.weather[0].icon} size={120} />
          <Text style={[styles.city, { color: theme.text }]}>
            {weather.name}
          </Text>
          <Text style={[styles.temp, { color: theme.text }]}>
            {Math.round(weather.main.temp)}°C
          </Text>
          <Text style={[styles.desc, { color: theme.secondaryText }]}>
            {weather.weather[0].description}
          </Text>
          <Button
            title="5 Günlük Tahmin"
            onPress={() => navigation.navigate('Forecast', { city })}
            color={theme.primary}
          />
        </>
      ) : (
        <Text style={[styles.noData, { color: theme.secondaryText }]}>
          Veri yok
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { flexGrow: 1, padding: 16 },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchRow:   { flexDirection: 'row', marginBottom: 16 },
  input:       {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 40,
  },
  city:        { fontSize: 32, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  temp:        { fontSize: 48, marginVertical: 10, textAlign: 'center' },
  desc:        { fontSize: 20, fontStyle: 'italic', textAlign: 'center', marginBottom: 16 },
  noData:      { textAlign: 'center', marginTop: 20 },
});
