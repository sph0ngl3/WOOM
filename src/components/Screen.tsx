import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle, StatusBar } from 'react-native';
import { COLORS } from '../constants/theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  backgroundColor?: string;
}

export function Screen({ children, style, safeArea = true, backgroundColor = COLORS.background }: ScreenProps) {
  const Container = safeArea ? SafeAreaView : View;
  
  return (
    <Container style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={[styles.content, style]}>
        {children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
