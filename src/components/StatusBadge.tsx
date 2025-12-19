import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { OrderStatus } from '../types';
import { useLocale } from '../context/LocaleContext';

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLocale();

  const getColor = () => {
    switch (status) {
      case 'pending': return COLORS.warning;
      case 'accepted': return COLORS.primary;
      case 'picked_up': return COLORS.businessAccent;
      case 'delivered': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getColor() + '20' }]}>
      <Text variant="caption" style={{ color: getColor(), fontWeight: '600', textTransform: 'uppercase' }}>
        {t(status as any)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 4,
    borderRadius: RADIUS.s,
    alignSelf: 'flex-start',
  },
});
