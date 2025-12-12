import { useState, useEffect } from "react";
import axios from "axios";
import { WeatherAppProps } from "../types/weather";
const useWeather = (
  city: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = useState<string | null>(null),
    [weatherData, setWeatherData] = useState<WeatherAppProps | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<WeatherAppProps>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const { name, main, weather, wind } = response.data;
        setWeatherData({ name, main, weather, wind });
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setIsLoading(false);
      }
    };
    const timeout = setTimeout(() => {
      if (city) fetchWeather();
    }, 600);
    return () => clearTimeout(timeout);
  }, [city]);
  return { weatherData, error };
};

export default useWeather;
