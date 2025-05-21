// src/components/WeatherIcon.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { JSX } from 'react/jsx-runtime';

interface WeatherIconProps {
  iconCode: string;  // OpenWeatherMap kodu, örn. '01d'
  size?: number;
}

const emojiMap: Record<string, string> = {
  '01d': '☀️',
  '01n': '🌕',
  '02d': '⛅️',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌦️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
};

export default function WeatherIcon({
  iconCode,
  size = 40,
}: WeatherIconProps): JSX.Element {
  const emoji = emojiMap[iconCode] || '❓';
  return <Text style={[styles.icon, { fontSize: size }]}>{emoji}</Text>;
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    lineHeight: 40, // küçük ayar, gerekirse fontSize ile eşitle
  },
});
