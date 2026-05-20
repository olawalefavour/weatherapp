import React, { useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useWeatherStore } from '../store/weatherStore';

const RootLayout = () => {
  const loadCities = useWeatherStore((state) => state.loadCities);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});

export default RootLayout;