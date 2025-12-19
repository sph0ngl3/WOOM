import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  weight?: 'regular' | 'medium' | 'bold';
}

export function Text({ style, variant = 'body', color = COLORS.text, weight = 'regular', ...props }: CustomTextProps) {
  return (
    <RNText 
      style={[
        styles.base,
        styles[variant],
        { color },
        weight === 'bold' && styles.bold,
        weight === 'medium' && styles.medium,
        style
      ]} 
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Inter_400Regular',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },
  bold: {
    fontWeight: '700',
  },
  medium: {
    fontWeight: '500',
  },
});
