import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import EditDeveloper from '../components/EditDeveloper';
import Developer from '../models/developer';
import { Provider } from 'react-redux';

const initialState =  {
    developers: [
        new Developer(1,'Jason','Monroe','C#',2007),
        new Developer(2,'Gadget','Monroe','Bacon',1970)
    ]
}
const mockStore = configureStore();
let store;

beforeEach(()=>{
    store = mockStore(initialState);
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '2' })
}));

it(`has text boxes for firstName, lastName, favoriteLanguage, and yearStarted that 
    are populated with the developer to edit`, async ()=>{
    await act(async ()=>render(
        <Provider store={store}>
            <Router><EditDeveloper /></Router>
        </Provider>
    ));

    let firstNameTextBox = screen.getByTestId('firstName');
    expect(firstNameTextBox).toBeInTheDocument();
    let lastNameTextBox = screen.getByTestId('lastName');
    expect(lastNameTextBox).toBeInTheDocument();
    let favoriteLanguageTextBox = screen.getByTestId('favoriteLanguage');
    expect(favoriteLanguageTextBox).toBeInTheDocument();
    let yearStartedTextBox = screen.getByTestId('yearStarted');
    expect(yearStartedTextBox).toBeInTheDocument();
});

it('should dispatch Edit action to store on submission of valid form', async () => {

    render( 
        <Provider store={store}>
            <Router><EditDeveloper /></Router>
        </Provider>
    );
    
    const submitButton = screen.getByText("Submit");
    const firstNameTextBox = screen.getByTestId('firstName');
    const lastNameTextBox = screen.getByTestId('lastName');
    const favoriteLanguageTextBox = screen.getByTestId('favoriteLanguage');
    const yearStartedTextBox = screen.getByTestId('yearStarted');
    
    await act(async () => {
        fireEvent.change(firstNameTextBox, { target: { value: initialState.developers[1].firstName }});
        fireEvent.change(lastNameTextBox, { target: { value: initialState.developers[1].lastName }});
        fireEvent.change(favoriteLanguageTextBox, { target: { value: initialState.developers[1].favoriteLanguage }})
        fireEvent.change(yearStartedTextBox, { target: { value: initialState.developers[1].yearStarted }});
    
        fireEvent.click(submitButton);  
    });


    const actions = store.getActions();
    expect(actions).toEqual([{type: 'EDIT_BIO', developer: initialState.developers[1]}]);

});

