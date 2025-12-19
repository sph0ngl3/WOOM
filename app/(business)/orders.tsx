import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { StatusBadge } from '../../src/components/StatusBadge';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_ORDERS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { useRouter } from 'expo-router';

export default function BusinessOrdersScreen() {
  const { t, isRTL } = useLocale();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const router = useRouter();

  const filteredOrders = MOCK_ORDERS.filter(o => 
    activeTab === 'active' 
      ? ['pending', 'accepted', 'picked_up'].includes(o.status)
      : ['delivered', 'cancelled'].includes(o.status)
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('orders')}</Text>
        <View style={styles.tabs}>
           <TouchableOpacity onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.activeTab]}>
             <Text color={activeTab === 'active' ? COLORS.primary : COLORS.textSecondary}>{t('activeOrders')}</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.activeTab]}>
             <Text color={activeTab === 'completed' ? COLORS.primary : COLORS.textSecondary}>Completed</Text>
           </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/(business)/order-detail', params: { id: item.id } })}>
            <Card style={styles.card}>
              <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
                <View>
                  <Text weight="bold">Order #{item.id}</Text>
                  <Text variant="caption">{item.items}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
              <Text variant="caption" style={{ marginTop: SPACING.s }}>Credits Used: 50</Text>
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
  tabs: {
    flexDirection: 'row',
    marginTop: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingVertical: SPACING.s,
    marginRight: SPACING.l,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
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
