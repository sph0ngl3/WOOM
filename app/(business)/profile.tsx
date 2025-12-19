import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { useAuth } from '../../src/context/AuthContext';
import { COLORS, SPACING } from '../../src/constants/theme';
import { MOCK_BUSINESS } from '../../src/services/mockData';
import { useLocale } from '../../src/context/LocaleContext';
import { Globe } from 'lucide-react-native';

export default function BusinessProfileScreen() {
  const { logout } = useAuth();
  const { t, setLocale, locale } = useLocale();

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="h2">{t('settings')}</Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <Text variant="h3">{MOCK_BUSINESS.name}</Text>
          <Text variant="caption">{MOCK_BUSINESS.email}</Text>
        </Card>

        <Card style={styles.settingCard}>
          <View style={styles.row}>
            <Globe size={20} color={COLORS.text} />
            <Text style={{ flex: 1, marginLeft: SPACING.m }}>{t('language')}</Text>
            <Button 
               title={locale.toUpperCase()} 
               variant="outline" 
               onPress={() => setLocale(locale === 'en' ? 'ar' : 'en')} 
               style={{ height: 32, paddingHorizontal: 12 }}
            />
          </View>
        </Card>

        <Card style={styles.settingCard}>
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>{t('notifications')}</Text>
            <Switch value={true} trackColor={{ true: COLORS.businessAccent }} />
          </View>
        </Card>

        <View style={{ flex: 1 }} />

        <Button title={t('logout')} onPress={logout} variant="danger" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.surface,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
    gap: SPACING.m,
  },
  profileCard: {
    padding: SPACING.l,
    marginBottom: SPACING.m,
  },
  settingCard: {
    padding: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
