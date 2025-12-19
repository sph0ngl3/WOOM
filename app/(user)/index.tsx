import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Modal, Image, Alert } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Text } from '../../src/components/Text';
import { MapPlaceholder } from '../../src/components/MapPlaceholder';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { Menu, Search, Bell, Home, Briefcase, Dumbbell, Bike, Car, Package, X, Navigation, MapPin, Heart, Utensils, Map as MapIcon, Share2 } from 'lucide-react-native';
import { LogoPopup } from '../../src/components/LogoPopup';
import { SideMenu } from '../../src/components/SideMenu';
import { ModuleCard } from '../../src/components/ModuleCard';
import { APP_CONSTANTS } from '../../src/constants/app';

type RideState = 'idle' | 'selecting' | 'searching' | 'arriving';

export default function UserHomeScreen() {
  const { t, isRTL } = useLocale();
  const [rideState, setRideState] = useState<RideState>('idle');
  const [selectedService, setSelectedService] = useState<'moto' | 'car' | 'pickup' | null>(null);
  const [showLogoPopup, setShowLogoPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const resetFlow = () => {
    setRideState('idle');
    setSelectedService(null);
  };

  useEffect(() => {
    if (rideState === 'searching') {
      const timer = setTimeout(() => {
        setRideState('arriving');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [rideState]);

  const handleComingSoon = () => {
    Alert.alert(t('common.coming_soon'), t('common.coming_soon_msg'), [{ text: t('common.ok') }]);
  };

  const QuickDest = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <TouchableOpacity 
      style={styles.quickPill}
      onPress={() => {
        if (rideState === 'idle') {
          setRideState('selecting');
          setSelectedService('car');
        }
      }}
    >
      <Icon size={14} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
      <Text variant="caption" weight="bold" style={{ color: COLORS.text }}>{label}</Text>
    </TouchableOpacity>
  );

  const ServiceCard = ({ id, icon: Icon, label, price, desc }: { id: string, icon: any, label: string, price: string, desc: string }) => (
    <TouchableOpacity 
      style={[
        styles.serviceCard, 
        selectedService === id && styles.serviceCardActive
      ]}
      onPress={() => setSelectedService(id as any)}
      activeOpacity={0.8}
    >
      <View style={[
        styles.serviceIconBox,
        selectedService === id && { backgroundColor: COLORS.primary }
      ]}>
        <Icon 
          size={24} 
          color={selectedService === id ? COLORS.background : COLORS.primary} 
        />
      </View>
      <Text weight="bold" style={{ marginTop: SPACING.s }}>{label}</Text>
      <Text variant="caption" style={{ color: COLORS.textSecondary, marginBottom: 4 }}>{desc}</Text>
      <Text weight="bold" color={selectedService === id ? COLORS.primary : COLORS.text}>{price}</Text>
    </TouchableOpacity>
  );

  return (
    <Screen safeArea={false}>
      {/* Map Background */}
      <View style={StyleSheet.absoluteFill}>
        <MapPlaceholder />
      </View>

      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: 60, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowMenu(true)}>
          <Menu size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        {/* Logo Center - Tappable - Uses Remote Image */}
        <TouchableOpacity style={styles.logoContainer} onPress={() => setShowLogoPopup(true)}>
           <Image 
             source={{ uri: APP_CONSTANTS.LOGO_URL }} 
             style={{ width: 30, height: 30 }} 
             resizeMode="contain"
           />
           <Text weight="bold" style={{ marginLeft: 8, letterSpacing: 2, fontSize: 18 }}>WOOM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={() => {/* Open Notifications */}}>
          <View style={styles.badge} />
          <Bell size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* IDLE STATE UI */}
      {rideState === 'idle' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Search Bar */}
          <View style={{ paddingHorizontal: SPACING.l, marginTop: SPACING.m }}>
            <TouchableOpacity 
              style={[styles.searchBar, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
              onPress={() => setShowSearch(true)}
            >
              <Search size={20} color={COLORS.primary} />
              <Text style={[styles.searchText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('home.whereTo')}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Destinations */}
          <View style={styles.quickDestContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ paddingHorizontal: SPACING.l, gap: SPACING.s, flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <QuickDest icon={Home} label={t('home.quick_home')} />
              <QuickDest icon={Briefcase} label={t('home.quick_work')} />
              <QuickDest icon={Dumbbell} label={t('home.quick_gym')} />
            </ScrollView>
          </View>

          {/* Ecosystem Modules Stack - USER ONLY */}
          <View style={styles.modulesContainer}>
             {/* WOOMculture - Active */}
             <ModuleCard 
                title={t('modules.culture')} 
                description={t('modules.culture_desc')}
                icon={<Heart size={24} color={COLORS.primary} />}
                onPress={() => {}} 
             />
             
             {/* WOOMeats - Coming Soon */}
             <ModuleCard 
                title={t('modules.eats')} 
                description={t('modules.eats_desc')}
                icon={<Utensils size={24} color={COLORS.textSecondary} />}
                isComingSoon
                onPress={handleComingSoon}
             />

             {/* WOOMstreets - Coming Soon */}
             <ModuleCard 
                title={t('modules.streets')} 
                description={t('modules.streets_desc')}
                icon={<MapIcon size={24} color={COLORS.textSecondary} />}
                isComingSoon
                onPress={handleComingSoon}
             />

             {/* WOOMshare - Coming Soon */}
             <ModuleCard 
                title={t('modules.share')} 
                description={t('modules.share_desc')}
                icon={<Share2 size={24} color={COLORS.textSecondary} />}
                isComingSoon
                onPress={handleComingSoon}
             />
          </View>
        </ScrollView>
      )}

      {/* SELECTING STATE UI */}
      {rideState === 'selecting' && (
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingHorizontal: SPACING.l, marginBottom: SPACING.m }}>
            <Text variant="h3">{t('home.select_service')}</Text>
            <TouchableOpacity onPress={resetFlow}>
              <X size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: SPACING.l, gap: SPACING.m, flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <ServiceCard id="moto" icon={Bike} label={t('services.moto')} price="$4.00" desc={t('services.moto_desc')} />
            <ServiceCard id="car" icon={Car} label={t('services.car')} price="$9.50" desc={t('services.car_desc')} />
            <ServiceCard id="pickup" icon={Package} label={t('services.pickup')} price="$6.00" desc={t('services.pickup_desc')} />
          </ScrollView>

          <View style={{ padding: SPACING.l }}>
            <TouchableOpacity 
              style={[styles.requestBtn, !selectedService && { opacity: 0.5 }]}
              disabled={!selectedService}
              onPress={() => setRideState('searching')}
            >
              <Text weight="bold" style={{ color: COLORS.background, fontSize: 16 }}>
                {t('home.request_ride')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SEARCHING STATE UI */}
      {rideState === 'searching' && (
        <View style={styles.overlayCenter}>
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text weight="bold" style={{ marginTop: SPACING.m }}>{t('home.finding_driver')}</Text>
            <TouchableOpacity style={{ marginTop: SPACING.l }} onPress={resetFlow}>
              <Text variant="caption" color={COLORS.error}>{t('common.cancel').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ARRIVING STATE UI */}
      {rideState === 'arriving' && (
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={{ paddingHorizontal: SPACING.l, paddingBottom: SPACING.l }}>
            <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', marginBottom: SPACING.m }]}>
              <View>
                <Text variant="h3" color={COLORS.primary}>{t('home.driver_arriving')}</Text>
                <Text variant="caption">Toyota Camry • 34 ABC 123</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text weight="bold">2 min</Text>
                <Text variant="caption">{t('home.eta')}</Text>
              </View>
            </View>
            
            <View style={[styles.tripInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Navigation size={20} color={COLORS.textSecondary} />
              <Text style={{ marginHorizontal: SPACING.s }}>Downtown Market</Text>
            </View>

            <TouchableOpacity 
              style={[styles.requestBtn, { backgroundColor: COLORS.error, marginTop: SPACING.l }]}
              onPress={resetFlow}
            >
              <Text weight="bold" style={{ color: 'white' }}>{t('common.cancel').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Search Modal */}
      <Modal visible={showSearch} animationType="slide" onRequestClose={() => setShowSearch(false)}>
        <View style={[styles.searchModal, { backgroundColor: COLORS.background }]}>
          <View style={[styles.searchHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TextInput 
              style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
              placeholder={t('home.search_placeholder')}
              placeholderTextColor={COLORS.textSecondary}
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView contentContainerStyle={{ padding: SPACING.l }}>
            <Text variant="caption" style={{ marginBottom: SPACING.m, textAlign: isRTL ? 'right' : 'left' }}>{t('home.recent_places')}</Text>
            {[1,2,3,4].map(i => (
              <TouchableOpacity 
                key={i} 
                style={[styles.searchResult, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                onPress={() => {
                  setShowSearch(false);
                  setRideState('selecting');
                  setSelectedService('car');
                }}
              >
                <View style={styles.pinBox}>
                  <MapPin size={16} color={COLORS.text} />
                </View>
                <View style={{ flex: 1, marginHorizontal: SPACING.m, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                  <Text weight="bold">Location Result {i}</Text>
                  <Text variant="caption">123 Street Name, City</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <LogoPopup visible={showLogoPopup} onClose={() => setShowLogoPopup(false)} />
      <SideMenu visible={showMenu} onClose={() => setShowMenu(false)} />

    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 27, 30, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    zIndex: 10,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  searchBar: {
    height: 50,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  searchText: {
    marginLeft: SPACING.s,
    marginRight: SPACING.s,
    color: COLORS.textSecondary,
    flex: 1,
    fontSize: 16,
  },
  quickDestContainer: {
    marginTop: SPACING.m,
  },
  quickPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.m,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modulesContainer: {
    padding: SPACING.l,
    marginTop: SPACING.s,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingVertical: SPACING.l,
    ...SHADOWS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.l,
  },
  serviceCard: {
    width: 120,
    height: 140,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.l,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(110, 243, 197, 0.05)',
  },
  serviceIconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(110, 243, 197, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.glow,
  },
  overlayCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 27, 30, 0.8)',
  },
  loaderBox: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.l,
    alignItems: 'center',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripInfo: {
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: RADIUS.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchModal: {
    flex: 1,
    paddingTop: 60,
  },
  searchHeader: {
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.m,
    marginRight: SPACING.m,
    fontSize: 18,
    color: COLORS.text,
    fontFamily: 'Inter_500Medium',
  },
  searchResult: {
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  pinBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
