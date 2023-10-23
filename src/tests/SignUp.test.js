import React from 'react';
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { regularUser } from '../testUtils/authUsers';
import SignUp from '../components/SignUp';
import { act } from 'react-dom/test-utils';
import AuthContextProvider from '../contexts/AuthContextProvider';


const mockNavigate = jest.fn();
let signUpSpy, confirmSignUp;

jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    })
);

beforeEach(() => {
    jest.spyOn(Auth, "currentAuthenticatedUser").mockResolvedValue(regularUser);
    signUpSpy = jest.spyOn(Auth, "signUp").mockResolvedValue(regularUser);
    confirmSignUp = jest.spyOn(Auth, "confirmSignUp").mockResolvedValue(true);
});

it(`should display email and password text fields and submitting them should call Auth.signUp, 
            which on success will display confirm`, async () => {

    render(
        <Router>
            <AuthContextProvider>
                <SignUp />
            </AuthContextProvider>
        </Router>
    );

    
    const emailTextBox = screen.getByTestId('email');
    const passwordTextBox = screen.getByTestId('password');
    const signUp = screen.getByText('Sign up');


    expect(emailTextBox.getAttribute('type')).toEqual('email');
    expect(passwordTextBox.getAttribute('type')).toEqual('password');

    await act(async () => {
        fireEvent.change(emailTextBox, { target: { value: regularUser.attributes.email }})
        fireEvent.change(passwordTextBox, { target: { value: regularUser.attributes.password }});
        fireEvent.click(signUp); 
    })

    expect(signUpSpy).toHaveBeenCalledWith({ username: regularUser.attributes.email, password: regularUser.attributes.password});
    
    const codeTextBox = screen.getByTestId('code');
    const confirmButton = screen.getByText('Confirm');
    
    expect(codeTextBox).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    await act(async () => {
        fireEvent.change(codeTextBox, { target: { value: 'fakeCode'}})
        fireEvent.click(confirmButton); 
    });

    expect(confirmSignUp).toHaveBeenCalledWith(regularUser.attributes.email,'fakeCode');
    expect(mockNavigate).toHaveBeenCalledWith("/login");
})