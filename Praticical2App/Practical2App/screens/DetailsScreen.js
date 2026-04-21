import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ navigation, route }) {
  const { itemId, message } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.paragraph}>Item ID: {itemId ?? 'N/A'}</Text>
      <Text style={styles.paragraph}>Message: {message ?? 'No message'}</Text>

      <View style={styles.buttonRow}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  buttonRow: {
    marginTop: 12,
  },
});
