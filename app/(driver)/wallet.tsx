import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { TransactionRow } from '../../src/components/TransactionRow';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_DRIVER, MOCK_TRANSACTIONS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { useRouter } from 'expo-router';

export default function DriverWalletScreen() {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('wallet')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.balanceCard}>
          <Text variant="caption" color={COLORS.surface}>{t('balance')}</Text>
          <Text variant="h1" color={COLORS.surface}>${MOCK_DRIVER.balance.toFixed(2)}</Text>
          <Button 
            title={t('withdraw')} 
            onPress={() => router.push('/(driver)/withdraw')} 
            style={{ marginTop: SPACING.m, backgroundColor: 'rgba(255,255,255,0.2)' }} 
          />
        </Card>

        <Text variant="h3" style={{ marginBottom: SPACING.m }}>{t('history')}</Text>

        {MOCK_TRANSACTIONS.map(tr => (
          <TransactionRow key={tr.id} transaction={tr} />
        ))}
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
  },
  balanceCard: {
    backgroundColor: COLORS.driverAccent,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  }
});
