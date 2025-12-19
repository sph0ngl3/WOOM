import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Switch, TouchableOpacity, Clipboard, Modal } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { useAuth } from '../../src/context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { MOCK_USER } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { LogOut, Globe, Bell, Wallet, Copy, QrCode, Gift, Ticket, X } from 'lucide-react-native';

export default function UserProfileScreen() {
  const { logout } = useAuth();
  const { t, setLocale, locale, isRTL } = useLocale();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyUsername = () => {
    Clipboard.setString(MOCK_USER.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('profile.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info */}
        <Card style={styles.profileCard}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Image source={{ uri: MOCK_USER.avatarUrl }} style={styles.avatar} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="h3">{MOCK_USER.name}</Text>
              <TouchableOpacity 
                style={[styles.usernameBadge, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                onPress={copyUsername}
              >
                <Text variant="caption" color={COLORS.primary} weight="bold">{MOCK_USER.username}</Text>
                <Copy size={12} color={COLORS.primary} style={{ marginHorizontal: 4 }} />
                {copied && <Text variant="caption" color={COLORS.success}>{t('common.copied')}</Text>}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.qrButton} onPress={() => setShowQR(true)}>
              <QrCode size={24} color={COLORS.background} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* WOOM Culture Rewards */}
        <Text variant="h3" style={{ marginVertical: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('profile.rewards')}</Text>
        <Card style={styles.rewardsCard}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', marginBottom: SPACING.m }]}>
             <Gift size={24} color={COLORS.primary} />
             <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text weight="bold">{t('profile.reward_meal')}</Text>
                <Text variant="caption" color={COLORS.warning}>{t('profile.expires')}</Text>
             </View>
             <Button title={t('common.confirm')} variant="outline" onPress={() => {}} style={{ height: 32 }} />
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', marginTop: SPACING.m }]}>
             <Ticket size={24} color={COLORS.businessAccent} />
             <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text weight="bold">{t('profile.reward_delivery')}</Text>
                <Text variant="caption" color={COLORS.textSecondary}>Valid on WOOMeats</Text>
             </View>
          </View>
        </Card>

        {/* Settings */}
        <Text variant="h3" style={{ marginVertical: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('nav.settings')}</Text>
        <Card style={styles.menuCard}>
          {/* Language */}
          <View style={[styles.menuItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.background }]}>
              <Globe size={20} color={COLORS.text} />
            </View>
            <Text style={{ flex: 1, marginHorizontal: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('profile.language')}</Text>
            <Button 
               title={locale === 'en' ? 'English' : 'العربية'} 
               variant="outline" 
               onPress={() => setLocale(locale === 'en' ? 'ar' : 'en')} 
               style={{ height: 32, paddingHorizontal: 12 }}
            />
          </View>
          
          <View style={styles.divider} />

          {/* Notifications */}
          <View style={[styles.menuItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
             <View style={[styles.iconBox, { backgroundColor: COLORS.background }]}>
              <Bell size={20} color={COLORS.text} />
            </View>
            <Text style={{ flex: 1, marginHorizontal: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('profile.notifications')}</Text>
            <Switch value={true} trackColor={{ true: COLORS.primary }} />
          </View>
        </Card>

        <View style={{ marginTop: SPACING.xl }}>
          <Button 
            title={t('common.logout')} 
            onPress={logout} 
            variant="danger" 
            icon={<LogOut size={18} color="white" />}
          />
        </View>
      </ScrollView>

      {/* QR Modal */}
      <Modal visible={showQR} transparent animationType="fade" onRequestClose={() => setShowQR(false)}>
        <View style={styles.qrOverlay}>
          <View style={styles.qrCard}>
            <TouchableOpacity style={styles.closeQR} onPress={() => setShowQR(false)}>
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text variant="h2" style={{ marginBottom: SPACING.m }}>{t('wallet.my_qr')}</Text>
            <View style={styles.qrPlaceholder}>
              <QrCode size={150} color={COLORS.background} />
            </View>
            <Text weight="bold" style={{ marginTop: SPACING.m, fontSize: 18 }}>{MOCK_USER.username}</Text>
            <Text variant="caption" style={{ color: COLORS.textSecondary, marginTop: 4 }}>{t('profile.qr_desc')}</Text>
          </View>
        </View>
      </Modal>
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
  profileCard: {
    padding: SPACING.l,
    marginBottom: SPACING.l,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
  },
  usernameBadge: {
    marginTop: 4,
    backgroundColor: 'rgba(110, 243, 197, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.s,
    alignItems: 'center',
  },
  qrButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsCard: {
    padding: SPACING.m,
    marginBottom: SPACING.l,
  },
  menuCard: {
    padding: SPACING.m,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: SPACING.s,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.s,
  },
  qrOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCard: {
    width: '80%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.l,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  closeQR: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.m,
  }
});
