// src/components/WeatherIcon.tsx
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

export type WeatherIconProps = {
  iconCode: string;      // örn. "01d", "03n", vb.
  size?: number;
  color?: string;
};

const iconMap: Record<string, string> = {
  // Gündüz
  '01d': 'weather-sunny',
  '02d': 'weather-partly-cloudy',
  '03d': 'weather-cloudy',
  '04d': 'weather-cloudy',        // aşırı bulutlu
  '09d': 'weather-pouring',
  '10d': 'weather-rainy',
  '11d': 'weather-lightning',
  '13d': 'weather-snowy',
  '50d': 'weather-fog',

  // Gece
  '01n': 'weather-night',
  '02n': 'weather-night-partly-cloudy',
  '03n': 'weather-cloudy-night',
  '04n': 'weather-cloudy-night',
  '09n': 'weather-pouring',
  '10n': 'weather-rainy',
  '11n': 'weather-lightning',
  '13n': 'weather-snowy',
  '50n': 'weather-fog',
};

export default function WeatherIcon({
  iconCode,
  size = 80,
  color = '#000',
}: WeatherIconProps) {
  const name = iconMap[iconCode] ?? 'weather-cloudy';
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
  );
}
