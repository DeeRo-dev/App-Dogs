import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a button to enter", () => {
  render(<App />);
  const linkElement = screen.getByText(/Ingresar/i);
  expect(linkElement).toBeInTheDocument();
});
test("renders a title", () => {
  render(<App />);
  const linkElement = screen.getByText(/¿Estas buscando un mejor amigo?/i);
  expect(linkElement).toBeInTheDocument();
});

