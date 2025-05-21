// src/config/theme.ts
import { useColorScheme } from 'react-native';

export interface Theme {
  background: string;
  cardBackground: string;
  text: string;
  secondaryText: string;
  primary: string;
}

export const lightTheme: Theme = {
  background: '#ffffff',
  cardBackground: '#f2f2f2',
  text: '#000000',
  secondaryText: '#444444',
  primary: '#007bff',
};

export const darkTheme: Theme = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  text: '#ffffff',
  secondaryText: '#aaaaaa',
  primary: '#1e90ff',
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
