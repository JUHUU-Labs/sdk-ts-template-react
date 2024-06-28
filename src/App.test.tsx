import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders fetch locations button', async () => {
  render(<App />);
  screen.debug(); // Use this to inspect the rendered output in the console

  // Wait for the button to be available
  await waitFor(() => {
    const fetchLocationsButton = screen.getByText(/Fetch locations/i);
    expect(fetchLocationsButton).toBeInTheDocument();
  });
});
