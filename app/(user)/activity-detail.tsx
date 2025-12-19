import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { StatusBadge } from '../../src/components/StatusBadge';
import { COLORS, SPACING } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MOCK_ORDERS } from '../../src/services/mockData';
import { MapPin, User, Star } from 'lucide-react-native';

export default function ActivityDetailScreen() {
  const { t, isRTL } = useLocale();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];

  return (
    <Screen>
      <View style={styles.header}>
        <Button title="Back" variant="outline" onPress={() => router.back()} style={{ width: 80, height: 36 }} />
        <Text variant="h2" style={{ marginTop: SPACING.m }}>Order #{order.id}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.section}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
            <View>
              <Text variant="caption">{t('date')}</Text>
              <Text weight="medium">{new Date(order.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={{ alignItems: isRTL ? 'flex-start' : 'flex-end' }}>
              <Text variant="caption">{t('price')}</Text>
              <Text weight="bold" color={COLORS.primary}>${order.price.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ marginTop: SPACING.m }}>
            <StatusBadge status={order.status} />
          </View>
        </Card>

        <Card style={styles.section}>
          <View style={[styles.locationRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <MapPin size={20} color={COLORS.primary} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="caption">{t('pickup')}</Text>
              <Text>{order.pickupLocation.address}</Text>
            </View>
          </View>
          <View style={[styles.divider, { marginVertical: SPACING.m }]} />
          <View style={[styles.locationRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <MapPin size={20} color={COLORS.secondary} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="caption">{t('dropoff')}</Text>
              <Text>{order.dropoffLocation.address}</Text>
            </View>
          </View>
        </Card>

        {order.driverName && (
          <Card style={styles.section}>
            <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={styles.avatar}>
                <User size={24} color={COLORS.textSecondary} />
              </View>
              <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text weight="bold">{order.driverName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                  <Text variant="caption"> {order.driverRating}</Text>
                </View>
              </View>
            </View>
            <Button title={t('rateDriver')} variant="outline" onPress={() => {}} style={{ marginTop: SPACING.m }} />
          </Card>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.l,
    gap: SPACING.m,
  },
  section: {
    padding: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
  },
  locationRow: {
    gap: SPACING.m,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
