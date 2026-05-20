You are an expert React Native and Expo engineer helping me build WeatherApp.

Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.
Think like a senior mobile developer.

---

## Project Overview

We are building WeatherApp, a beautiful dark-themed weather app that shows current 
weather, hourly forecast, 7-day forecast, detailed weather stats, and a city list 
with search.

The app includes:
- Current weather screen with temperature, condition, feels like, humidity, wind, 
  air quality, hourly forecast, sunset, and precipitation
- 7-day forecast screen
- Detailed stats screen (humidity, wind, UV index, air quality, temperature trend, 
  pressure, visibility)
- City list screen with search

Keep the implementation simple and readable.

---

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- React Native StyleSheet (NO NativeWind, NO Tailwind)
- Zustand
- AsyncStorage
- expo-location
- @expo/vector-icons
- OpenWeatherMap API

Do not introduce new major libraries unless there is a strong reason. 
Ask before installing anything new.

---

## Development Philosophy

Build feature by feature.

For every feature:
1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better approach. 
If a new library would significantly help, recommend it, explain why, and ask before adding it.

Do not install new libraries without approval.

---

## Architecture

Use this folder structure:
app/
(tabs)/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
images/

**app/** is for routes and screens only. Screens compose components and call hooks 
or stores. They should not contain large reusable UI blocks or business logic.

**components/** is for reusable UI. Create a component when it is reused in multiple 
places, when it makes a screen easier to read, or when it represents a clear UI concept.
Examples: WeatherCard, HourlyForecastItem, DayForecastRow, StatCard, CityCard.

**store/** holds Zustand stores. State includes: current weather data, selected city, 
city list, loading state, error state. Persist city list with AsyncStorage.

**lib/** holds external service helpers (weatherApi.ts). Never expose secret keys here —
use environment variables only.

**constants/** holds colors, spacing, font sizes, and image imports.

---

## UI Rules

- Replicate the provided designs exactly.
- Background: near-black #0A0A0A, dynamic background image behind a dark overlay.
- Cards: dark navy #1C2333, border radius 16, subtle opacity.
- Primary text: white #FFFFFF.
- Secondary text: muted blue-grey #8A9BB5.
- Accent color: #4A7CF7 (blue).
- Font sizes: temperature display 72-80px, section headers 13px uppercase, 
  body 15-16px, labels 11-12px uppercase.
- Do not approximate spacing or layout. Match the designs exactly.

---

## Styling Rules

Use React Native StyleSheet for ALL styling.
Do NOT use NativeWind, Tailwind, or inline styles except for dynamic values 
(like computed widths or colors based on state).

StyleSheet patterns:
- Define all styles at the bottom of each file using StyleSheet.create({})
- Name styles clearly: container, card, title, subtitle, row, etc.
- Use flexbox for layout.

---

## Image Rules

Use centralized image imports from constants/images.ts.

```ts
import { ImageSourcePropType } from 'react-native';

const images: Record<string, ImageSourcePropType> = {
  background_night: require('../assets/images/background_night.png'),
  background_sunny: require('../assets/images/background_sunny.png'),
  background_cloudy: require('../assets/images/background_cloudy.png'),
};

export default images;
```

Do not import image assets directly inside screens or components.

---

## State Management

- Zustand for global client state.
- Local state (useState) for temporary UI state like search input.
- AsyncStorage for persisting the city list.

---

## TypeScript

- Strict mode.
- No `any`.
- Keep types simple and readable.
- Define all weather data types in types/weather.ts.

---

## API Rules

- All OpenWeatherMap API calls go through lib/weatherApi.ts only.
- Never hardcode the API key. Use process.env.EXPO_PUBLIC_WEATHER_API_KEY.
- Handle loading and error states for every API call.

---

## Feature Implementation

When building a feature:
1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

---

## Secrets

- Never expose secret keys in client code.
- API key must come from environment variables only: EXPO_PUBLIC_WEATHER_API_KEY.

---

## Communication

Be concise. Explain what changed and how to test it.

---

## Final Reminder

Before every feature:
- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Replicate UI exactly when designs are provided.
- Use StyleSheet only, never NativeWind.