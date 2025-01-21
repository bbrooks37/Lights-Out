import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Lights Out heading', () => {
  render(<App />);
  expect(screen.getByText('Lights Out')).toBeInTheDocument();
});

test('renders Board component', () => {
  render(<App />);
  expect(screen.getByRole('grid')).toBeInTheDocument(); // Assuming the Board component has the role="grid"
});