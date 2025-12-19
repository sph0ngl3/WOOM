import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { useAuth } from '../../src/context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { MOCK_DRIVER } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { LogOut, Car, Star, FileText, CheckCircle2, AlertCircle, Shield } from 'lucide-react-native';

export default function DriverProfileScreen() {
  const { logout } = useAuth();
  const { t, isRTL } = useLocale();

  const documents = [
    { id: 1, name: 'license', status: 'verified' },
    { id: 2, name: 'insurance', status: 'expiring' },
    { id: 3, name: 'identity', status: 'verified' },
  ];

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('profile')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Image source={{ uri: MOCK_DRIVER.avatarUrl }} style={styles.avatar} />
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text variant="h3">{MOCK_DRIVER.name}</Text>
              <Text variant="caption">ID: {MOCK_DRIVER.id.toUpperCase()}</Text>
              <View style={[styles.ratingBadge, { flexDirection: 'row' }]}>
                <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                <Text weight="bold" style={{ marginLeft: 4 }}>{MOCK_DRIVER.rating}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Vehicle Info */}
        <Text variant="h3" style={{ marginBottom: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('vehicle')}</Text>
        <Card style={styles.sectionCard}>
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.iconBox}>
              <Car size={24} color={COLORS.driverAccent} />
            </View>
            <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text weight="bold">{MOCK_DRIVER.vehicle}</Text>
              <Text variant="caption">Plate: 34 ABC 123</Text>
            </View>
          </View>
        </Card>

        {/* Documents */}
        <Text variant="h3" style={{ marginBottom: SPACING.m, marginTop: SPACING.l, textAlign: isRTL ? 'right' : 'left' }}>{t('documents')}</Text>
        <Card style={styles.sectionCard}>
          {documents.map((doc, index) => (
            <View key={doc.id}>
              <View style={[styles.docRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <FileText size={20} color={COLORS.textSecondary} />
                <Text style={{ flex: 1, marginHorizontal: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>
                  {t(doc.name as any)}
                </Text>
                {doc.status === 'verified' ? (
                  <View style={[styles.statusPill, { backgroundColor: COLORS.success + '20' }]}>
                    <CheckCircle2 size={14} color={COLORS.success} />
                    <Text variant="caption" color={COLORS.success} style={{ marginLeft: 4 }}>{t('verified')}</Text>
                  </View>
                ) : (
                  <View style={[styles.statusPill, { backgroundColor: COLORS.warning + '20' }]}>
                    <AlertCircle size={14} color={COLORS.warning} />
                    <Text variant="caption" color={COLORS.warning} style={{ marginLeft: 4 }}>{t('expiring')}</Text>
                  </View>
                )}
              </View>
              {index < documents.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>

        <View style={{ marginTop: SPACING.xl }}>
          <Button 
            title={t('logout')} 
            onPress={logout} 
            variant="danger" 
            icon={<LogOut size={18} color="white" />}
          />
        </View>
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
  profileCard: {
    padding: SPACING.l,
    marginBottom: SPACING.l,
    backgroundColor: COLORS.surface,
  },
  profileRow: {
    alignItems: 'center',
    gap: SPACING.m,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.background,
  },
  ratingBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginTop: SPACING.s,
    alignItems: 'center',
  },
  sectionCard: {
    padding: SPACING.m,
  },
  row: {
    alignItems: 'center',
    gap: SPACING.m,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.driverAccent + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docRow: {
    alignItems: 'center',
    paddingVertical: SPACING.s,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  }
});
