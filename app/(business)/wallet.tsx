import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { TransactionRow } from '../../src/components/TransactionRow';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_BUSINESS, MOCK_TRANSACTIONS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';

export default function BusinessWalletScreen() {
  const { t } = useLocale();

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('wallet')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.balanceCard}>
          <Text variant="caption" color={COLORS.surface}>{t('balance')}</Text>
          <Text variant="h1" color={COLORS.surface}>${MOCK_BUSINESS.balance.toFixed(2)}</Text>
        </Card>

        <Text variant="h3" style={{ marginBottom: SPACING.m }}>Invoices & Payments</Text>

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
    backgroundColor: COLORS.text,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  }
});
