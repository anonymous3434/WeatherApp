import React from "react";
import { MapPin, Wind, Droplets } from "lucide-react";
import { WeatherAppProps } from "../../types/weather";
import { kelvinToCelsius } from "../../utils/utils";

type WeatherDetailsProps = {
  isLoading: boolean;
  weatherData: WeatherAppProps;
};
function WeatherDetails({ isLoading, weatherData }: WeatherDetailsProps) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-white/80" />
        <h2 className="text-2xl font-semibold tracking-wide">
          {isLoading ? "aaaaaaaaaaaaaaa.........." : weatherData?.name}
        </h2>
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center my-4">
        {/* Weather Icon */}
        {weatherData && (
          <>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt={weatherData.weather[0].description}
              className="w-24 h-24"
            />
          </>
        )}
      </div>

      {/* Temperature */}
      <h1 className="text-6xl font-bold mb-2">
        {kelvinToCelsius(weatherData?.main.temp)}°C
      </h1>
      <p className="text-white/80 text-lg mb-6">
        {weatherData?.weather[0].description}
      </p>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 text-white/90">
        <div className="bg-white/10 rounded-xl py-3 flex flex-col items-center justify-center">
          <Wind className="w-6 h-6 mb-1" />
          <p className="text-sm">Wind</p>
          <p className="font-semibold">{`${weatherData?.wind.speed} m/s`}</p>
        </div>
        <div className="bg-white/10 rounded-xl py-3 flex flex-col items-center justify-center">
          <Droplets className="w-6 h-6 mb-1" />
          <p className="text-sm">Humidity</p>
          <p className="font-semibold">{`${weatherData?.main.humidity} %`}</p>
        </div>
      </div>
    </>
  );
}

export default WeatherDetails;
