// src/screens/TaskDetailScreen.tsx
// Full details for a selected task
// Animations: hero slide-up entrance, tag bounce, completion confetti scale

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { Task } from '../data/mockData';
import AnimatedButton from '../components/AnimatedButton';

const PRIORITY_COLORS: Record<string, string> = {
  High: COLORS.danger,
  Medium: COLORS.accent,
  Low: COLORS.success,
};
const PRIORITY_BG: Record<string, string> = {
  High: COLORS.dangerSoft,
  Medium: COLORS.accentSoft,
  Low: COLORS.successSoft,
};

const TaskDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const task: Task = route.params?.task;

  const [completed, setCompleted] = useState(task?.completed ?? false);

  // Entrance animations
  const headerAnim = useRef(new Animated.Value(-60)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const bodyAnim = useRef(new Animated.Value(50)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  // Completion scale pulse
  const completedScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
      Animated.timing(headerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.spring(bodyAnim, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 4 }),
        Animated.timing(bodyOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    }, 150);
  }, []);

  const handleComplete = () => {
    setCompleted((prev) => !prev);
    Animated.sequence([
      Animated.spring(completedScale, { toValue: 1.15, useNativeDriver: true, speed: 50 }),
      Animated.spring(completedScale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 14 }),
    ]).start();
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: SPACING.base, color: COLORS.textSecondary }}>
          No task selected.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Hero header ── */}
        <Animated.View
          style={[
            {
              opacity: headerOpacity,
              transform: [{ translateY: headerAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[task.subjectColor, task.subjectColor + 'CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            {/* Back button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color={COLORS.white} />
            </TouchableOpacity>

            {/* Subject badge */}
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectBadgeText}>{task.subject}</Text>
            </View>

            <Text style={styles.heroTitle}>{task.title}</Text>

            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroMetaText}>{task.dueDate} · {task.dueTime}</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <Ionicons name="hourglass-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroMetaText}>{task.estimatedMinutes} min</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── Body ── */}
        <Animated.View
          style={[
            styles.body,
            { opacity: bodyOpacity, transform: [{ translateY: bodyAnim }] },
          ]}
        >
          {/* Priority + completion status */}
          <View style={styles.statusRow}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: PRIORITY_BG[task.priority] },
              ]}
            >
              <View
                style={[styles.priorityDot, { backgroundColor: PRIORITY_COLORS[task.priority] }]}
              />
              <Text style={[styles.priorityText, { color: PRIORITY_COLORS[task.priority] }]}>
                {task.priority} Priority
              </Text>
            </View>

            <Animated.View style={{ transform: [{ scale: completedScale }] }}>
              <TouchableOpacity
                style={[
                  styles.completedBadge,
                  completed
                    ? { backgroundColor: COLORS.successSoft }
                    : { backgroundColor: COLORS.borderLight },
                ]}
                onPress={handleComplete}
              >
                <Ionicons
                  name={completed ? 'checkmark-circle' : 'ellipse-outline'}
                  size={18}
                  color={completed ? COLORS.success : COLORS.textMuted}
                />
                <Text
                  style={[
                    styles.completedText,
                    { color: completed ? COLORS.success : COLORS.textMuted },
                  ]}
                >
                  {completed ? 'Completed' : 'Mark Done'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Description */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tags</Text>
            <View style={styles.tagsRow}>
              {task.tags.map((tag, i) => (
                <View
                  key={i}
                  style={[styles.tag, { backgroundColor: task.subjectColor + '18' }]}
                >
                  <Text style={[styles.tagText, { color: task.subjectColor }]}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Time estimate */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Time Estimate</Text>
            <View style={styles.timeRow}>
              <Ionicons name="timer-outline" size={20} color={task.subjectColor} />
              <Text style={styles.timeText}>
                {task.estimatedMinutes >= 60
                  ? `${Math.floor(task.estimatedMinutes / 60)}h ${task.estimatedMinutes % 60}m`
                  : `${task.estimatedMinutes} minutes`}
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <AnimatedButton
              title={completed ? '✓ Completed' : 'Mark as Complete'}
              onPress={handleComplete}
              color={completed ? COLORS.success : task.subjectColor}
              style={{ flex: 1 }}
            />
          </View>
          <View style={styles.actions}>
            <AnimatedButton
              title="Go Back"
              onPress={() => navigation.goBack()}
              variant="outline"
              color={task.subjectColor}
              style={{ flex: 1 }}
            />
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: SPACING.xxxl },

  hero: {
    paddingTop: 60,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.base,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: SPACING.base,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  subjectBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 30,
    marginBottom: SPACING.md,
  },
  heroMeta: { flexDirection: 'row', gap: SPACING.base },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroMetaText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },

  body: { padding: SPACING.base, gap: SPACING.md },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  priorityText: { fontSize: FONTS.sizes.sm, fontWeight: '700' },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  completedText: { fontSize: FONTS.sizes.sm, fontWeight: '700' },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    ...SHADOWS.sm,
  },
  cardTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  description: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  tagText: { fontSize: FONTS.sizes.sm, fontWeight: '600' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  timeText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actions: { marginTop: SPACING.xs },
});

export default TaskDetailScreen;
