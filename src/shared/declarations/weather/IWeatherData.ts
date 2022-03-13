interface IWeatherData {
  current: {
    dt: string;
    temp: string;
  };
  daily: {
    dt: string;
    temp: {
      min: string;
      max: string;
    };
  }[];
}

export type { IWeatherData };
