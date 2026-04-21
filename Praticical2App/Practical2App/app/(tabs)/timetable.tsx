import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

const sampleTimetable = {
  Monday: [
    { id: 'm1', time: '09:00', title: 'Mathematics', room: 'A1' },
    { id: 'm2', time: '11:00', title: 'Physics', room: 'B3' },
  ],
  Tuesday: [
    { id: 't1', time: '10:00', title: 'Chemistry', room: 'C2' },
  ],
  Wednesday: [
    { id: 'w1', time: '09:00', title: 'English', room: 'D4' },
    { id: 'w2', time: '13:00', title: 'History', room: 'E5' },
  ],
  Thursday: [],
  Friday: [
    { id: 'f1', time: '12:00', title: 'Computer Lab', room: 'L1' },
  ],
};

export default function TimetableScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  const entries = Object.entries(sampleTimetable) as [string, { id: string; time: string; title: string; room: string }[]][];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Weekly Timetable</ThemedText>
        <ThemedText type="subtitle">Tap a class to see details</ThemedText>

        {isWide ? (
          <View style={styles.grid}>
            {entries.map(([day, items]) => (
              <View key={day} style={styles.column}>
                <Text style={styles.dayHeader}>{day}</Text>
                {items.length === 0 && <Text style={styles.empty}>No classes</Text>}
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={{ pathname: '/details', params: { ...item, day } }}
                    style={styles.cardLink}
                  >
                    <TouchableOpacity style={styles.card}>
                      <Text style={styles.cardTime}>{item.time}</Text>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardRoom}>{item.room}</Text>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.stack}>
            {entries.map(([day, items]) => (
              <View key={day} style={styles.daySection}>
                <Text style={styles.dayHeader}>{day}</Text>
                {items.length === 0 && <Text style={styles.empty}>No classes</Text>}
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={{ pathname: '/details', params: { ...item, day } }}
                    style={styles.cardLink}
                  >
                    <TouchableOpacity style={styles.card}>
                      <View style={styles.rowTop}>
                        <Text style={styles.cardTime}>{item.time}</Text>
                        <Text style={styles.cardRoom}>{item.room}</Text>
                      </View>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            ))}
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { padding: 16 },
  grid: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  column: { flex: 1, minWidth: 140 },
  stack: { flexDirection: 'column', gap: 12 },
  daySection: { marginBottom: 12 },
  dayHeader: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  empty: { color: '#666', fontSize: 13, marginBottom: 8 },
  cardLink: { textDecorationLine: 'none' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardTime: { fontSize: 13, color: '#2563eb', fontWeight: '700' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  cardRoom: { fontSize: 12, color: '#6b7280' },
});
