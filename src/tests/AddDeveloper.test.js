import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router, 
} from 'react-router-dom';
import AddDeveloper from '../components/AddDeveloper';
import Developer from '../models/developer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let fakeDeveloper = new Developer(null, "Jason", "Monroe", "JavaScript", "1999");
const mockStore = configureStore();
let store;

beforeEach(()=>{
    store = mockStore({});
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    })
);

it('has text boxes for firstName, lastName, favoriteLanguage, and yearStarted', ()=>{
    render(
        <Provider store={store}>
            <Router>
                <AddDeveloper />
            </Router>
        </Provider>
    );

    let firstNameTextBox = screen.getByTestId('firstName');
    let lastNameTextBox = screen.getByTestId('lastName');
    let favoriteLanguageTextBox = screen.getByTestId('favoriteLanguage');
    let yearStartedTextBox = screen.getByTestId('yearStarted');

    expect(firstNameTextBox).toBeInTheDocument();
    expect(lastNameTextBox).toBeInTheDocument();
    expect(favoriteLanguageTextBox).toBeInTheDocument();
    expect(yearStartedTextBox).toBeInTheDocument();

});

it(`should dispatch ADD_BIO action to store on submission 
        of valid form and then navigate to bios`, async () => {

   render(
        <Provider store={store}>
            <Router>
                <AddDeveloper />
            </Router>
        </Provider>
    );

    const submitButton = screen.getByText("Submit");
    const firstNameTextBox = screen.getByTestId('firstName');
    const lastNameTextBox = screen.getByTestId('lastName');
    const favoriteLanguageTextBox = screen.getByTestId('favoriteLanguage');
    const yearStartedTextBox = screen.getByTestId('yearStarted');

    //assert button is inactive
    expect(submitButton).toBeDisabled();

    fireEvent.change(firstNameTextBox, { target: { value: fakeDeveloper.firstName }});
    fireEvent.change(lastNameTextBox, { target: { value: fakeDeveloper.lastName }});
    fireEvent.change(favoriteLanguageTextBox, { target: { value: fakeDeveloper.favoriteLanguage }})
    fireEvent.change(yearStartedTextBox, { target: { value: fakeDeveloper.yearStarted }});
    fireEvent.click(submitButton);
    
    
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'ADD_BIO', developer: fakeDeveloper}]);

    expect(mockNavigate).toHaveBeenCalledWith("/bios");
});

