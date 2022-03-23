import { render, screen, cleanup } from "@testing-library/react";
import DestinationWeatherCard from "./DestinationWeatherCard";
import routes from "@constants/routes";

beforeEach(cleanup);

describe("DestinationWeatherCard", () => {
  const destinationName = "CDMX";
  const testProps = {
    destinationName,
    minTemperature: "20 °C",
    maxTemperature: "35 °C",
    actionUrl: routes.destination(destinationName),
  };

  it("Should display max temperature", () => {
    render(<DestinationWeatherCard {...testProps} />);

    const maxTemperatureElement = screen.getByText(testProps.maxTemperature);
    expect(maxTemperatureElement).toBeInTheDocument();
  });

  it("Should display min temperature", () => {
    render(<DestinationWeatherCard {...testProps} />);

    const minTemperatureElement = screen.getByText(testProps.minTemperature);
    expect(minTemperatureElement).toBeInTheDocument();
  });

  it("Should display destination name", () => {
    render(<DestinationWeatherCard {...testProps} />);

    const destinationNameElement = screen.getByText(testProps.destinationName);
    expect(destinationNameElement).toBeInTheDocument();
  });

  it("Should contain a link to destination", () => {
    render(<DestinationWeatherCard {...testProps} />);

    const linkToDestination = screen.getByRole("link");
    expect(linkToDestination).toHaveAttribute("href", testProps.actionUrl);
  });
});
