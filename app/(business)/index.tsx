import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { MOCK_BUSINESS_STATS } from '../../src/services/mockData';
import { Star, TrendingUp } from 'lucide-react-native';
import { WoomingOverlay } from '../../src/components/WoomingOverlay';
import { APP_CONSTANTS } from '../../src/constants/app';

export default function BusinessDashboard() {
  const { t, isRTL } = useLocale();
  const [woomingState, setWoomingState] = useState<'none' | 'wooming' | 'confirmed'>('none');

  const handleWoom = () => {
    setWoomingState('wooming');
    // Simulate finding a courier
    setTimeout(() => {
      setWoomingState('confirmed');
    }, 4000); // 4 seconds of "Wooming"
  };

  return (
    <Screen>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text variant="h2">{t('dashboard')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Performance Score */}
        <Card style={styles.scoreCard}>
           <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={styles.scoreCircle}>
                 <Text weight="bold" style={{ fontSize: 24, color: COLORS.background }}>{MOCK_BUSINESS_STATS.performanceScore}</Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: SPACING.m, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                 <Text variant="h3">{t('business.performance_score')}</Text>
                 <Text variant="caption">{t('business.score_desc')}</Text>
              </View>
              <Star size={24} color={COLORS.warning} fill={COLORS.warning} />
           </View>
        </Card>

        {/* Credits Summary */}
        <Card style={styles.creditSummary}>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="h3">{t('business.available_credits')}</Text>
            <Text weight="bold" style={{ color: COLORS.businessAccent, fontSize: 20 }}>
              {MOCK_BUSINESS_STATS.totalCredits - MOCK_BUSINESS_STATS.usedCredits}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(MOCK_BUSINESS_STATS.usedCredits / MOCK_BUSINESS_STATS.totalCredits) * 100}%` }]} />
          </View>
          <Text variant="caption" style={{ marginTop: SPACING.s, textAlign: 'center', color: COLORS.textSecondary }}>
             {t('business.credit_rule')}
          </Text>
        </Card>

        {/* Overview Cards */}
        <View style={[styles.grid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Card style={styles.statCard}>
            <TrendingUp size={24} color={COLORS.businessAccent} style={{ marginBottom: SPACING.s }} />
            <Text variant="h1" color={COLORS.businessAccent}>{MOCK_BUSINESS_STATS.activeOrders}</Text>
            <Text variant="caption">{t('business.active_orders')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text variant="h1" color={COLORS.primary}>${MOCK_BUSINESS_STATS.dailyRevenue}</Text>
            <Text variant="caption">{t('business.revenue')}</Text>
          </Card>
        </View>
      </ScrollView>

      {/* Primary WOOM Action Button - FIXED BOTTOM */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.woomButton} 
          onPress={handleWoom}
          activeOpacity={0.9}
        >
          <Image 
            source={{ uri: APP_CONSTANTS.LOGO_URL }} 
            style={{ width: 32, height: 32, marginRight: 8, tintColor: COLORS.background }} 
            resizeMode="contain" 
          />
          <Text weight="bold" style={{ fontSize: 22, color: COLORS.background, letterSpacing: 3 }}>{t('business.request_courier')}</Text>
        </TouchableOpacity>
      </View>

      <WoomingOverlay 
        visible={woomingState !== 'none'} 
        state={woomingState as any} 
        onClose={() => setWoomingState('none')} 
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    padding: SPACING.l,
    paddingBottom: 120, // Space for large footer
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.businessAccent,
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.businessAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditSummary: {
    padding: SPACING.l,
    marginBottom: SPACING.l,
    backgroundColor: COLORS.card,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginTop: SPACING.m,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.businessAccent,
  },
  grid: {
    gap: SPACING.m,
  },
  statCard: {
    flex: 1,
    padding: SPACING.l,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: COLORS.card,
  },
  row: {
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.l,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  woomButton: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.glow,
    borderWidth: 1,
    borderColor: COLORS.text,
  }
});
