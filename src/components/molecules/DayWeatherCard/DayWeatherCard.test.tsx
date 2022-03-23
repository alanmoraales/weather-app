import { render, screen, cleanup } from "@testing-library/react";
import DayWeatherCard from "./DayWeatherCard";

beforeEach(cleanup);

describe("DayWeatherCard", () => {
  const testProps = {
    dayName: "Lunes",
    minTemperature: "20 °C",
    maxTemperature: "35 °C",
  };
  const wettestDayTagText = "Día más húmedo";

  it("Should display wettest day tag if isWettestDay prop is true", () => {
    render(<DayWeatherCard {...testProps} isWettestDay={true} />);

    const isWettestDayTag = screen.getByText(wettestDayTagText);
    expect(isWettestDayTag).toBeInTheDocument();
  });

  it("Should not display wettest day tag if isWettestDay prop is false", () => {
    render(<DayWeatherCard {...testProps} isWettestDay={false} />);

    const isWettestDayTag = screen.queryByText(wettestDayTagText);
    expect(isWettestDayTag).not.toBeInTheDocument();
  });

  it("Should display max temperature", () => {
    render(<DayWeatherCard {...testProps} />);

    const maxTemperatureElement = screen.getByText(testProps.maxTemperature);
    expect(maxTemperatureElement).toBeInTheDocument();
  });

  it("Should display min temperature", () => {
    render(<DayWeatherCard {...testProps} />);

    const minTemperatureElement = screen.getByText(testProps.minTemperature);
    expect(minTemperatureElement).toBeInTheDocument();
  });

  it("Should display day name", () => {
    render(<DayWeatherCard {...testProps} />);

    const dayNameElement = screen.getByText(testProps.dayName);
    expect(dayNameElement).toBeInTheDocument();
  });
});
