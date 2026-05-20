import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  City,
} from '../types/weather';
import {
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchDailyForecast,
} from '../lib/weatherApi';

interface WeatherStore {
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  cities: City[];
  selectedCity: string;
  isLoading: boolean;
  error: string | null;

  loadWeather: (city: string) => Promise<void>;
  addCity: (city: string) => Promise<void>;
  removeCity: (cityId: string) => void;
  setSelectedCity: (city: string) => void;
  loadCities: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  cities: [],
  selectedCity: 'London',
  isLoading: false,
  error: null,

  loadWeather: async (city: string) => {
    set({ isLoading: true, error: null });
    try {
      const [current, hourly, daily] = await Promise.all([
        fetchCurrentWeather(city),
        fetchHourlyForecast(city),
        fetchDailyForecast(city),
      ]);
      set({
        currentWeather: current,
        hourlyForecast: hourly,
        dailyForecast: daily,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to load weather data', isLoading: false });
    }
  },

  addCity: async (cityName: string) => {
    try {
      const weather = await fetchCurrentWeather(cityName);
      const newCity: City = {
        id: Date.now().toString(),
        name: weather.city,
        country: weather.country,
        temp: weather.temp,
        condition: weather.condition.main,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        high: weather.high,
        low: weather.low,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        airQuality: weather.airQuality,
        weatherIcon: weather.condition.icon,
      };

      const updatedCities = [...get().cities, newCity];
      set({ cities: updatedCities });
      await AsyncStorage.setItem('cities', JSON.stringify(updatedCities));
    } catch (error) {
      set({ error: 'Failed to add city' });
    }
  },

  removeCity: async (cityId: string) => {
    const updatedCities = get().cities.filter((c) => c.id !== cityId);
    set({ cities: updatedCities });
    await AsyncStorage.setItem('cities', JSON.stringify(updatedCities));
  },

  setSelectedCity: (city: string) => {
    set({ selectedCity: city });
  },

  loadCities: async () => {
    try {
      const stored = await AsyncStorage.getItem('cities');
      if (stored) {
        set({ cities: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load cities', error);
    }
  },
}));