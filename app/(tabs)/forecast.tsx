import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import { colors } from '../../constants/colors';

const ForecastScreen = () => {
  const loadWeather = useWeatherStore((state) => state.loadWeather);
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const dailyForecast = useWeatherStore((state) => state.dailyForecast);
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  useEffect(() => {
    if (!dailyForecast.length && selectedCity) {
      loadWeather(selectedCity);
    }
  }, [dailyForecast, selectedCity, loadWeather]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerSmall}>NEXT 7 DAYS</Text>
        <Text style={styles.headerLarge}>Weather Forecast</Text>

        {dailyForecast.map((day, index) => (
          <View key={index} style={styles.dayCard}>
            <View style={styles.dayLeft}>
              <Text style={styles.dayLabel}>
                {index === 0 ? 'TODAY' : index === 1 ? 'TOMORROW' : day.date}
              </Text>
              <Text style={styles.dayName}>{day.day}</Text>
            </View>
            <View style={styles.dayMiddle}>
              <Ionicons name="cloud" size={24} color={colors.textPrimary} />
              <Text style={styles.tempText}>{day.low}° / {day.high}°</Text>
              <View style={styles.tempBar} />
            </View>
            <View style={styles.dayRight}>
              <Text style={styles.currentTemp}>{day.condition.main}</Text>
            </View>
          </View>
        ))}

        {currentWeather && (
          <View style={styles.conditionsCard}>
            <Text style={styles.conditionsTitle}>Atmospheric Conditions</Text>
            <View style={styles.conditionsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>HUMIDITY</Text>
                <Text style={styles.statValue}>{currentWeather.humidity}%</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>UV INDEX</Text>
                <Text style={styles.statValue}>{currentWeather.uvIndex}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
  },
  headerSmall: {
    color: colors.accent,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerLarge: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dayCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayLeft: {
    flex: 1,
  },
  dayLabel: {
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 4,
  },
  dayName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayMiddle: {
    flex: 1,
    alignItems: 'center',
  },
  tempText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  tempBar: {
    height: 4,
    width: '80%',
    backgroundColor: colors.accent,
    marginTop: 4,
  },
  dayRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  currentTemp: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  conditionsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  conditionsTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conditionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForecastScreen;