import React, { useState } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { MOCK_DRIVER_STATS } from '../../src/services/mockData';
import { Car, Truck, Power } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DriverDashboard() {
  const { t, isRTL } = useLocale();
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  return (
    <Screen safeArea>
      {/* Header - Always Accessible */}
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text variant="h2" style={{ color: isOnline ? COLORS.primary : COLORS.textSecondary }}>
          {isOnline ? t('common.online') : t('common.offline')}
        </Text>
        <Switch 
          value={isOnline} 
          onValueChange={setIsOnline}
          trackColor={{ false: COLORS.surface, true: COLORS.primary }}
          thumbColor={COLORS.text}
        />
      </View>

      {/* Main Content - Fades when offline */}
      <View style={[styles.content, !isOnline && styles.contentDisabled]} pointerEvents={isOnline ? 'auto' : 'none'}>
        
        {/* Stats Row */}
        <View style={[styles.statsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Card style={styles.statCard}>
            <Text variant="caption" style={{ color: COLORS.textSecondary }}>{t('driver.earnings')}</Text>
            <Text weight="bold" style={{ fontSize: 20, marginTop: 4 }}>${MOCK_DRIVER_STATS.todayEarnings}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text variant="caption" style={{ color: COLORS.textSecondary }}>{t('driver.trips')}</Text>
            <Text weight="bold" style={{ fontSize: 20, marginTop: 4 }}>{MOCK_DRIVER_STATS.totalRides}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text variant="caption" style={{ color: COLORS.textSecondary }}>{t('driver.rating')}</Text>
            <Text weight="bold" style={{ fontSize: 20, marginTop: 4 }}>{MOCK_DRIVER_STATS.rating} ★</Text>
          </Card>
        </View>

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: COLORS.primary }]}
            onPress={() => router.push('/(driver)/active-ride')}
            activeOpacity={0.9}
          >
            <Car size={48} color={COLORS.background} />
            <Text weight="bold" style={{ color: COLORS.background, fontSize: 24, marginTop: SPACING.m }}>
              {t('driver.accept_ride')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: COLORS.driverAccent }]}
            onPress={() => router.push('/(driver)/active-ride')} // Reusing active ride for demo
            activeOpacity={0.9}
          >
            <Truck size={48} color={COLORS.background} />
            <Text weight="bold" style={{ color: COLORS.background, fontSize: 24, marginTop: SPACING.m }}>
              {t('driver.pickup_order')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Offline Overlay - Blocks Interaction */}
      {!isOnline && (
        <View style={styles.offlineOverlay}>
          <Power size={64} color={COLORS.textSecondary} />
          <Text variant="h2" style={{ marginTop: SPACING.l, color: COLORS.textSecondary }}>{t('driver.offline_msg')}</Text>
          <Text style={{ marginTop: SPACING.s, color: COLORS.textSecondary, opacity: 0.7 }}>
            {t('driver.offline_sub')}
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 20,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
  },
  contentDisabled: {
    opacity: 0.1,
  },
  statsRow: {
    gap: SPACING.m,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    padding: SPACING.m,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  actionsContainer: {
    gap: SPACING.l,
  },
  actionCard: {
    height: 160,
    borderRadius: RADIUS.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: 70, // Below header
    backgroundColor: 'rgba(14, 27, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  }
});
