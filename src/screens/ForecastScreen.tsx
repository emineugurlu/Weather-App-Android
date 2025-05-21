// src/screens/ForecastScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchForecast }        from '../services/weatherApi';
import WeatherIcon              from '../components/WeatherIcon';
import { RootStackParamList }   from '../App';
import { useTheme }             from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Forecast'>;

interface ForecastItem {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
}

export default function ForecastScreen({ route }: Props) {
  const theme = useTheme();
  const city = route.params.city;
  const [list, setList]       = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = useCallback(async () => {
    try {
      const data = await fetchForecast(city);
      const daily = (data.list as any[])
        .filter((_: any, i: number) => i % 8 === 0)
        .slice(0, 5) as ForecastItem[];
      setList(daily);
    } catch (err: any) {
      Alert.alert('Hata', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [city]);

  useEffect(() => {
    setLoading(true);
    loadForecast();
  }, [city, loadForecast]);

  const onRefresh = () => {
    setRefreshing(true);
    loadForecast();
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      data={list}
      keyExtractor={item => item.dt_txt}
      contentContainerStyle={styles.container}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => {
        const dateObj = new Date(item.dt_txt);
        const formattedDate = new Intl.DateTimeFormat('tr-TR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(dateObj);

        return (
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.row}>
              <WeatherIcon iconCode={item.weather[0].icon} size={60} />
              <View style={styles.texts}>
                <Text style={[styles.date, { color: theme.text }]}>
                  {formattedDate}
                </Text>
                <Text style={[styles.temp, { color: theme.text }]}>
                  {Math.round(item.main.temp_min)}°C - {Math.round(item.main.temp_max)}°C
                </Text>
                <Text style={[styles.desc, { color: theme.secondaryText }]}>
                  {item.weather[0].description}
                </Text>
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
    borderRadius: 8,
    minHeight: 80,
  },
  row:   { flexDirection: 'row', alignItems: 'center' },
  texts: { marginLeft: 12, flex: 1 },
  date:  { fontSize: 18, fontWeight: 'bold' },
  temp:  { fontSize: 16, marginVertical: 4 },
  desc:  { fontStyle: 'italic' },
});
