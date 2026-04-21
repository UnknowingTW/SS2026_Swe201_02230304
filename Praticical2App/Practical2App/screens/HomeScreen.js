import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Practical 2 App</Text>
      <Text style={styles.paragraph}>
        This app demonstrates navigation and passing params between screens.
      </Text>

      <View style={styles.buttonRow}>
        <Button
          title="Go to Details (with params)"
          onPress={() => navigation.navigate('Details', { itemId: 42, message: 'Hello from Home' })}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Open Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
  },
  buttonRow: {
    marginTop: 12,
  },
});
