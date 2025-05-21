// src/screens/ForecastScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchForecast } from '../services/weatherApi';
import WeatherIcon from '../components/WeatherIcon';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Forecast'>;

interface ForecastItem {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
}

export default function ForecastScreen({ navigation }: Props) {
  const [list, setList] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const city = 'Istanbul';

  useEffect(() => {
    fetchForecast(city)
      .then(data => {
        const daily = data.list
          .filter((_: any, i: number) => i % 8 === 0)
          .slice(0, 5) as ForecastItem[];
        setList(daily);
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
        const dateObj = new Date(item.dt_txt);
        const formattedDate = new Intl.DateTimeFormat('tr-TR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(dateObj);

        return (
          <View style={styles.card}>
            <View style={styles.row}>
              <WeatherIcon iconCode={item.weather[0].icon} size={60} />
              <View style={styles.texts}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.temp}>
                  {Math.round(item.main.temp_min)}°C - {Math.round(item.main.temp_max)}°C
                </Text>
                <Text style={styles.desc}>{item.weather[0].description}</Text>
              </View>
            </View>
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
    minHeight: 80,
  },
  row:   { flexDirection: 'row', alignItems: 'center' },
  texts: { marginLeft: 12, flex: 1 },
  date:  { fontSize: 18, fontWeight: 'bold' },
  temp:  { fontSize: 16, marginVertical: 4 },
  desc:  { fontStyle: 'italic' },
});
