import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import DisplayBios from '../components/DisplayBios';
import Developer from '../models/developer';
import { Auth } from 'aws-amplify';
import { regularUser } from '../testUtils/authUsers';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let initialState = {
    developers:[
        new Developer(1, "Jason", "Monroe", "JavaScript", 1999),
        new Developer(2, "Steve", "Wozniac", "Objective C", 1970)
    ]
}

const mockStore = configureStore();
let store;

beforeEach(()=>{
    store = mockStore(initialState);
    jest.spyOn(Auth, "currentAuthenticatedUser").mockImplementation(()=>Promise.resolve(regularUser));
})

it(`dispatches GET_ALL_BIOS_REQUEST action on store 
        and then renders developers`, async () => {

    render(
        <Provider store={store}>
            <Router >
                <DisplayBios />
            </Router>
        </Provider>
    );
 

    const Bio1 = screen.getByText(/Jason Monroe's Bio/i);
    expect(Bio1).toBeInTheDocument();

    const Bio2 = screen.getByText(/Steve Wozniac's Bio/i);
    expect(Bio2).toBeInTheDocument();


    const actions = store.getActions();
    expect(actions).toEqual([{type: 'GET_ALL_BIOS_REQUEST'}]);
});

