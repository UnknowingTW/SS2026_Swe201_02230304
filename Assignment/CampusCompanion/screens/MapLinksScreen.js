import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAP_LINKS, COLORS } from '../constants/data';

export default function MapLinksScreen() {
  const handleOpen = (url, label) => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', `Could not open map for ${label}.`)
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleOpen(item.url, item.label)}
      activeOpacity={0.8}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={item.icon} size={22} color={COLORS.primary} />
      </View>
      <Text style={styles.cardLabel}>{item.label}</Text>
      <Ionicons name="open-outline" size={18} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Info banner */}
      <View style={styles.banner}>
        <Ionicons name="map" size={28} color={COLORS.secondary} />
        <Text style={styles.bannerText}>
          Tap a location below to view it on Google Maps.
        </Text>
      </View>

      <FlatList
        data={MAP_LINKS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    gap: 12,
  },
  bannerText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    lineHeight: 18,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
