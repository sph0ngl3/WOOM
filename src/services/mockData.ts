import { Order, User, DriverStats, BusinessStats, Transaction, CreditPackage } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  username: '@johndoe',
  name: 'John Doe',
  role: 'user',
  balance: 150.00,
  woomPoints: 450,
  avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  email: 'john@example.com'
};

export const MOCK_DRIVER: User = {
  id: 'd1',
  username: '@ahmed_driver',
  name: 'Ahmed Driver',
  role: 'driver',
  balance: 320.50,
  woomPoints: 120,
  rating: 4.8,
  vehicle: 'Toyota Camry (White)',
  avatarUrl: 'https://i.pravatar.cc/150?u=d1',
};

export const MOCK_BUSINESS: User = {
  id: 'b1',
  username: '@burgerking_downtown',
  name: 'Burger King',
  role: 'business',
  balance: 1250.00,
  woomPoints: 0,
  email: 'manager@burgerking.com',
  performanceScore: 4.8
};

export const MOCK_DRIVER_STATS: DriverStats = {
  todayEarnings: 85.50,
  totalRides: 12,
  onlineTime: 240,
  isOnline: true,
  rating: 4.9
};

export const MOCK_BUSINESS_STATS: BusinessStats = {
  activeOrders: 5,
  totalCredits: 1200,
  usedCredits: 350,
  dailyRevenue: 450.00,
  performanceScore: 4.8
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    customerName: 'Alice Smith',
    price: 25.00,
    status: 'pending',
    createdAt: new Date().toISOString(),
    pickupLocation: { latitude: 0, longitude: 0, address: '123 Main St' },
    dropoffLocation: { latitude: 0, longitude: 0, address: '456 Market St' },
    distance: '5.2 km',
    duration: '15 min',
    items: '2x Burger, 1x Fries'
  },
  {
    id: 'o2',
    customerName: 'Bob Jones',
    price: 18.50,
    status: 'accepted',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    pickupLocation: { latitude: 0, longitude: 0, address: '789 Park Ave' },
    dropoffLocation: { latitude: 0, longitude: 0, address: '321 Elm St' },
    driverId: 'd1',
    driverName: 'Ahmed Driver',
    driverRating: 4.8,
    distance: '3.1 km',
    duration: '10 min',
    items: 'Document Package'
  },
  {
    id: 'o3',
    customerName: 'Sarah Connor',
    price: 42.00,
    status: 'delivered',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pickupLocation: { latitude: 0, longitude: 0, address: 'Tech Hub' },
    dropoffLocation: { latitude: 0, longitude: 0, address: 'Suburbs' },
    driverId: 'd2',
    driverName: 'Mike T.',
    driverRating: 4.5,
    distance: '12 km',
    duration: '35 min',
    items: 'Electronics'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', amount: 25.00, date: '2023-10-25', type: 'debit', description: 'Ride to Downtown' },
  { id: 't2', amount: 50.00, date: '2023-10-24', type: 'credit', description: 'Wallet Top-up' },
  { id: 't3', amount: 15.50, date: '2023-10-23', type: 'debit', description: 'Lunch Delivery' },
  { id: 't4', amount: 100, date: '2023-10-22', type: 'credit', description: 'Points Earned', isPointTransaction: true },
];

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: 'cp1', name: 'Starter', credits: 100, price: 10, installments: 1 },
  { id: 'cp2', name: 'Pro', credits: 500, price: 45, installments: 3 },
  { id: 'cp3', name: 'Bulk', credits: 2000, price: 160, installments: 5 },
];
