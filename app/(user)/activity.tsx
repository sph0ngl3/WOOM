import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { StatusBadge } from '../../src/components/StatusBadge';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_ORDERS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { Package } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function UserActivityScreen() {
  const { t, isRTL } = useLocale();
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('recentActivity')}</Text>
      </View>
      
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/(user)/activity-detail', params: { id: item.id } })}>
            <Card style={styles.card}>
              <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={styles.icon}>
                  <Package color={COLORS.primary} size={24} />
                </View>
                <View style={[styles.info, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
                  <Text weight="bold">${item.price.toFixed(2)}</Text>
                  <Text variant="caption">{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
                <StatusBadge status={item.status} />
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
    marginBottom: SPACING.s,
  },
  row: {
    alignItems: 'center',
    gap: SPACING.m,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
});
