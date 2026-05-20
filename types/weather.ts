export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: WeatherCondition;
  airQuality: number;
  airQualityLabel: string;
  uvIndex: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  precipitation: number;
  high: number;
  low: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: WeatherCondition;
}

export interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}

export interface City {
  id: string;
  name: string;
  country: string;
  temp?: number;
  condition?: string;
  time?: string;
  high?: number;
  low?: number;
  humidity?: number;
  windSpeed?: number;
  airQuality?: number;
  weatherIcon?: string;
}

export interface WeatherState {
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  cities: City[];
  selectedCity: string;
  isLoading: boolean;
  error: string | null;
}