import React from 'react';
import { render, screen} from '@testing-library/react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';

it('renders Home, Developer Bios, and Create Bios links', () => {
  render(<Router><Navbar /></Router>);
  const homeLink = screen.getByText(/Home/i);
  const biosLink = screen.getByText(/Developer Bios/i);
  const createLink = screen.getByText(/Create Bio/i);
  expect(homeLink).toBeInTheDocument();
  expect(biosLink).toBeInTheDocument();
  expect(createLink).toBeInTheDocument();
});

it('Home, Developer Bios, and Create Bios links have correct href property', () => {
    render(<Router><Navbar /></Router>);
    const homeLink = screen.getByText(/Home/i);
    const biosLink = screen.getByText(/Developer Bios/i);
    const createLink = screen.getByText(/Create Bio/i);
    expect(homeLink.getAttribute('href')).toBe('/');
    expect(biosLink.getAttribute('href')).toBe('/bios');
    expect(createLink.getAttribute('href')).toBe('/create-bio');
});