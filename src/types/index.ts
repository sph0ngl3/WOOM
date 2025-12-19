export type UserRole = 'user' | 'driver' | 'business';

export type OrderStatus = 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';

export interface User {
  id: string;
  username: string; // Unique handle (@username)
  name: string;
  role: UserRole;
  avatarUrl?: string;
  balance: number;
  woomPoints: number; // Internal points system
  rating?: number;
  vehicle?: string;
  email?: string;
  performanceScore?: number; // 1-5 for Business
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Order {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  price: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  driverId?: string;
  driverName?: string;
  driverRating?: number;
  distance?: string;
  duration?: string;
  items?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  description: string;
  isPointTransaction?: boolean;
}

export interface DriverStats {
  todayEarnings: number;
  totalRides: number;
  onlineTime: number; // in minutes
  isOnline: boolean;
  rating: number;
}

export interface BusinessStats {
  activeOrders: number;
  totalCredits: number;
  usedCredits: number;
  dailyRevenue: number;
  performanceScore: number;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  installments?: number; // Max installments allowed
}
