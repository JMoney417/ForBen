import React from 'react';
import '@testing-library/jest-dom';
import Developer from '../models/developer';
import { fireEvent, render, screen } from '@testing-library/react';
import DeveloperBio from '../components/DeveloperBio';
import { BrowserRouter as Router } from 'react-router-dom';

let developer = new Developer(1, "Jason", "Monroe", "JavaScript", 1999);
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    })
);

it('should navigate to /edit component when user admin user clicks edit button', () => {
    render(<Router><DeveloperBio developer={developer} isAdmin={true} /></Router>);
    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith("/edit/1");
});