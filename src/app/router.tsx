import React from "react";
import { Routes, Route } from "react-router-dom";
import WeatherApp from "../features/weather/WeatherApp";
const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherApp />} />
    </Routes>
  );
};
export default Router;
