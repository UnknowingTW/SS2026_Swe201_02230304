// src/screens/ProfileScreen.tsx
// User profile, stats overview, achievements, and settings toggles
// Animations: avatar scale-in, achievement cards fade-in with stagger

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { ACHIEVEMENTS, SUBJECTS } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';

const ProfileScreen: React.FC = () => {
  // Toggle states for settings
  const [notifs, setNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);

  // Avatar entrance
  const avatarScale = useRef(new Animated.Value(0.3)).current;
  const avatarOpacity = useRef(new Animated.Value(0)).current;
  // Achievement stagger
  const achieveAnims = useRef(ACHIEVEMENTS.map(() => new Animated.Value(0))).current;
  const achieveSlide = useRef(ACHIEVEMENTS.map(() => new Animated.Value(20))).current;

  useEffect(() => {
    // Avatar pop-in
    Animated.parallel([
      Animated.spring(avatarScale, { toValue: 1, useNativeDriver: true, speed: 8, bounciness: 14 }),
      Animated.timing(avatarOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Stagger achievements
    setTimeout(() => {
      Animated.stagger(
        100,
        ACHIEVEMENTS.map((_, i) =>
          Animated.parallel([
            Animated.timing(achieveAnims[i], { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(achieveSlide[i], { toValue: 0, duration: 400, useNativeDriver: true }),
          ])
        )
      ).start();
    }, 300);
  }, []);

  const totalTasks = SUBJECTS.reduce((s, sub) => s + sub.taskCount, 0);
  const doneTasks = SUBJECTS.reduce((s, sub) => s + sub.completedCount, 0);
  const overall = totalTasks > 0 ? doneTasks / totalTasks : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Profile hero ── */}
        <LinearGradient
          colors={[COLORS.primaryDark, COLORS.primary]}
          style={styles.hero}
        >
          <Animated.View
            style={[
              styles.avatarWrap,
              { transform: [{ scale: avatarScale }], opacity: avatarOpacity },
            ]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>
            <View style={styles.onlineDot} />
          </Animated.View>

          <Text style={styles.heroName}>Alex Johnson</Text>
          <Text style={styles.heroSub}>Year 11 · Riverside College</Text>

          <View style={styles.statsRow}>
            {[
              { label: 'Tasks Done', value: doneTasks },
              { label: 'Subjects', value: SUBJECTS.length },
              { label: 'Day Streak', value: '7 🔥' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* ── Overall progress ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Progress</Text>
          <View style={styles.card}>
            <ProgressBar
              progress={overall}
              color={COLORS.primary}
              height={12}
              showLabel
              label="Completion"
              delay={400}
            />
            <View style={styles.progressLegend}>
              <Text style={styles.progressNote}>
                {doneTasks} of {totalTasks} tasks completed
              </Text>
            </View>
            {/* Per-subject mini bars */}
            <View style={styles.subjectBars}>
              {SUBJECTS.map((s) => (
                <View key={s.id} style={styles.subjectBarRow}>
                  <Text style={styles.subjectBarLabel}>{s.name}</Text>
                  <View style={{ flex: 1 }}>
                    <ProgressBar
                      progress={s.taskCount > 0 ? s.completedCount / s.taskCount : 0}
                      color={s.color}
                      height={6}
                      delay={600}
                    />
                  </View>
                  <Text style={[styles.subjectBarPct, { color: s.color }]}>
                    {s.taskCount > 0 ? Math.round((s.completedCount / s.taskCount) * 100) : 0}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Achievements ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achieveGrid}>
            {ACHIEVEMENTS.map((a, i) => (
              <Animated.View
                key={a.id}
                style={[
                  styles.achieveCard,
                  !a.earned && styles.achieveCardLocked,
                  {
                    opacity: achieveAnims[i],
                    transform: [{ translateY: achieveSlide[i] }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.achieveIcon,
                    {
                      backgroundColor: a.earned ? a.color + '20' : COLORS.borderLight,
                    },
                  ]}
                >
                  <Ionicons
                    name={a.icon as any}
                    size={24}
                    color={a.earned ? a.color : COLORS.textMuted}
                  />
                </View>
                <Text style={[styles.achieveTitle, !a.earned && styles.lockedText]}>
                  {a.title}
                </Text>
                <Text style={styles.achieveDesc} numberOfLines={2}>
                  {a.description}
                </Text>
                {!a.earned && (
                  <View style={styles.lockBadge}>
                    <Ionicons name="lock-closed" size={10} color={COLORS.textMuted} />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>
        </View>

        {/* ── Settings ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            {[
              { label: 'Push Notifications', icon: 'notifications', value: notifs, setter: setNotifs },
              { label: 'Dark Mode', icon: 'moon', value: darkMode, setter: setDarkMode },
              { label: 'Task Reminders', icon: 'alarm', value: reminders, setter: setReminders },
            ].map((s, i) => (
              <View key={s.label} style={[styles.settingRow, i > 0 && styles.settingDivider]}>
                <View style={[styles.settingIcon, { backgroundColor: COLORS.primarySoft }]}>
                  <Ionicons name={s.icon as any} size={18} color={COLORS.primary} />
                </View>
                <Text style={styles.settingLabel}>{s.label}</Text>
                <Switch
                  value={s.value}
                  onValueChange={s.setter}
                  trackColor={{ false: COLORS.borderLight, true: COLORS.primaryLight }}
                  thumbColor={s.value ? COLORS.primary : COLORS.white}
                />
              </View>
            ))}
          </View>
        </View>

        {/* ── Account actions ── */}
        <View style={[styles.section, { marginBottom: SPACING.xxxl }]}>
          {[
            { label: 'Edit Profile', icon: 'create-outline', color: COLORS.primary },
            { label: 'Export Data', icon: 'download-outline', color: COLORS.success },
            { label: 'Sign Out', icon: 'log-out-outline', color: COLORS.danger },
          ].map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionRow}>
              <View style={[styles.settingIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon as any} size={18} color={action.color} />
              </View>
              <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={action.color} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 40 },

  hero: {
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.base,
  },
  avatarWrap: { position: 'relative', marginBottom: SPACING.md },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  avatarText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.xxl },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  heroName: { color: COLORS.white, fontSize: FONTS.sizes.xl, fontWeight: '800', marginBottom: 4 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FONTS.sizes.sm, marginBottom: SPACING.xl },
  statsRow: { flexDirection: 'row', gap: SPACING.xxl },
  statItem: { alignItems: 'center' },
  statValue: { color: COLORS.white, fontSize: FONTS.sizes.xl, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: FONTS.sizes.xs, marginTop: 2 },

  section: { paddingHorizontal: SPACING.base, marginTop: SPACING.xl },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    ...SHADOWS.sm,
  },
  progressLegend: { marginTop: SPACING.sm },
  progressNote: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  subjectBars: { marginTop: SPACING.md, gap: SPACING.md },
  subjectBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  subjectBarLabel: {
    width: 64,
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  subjectBarPct: { width: 32, fontSize: FONTS.sizes.xs, fontWeight: '700', textAlign: 'right' },

  achieveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  achieveCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
    gap: SPACING.xs,
  },
  achieveCardLocked: { opacity: 0.55 },
  achieveIcon: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  achieveTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  lockedText: { color: COLORS.textMuted },
  achieveDesc: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, lineHeight: 16 },
  lockBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.borderLight,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  settingDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontSize: FONTS.sizes.base, color: COLORS.textPrimary, fontWeight: '500' },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  actionLabel: { flex: 1, fontSize: FONTS.sizes.base, fontWeight: '600' },
});

export default ProfileScreen;
