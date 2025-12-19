import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { useRouter } from 'expo-router';
import { MOCK_DRIVER } from '../../src/services/mockData';

export default function DriverWithdrawScreen() {
  const { t } = useLocale();
  const router = useRouter();
  const [amount, setAmount] = useState('');

  return (
    <Screen>
      <View style={styles.header}>
        <Button title="Back" variant="outline" onPress={() => router.back()} style={{ width: 80 }} />
        <Text variant="h2" style={{ marginTop: SPACING.m }}>{t('withdraw')}</Text>
      </View>

      <View style={styles.content}>
        <Text>{t('available')}: ${MOCK_DRIVER.balance.toFixed(2)}</Text>
        
        <View style={styles.inputContainer}>
          <Text variant="h2">$</Text>
          <TextInput 
            style={styles.input} 
            value={amount} 
            onChangeText={setAmount} 
            keyboardType="numeric" 
            placeholder="0.00"
          />
        </View>

        <View style={styles.presets}>
          {[50, 100, 200].map(val => (
            <Button 
              key={val} 
              title={`$${val}`} 
              variant="outline" 
              onPress={() => setAmount(val.toString())} 
              style={{ flex: 1 }}
            />
          ))}
        </View>

        <Button 
          title={t('confirm')} 
          onPress={() => router.back()} 
          style={{ marginTop: SPACING.xl, backgroundColor: COLORS.driverAccent }} 
        />
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
    padding: SPACING.l,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    marginVertical: SPACING.xl,
    paddingBottom: SPACING.s,
  },
  input: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: SPACING.s,
    flex: 1,
  },
  presets: {
    flexDirection: 'row',
    gap: SPACING.m,
  }
});
