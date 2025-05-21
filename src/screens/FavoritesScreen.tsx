// src/screens/FavoritesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFavorites }         from '../config/favorites';
import { RootStackParamList }   from '../App';  // ← iki seviye çıkıyoruz

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites, remove } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Henüz favori yok.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.city}>{item}</Text>
          <Button
            title="Sil"
            onPress={() =>
              Alert.alert(
                'Kaldır',
                `${item} favorilerden kaldırılsın mı?`,
                [
                  { text: 'İptal', style: 'cancel' },
                  { text: 'Evet',  onPress: () => remove(item) },
                ]
              )
            }
            color="#d11a2a"
          />
          <Button
            title="Git"
            onPress={() => navigation.navigate('Current')}  // ← boş obje yok
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    marginBottom:   12,
    justifyContent: 'space-between',
  },
  city: { fontSize: 18 },
});
