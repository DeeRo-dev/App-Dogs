<<<<<<< HEAD
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

=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
>>>>>>> 6e900b0c7b000ad48c708dc79820307f0776c230
