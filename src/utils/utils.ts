export const kelvinToCelsius = (kelvin: number | undefined): string => {
  return kelvin ? (kelvin - 273.15).toFixed(1) : "--";
};
