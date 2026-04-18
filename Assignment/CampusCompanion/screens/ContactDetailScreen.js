import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/data';

export default function ContactDetailScreen({ route }) {
  // Retrieve the contact object passed via navigation params
  const { contact } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`).catch(() =>
      Alert.alert('Error', 'Unable to open the dialer.')
    );
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contact.email}`).catch(() =>
      Alert.alert('Error', 'Unable to open the email client.')
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar / icon section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <Ionicons name={contact.icon} size={48} color={COLORS.white} />
        </View>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactRole}>{contact.role}</Text>
      </View>

      {/* Detail rows */}
      <View style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={20} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{contact.phone}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{contact.email}</Text>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Ionicons name="call" size={20} color={COLORS.white} />
        <Text style={styles.buttonText}>Call Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
        <Ionicons name="mail" size={20} color={COLORS.primary} />
        <Text style={styles.emailButtonText}>Send Email</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 40,
  },
  avatarSection: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  contactName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  detailCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 14,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '600',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 2,
  },
  emailButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});
