import { CurrentWeather, HourlyForecast, DailyForecast } from '../types/weather';

const API_KEY = process.env['EXPO_PUBLIC_WEATHER_API_KEY'] as string;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWindDirection = (degrees: number): string => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
};

const getAirQualityLabel = (aqi: number): string => {
  if (aqi === 1) return 'Good';
  if (aqi === 2) return 'Fair';
  if (aqi === 3) return 'Moderate';
  if (aqi === 4) return 'Poor';
  return 'Very Poor';
};

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const getDateLabel = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const fetchCurrentWeather = async (
  city: string
): Promise<CurrentWeather> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`
  );

  if (!response.ok) throw new Error('Failed to fetch weather');

  const data = await response.json();

  const aqResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
  );
  const aqData = await aqResponse.json();
  const aqi = aqData.list[0].main.aqi;

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    windDirection: getWindDirection(data.wind.deg),
    condition: data.weather[0],
    airQuality: aqi * 8,
    airQualityLabel: getAirQualityLabel(aqi),
    uvIndex: 4,
    visibility: Math.round(data.visibility / 1609),
    pressure: (data.main.pressure * 0.02953).toFixed(2) as unknown as number,
    sunrise: formatTime(data.sys.sunrise),
    sunset: formatTime(data.sys.sunset),
    precipitation: data.rain ? Math.round(data.rain['1h'] * 100) : 0,
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
  };
};

export const fetchHourlyForecast = async (
  city: string
): Promise<HourlyForecast[]> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=imperial&cnt=8`
  );

  if (!response.ok) throw new Error('Failed to fetch hourly forecast');

  const data = await response.json();

  return data.list.map((item: any, index: number) => ({
    time: index === 0 ? 'NOW' : formatTime(item.dt),
    temp: Math.round(item.main.temp),
    condition: item.weather[0],
  }));
};

export const fetchDailyForecast = async (
  city: string
): Promise<DailyForecast[]> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=imperial&cnt=40`
  );

  if (!response.ok) throw new Error('Failed to fetch daily forecast');

  const data = await response.json();

  const dailyMap: Record<string, any> = {};

  data.list.forEach((item: any) => {
    const day = getDayName(item.dt);
    if (!dailyMap[day]) {
      dailyMap[day] = {
        date: getDateLabel(item.dt),
        day,
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: item.weather[0],
      };
    } else {
      if (item.main.temp_max > dailyMap[day].high)
        dailyMap[day].high = Math.round(item.main.temp_max);
      if (item.main.temp_min < dailyMap[day].low)
        dailyMap[day].low = Math.round(item.main.temp_min);
    }
  });

  return Object.values(dailyMap).slice(0, 7);
};