import React, { useState } from "react";
import Weathercard from "../components/WeatherCard";
import useWeather from "../../hooks/useWeather";
import useGeolocation from "../../hooks/useGeolocation";
import Loader from "../../components/Loader";

const WeatherApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { city, setCity } = useGeolocation(setIsLoading);
  const { weatherData } = useWeather(city, setIsLoading);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Weathercard
          weatherData={weatherData!}
          city={city}
          isLoading={isLoading}
          setCity={setCity}
        />
      )}
    </>
  );
};

export default WeatherApp;
