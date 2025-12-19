import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MOCK_ORDERS } from '../../src/services/mockData';
import { ArrowLeft, MoreVertical, Check, Phone, Home, Store } from 'lucide-react-native';

export default function BusinessOrderDetailScreen() {
  const { t, isRTL } = useLocale();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text variant="h3" weight="bold">Order #{order.id}</Text>
        <TouchableOpacity>
          <MoreVertical size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          {/* Step 1: Assigned */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.checkCircle}>
                <Check size={12} color={COLORS.background} strokeWidth={4} />
              </View>
              <View style={[styles.line, { backgroundColor: COLORS.primary }]} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.rowBetween}>
                <Text weight="bold" style={{ fontSize: 16 }}>Assigned</Text>
                <Text variant="caption" style={{ color: COLORS.textSecondary }}>10:05 AM</Text>
              </View>
              <Text variant="caption" style={{ color: COLORS.textSecondary, marginTop: 2 }}>Order confirmed and driver assigned.</Text>
            </View>
          </View>

          {/* Step 2: Picked Up */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.activeCircle} />
              <View style={[styles.line, { backgroundColor: COLORS.border }]} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.rowBetween}>
                <Text weight="bold" style={{ fontSize: 16 }}>Picked Up</Text>
                <Text variant="caption" style={{ color: COLORS.textSecondary }}>Est. 10:20 AM</Text>
              </View>
              <Text variant="caption" style={{ color: COLORS.textSecondary, marginTop: 2 }}>Driver arriving at pickup location.</Text>
            </View>
          </View>

          {/* Step 3: Delivered */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.inactiveCircle} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.rowBetween}>
                <Text weight="medium" style={{ fontSize: 16, color: COLORS.textSecondary }}>Delivered</Text>
                <Text variant="caption" style={{ color: COLORS.textSecondary }}>Est. 10:45 AM</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Locations */}
        <View style={styles.locationSection}>
          {/* Pickup */}
          <View style={styles.locationItem}>
            <View style={styles.iconBox}>
              <Home size={20} color={COLORS.primary} />
            </View>
            <View style={styles.locationText}>
              <Text variant="caption" style={{ color: COLORS.textSecondary, textTransform: 'uppercase' }}>PICKUP</Text>
              <Text weight="bold" style={{ marginTop: 2 }}>Warehouse A, Sector 4</Text>
              <Text variant="caption" style={{ color: COLORS.textSecondary }}>14 Industrial Parkway, North District</Text>
            </View>
          </View>

          {/* Connector */}
          <View style={styles.locationConnector} />

          {/* Dropoff */}
          <View style={styles.locationItem}>
            <View style={styles.iconBox}>
              <Store size={20} color={COLORS.primary} />
            </View>
            <View style={styles.locationText}>
              <Text variant="caption" style={{ color: COLORS.textSecondary, textTransform: 'uppercase' }}>DROP-OFF</Text>
              <Text weight="bold" style={{ marginTop: 2 }}>Retail Store 12, Main St.</Text>
              <Text variant="caption" style={{ color: COLORS.textSecondary }}>882 Main Street, City Center</Text>
            </View>
          </View>
        </View>

        {/* Driver Card */}
        <Card style={styles.driverCard}>
          <View style={styles.driverRow}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=d1' }} 
              style={styles.avatar} 
            />
            <View style={styles.driverInfo}>
              <Text weight="bold" style={{ fontSize: 16 }}>Alex M.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text variant="caption" style={{ color: COLORS.textSecondary }}>Van • 4.9 ★</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Credits Used */}
        <Card style={styles.creditsCard} variant="outlined">
          <Text weight="medium">Credits Used</Text>
          <Text weight="bold" style={{ color: COLORS.primary, fontSize: 18 }}>-45.00</Text>
        </Card>

      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button 
          title="Cancel" 
          variant="outline" 
          onPress={() => {}} 
          style={{ flex: 1, borderColor: COLORS.border, backgroundColor: 'transparent' }}
        />
        <View style={{ width: SPACING.m }} />
        <Button 
          title="Re-dispatch" 
          variant="primary" 
          onPress={() => {}} 
          style={{ flex: 1 }}
          icon={<View style={{ marginRight: 8 }}><Check size={16} color={COLORS.background} /></View>}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.l,
  },
  timelineSection: {
    marginBottom: SPACING.l,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 30,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  inactiveCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  timelineContent: {
    flex: 1,
    marginLeft: SPACING.m,
    paddingBottom: SPACING.l,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.l,
  },
  locationSection: {
    marginBottom: SPACING.l,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  locationText: {
    flex: 1,
  },
  locationConnector: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.border,
    marginLeft: 19, // Center with iconBox (40/2 - 1)
    marginVertical: 4,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  driverCard: {
    padding: SPACING.m,
    backgroundColor: COLORS.surfaceHighlight,
    marginBottom: SPACING.m,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: SPACING.m,
  },
  driverInfo: {
    flex: 1,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 210, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    backgroundColor: 'transparent',
    borderColor: COLORS.border,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: SPACING.l,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  }
});
