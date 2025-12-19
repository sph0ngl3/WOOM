import { Tabs } from 'expo-router';
import { Home, List, User as UserIcon, Wallet } from 'lucide-react-native';
import { COLORS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { Text } from 'react-native';

export default function DriverLayout() {
  const { t } = useLocale();
  
  const renderLabel = (label: string) => ({ color }: { color: string }) => (
    <Text style={{ color, fontSize: 10, fontWeight: 'bold' }}>{label}</Text>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.home'),
          tabBarLabel: renderLabel(t('nav.home')),
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('nav.orders'),
          tabBarLabel: renderLabel(t('nav.orders')),
          tabBarIcon: ({ color }) => <List size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: t('nav.wallet'),
          tabBarLabel: renderLabel(t('nav.wallet')),
          tabBarIcon: ({ color }) => <Wallet size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('nav.profile'),
          tabBarLabel: renderLabel(t('nav.profile')),
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="active-ride" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="ride-detail" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="withdraw" options={{ href: null, tabBarStyle: { display: 'none' } }} />
    </Tabs>
  );
}
