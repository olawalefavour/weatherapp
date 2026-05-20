# WeatherApp 🌤️

A beautiful dark-themed weather app built with React Native and Expo, following the Practical Vibe Coding workflow.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## Screenshots

| Main Screen | Forecast | Details | Cities |
|---|---|---|---|
| Current weather with hourly forecast | 7-day weather forecast | Detailed weather stats | Multi-city management |

---

## Features

- **Current Weather** — Real-time temperature, condition, feels like, humidity, wind speed and air quality
- **Hourly Forecast** — 8-hour forecast with weather icons
- **7-Day Forecast** — Full week outlook with high/low temperatures
- **Detailed Stats** — UV index, pressure, visibility, air quality with progress bars and temperature trend chart
- **Multi-City** — Search and save multiple cities, long press to remove
- **Dynamic Backgrounds** — Background image changes based on weather condition (sunny, cloudy, night)
- **Auto Location** — Automatically detects your current city on launch

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo + React Native |
| Language | TypeScript |
| Styling | React Native StyleSheet |
| Navigation | Expo Router |
| State Management | Zustand |
| Persistence | AsyncStorage |
| Location | expo-location |
| Icons | @expo/vector-icons (Ionicons) |
| Weather API | OpenWeatherMap |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weatherapp.git
cd weatherapp
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```
EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npx expo start
```

6. Scan the QR code with Expo Go on your phone.

---

## Project Structure

```
weatherapp/
├── app/
│   ├── _layout.tsx          # Root layout
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigation
│       ├── index.tsx        # Main weather screen
│       ├── forecast.tsx     # 7-day forecast screen
│       ├── details.tsx      # Detailed stats screen
│       └── cities.tsx       # City list screen
├── components/              # Reusable UI components
├── constants/
│   ├── colors.ts            # Color palette
│   └── images.ts            # Centralized image imports
├── lib/
│   └── weatherApi.ts        # OpenWeatherMap API calls
├── store/
│   └── weatherStore.ts      # Zustand global state
├── types/
│   └── weather.ts           # TypeScript interfaces
└── assets/
    └── images/              # Background images
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_WEATHER_API_KEY` | Your OpenWeatherMap API key |

---

## API Usage

This app uses the following OpenWeatherMap endpoints:

- `GET /weather` — Current weather by city name
- `GET /forecast` — 5-day / 3-hour forecast
- `GET /air_pollution` — Air quality index

All API calls are handled through `lib/weatherApi.ts`.

---

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

### Submit to stores
```bash
eas submit --platform android
eas submit --platform ios
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org) for the weather API
- [Expo](https://expo.dev) for the amazing React Native toolchain
- [JS Mastery](https://jsmastery.pro) for the Practical Vibe Coding workflow

---

Built with ❤️ using the Practical Vibe Coding workflow
