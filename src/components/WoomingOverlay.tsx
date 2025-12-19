import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import { Text } from './Text';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { Navigation } from 'lucide-react-native';
import { useLocale } from '../context/LocaleContext';
import { APP_CONSTANTS } from '../constants/app';

interface WoomingOverlayProps {
  visible: boolean;
  state: 'wooming' | 'confirmed';
  onClose: () => void;
}

export function WoomingOverlay({ visible, state, onClose }: WoomingOverlayProps) {
  const { t } = useLocale();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && state === 'wooming') {
      // Pulse Animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();

      // Rotate Animation (Gentle spin)
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [visible, state]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        {state === 'wooming' ? (
          <View style={styles.centerContent}>
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
               <Image 
                 source={{ uri: APP_CONSTANTS.LOGO_URL }} 
                 style={{ width: 80, height: 80, tintColor: COLORS.background }} 
                 resizeMode="contain" 
               />
            </Animated.View>
            <Text variant="h1" style={styles.woomingText}>{t('business.wooming')}</Text>
          </View>
        ) : (
          <View style={styles.confirmedCard}>
            <View style={styles.iconCircle}>
              <Navigation size={32} color={COLORS.background} />
            </View>
            <Text variant="h2" style={{ marginTop: SPACING.m }}>{t('business.courier_found')}</Text>
            <Text style={{ color: COLORS.textSecondary, marginTop: SPACING.s }}>{t('business.courier_arriving')}</Text>
            
            <View style={styles.etaContainer}>
              <Text variant="h1" color={COLORS.primary}>4 min</Text>
              <Text variant="caption">{t('home.eta')}</Text>
            </View>

            <TouchableOpacity style={styles.trackButton} onPress={onClose}>
              <Text weight="bold" style={{ color: COLORS.background }}>{t('business.track_courier')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ marginTop: SPACING.m }} onPress={onClose}>
              <Text style={{ color: COLORS.textSecondary }}>{t('common.close')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(14, 27, 30, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  woomingText: {
    fontSize: 32,
    letterSpacing: 2,
    color: COLORS.text,
  },
  confirmedCard: {
    width: '85%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.m,
  },
  etaContainer: {
    marginVertical: SPACING.l,
    alignItems: 'center',
  },
  trackButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.full,
    width: '100%',
    alignItems: 'center',
  }
});
