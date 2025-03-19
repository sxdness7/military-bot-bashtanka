import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type WeatherData = {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  windSpeed: number;
  humidity: number;
};

const weatherIcons = {
  clear: <Sun className="h-12 w-12 text-military-warning" />,
  cloudy: <Cloud className="h-12 w-12 text-military-neutral" />,
  rain: <CloudRain className="h-12 w-12 text-military-accent" />,
  storm: <CloudRain className="h-12 w-12 text-military-alert" />,
};

const weatherLabels = {
  clear: 'Ясно',
  cloudy: 'Облачно',
  rain: 'Дождь',
  storm: 'Гроза',
};

const WEATHER_API_KEY = '4ad707d02565eae2de0c80056ad34192';
const CITIES = {
  Баштанка: { name: 'Баштанка', country: 'UA' },
  Дублин: { name: 'Dublin', country: 'IE' },
  Алматы: { name: 'Almaty', country: 'KZ' },
  Белград: { name: 'Belgrade', country: 'RS' }
};

const fetchRealWeatherData = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
  );

  if (!response.ok) {
    throw new Error('Weather API error');
  }

  const data = await response.json();

  const getCondition = (weatherId: number): WeatherData['condition'] => {
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rain';
    if (weatherId >= 600 && weatherId < 700) return 'rain';
    if (weatherId >= 801) return 'cloudy';
    return 'clear';
  };

  return {
    temperature: Math.round(data.main.temp),
    condition: getCondition(data.weather[0].id),
    windSpeed: Math.round(data.wind.speed),
    humidity: data.main.humidity
  };
};

const WeatherInfo = ({ city = 'Баштанка' }: { city: string }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    condition: 'clear',
    windSpeed: 0,
    humidity: 0
  });

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        console.log(`Fetching weather data for ${city}`);
        const data = await fetchRealWeatherData(CITIES[city].name);
        setWeatherData(data);
      } catch (error) {
        console.error('Ошибка при получении погоды:', error);
        toast({
          title: 'Ошибка',
          description: `Не удалось получить данные о погоде для ${city}`,
          variant: 'destructive',
        });
      }
    };

    getWeatherData();
    const interval = setInterval(getWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  return (
    <div className="grid-panel h-full animate-scanner">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-military-accent" />
        ПОГОДА - {city}
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center">
          {weatherIcons[weatherData.condition]}
          <span className="mt-2 text-sm text-gray-300">{weatherLabels[weatherData.condition]}</span>
        </div>

        <div className="text-4xl font-bold mt-4 md:mt-0 text-white">
          {weatherData.temperature}°C
        </div>

        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-military-accent" />
            <span>{weatherData.windSpeed} м/с</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-military-accent" />
            <span>{weatherData.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;