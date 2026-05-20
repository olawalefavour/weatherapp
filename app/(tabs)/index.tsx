import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import images from '../../constants/images';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const getBackgroundImage = (condition: string | undefined) => {
  if (!condition) return images.background_night;
  const lower = condition.toLowerCase();
  if (lower.includes('clear') || lower.includes('sunny')) {
    return images.background_sunny;
  }
  if (lower.includes('cloud') || lower.includes('overcast')) {
    return images.background_cloudy;
  }
  return images.background_night;
};

const MainWeatherScreen = () => {
  const loadWeather = useWeatherStore((state) => state.loadWeather);
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);
  const currentWeather = useWeatherStore((state) => state.currentWeather);
  const hourlyForecast = useWeatherStore((state) => state.hourlyForecast);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const error = useWeatherStore((state) => state.error);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        loadWeather(selectedCity);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (geocode[0]?.city) {
        setSelectedCity(geocode[0].city);
        loadWeather(geocode[0].city);
      } else {
        loadWeather(selectedCity);
      }
    };
    getLocation();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={getBackgroundImage(currentWeather?.condition?.main)}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>CURRENTLY</Text>
          <Text style={styles.temperature}>{currentWeather?.temp}°</Text>

          <View style={styles.conditionPill}>
            <Ionicons name="cloud" size={20} color={colors.textPrimary} />
            <Text style={styles.conditionText}>{currentWeather?.condition.main}</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.row}>
              <Text style={styles.statText}>FEELS LIKE {currentWeather?.feelsLike}°</Text>
              <Text style={styles.statText}>AIR QUALITY {currentWeather?.airQualityLabel} • {currentWeather?.airQuality}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.statText}><Ionicons name="water" size={16} color={colors.textPrimary} /> {currentWeather?.humidity}%</Text>
              <Text style={styles.statText}><Ionicons name="speedometer" size={16} color={colors.textPrimary} /> {currentWeather?.windSpeed} mph</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HOURLY FORECAST</Text>
            <Text style={styles.viewFull}>VIEW FULL</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
            {hourlyForecast?.map((hour, index) => (
              <View key={index} style={styles.hourlyCard}>
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                <Ionicons name="cloud" size={24} color={colors.textPrimary} />
                <Text style={styles.hourlyTemp}>{hour.temp}°</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.infoCard}>
            <Ionicons name="sunny" size={20} color={colors.textPrimary} />
            <Text style={styles.cardTitle}>SUNSET</Text>
            <Text style={styles.largeText}>{currentWeather?.sunset}</Text>
            <Text style={styles.smallText}>Sunrise: {currentWeather?.sunrise}</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="rainy" size={20} color={colors.textPrimary} />
            <Text style={styles.cardTitle}>PRECIPITATION</Text>
            <Text style={styles.largeText}>{currentWeather?.precipitation}%</Text>
            <Text style={styles.smallText}>Expected today</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 16,
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
  header: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  temperature: {
    color: colors.textPrimary,
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  conditionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  conditionText: {
    color: colors.textPrimary,
    marginLeft: 8,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statText: {
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  viewFull: {
    color: colors.accent,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  hourlyScroll: {
    marginBottom: 16,
  },
  hourlyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  hourlyTime: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  hourlyTemp: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  largeText: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  smallText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default MainWeatherScreen;