import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
import { StyleSheet } from 'react-native';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4A7CF7',
        tabBarInactiveTintColor: '#8A9BB5',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: IoniconsName;

          switch (route.name) {
            case 'index':
              iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
              break;
            case 'forecast':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'details':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'cities':
              iconName = focused ? 'location' : 'location-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="forecast" options={{ headerShown: false }} />
      <Tabs.Screen name="details" options={{ headerShown: false }} />
      <Tabs.Screen name="cities" options={{ headerShown: false }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1C2333',
    borderTopColor: 'rgba(138,155,181,0.15)',
    height: 60,
  },
});

export default TabsLayout;