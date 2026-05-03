// src/screens/AnimationDemoScreen.tsx
// Dedicated showcase for all animation types required by the assignment:
//  1. Fade In/Out
//  2. Slide animation
//  3. Scale / Bounce
//  4. Rotating loader (animated indicator)
//  5. Gesture-driven draggable card
//  6. Sequence animation (count-up progress)

import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
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

import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Demo section wrapper ─────────────────────────────────────────────────────
const DemoSection: React.FC<{
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}> = ({ title, subtitle, color, children }) => (
  <View style={[demoStyles.section, SHADOWS.sm]}>
    <View style={[demoStyles.badge, { backgroundColor: color + '18' }]}>
      <View style={[demoStyles.badgeDot, { backgroundColor: color }]} />
      <Text style={[demoStyles.badgeText, { color }]}>{title}</Text>
    </View>
    <Text style={demoStyles.subtitle}>{subtitle}</Text>
    <View style={demoStyles.demoArea}>{children}</View>
  </View>
);

const demoStyles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.base,
    marginBottom: SPACING.base,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: SPACING.xs,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: FONTS.sizes.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  subtitle: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginBottom: SPACING.md },
  demoArea: { alignItems: 'center', paddingVertical: SPACING.md },
});

// ─────────────────────────────────────────────────────────────────────────────

