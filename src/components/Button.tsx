import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Text } from './Text';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ title, onPress, variant = 'primary', loading, disabled, style, icon, fullWidth = true }: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.disabled;
    if (variant === 'primary') return COLORS.primary;
    if (variant === 'secondary') return COLORS.surface;
    if (variant === 'danger') return 'rgba(239, 68, 68, 0.15)';
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textSecondary;
    if (variant === 'primary') return '#0E1B1F'; // Dark text on mint button
    if (variant === 'secondary') return COLORS.text;
    if (variant === 'danger') return COLORS.error;
    if (variant === 'outline') return COLORS.primary;
    return COLORS.text;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outline,
        !fullWidth && { alignSelf: 'flex-start' },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text weight="bold" style={{ color: getTextColor(), marginLeft: icon ? 8 : 0, fontSize: 16 }}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: RADIUS.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.l,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
