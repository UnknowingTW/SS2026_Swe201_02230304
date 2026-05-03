// src/screens/TasksScreen.tsx
// Shows all subjects (category grid) + full task list with filter tabs
// Animations: slide-in subject cards with stagger

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { SUBJECTS, TASKS } from '../data/mockData';
import SubjectCard from '../components/SubjectCard';
import TaskCard from '../components/TaskCard';

const FILTERS = ['All', 'Today', 'Pending', 'Done'];

const TasksScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [tasks, setTasks] = useState(TASKS);

  // Slide-in for subject grid
  const gridAnim = useRef(new Animated.Value(40)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;
  // Slide-in for task list
  const listAnim = useRef(new Animated.Value(30)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  // Filter pill indicator
  const filterSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(gridAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(gridOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(listAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(listOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 150);
  }, []);

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'Today': return tasks.filter((t) => t.dueDate === 'Today');
      case 'Pending': return tasks.filter((t) => !t.completed);
      case 'Done': return tasks.filter((t) => t.completed);
      default: return tasks;
    }
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>My Subjects</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* ── Subject grid ── */}
        <Animated.View
          style={{
            opacity: gridOpacity,
            transform: [{ translateY: gridAnim }],
            paddingHorizontal: SPACING.base,
          }}
        >
          <View style={styles.grid}>
            {SUBJECTS.map((s, i) => (
              <SubjectCard
                key={s.id}
                subject={s}
                delay={i * 80}
                onPress={() => navigation.navigate('TaskDetail', { subject: s })}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── Task list ── */}
        <Animated.View
          style={{
            opacity: listOpacity,
            transform: [{ translateY: listAnim }],
            marginTop: SPACING.xl,
          }}
        >
          {/* Filter tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
                onPress={() => setActiveFilter(f)}
              >
                <Text
                  style={[styles.filterText, activeFilter === f && styles.filterTextActive]}
                >
                  {f}
                </Text>
                {activeFilter === f && (
                  <View style={styles.filterDot} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Task count */}
          <View style={styles.taskHeader}>
            <Text style={styles.taskCount}>
              {getFilteredTasks().length} tasks
            </Text>
          </View>

          {/* Task cards */}
          <View style={styles.taskList}>
            {getFilteredTasks().map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onPress={() => navigation.navigate('TaskDetail', { task })}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
            {getFilteredTasks().length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done-circle" size={48} color={COLORS.success} />
                <Text style={styles.emptyTitle}>All caught up!</Text>
                <Text style={styles.emptySubtitle}>No tasks in this category.</Text>
              </View>
            )}
          </View>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 100 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },

  filterRow: {
    paddingHorizontal: SPACING.base,
    gap: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  filterPill: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...SHADOWS.sm,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  taskHeader: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.sm,
  },
  taskCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    fontWeight: '600',
  },

  taskList: {
    paddingHorizontal: SPACING.base,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    gap: SPACING.sm,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },
});

export default TasksScreen;
