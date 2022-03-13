const formatTemperature = (temperatureInMetric: number) => {
  const roundedTemperature = Math.round(temperatureInMetric);
  return `${roundedTemperature} °C`;
};

export default formatTemperature;
