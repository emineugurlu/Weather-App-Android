// src/services/weatherApi.ts
import { OPEN_WEATHER_MAP_API_KEY } from '../config/apiKey';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city: string) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=tr`
  );
  if (!res.ok) throw new Error('Anlık hava alınamadı');
  return res.json();
}

export async function fetchForecast(city: string) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=tr`
  );
  if (!res.ok) throw new Error('Tahmin verisi alınamadı');
  return res.json();
}
