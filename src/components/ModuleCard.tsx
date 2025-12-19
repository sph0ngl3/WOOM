import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { useLocale } from '../context/LocaleContext';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  onPress?: () => void;
}

export function ModuleCard({ title, description, icon, isComingSoon, onPress }: ModuleCardProps) {
  const { t, isRTL } = useLocale();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isComingSoon && styles.disabled,
        { flexDirection: isRTL ? 'row-reverse' : 'row' }
      ]}
      onPress={isComingSoon ? undefined : onPress}
      activeOpacity={isComingSoon ? 1 : 0.7}
    >
      <View style={[styles.iconBox, isComingSoon && styles.iconBoxDisabled]}>
        {icon}
      </View>
      
      <View style={[styles.content, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
        <Text weight="bold" style={styles.title}>{title}</Text>
        <Text variant="caption" style={styles.description}>{description}</Text>
      </View>

      {isComingSoon && (
        <View style={styles.badge}>
          <Text variant="caption" style={styles.badgeText}>{t('common.coming_soon')}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.l,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  disabled: {
    opacity: 0.6,
    borderColor: 'transparent',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.m,
    backgroundColor: 'rgba(110, 243, 197, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDisabled: {
    backgroundColor: COLORS.surface,
  },
  content: {
    flex: 1,
    marginHorizontal: SPACING.m,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    color: COLORS.textSecondary,
  },
  badge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.s,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  }
});
