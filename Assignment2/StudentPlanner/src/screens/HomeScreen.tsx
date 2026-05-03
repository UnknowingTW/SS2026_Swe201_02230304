// src/screens/HomeScreen.tsx
// Main landing screen with greeting, stats, and today's tasks
// Animations: staggered fade-in on mount for all cards

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { TASKS } from '../data/mockData';
import TaskCard from '../components/TaskCard';

const { width } = Dimensions.get('window');

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [tasks, setTasks] = useState(TASKS);

  // Staggered fade-in animation refs
  const fadeAnims = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;
  const slideAnims = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(30))
  ).current;

  useEffect(() => {
    // Stagger each element's entrance
    const animations = fadeAnims.map((anim, i) =>
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: i * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 500,
          delay: i * 100,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(80, animations).start();
  }, []);

  const animatedStyle = (i: number) => ({
    opacity: fadeAnims[i],
    transform: [{ translateY: slideAnims[i] }],
  });

  const now = new Date();
  const today = now.getDay();
  const todayTasks = tasks.filter((t) => t.dueDate === 'Today');
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const totalPending = tasks.filter((t) => !t.completed).length;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Week strip — highlight today
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - today + i);
    return { label: DAYS[i], date: d.getDate(), isToday: i === today };
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Header ── */}
        <Animated.View style={[styles.header, animatedStyle(0)]}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.name}>Alex Johnson</Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>AJ</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Stats banner ── */}
        <Animated.View style={animatedStyle(1)}>
          <LinearGradient
            colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsBanner}
          >
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalPending}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{completedToday}</Text>
                <Text style={styles.statLabel}>Done Today</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Day Streak 🔥</Text>
              </View>
            </View>
            {/* Date */}
            <Text style={styles.bannerDate}>
              {DAYS[today]}, {now.getDate()} {MONTHS[now.getMonth()]} {now.getFullYear()}
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* ── Week strip ── */}
        <Animated.View style={[styles.weekStrip, animatedStyle(2)]}>
          {weekDays.map((d) => (
            <View
              key={d.label}
              style={[styles.dayItem, d.isToday && styles.dayItemActive]}
            >
              <Text style={[styles.dayLabel, d.isToday && styles.dayLabelActive]}>
                {d.label}
              </Text>
              <Text style={[styles.dayDate, d.isToday && styles.dayDateActive]}>
                {d.date}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* ── Quick actions ── */}
        <Animated.View style={[styles.section, animatedStyle(3)]}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionRow}>
            {[
              { label: 'Add Task', icon: 'add-circle', color: COLORS.primary, screen: 'Tasks' },
              { label: 'Subjects', icon: 'grid', color: COLORS.success, screen: 'Tasks' },
              { label: 'Animations', icon: 'sparkles', color: COLORS.accent, screen: 'Animations' },
              { label: 'Profile', icon: 'person', color: '#8B5CF6', screen: 'Profile' },
            ].map((action) => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionItem}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '18' }]}>
                  <Ionicons name={action.icon as any} size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ── Today's tasks ── */}
        <Animated.View style={[styles.section, animatedStyle(4)]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {todayTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle" size={40} color={COLORS.success} />
              <Text style={styles.emptyText}>All done for today!</Text>
            </View>
          ) : (
            todayTasks.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onPress={() => navigation.navigate('TaskDetail', { task })}
                onToggle={() => toggleTask(task.id)}
              />
            ))
          )}
        </Animated.View>

        {/* ── Upcoming ── */}
        <Animated.View style={[styles.section, animatedStyle(5)]}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {tasks
            .filter((t) => t.dueDate !== 'Today' && !t.completed)
            .slice(0, 3)
            .map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onPress={() => navigation.navigate('TaskDetail', { task })}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: SPACING.xxxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.base,
  },
  greeting: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: FONTS.sizes.sm,
  },

  statsBanner: {
    marginHorizontal: SPACING.base,
    borderRadius: RADIUS.xl,
    padding: SPACING.base,
    ...SHADOWS.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: SPACING.sm,
  },
  statItem: { alignItems: 'center' },
  statValue: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  bannerDate: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.65)',
    fontSize: FONTS.sizes.xs,
  },

  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.base,
    marginTop: SPACING.base,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.lg,
    minWidth: 38,
  },
  dayItemActive: {
    backgroundColor: COLORS.primary,
  },
  dayLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayLabelActive: { color: 'rgba(255,255,255,0.8)' },
  dayDate: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dayDateActive: { color: COLORS.white },

  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  seeAll: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: { alignItems: 'center', gap: SPACING.xs },
  actionIcon: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: FONTS.sizes.base,
  },
});

export default HomeScreen;
