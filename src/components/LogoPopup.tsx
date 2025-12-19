import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { Text } from './Text';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Users, CheckCircle } from 'lucide-react-native';
import { useLocale } from '../context/LocaleContext';
import { APP_CONSTANTS } from '../constants/app';

interface LogoPopupProps {
  visible: boolean;
  onClose: () => void;
}

export function LogoPopup({ visible, onClose }: LogoPopupProps) {
  const { t } = useLocale();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <View style={styles.header}>
                <Image 
                  source={{ uri: APP_CONSTANTS.LOGO_URL }} 
                  style={styles.logo} 
                  resizeMode="contain" 
                />
                <Text variant="h2" style={{ marginLeft: SPACING.s }}></Text>
              </View>
              
              <Text style={styles.vision}>{t('popup.vision')}</Text>
              
              <View style={styles.divider} />

              <Text variant="caption" style={styles.sectionTitle}>{t('popup.live_stats')}</Text>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Users size={24} color={COLORS.primary} />
                  <Text weight="bold" style={styles.statNumber}>12.5k</Text>
                  <Text variant="caption" style={styles.statLabel}>{t('popup.active_users')}</Text>
                </View>
                <View style={styles.statItem}>
                  <CheckCircle size={24} color={COLORS.businessAccent} />
                  <Text weight="bold" style={styles.statNumber}>840k</Text>
                  <Text variant="caption" style={styles.statLabel}>{t('popup.completed_rides')}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80, // Positioned near top
  },
  popup: {
    width: '85%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.l,
    padding: SPACING.l,
    alignItems: 'center',
    ...SHADOWS.glow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: COLORS.primary,
  },
  vision: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: SPACING.m,
    fontStyle: 'italic',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    marginTop: 4,
    color: COLORS.text,
  },
  statLabel: {
    color: COLORS.textSecondary,
    marginTop: 2,
  }
});
