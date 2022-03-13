interface IWeatherData {
  current: {
    dt: number;
    temp: number;
  };
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }[];
}

export type { IWeatherData };
