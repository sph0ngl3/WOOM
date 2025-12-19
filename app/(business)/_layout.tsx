import { Tabs } from 'expo-router';
import { LayoutGrid, ShoppingBag, User as UserIcon, Wallet } from 'lucide-react-native';
import { COLORS } from '../../src/constants/theme';
import { useLocale } from '../../src/context/LocaleContext';
import { Text } from 'react-native';

export default function BusinessLayout() {
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
          title: t('nav.dashboard'),
          tabBarLabel: renderLabel(t('nav.dashboard')),
          tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: t('nav.orders'),
          tabBarLabel: renderLabel(t('nav.orders')),
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
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
          title: t('nav.settings'),
          tabBarLabel: renderLabel(t('nav.settings')),
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="credits" options={{ href: null }} />
      <Tabs.Screen name="order-detail" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="buy-credits" options={{ href: null, tabBarStyle: { display: 'none' } }} />
    </Tabs>
  );
}
