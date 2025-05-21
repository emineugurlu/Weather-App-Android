// src/config/favorites.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favCities';

interface FavContextType {
  favorites: string[];
  add: (city: string) => void;
  remove: (city: string) => void;
}

const FavContext = createContext<FavContextType>({
  favorites: [],
  add: () => {},
  remove: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Başlangıçta kayıttan oku
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) setFavorites(JSON.parse(json));
    });
  }, []);

  // Helper: hem state hem storage güncelle
  const persist = (list: string[]) => {
    setFavorites(list);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const add = (city: string) => {
    if (!favorites.includes(city)) {
      persist([...favorites, city]);
    }
  };

  const remove = (city: string) => {
    persist(favorites.filter(c => c !== city));
  };

  return (
    <FavContext.Provider value={{ favorites, add, remove }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFavorites = () => useContext(FavContext);
