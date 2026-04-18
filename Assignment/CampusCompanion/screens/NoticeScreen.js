import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NOTICES, COLORS } from '../constants/data';

// Badge color per notice category
const CATEGORY_COLORS = {
  Exam: '#9B2C2C',
  Facility: '#276749',
  Academic: '#2B6CB0',
  Event: '#744210',
  IT: '#553C9A',
};

export default function NoticeScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    // Toggle expanded state — dynamic style applied to expanded card
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const catColor = CATEGORY_COLORS[item.category] || COLORS.primary;

    return (
      <TouchableOpacity
        style={[styles.card, isExpanded && styles.cardExpanded]}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.85}
      >
        {/* Top row */}
        <View style={styles.cardHeader}>
          {/* Urgent badge */}
          {item.urgent && (
            <View style={styles.urgentBadge}>
              <Ionicons name="alert-circle" size={12} color={COLORS.white} />
              <Text style={styles.urgentText}>Urgent</Text>
            </View>
          )}
          <View style={[styles.categoryBadge, { backgroundColor: catColor }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        <Text style={[styles.noticeTitle, isExpanded && styles.noticeTitleExpanded]}>
          {item.title}
        </Text>
        <View style={styles.dateLine}>
          <Ionicons name="calendar-outline" size={12} color={COLORS.textLight} />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Body — only visible when expanded (dynamic style) */}
        {isExpanded && (
          <Text style={styles.noticeBody}>{item.body}</Text>
        )}

        <View style={styles.expandHint}>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={COLORS.textLight}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notice Board</Text>
        <Text style={styles.headerSubtitle}>Latest campus announcements</Text>
      </View>

      <FlatList
        data={NOTICES}
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
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
  },
  // Dynamic: highlight expanded card with primary border
  cardExpanded: {
    borderLeftColor: COLORS.primary,
    backgroundColor: COLORS.highlight,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53E3E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  urgentText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  noticeTitleExpanded: {
    color: COLORS.primary,
  },
  dateLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  noticeBody: {
    fontSize: 13,
    color: COLORS.textMid,
    lineHeight: 20,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  expandHint: {
    alignItems: 'center',
    marginTop: 8,
  },
});
