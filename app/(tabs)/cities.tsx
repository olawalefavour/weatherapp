import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../store/weatherStore';
import { colors } from '../../constants/colors';

const CitiesScreen = () => {
  const [searchInput, setSearchInput] = useState('');

  const cities = useWeatherStore((state) => state.cities);
  const addCity = useWeatherStore((state) => state.addCity);
  const removeCity = useWeatherStore((state) => state.removeCity);
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);
  const loadCities = useWeatherStore((state) => state.loadCities);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  const handleAddCity = () => {
    if (searchInput.trim()) {
      addCity(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a city or airport"
          placeholderTextColor={colors.textSecondary}
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleAddCity}
        />
      </View>

      <ScrollView contentContainerStyle={styles.cityList}>
        {cities.map((city) => (
          <TouchableOpacity
            key={city.id}
            style={styles.cityCard}
            onPress={() => setSelectedCity(city.name)}
            onLongPress={() => removeCity(city.id)}
          >
            <View style={styles.cityCardHeader}>
              <Text style={styles.cityName}>{city.name}, {city.country}</Text>
              {city.temp !== undefined && (
                <Text style={styles.cityTemperature}>{city.temp}°</Text>
              )}
            </View>
            <Text style={styles.cityCondition}>
              {city.condition || 'Unknown'} • {city.time || 'N/A'}
            </Text>
            <View style={styles.cityCardFooter}>
              <Text style={styles.cityDetails}>H:{city.high || '--'}° L:{city.low || '--'}°</Text>
              {city.humidity !== undefined && (
                <Text style={styles.cityDetails}>Humidity: {city.humidity}%</Text>
              )}
              {city.windSpeed !== undefined && (
                <Text style={styles.cityDetails}>Wind: {city.windSpeed} km/h</Text>
              )}
              {city.airQuality !== undefined && (
                <Text style={styles.cityDetails}>AQI: {city.airQuality}</Text>
              )}
              <Ionicons name="partly-sunny-outline" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButtonText}>+ Add New Destination</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 16,
    margin: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
  },
  cityList: {
    padding: 16,
  },
  cityCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cityCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cityTemperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cityCondition: {
    color: colors.textSecondary,
    marginVertical: 4,
  },
  cityCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    margin: 16,
  },
  addButtonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default CitiesScreen;