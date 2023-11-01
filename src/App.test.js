import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Solid Index Heading', () => {
  render(<App />);
  const titleElement = screen.getByText(/Solid Index/i);
  expect(titleElement).toBeInTheDocument();
});
