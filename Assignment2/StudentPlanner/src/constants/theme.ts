// src/constants/theme.ts
// Central design system for the Student Planner app

export const COLORS = {
  // Primary palette — Indigo/Violet
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  primarySoft: '#EEF2FF',

  // Accent
  accent: '#F59E0B',
  accentLight: '#FDE68A',
  accentSoft: '#FFFBEB',

  // Success / danger / info
  success: '#10B981',
  successSoft: '#D1FAE5',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  info: '#3B82F6',
  infoSoft: '#DBEAFE',
  warning: '#F97316',
  warningSoft: '#FFEDD5',

  // Neutrals
  white: '#FFFFFF',
  background: '#F8F9FF',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Category colours
  math: '#6366F1',
  science: '#10B981',
  english: '#F59E0B',
  history: '#EF4444',
  art: '#8B5CF6',
  pe: '#F97316',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    xxxl: 36,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
};
