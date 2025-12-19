import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { CREDIT_PACKAGES } from '../../src/services/mockData';
import { useRouter } from 'expo-router';
import { CreditCard } from 'lucide-react-native';

export default function BuyCreditsScreen() {
  const { t, isRTL } = useLocale();
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.header}>
        <Button title={t('common.back')} variant="outline" onPress={() => router.back()} style={{ width: 80 }} />
        <Text variant="h2" style={{ marginTop: SPACING.m }}>{t('business.buy_credits')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {CREDIT_PACKAGES.map(pkg => (
          <Card key={pkg.id} style={styles.packageCard}>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <View style={{ alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                 <Text variant="h3">{pkg.name}</Text>
                 <Text variant="h2" color={COLORS.businessAccent}>{pkg.credits} {t('wallet.credits')}</Text>
               </View>
               <View style={styles.priceTag}>
                  <Text weight="bold" color={COLORS.background}>${pkg.price}</Text>
               </View>
            </View>
            
            {pkg.installments && pkg.installments > 1 && (
               <View style={[styles.installmentBox, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <CreditCard size={16} color={COLORS.textSecondary} />
                  <Text variant="caption" style={{ marginHorizontal: 8 }}>
                     {t('common.pay_in')} <Text weight="bold" color={COLORS.primary}>{pkg.installments} {t('common.months')}</Text>
                  </Text>
               </View>
            )}

            <Button 
              title={t('common.confirm')} 
              onPress={() => {}} 
              style={{ marginTop: SPACING.m, backgroundColor: COLORS.businessAccent }} 
              fullWidth
            />
          </Card>
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
    gap: SPACING.m,
  },
  packageCard: {
    padding: SPACING.l,
  },
  priceTag: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.m,
  },
  installmentBox: {
    marginTop: SPACING.m,
    padding: SPACING.s,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.s,
    alignItems: 'center',
    alignSelf: 'flex-start',
  }
});
