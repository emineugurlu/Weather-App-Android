// src/components/WeatherIcon.tsx
import React, { JSX } from 'react';
import { Image, StyleSheet } from 'react-native';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
}

export default function WeatherIcon({
  iconCode,
  size = 80,
}: WeatherIconProps): JSX.Element {
  const uri = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <Image source={{ uri }} style={[styles.icon, { width: size, height: size }]} />;
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});
