// src/components/ProgressBar.tsx
// Animated progress bar — fills from 0 to target on mount

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, FONTS } from '../constants/theme';

interface ProgressBarProps {
  progress: number;        // 0–1
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  delay?: number;          // animation delay in ms
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = COLORS.primary,
  height = 8,
  showLabel = false,
  label,
  delay = 0,
}) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 900,
      delay,
      useNativeDriver: false, // width cannot use native driver
    }).start();
  }, [progress]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View>
      {showLabel && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Text style={[styles.percent, { color }]}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      )}
      <View style={[styles.track, { height, borderRadius: height }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthInterpolated,
              height,
              borderRadius: height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    backgroundColor: COLORS.borderLight,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  percent: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
});

export default ProgressBar;
