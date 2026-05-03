// src/components/SubjectCard.tsx
// Card for each subject/category shown on the Tasks screen

import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, FONTS } from '../constants/theme';
import { Subject } from '../data/mockData';
import ProgressBar from './ProgressBar';

interface SubjectCardProps {
  subject: Subject;
  onPress: () => void;
  delay?: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onPress, delay = 0 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progress = subject.taskCount > 0 ? subject.completedCount / subject.taskCount : 0;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 60 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <TouchableOpacity
        style={[styles.card, SHADOWS.sm]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Icon circle */}
        <View style={[styles.iconBg, { backgroundColor: subject.color + '18' }]}>
          <Ionicons name={subject.icon as any} size={22} color={subject.color} />
        </View>

        <Text style={styles.name} numberOfLines={1}>{subject.name}</Text>

        <ProgressBar progress={progress} color={subject.color} height={5} delay={delay} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {subject.completedCount}/{subject.taskCount} tasks
          </Text>
          <Text style={[styles.footerText, { color: subject.color, fontWeight: '600' }]}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    gap: SPACING.sm,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  footerText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
  },
});

export default SubjectCard;
