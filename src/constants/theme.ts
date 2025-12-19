export const COLORS = {
  // STRICT GLOBAL PALETTE
  background: '#0E1B1E', // Primary Dark
  surface: '#16272D',    // Secondary Surface (Headers, Tabs)
  card: '#1F343B',       // Card Surface
  
  primary: '#6EF3C5',    // Mint (Primary Action)
  secondary: '#2ED3C6',  // Secondary Accent
  
  warning: '#F4C430',    // Yellow (Pickup/Warning)
  error: '#EF4444',      // Red (Destructive)
  success: '#4ADE80',    // Green
  
  text: '#EAF6F7',       // Primary Text
  textSecondary: '#9FB3B8', // Muted Text
  
  border: '#1E353A',     // Soft Divider
  disabled: '#4B5F65',   // Disabled state
  
  // Role Specific (Aliases for semantic usage)
  driverAccent: '#F4C430', // Yellow for driver actions
  businessAccent: '#2ED3C6', // Teal for business
  
  // UI Specifics
  overlay: 'rgba(14, 27, 30, 0.95)',
  backdrop: 'rgba(0,0,0,0.7)',
  transparent: 'transparent',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: '#6EF3C5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  }
};
