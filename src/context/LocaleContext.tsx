import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import ar from '../locales/ar';

// Type definition for nested keys
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKeys = NestedKeyOf<typeof en>;
type Locale = 'en' | 'ar';

const translations = {
  en,
  ar,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Helper to safely access nested keys
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = (key: string): string => {
    const value = getNestedValue(translations[locale], key);
    // Return the value if found and is a string, otherwise return the key as fallback
    // This prevents crashing if an object is returned
    return typeof value === 'string' ? value : key;
  };

  const isRTL = locale === 'ar';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
