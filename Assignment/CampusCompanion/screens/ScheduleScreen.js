import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TIMETABLE, COLORS } from '../constants/data';

const { width } = Dimensions.get('window');

// Color per subject code for visual distinction
const SUBJECT_COLORS = {
  SWE201: '#2B6CB0',
  SWE201L: '#2C5282',
  SWE202: '#276749',
  CS301: '#744210',
  CS301L: '#975A16',
  CS401: '#702459',
  CS401L: '#97266D',
};

export default function ScheduleScreen() {
  // Track which day tab is selected; default to today or Monday
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const defaultDay = TIMETABLE.find((t) => t.day === today) ? today : 'Monday';
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const dayData = TIMETABLE.find((t) => t.day === selectedDay);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <Text style={styles.headerSubtitle}>Year 3 — Semester 2, 2026</Text>
      </View>

      {/* Day selector tabs — scrollable horizontally for small screens */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayTabsContainer}
        contentContainerStyle={styles.dayTabsContent}
      >
        {TIMETABLE.map((item) => {
          const isSelected = item.day === selectedDay;
          const isToday = item.day === today;
          return (
            <TouchableOpacity
              key={item.day}
              style={[styles.dayTab, isSelected && styles.dayTabSelected]}
              onPress={() => setSelectedDay(item.day)}
              activeOpacity={0.8}
            >
              {/* Mark today with a dot */}
              {isToday && <View style={styles.todayDot} />}
              <Text style={[styles.dayTabText, isSelected && styles.dayTabTextSelected]}>
                {item.day.substring(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Classes for selected day */}
      <ScrollView style={styles.classesContainer} showsVerticalScrollIndicator={false}>
        {dayData && dayData.classes.length > 0 ? (
          dayData.classes.map((cls, index) => (
            <View key={index} style={styles.classCard}>
              {/* Left color strip per subject */}
              <View
                style={[
                  styles.colorStrip,
                  { backgroundColor: SUBJECT_COLORS[cls.code] || COLORS.primary },
                ]}
              />
              <View style={styles.classInfo}>
                <Text style={styles.classTime}>{cls.time}</Text>
                <Text style={styles.className}>{cls.subject}</Text>
                <View style={styles.classMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={12} color={COLORS.textLight} />
                    <Text style={styles.metaText}>{cls.room}</Text>
                  </View>
                  <View
                    style={[
                      styles.codeBadge,
                      { backgroundColor: SUBJECT_COLORS[cls.code] || COLORS.primary },
                    ]}
                  >
                    <Text style={styles.codeText}>{cls.code}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          // Empty state
          <View style={styles.emptyState}>
            <Ionicons name="sunny-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No classes on {selectedDay}</Text>
          </View>
        )}
        <View style={styles.bottomPad} />
      </ScrollView>
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
  dayTabsContainer: {
    backgroundColor: COLORS.primary,
    maxHeight: 60,
  },
  dayTabsContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
    flexDirection: 'row',
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    minWidth: 56,
  },
  dayTabSelected: {
    backgroundColor: COLORS.secondary,
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginBottom: 2,
  },
  dayTabText: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    fontSize: 13,
  },
  dayTabTextSelected: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  classesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  classCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  colorStrip: {
    width: 5,
    backgroundColor: COLORS.primary,
  },
  classInfo: {
    flex: 1,
    padding: 14,
  },
  classTime: {
    fontSize: 12,
    color: COLORS.textMid,
    fontWeight: '600',
    marginBottom: 4,
  },
  className: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  classMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  codeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  bottomPad: {
    height: 20,
  },
});
