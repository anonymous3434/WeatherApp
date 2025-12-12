import { useEffect, useState } from "react";
import { cityProps } from "../types/weather";
import axios from "axios";
const useGeolocation = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [city, setCity] = useState<string>("");
  const fetchCityFromGeolocation = async (lat: number, lon: number) => {
    const response = await axios.get<cityProps>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    setCity(response.data.name);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchCityFromGeolocation(pos.coords.latitude, pos.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);
  return { city, setCity };
};
export default useGeolocation;
