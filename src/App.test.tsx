import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the App", () => {
  render(<App />);
  expect(screen.getByTestId("app")).toBeInTheDocument();
});
