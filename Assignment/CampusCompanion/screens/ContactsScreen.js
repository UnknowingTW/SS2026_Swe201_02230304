import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CONTACTS, COLORS } from '../constants/data';

export default function ContactsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Filter contacts by search query
  const filteredContacts = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (contact) => {
    setSelectedId(contact.id);
    // Pass contact data as a param to the detail screen (Stack navigator)
    navigation.navigate('ContactDetail', { contact });
  };

  const renderItem = ({ item }) => {
    // Highlight the selected/tapped card with a dynamic style
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handlePress(item)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, isSelected && styles.iconSelected]}>
          <Ionicons name={item.icon} size={22} color={isSelected ? COLORS.white : COLORS.primary} />
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.contactName, isSelected && styles.textSelected]}>{item.name}</Text>
          <Text style={styles.contactRole}>{item.role}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={isSelected ? COLORS.secondary : COLORS.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Screen header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.headerSubtitle}>Important campus contacts</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: -14,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  // Dynamic style: highlight selected card
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.highlight,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconSelected: {
    backgroundColor: COLORS.primary,
  },
  cardContent: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  textSelected: {
    color: COLORS.primary,
  },
  contactRole: {
    fontSize: 12,
    color: COLORS.textMid,
    marginTop: 1,
  },
  contactPhone: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: 40,
    fontSize: 14,
  },
});