const AnimationDemoScreen: React.FC = () => {

  // 1. Fade In/Out ─────────────────────────────────────────────────────────
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [fadeVisible, setFadeVisible] = useState(true);

  const toggleFade = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeVisible ? 0 : 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setFadeVisible((v) => !v));
  };

  // 2. Slide ────────────────────────────────────────────────────────────────
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [slideIn, setSlideIn] = useState(true);

  const toggleSlide = () => {
    Animated.spring(slideAnim, {
      toValue: slideIn ? SCREEN_WIDTH * 0.4 : 0,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start(() => setSlideIn((v) => !v));
  };

  // 3. Scale / Bounce ───────────────────────────────────────────────────────
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const doBounce = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 1.35,
        useNativeDriver: true,
        speed: 60,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 16,
      }),
    ]).start();
  };

  // 4. Rotating loader ──────────────────────────────────────────────────────
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const spinRef = useRef<Animated.CompositeAnimation | null>(null);

  const toggleSpin = () => {
    if (spinning) {
      spinRef.current?.stop();
      setSpinning(false);
    } else {
      setSpinning(true);
      spinRef.current = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        })
      );
      spinRef.current.start();
    }
  };

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  // 5. Draggable gesture card ───────────────────────────────────────────────
  const dragPos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragPos.setOffset({ x: (dragPos.x as any)._value, y: (dragPos.y as any)._value });
        dragPos.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: dragPos.x, dy: dragPos.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        dragPos.flattenOffset();
        // Spring back to center
        Animated.spring(dragPos, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          speed: 12,
          bounciness: 10,
        }).start();
      },
    })
  ).current;

  // 6. Sequence: loading bar ────────────────────────────────────────────────
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progRunning, setProgRunning] = useState(false);

  const runProgress = () => {
    if (progRunning) return;
    setProgRunning(true);
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => setProgRunning(false));
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const progressText = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <LinearGradient
          colors={[COLORS.accent, '#F97316']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroHeader}
        >
          <Ionicons name="sparkles" size={32} color={COLORS.white} />
          <Text style={styles.heroTitle}>Animation Demo</Text>
          <Text style={styles.heroSub}>Tap the buttons to trigger each animation type</Text>
        </LinearGradient>

        <View style={styles.content}>

          {/* 1. Fade */}
          <DemoSection
            title="Fade In / Out"
            subtitle="Opacity animates between 0 and 1 using Animated.timing"
            color={COLORS.primary}
          >
            <Animated.View style={[styles.demoBox, { opacity: fadeAnim, backgroundColor: COLORS.primarySoft }]}>
              <Ionicons name="eye" size={28} color={COLORS.primary} />
              <Text style={[styles.demoBoxText, { color: COLORS.primary }]}>
                {fadeVisible ? 'Visible' : 'Hidden'}
              </Text>
            </Animated.View>
            <TouchableOpacity style={[styles.demoBtn, { backgroundColor: COLORS.primary }]} onPress={toggleFade}>
              <Text style={styles.demoBtnText}>{fadeVisible ? 'Fade Out' : 'Fade In'}</Text>
            </TouchableOpacity>
          </DemoSection>

          {/* 2. Slide */}
          <DemoSection
            title="Slide Animation"
            subtitle="Translates X position with spring physics"
            color={COLORS.success}
          >
            <View style={styles.slideTrack}>
              <Animated.View
                style={[
                  styles.slideBox,
                  { transform: [{ translateX: slideAnim }] },
                ]}
              >
                <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
              </Animated.View>
            </View>
            <TouchableOpacity style={[styles.demoBtn, { backgroundColor: COLORS.success }]} onPress={toggleSlide}>
              <Text style={styles.demoBtnText}>{slideIn ? 'Slide Right →' : '← Slide Back'}</Text>
            </TouchableOpacity>
          </DemoSection>

          {/* 3. Bounce */}
          <DemoSection
            title="Scale / Bounce"
            subtitle="Spring animation with bounciness for playful feel"
            color="#8B5CF6"
          >
            <Animated.View
              style={[
                styles.bounceBox,
                { transform: [{ scale: bounceAnim }] },
              ]}
            >
              <Ionicons name="star" size={32} color={COLORS.white} />
            </Animated.View>
            <TouchableOpacity style={[styles.demoBtn, { backgroundColor: '#8B5CF6' }]} onPress={doBounce}>
              <Text style={styles.demoBtnText}>Bounce! 🎉</Text>
            </TouchableOpacity>
          </DemoSection>

          {/* 4. Spinner */}
          <DemoSection
            title="Rotating Loader"
            subtitle="Looping rotation using interpolate + Animated.loop"
            color={COLORS.accent}
          >
            <Animated.View style={{ transform: [{ rotate: spin }], marginBottom: SPACING.md }}>
              <Ionicons name="reload-circle" size={56} color={COLORS.accent} />
            </Animated.View>
            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: COLORS.accent }]}
              onPress={toggleSpin}
            >
              <Text style={styles.demoBtnText}>{spinning ? '⏹ Stop' : '▶ Start Spin'}</Text>
            </TouchableOpacity>
          </DemoSection>

          {/* 5. Draggable */}
          <DemoSection
            title="Gesture: Drag & Release"
            subtitle="PanResponder tracks touch movement. Card springs back on release."
            color={COLORS.danger}
          >
            <View style={styles.dragArea}>
              <Animated.View
                style={[
                  styles.dragCard,
                  {
                    transform: dragPos.getTranslateTransform(),
                  },
                ]}
                {...panResponder.panHandlers}
              >
                <Ionicons name="move" size={22} color={COLORS.white} />
                <Text style={styles.dragCardText}>Drag me!</Text>
              </Animated.View>
            </View>
            <Text style={styles.dragHint}>☝️ Touch and drag the card above</Text>
          </DemoSection>

          {/* 6. Progress */}
          <DemoSection
            title="Animated Progress Bar"
            subtitle="Sequence animation fills a bar over 2 seconds"
            color={COLORS.info}
          >
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Animated.Text style={styles.progressLabel}>
              {/* Use a static display — update via state */}
              {progRunning ? 'Loading...' : 'Press to animate'}
            </Animated.Text>
            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: COLORS.info }]}
              onPress={runProgress}
              disabled={progRunning}
            >
              <Text style={styles.demoBtnText}>{progRunning ? 'Running…' : '▶ Run Progress'}</Text>
            </TouchableOpacity>
          </DemoSection>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 100 },

  heroHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.base,
    gap: SPACING.sm,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },

  content: { padding: SPACING.base },

  demoBox: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  demoBoxText: { fontSize: FONTS.sizes.xs, fontWeight: '700' },

  demoBtn: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
  },
  demoBtnText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.sizes.sm },

  slideTrack: {
    width: '100%',
    height: 64,
    backgroundColor: COLORS.successSoft,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  slideBox: {
    width: 56,
    height: 44,
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bounceBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },

  dragArea: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.dangerSoft,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  dragCard: {
    width: 110,
    height: 70,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    ...SHADOWS.md,
  },
  dragCardText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.sizes.sm },
  dragHint: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },

  progressTrack: {
    width: '100%',
    height: 16,
    backgroundColor: COLORS.borderLight,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.info,
    borderRadius: 8,
  },
  progressLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
});

export default AnimationDemoScreen;
