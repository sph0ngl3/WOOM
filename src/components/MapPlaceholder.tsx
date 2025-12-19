import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { Car, Bike } from 'lucide-react-native';

export function MapPlaceholder() {
  return (
    <View style={styles.container}>
      {/* Grid Pattern */}
      <View style={styles.gridContainer}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLineVertical, { left: `${i * 14}%` }]} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLineHorizontal, { top: `${i * 10}%` }]} />
        ))}
      </View>

      {/* Roads (Abstract) */}
      <View style={[styles.road, { top: '35%', height: 20, transform: [{ rotate: '12deg' }] }]} />
      <View style={[styles.road, { left: '45%', width: 20, height: '120%', top: -20, transform: [{ rotate: '-5deg' }] }]} />

      {/* User Location Pulse */}
      <View style={styles.userLocation}>
        <View style={styles.userPulse} />
        <View style={styles.userDot} />
      </View>

      {/* Nearby Drivers */}
      <View style={[styles.driverMarker, { top: '28%', left: '32%' }]}>
        <View style={styles.markerBg}>
          <Bike size={12} color={COLORS.background} />
        </View>
      </View>

      <View style={[styles.driverMarker, { top: '52%', right: '25%' }]}>
        <View style={styles.markerBg}>
          <Car size={12} color={COLORS.background} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#112126', // Slightly lighter than background for contrast
    overflow: 'hidden',
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#2A4048',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#2A4048',
  },
  road: {
    position: 'absolute',
    width: '120%',
    left: '-10%',
    backgroundColor: '#1A2E35',
  },
  userLocation: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -12,
    marginTop: -12,
  },
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(110, 243, 197, 0.15)',
  },
  driverMarker: {
    position: 'absolute',
  },
  markerBg: {
    backgroundColor: COLORS.secondary,
    padding: 4,
    borderRadius: 8,
  }
});
