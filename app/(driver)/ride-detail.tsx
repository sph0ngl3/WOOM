import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MOCK_ORDERS } from '../../src/services/mockData';

export default function DriverRideDetailScreen() {
  const { t, isRTL } = useLocale();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];

  return (
    <Screen>
      <View style={styles.header}>
        <Button title="Back" variant="outline" onPress={() => router.back()} style={{ width: 80 }} />
        <Text variant="h2" style={{ marginTop: SPACING.m }}>Ride Details</Text>
      </View>

      <View style={styles.content}>
        <Card style={{ alignItems: 'center', padding: SPACING.l, marginBottom: SPACING.l }}>
          <Text variant="caption">Total Earnings</Text>
          <Text variant="h1" color={COLORS.success}>${order.price.toFixed(2)}</Text>
        </Card>

        <Card style={{ padding: SPACING.m, gap: SPACING.m }}>
          <View>
            <Text variant="caption">{t('pickup')}</Text>
            <Text>{order.pickupLocation.address}</Text>
          </View>
          <View>
            <Text variant="caption">{t('dropoff')}</Text>
            <Text>{order.dropoffLocation.address}</Text>
          </View>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
             <Text>{t('distance')}: {order.distance}</Text>
             <Text>{t('eta')}: {order.duration}</Text>
          </View>
        </Card>
      </View>
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
  },
  row: {
    marginTop: SPACING.m,
  }
});
