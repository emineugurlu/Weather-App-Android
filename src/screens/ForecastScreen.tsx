import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { fetchForecast } from '../services/weatherApi';

interface ForecastItem {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { description: string }[];
}

export default function ForecastScreen({ city = 'Istanbul' }) {
  const [list, setList] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecast(city)
      .then(data => {
        // Her 8. öğeyi alarak 5 günlük baz tahmin elde ediyoruz
        const daily = data.list.filter(
          (_: any, i: number) => i % 8 === 0
        ) as ForecastItem[];
        setList(daily.slice(0, 5));
      })
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

  return (
    <FlatList
      data={list}
      keyExtractor={item => item.dt_txt}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const date = item.dt_txt.split(' ')[0];
        return (
          <View style={styles.card}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.temp}>
              {Math.round(item.main.temp_min)}°C -{' '}
              {Math.round(item.main.temp_max)}°C
            </Text>
            <Text style={styles.desc}>{item.weather[0].description}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card:      {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  date:      { fontSize: 18, fontWeight: 'bold' },
  temp:      { fontSize: 16, marginVertical: 4 },
  desc:      { fontStyle: 'italic' },
});
