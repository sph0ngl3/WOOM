import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { MapPlaceholder } from '../../src/components/MapPlaceholder';
import { Card } from '../../src/components/Card';
import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { useRouter } from 'expo-router';
import { Navigation } from 'lucide-react-native';

export default function DriverActiveRideScreen() {
  const { t, isRTL } = useLocale();
  const router = useRouter();

  return (
    <Screen safeArea={false}>
      <View style={{ flex: 1 }}>
        <MapPlaceholder />
      </View>

      <View style={styles.bottomSheet}>
        <Text variant="h3" style={{ marginBottom: SPACING.m }}>Current Ride</Text>
        
        <Card style={styles.infoCard} variant="flat">
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Navigation size={20} color={COLORS.primary} />
            <View>
              <Text variant="caption">{t('pickup')}</Text>
              <Text weight="medium">Downtown Market</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Navigation size={20} color={COLORS.driverAccent} />
            <View>
              <Text variant="caption">{t('dropoff')}</Text>
              <Text weight="medium">45 West Side Ave</Text>
            </View>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', gap: SPACING.m, marginTop: SPACING.l }}>
          <Button 
            title={t('pickedUp')} 
            style={{ flex: 1, backgroundColor: COLORS.primary }} 
            onPress={() => {}} 
          />
          <Button 
            title={t('delivered')} 
            style={{ flex: 1, backgroundColor: COLORS.success }} 
            onPress={() => router.back()} 
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    borderTopLeftRadius: RADIUS.l,
    borderTopRightRadius: RADIUS.l,
    elevation: 10,
  },
  infoCard: {
    padding: SPACING.m,
  },
  row: {
    alignItems: 'center',
    gap: SPACING.m,
    paddingVertical: SPACING.s,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.s,
  }
});
