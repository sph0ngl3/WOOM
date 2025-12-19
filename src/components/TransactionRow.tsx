import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Card } from './Card';
import { COLORS, SPACING } from '../constants/theme';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useLocale } from '../context/LocaleContext';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { isRTL } = useLocale();
  const isCredit = transaction.type === 'credit';

  return (
    <Card variant="flat" style={styles.container}>
      <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={[styles.icon, { backgroundColor: isCredit ? COLORS.success + '20' : COLORS.error + '20' }]}>
          {isCredit ? 
            <ArrowDownLeft size={20} color={COLORS.success} /> : 
            <ArrowUpRight size={20} color={COLORS.error} />
          }
        </View>
        <View style={[styles.details, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text weight="medium">{transaction.description}</Text>
          <Text variant="caption">{transaction.date}</Text>
        </View>
        <Text 
          weight="bold" 
          style={{ color: isCredit ? COLORS.success : COLORS.text }}
        >
          {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.s,
    padding: SPACING.m,
  },
  row: {
    alignItems: 'center',
    gap: SPACING.m,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
  },
});
