import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom';
import { Auth } from 'aws-amplify';
import { regularUser } from '../testUtils/authUsers';

beforeEach(()=>{
  jest.spyOn(Auth, "configure").mockImplementation(()=>true);
  jest.spyOn(Auth, "currentUserInfo").mockImplementation(()=>Promise.resolve(regularUser));
});

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learning react/i);
  expect(linkElement).toBeInTheDocument();
});
