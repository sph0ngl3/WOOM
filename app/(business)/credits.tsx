import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { MOCK_BUSINESS_STATS } from '../../src/services/mockData';
import { useRouter } from 'expo-router';
import { Calendar, TrendingUp } from 'lucide-react-native';

export default function BusinessCreditsScreen() {
  const { t, isRTL } = useLocale();
  const router = useRouter();

  const usagePercent = (MOCK_BUSINESS_STATS.usedCredits / MOCK_BUSINESS_STATS.totalCredits) * 100;

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('credits')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Main Balance Card */}
        <Card style={styles.mainCard}>
          <Text variant="caption" color={COLORS.surface}>{t('available')}</Text>
          <Text variant="h1" color={COLORS.surface}>{MOCK_BUSINESS_STATS.totalCredits - MOCK_BUSINESS_STATS.usedCredits}</Text>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${usagePercent}%` }]} />
          </View>
          
          <View style={[styles.statsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text variant="caption" color="rgba(255,255,255,0.8)">{t('used')}: {MOCK_BUSINESS_STATS.usedCredits}</Text>
            <Text variant="caption" color="rgba(255,255,255,0.8)">{t('total')}: {MOCK_BUSINESS_STATS.totalCredits}</Text>
          </View>

          <Button 
            title={t('purchase')} 
            onPress={() => router.push('/(business)/buy-credits')} 
            style={{ marginTop: SPACING.l, backgroundColor: 'white', width: '100%' }} 
            variant="outline"
          />
        </Card>

        {/* Reset Date Info */}
        <Card style={styles.infoCard}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Calendar size={20} color={COLORS.textSecondary} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="caption">{t('resetDate')}</Text>
              <Text weight="medium">Nov 1, 2023</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TrendingUp size={20} color={COLORS.textSecondary} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="caption">{t('monthlyCap')}</Text>
              <Text weight="medium">5000 Credits</Text>
            </View>
          </View>
        </Card>

        <Text variant="h3" style={{ marginBottom: SPACING.m, marginTop: SPACING.l, textAlign: isRTL ? 'right' : 'left' }}>Usage Activity</Text>
        
        {[1,2,3].map(i => (
          <Card key={i} style={{ marginBottom: SPACING.s, padding: SPACING.m }}>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <View>
                 <Text weight="medium">Order #{200+i}</Text>
                 <Text variant="caption">Oct {25-i}, 2023</Text>
               </View>
               <Text color={COLORS.error} weight="bold">-50</Text>
            </View>
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
  },
  mainCard: {
    backgroundColor: COLORS.businessAccent,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 3,
  },
  statsRow: {
    width: '100%',
    justifyContent: 'space-between',
  },
  infoCard: {
    padding: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
    paddingVertical: SPACING.s,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  }
});
