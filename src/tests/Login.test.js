import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Login from '../components/Login';
import { regularUser } from '../testUtils/authUsers';
import AuthContextProvider from '../contexts/AuthContextProvider';
import { act } from 'react-dom/test-utils';

const mockNavigate = jest.fn();
let signInSpy;

//jest.mock must be called outside of tests.  It is hoisted by babel-jest.  https://github.com/facebook/jest/issues/2582
jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    })
);

beforeEach(() => {
    jest.spyOn(Auth, "currentAuthenticatedUser").mockResolvedValue((null));
    signInSpy = jest.spyOn(Auth, "signIn").mockResolvedValue(regularUser);
});

it('should display email and password text fields and submitting them should call Auth.signIn',async () => {
 
    render(
        <Router>
            <AuthContextProvider>
                <Login />
            </AuthContextProvider>
        </Router>
    );


    const emailTextBox = screen.getByTestId('email');
    const passwordTextBox = screen.getByTestId('password');
    const loginButton = screen.getByText("Login");


    expect(emailTextBox.getAttribute("type")).toEqual("text");
    expect(passwordTextBox.getAttribute("type")).toEqual("password");

    await act(async () => {
        fireEvent.change(emailTextBox, { target: { value: regularUser.attributes.email }})
        fireEvent.change(passwordTextBox, { target: { value: regularUser.attributes.password }});
        fireEvent.click(loginButton);
        
    });

    expect(signInSpy).toHaveBeenCalledWith(regularUser.attributes.email,regularUser.attributes.password);
    expect(mockNavigate).toHaveBeenCalledWith("/");
})