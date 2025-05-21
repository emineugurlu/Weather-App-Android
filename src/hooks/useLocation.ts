// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export function useLocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    async function request() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('İzin reddedildi', 'Konum izni verilmedi.');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setCoords({ lat: latitude, lon: longitude }),
        err => Alert.alert('Konum hatası', err.message),
        { enableHighAccuracy: true, timeout: 15000 }
      );
    }
    request();
  }, []);

  return coords;
}
