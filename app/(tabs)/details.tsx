import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import { colors } from '../../constants/colors';

const DetailsScreen = () => {
  const loadWeather = useWeatherStore((state) => state.loadWeather);
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const currentWeather = useWeatherStore((state) => state.currentWeather);
  const hourlyForecast = useWeatherStore((state) => state.hourlyForecast);
  const isLoading = useWeatherStore((state) => state.isLoading);

  useEffect(() => {
    if (!currentWeather && selectedCity) {
      loadWeather(selectedCity);
    }
  }, [selectedCity]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (!currentWeather) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.bigTemp}>{currentWeather.temp}°</Text>
        <Text style={styles.subHeader}>
          {currentWeather.condition.main.toUpperCase()} • H:{currentWeather.high}° L:{currentWeather.low}°
        </Text>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="water-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.cardTitle}>HUMIDITY</Text>
          </View>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.bigValue}>{currentWeather.humidity}%</Text>
              <Text style={styles.smallText}>
                The dew point is {currentWeather.feelsLike}° right now.
              </Text>
            </View>
            <View style={styles.circle} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="speedometer-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.cardTitle}>WIND</Text>
          </View>
          <Text style={styles.bigValueCenter}>{currentWeather.windSpeed}</Text>
          <Text style={styles.unitText}>MPH</Text>
          <View style={styles.directionRow}>
            <Text style={styles.smallText}>DIRECTION</Text>
            <Text style={styles.smallText}>{currentWeather.windDirection}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="sunny-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.cardTitle}>UV INDEX</Text>
          </View>
          <Text style={styles.bigValue}>{currentWeather.uvIndex}</Text>
          <Text style={styles.smallText}>
            {currentWeather.uvIndex <= 2 ? 'Low' : currentWeather.uvIndex <= 5 ? 'Moderate' : 'High'}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${(currentWeather.uvIndex / 11) * 100}%` as any }]} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="star-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.cardTitle}>AIR QUALITY</Text>
          </View>
          <Text style={styles.bigValue}>{currentWeather.airQuality}</Text>
          <Text style={styles.smallText}>{currentWeather.airQualityLabel}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarBlue, { width: `${(currentWeather.airQuality / 500) * 100}%` as any }]} />
          </View>
          <Text style={styles.smallText}>Air quality is similar to yesterday.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="trending-up-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.cardTitle}>TEMPERATURE TREND</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            {hourlyForecast.slice(0, 8).map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={[styles.bar, { height: Math.max(20, (item.temp / 120) * 80) }]} />
                <Text style={styles.barLabel}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rowCards}>
          <View style={[styles.card, styles.halfCard]}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="arrow-up-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.cardTitle}>PRESSURE</Text>
            </View>
            <Text style={styles.bigValue}>{currentWeather.pressure}</Text>
            <Text style={styles.unitText}>INHG</Text>
            <Text style={styles.smallText}>Falling</Text>
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="eye-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.cardTitle}>VISIBILITY</Text>
            </View>
            <Text style={styles.bigValue}>{currentWeather.visibility}</Text>
            <Text style={styles.unitText}>MILES</Text>
            <Text style={styles.smallText}>Perfectly clear view.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  bigTemp: {
    color: colors.textPrimary,
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  cardTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bigValue: {
    color: colors.textPrimary,
    fontSize: 36,
    fontWeight: 'bold',
  },
  bigValueCenter: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unitText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  smallText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  directionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.warning,
    borderRadius: 2,
  },
  progressBarBlue: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  liveBadge: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  liveText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    marginTop: 8,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: colors.accent,
    borderRadius: 4,
    opacity: 0.7,
  },
  barLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 4,
  },
  rowCards: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
});

export default DetailsScreen;