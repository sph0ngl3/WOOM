import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { MOCK_USER } from '../../src/services/mockData';
import { Send, QrCode, ArrowDownLeft, Zap, RefreshCw, Heart } from 'lucide-react-native';

export default function UserWalletScreen() {
  const { t, isRTL } = useLocale();
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2" style={{ textAlign: isRTL ? 'right' : 'left' }}>{t('wallet.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Balance Card - Primary Mint */}
        <Card style={styles.balanceCard}>
          <Text variant="caption" style={{ color: COLORS.background, opacity: 0.7 }}>{t('wallet.balance').toUpperCase()}</Text>
          <Text variant="h1" style={{ color: COLORS.background, fontSize: 36, marginVertical: SPACING.s }}>
            ${MOCK_USER.balance.toFixed(2)}
          </Text>
          <View style={[styles.balanceActions, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity style={styles.actionBtn}>
              <ArrowDownLeft size={20} color={COLORS.background} />
              <Text weight="bold" style={{ color: COLORS.background, marginHorizontal: 8 }}>{t('wallet.top_up')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <QrCode size={20} color={COLORS.background} />
              <Text weight="bold" style={{ color: COLORS.background, marginHorizontal: 8 }}>{t('wallet.scan')}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* WOOM Points Section (Culture) */}
        <Text variant="h3" style={{ marginBottom: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('wallet.culture_title')}</Text>
        <Card style={styles.pointsCard}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
               <View style={styles.pointsIcon}>
                 <Heart size={20} color={COLORS.primary} fill={COLORS.primary} />
               </View>
               <View style={{ marginHorizontal: SPACING.m, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                 <Text weight="bold" style={{ fontSize: 24 }}>{MOCK_USER.woomPoints}</Text>
                 <Text variant="caption" style={{ color: COLORS.textSecondary }}>{t('wallet.points_desc')}</Text>
               </View>
            </View>
            <TouchableOpacity style={styles.convertBtn}>
               <RefreshCw size={16} color={COLORS.background} />
               <Text weight="bold" style={{ color: COLORS.background, marginLeft: 4 }}>{t('wallet.convert')}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Transfer Section - Username */}
        <Text variant="h3" style={{ marginBottom: SPACING.m, marginTop: SPACING.l, textAlign: isRTL ? 'right' : 'left' }}>{t('wallet.send')}</Text>
        <Card style={styles.transferCard}>
          <View style={styles.inputGroup}>
            <Text variant="caption" style={{ color: COLORS.textSecondary, marginBottom: 4, textAlign: isRTL ? 'right' : 'left' }}>{t('profile.username')}</Text>
            <TextInput 
              style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
              value={username}
              onChangeText={setUsername}
              placeholder={t('wallet.username_placeholder')}
              placeholderTextColor={COLORS.disabled}
            />
          </View>
          
          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <Text variant="caption" style={{ color: COLORS.textSecondary, marginBottom: 4, textAlign: isRTL ? 'right' : 'left' }}>{t('common.pay_in')}</Text>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
              <Text variant="h3" style={{ color: COLORS.primary, marginHorizontal: 4 }}>$</Text>
              <TextInput 
                style={[styles.input, { fontSize: 20, color: COLORS.primary, textAlign: isRTL ? 'right' : 'left' }]}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={COLORS.disabled}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.sendBtn}>
            <Send size={20} color={COLORS.background} />
            <Text weight="bold" style={{ color: COLORS.background, marginLeft: 8 }}>{t('wallet.transfer').toUpperCase()}</Text>
          </TouchableOpacity>
        </Card>
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
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: RADIUS.l,
    marginBottom: SPACING.l,
  },
  balanceActions: {
    gap: SPACING.m,
    marginTop: SPACING.m,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 27, 30, 0.1)',
    paddingHorizontal: SPACING.m,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  pointsCard: {
    padding: SPACING.m,
    backgroundColor: COLORS.card,
  },
  pointsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(110, 243, 197, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  convertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  transferCard: {
    padding: SPACING.l,
    backgroundColor: COLORS.card,
  },
  inputGroup: {
    marginBottom: SPACING.s,
  },
  input: {
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: 4,
    fontFamily: 'Inter_500Medium',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.m,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: RADIUS.m,
    marginTop: SPACING.m,
  },
  row: {
    alignItems: 'center',
  }
});
