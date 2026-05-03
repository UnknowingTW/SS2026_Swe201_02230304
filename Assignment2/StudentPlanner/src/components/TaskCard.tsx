// src/components/TaskCard.tsx
// Reusable animated task card used on Home and Tasks screens

import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, FONTS } from '../constants/theme';
import { Task } from '../data/mockData';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  index?: number;
}

const PRIORITY_COLORS: Record<string, string> = {
  High: COLORS.danger,
  Medium: COLORS.accent,
  Low: COLORS.success,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onToggle, index = 0 }) => {
  // Scale animation for press feedback
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[styles.card, task.completed && styles.cardCompleted]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Left accent bar */}
        <View style={[styles.accent, { backgroundColor: task.subjectColor }]} />

        {/* Checkbox */}
        <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
          <View
            style={[
              styles.checkCircle,
              task.completed && { backgroundColor: task.subjectColor, borderColor: task.subjectColor },
            ]}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            )}
          </View>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.subjectBadge, { backgroundColor: task.subjectColor + '18' }]}>
              <Text style={[styles.subjectText, { color: task.subjectColor }]}>
                {task.subject}
              </Text>
            </View>
            <View style={styles.dueMeta}>
              <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
              <Text style={styles.dueText}>{task.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* Priority dot + chevron */}
        <View style={styles.right}>
          <View
            style={[styles.priorityDot, { backgroundColor: PRIORITY_COLORS[task.priority] }]}
          />
          <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  accent: {
    width: 4,
    alignSelf: 'stretch',
  },
  checkbox: {
    padding: SPACING.md,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  subjectBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  subjectText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  dueMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dueText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingRight: SPACING.md,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TaskCard;
