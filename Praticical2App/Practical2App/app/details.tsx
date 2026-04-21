import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailsRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { title, time, room, day } = params as any;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title ?? 'Class detail'}</Text>
      <Text style={styles.label}>Day: {day ?? '—'}</Text>
      <Text style={styles.label}>Time: {time ?? '—'}</Text>
      <Text style={styles.label}>Room: {room ?? '—'}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 16, marginBottom: 8 },
});
