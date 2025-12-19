import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_ORDERS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { useRouter } from 'expo-router';

export default function DriverHistoryScreen() {
  const { t, isRTL } = useLocale();
  const router = useRouter();

  const completedOrders = MOCK_ORDERS.filter(o => o.status === 'delivered');

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('history')}</Text>
      </View>
      
      <FlatList
        data={completedOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/(driver)/ride-detail', params: { id: item.id } })}>
            <Card style={styles.card}>
              <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
                <View>
                  <Text weight="medium">{new Date(item.createdAt).toLocaleDateString()}</Text>
                  <Text variant="caption">{item.distance}</Text>
                </View>
                <Text weight="bold" color={COLORS.success}>+${item.price.toFixed(2)}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
  },
  list: {
    padding: SPACING.m,
    gap: SPACING.m,
  },
  card: {
    padding: SPACING.m,
  },
  row: {
    alignItems: 'center',
  }
});
