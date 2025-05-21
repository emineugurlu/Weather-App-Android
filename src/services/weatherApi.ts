// src/services/weatherApi.ts

import { OPEN_WEATHER_MAP_API_KEY } from '../config/apiKey';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherResponse {
  coord: { lon: number; lat: number };
  weather: { description: string; icon: string }[];
  main: { temp: number; temp_min: number; temp_max: number; };
  name: string;
  // (ihtiyaç varsa diğer alanları da ekleyebilirsin)
}

export interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp_min: number; temp_max: number };
    weather: { description: string; icon: string }[];
  }[];
  // (ihtiyaç varsa diğer alanları da ekleyebilirsin)
}

/**
 * Şehir adına göre anlık hava durumu.
 */
export async function fetchCurrentWeather(city: string): Promise<WeatherResponse> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

/**
 * Şehir adına göre 5 günlük tahmin.
 */
export async function fetchForecast(city: string): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);
  return res.json();
}

/**
 * Enlem/boylam bilgisinden anlık hava durumu.
 */
export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}
