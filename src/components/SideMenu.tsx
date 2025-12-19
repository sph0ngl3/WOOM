import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from './Text';
import { COLORS, SPACING } from '../constants/theme';
import { useLocale } from '../context/LocaleContext';
import { X, HelpCircle, Info, Shield, Clock } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SideMenu({ visible, onClose }: SideMenuProps) {
  const { t, isRTL } = useLocale();
  const { user } = useAuth();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.menu}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text variant="h2">WOOM</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text variant="h3">{user?.name}</Text>
            <Text variant="caption" color={COLORS.primary}>{user?.username}</Text>
          </View>

          <View style={styles.items}>
            <MenuItem icon={Clock} label={t('profile.menu_rides')} />
            <MenuItem icon={HelpCircle} label={t('profile.menu_support')} />
            <MenuItem icon={Info} label={t('profile.menu_about')} />
            <MenuItem icon={Shield} label={t('profile.menu_legal')} />
          </View>

          <View style={styles.footer}>
            <Text variant="caption" color={COLORS.textSecondary}>v1.0.0 (Production)</Text>
          </View>
        </View>
        
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const MenuItem = ({ icon: Icon, label }: { icon: any, label: string }) => {
  const { isRTL } = useLocale();
  return (
    <TouchableOpacity style={[styles.item, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <Icon size={20} color={COLORS.textSecondary} />
      <Text style={{ marginHorizontal: SPACING.m }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    width: '75%',
    backgroundColor: COLORS.background,
    height: '100%',
    padding: SPACING.l,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  backdrop: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.xl,
  },
  userInfo: {
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  items: {
    gap: SPACING.l,
  },
  item: {
    alignItems: 'center',
    paddingVertical: SPACING.s,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  }
});
