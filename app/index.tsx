import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Text } from '../src/components/Text';
import { Button } from '../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../src/constants/theme';
import { useAuth } from '../src/context/AuthContext';
import { useLocale } from '../src/context/LocaleContext';
import { Globe } from 'lucide-react-native';
import { APP_CONSTANTS } from '../src/constants/app';

export default function LandingScreen() {
  const { login } = useAuth();
  const { setLocale, locale, t } = useLocale();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Button 
          title={locale.toUpperCase()} 
          onPress={toggleLanguage} 
          variant="outline" 
          style={styles.langBtn}
          icon={<Globe size={16} color={COLORS.primary} />}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Image 
              source={{ uri: APP_CONSTANTS.LOGO_URL }} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
          <Text variant="h1" style={styles.title}>WOOM</Text>
          <Text style={styles.subtitle}>{t('common.welcome')}</Text>
        </View>

        <View style={styles.actions}>
          <Button 
            title={`${t('roles.user')} ${t('common.login')}`} 
            onPress={() => login('user')} 
            style={styles.btn}
          />
          <Button 
            title={`${t('roles.driver')} ${t('common.login')}`} 
            onPress={() => login('driver')} 
            variant="secondary"
            style={styles.btn}
          />
          <Button 
            title={`${t('roles.business')} ${t('common.login')}`} 
            onPress={() => login('business')} 
            variant="outline"
            style={styles.btn}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.l,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: SPACING.xl,
  },
  langBtn: {
    width: 100,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl * 2,
  },
  logoBox: {
    width: 100,
    height: 100,
    marginBottom: SPACING.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: COLORS.primary,
  },
  title: {
    fontSize: 42,
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
  },
  actions: {
    gap: SPACING.m,
  },
  btn: {
    width: '100%',
  }
});
