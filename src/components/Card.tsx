import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'flat' | 'outlined' | 'highlight';
  padding?: keyof typeof SPACING;
}

export function Card({ children, style, variant = 'elevated', padding = 'm' }: CardProps) {
  return (
    <View
      style={[
        styles.container,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        variant === 'flat' && styles.flat,
        variant === 'highlight' && styles.highlight,
        { padding: SPACING[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.l,
  },
  elevated: {
    ...SHADOWS.card,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  highlight: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  }
});
