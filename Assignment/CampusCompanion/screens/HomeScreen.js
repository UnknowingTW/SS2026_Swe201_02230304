import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/data';

const { width } = Dimensions.get('window');

// Quick-access cards shown on the home screen
const QUICK_LINKS = [
  { label: 'Contacts', icon: 'call', screen: 'Contacts', color: '#2B6CB0' },
  { label: 'Schedule', icon: 'calendar', screen: 'Schedule', color: '#276749' },
  { label: 'Notices', icon: 'notifications', screen: 'Notices', color: '#9B2C2C' },
  { label: 'Campus Map', icon: 'map', screen: 'MapLinks', color: '#744210' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  // Navigate to the correct tab or stack screen
  const handleQuickLink = (screen) => {
    if (screen === 'MapLinks') {
      navigation.navigate('MapLinks');
    } else {
      navigation.navigate(screen);
    }
  };

  // Dynamically size card so two fit per row with some margin
  const cardSize = (width - 48) / 2;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header banner */}
      <View style={styles.header}>
        <Text style={styles.collegeName}>CST — Royal University of Bhutan</Text>
        <Text style={styles.appTitle}>Campus Companion</Text>
        <Text style={styles.subtitle}>Your one-stop campus guide</Text>
      </View>

      {/* Welcome card */}
      <View style={styles.welcomeCard}>
        <Ionicons name="school" size={28} color={COLORS.secondary} />
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>Welcome, Student!</Text>
          <Text style={styles.welcomeBody}>
            Access contacts, timetables, notices, and campus resources all in one place.
          </Text>
        </View>
      </View>

      {/* Quick access section */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.gridContainer}>
        {QUICK_LINKS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.gridCard, { width: cardSize, backgroundColor: item.color }]}
            onPress={() => handleQuickLink(item.screen)}
            activeOpacity={0.85}
          >
            <Ionicons name={item.icon} size={32} color={COLORS.white} />
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info footer */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={18} color={COLORS.textMid} />
        <Text style={styles.infoText}>
          {/* Platform-specific message */}
          {Platform.select({
            ios: 'Running on iOS — swipe gestures enabled.',
            android: 'Running on Android — use back button to navigate.',
            default: 'Campus Companion v1.0.0',
          })}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  collegeName: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  appTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  welcomeCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  welcomeText: {
    flex: 1,
    marginLeft: 12,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  welcomeBody: {
    fontSize: 13,
    color: COLORS.textMid,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 16,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  gridLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 30,
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textMid,
    flex: 1,
  },
});
