// src/screens/CurrentWeatherScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { fetchCurrentWeather } from '../services/weatherApi';
import WeatherIcon from '../components/WeatherIcon';

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default function CurrentWeatherScreen({ city = 'Istanbul' }) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentWeather(city)
      .then(data => setWeather(data))
      .catch(err => Alert.alert('Hata', err.message))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text>Veri yok</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Büyük ikon */}
      <WeatherIcon iconCode={weather.weather[0].icon} size={120} />
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
  city:      { fontSize: 32, fontWeight: 'bold', marginTop: 8 },
  temp:      { fontSize: 48, marginVertical: 10 },
  desc:      { fontSize: 20, fontStyle: 'italic' },
});
