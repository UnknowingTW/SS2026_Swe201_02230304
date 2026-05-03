// src/components/AnimatedButton.tsx
// Reusable button with scale-bounce press animation

import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, FONTS, SHADOWS } from '../constants/theme';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  color = COLORS.primary,
  style,
  textStyle,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 80,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 12,
    }).start();
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 2, borderColor: color };
      case 'ghost':
        return { backgroundColor: color + '14' };
      default:
        return { backgroundColor: color, ...SHADOWS.md };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return color;
      default:
        return COLORS.white;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, getButtonStyle(), disabled && styles.disabled, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.45,
  },
});

export default AnimatedButton;
