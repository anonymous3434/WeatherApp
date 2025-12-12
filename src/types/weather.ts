export type WeatherAppProps = {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string; id: number }[];
  wind: { speed: number };
};

export type WeatherCardProps = {
  weatherData: WeatherAppProps;
  city: string;
  isLoading: boolean;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

export type cityProps = { name: string };
