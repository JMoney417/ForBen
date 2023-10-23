import React from 'react';
import '@testing-library/jest-dom';
import devActions, { Types } from '../reducers/devReducers';
import Developer from '../models/developer';

let developers = [
        new Developer(1, "Jason", "Monroe", "JavaScript", 1999),
        new Developer(2, "Steve", "Wozniac", "Objective C", 1970)
];


it('should have action creator for GET_ALL_BIOS_REQUEST that has no payload', () => {
    const action = devActions.getAllBiosRequestActionCreator();
    expect(action).toEqual({type: Types.GET_ALL_BIOS_REQUEST});
});

it('should have action creator for GET_ALL_BIOS_SUCCESS that has developers payload', () => {
    const action = devActions.getAllBiosSuccessActionCreator(developers);
    expect(action).toEqual({type: Types.GET_ALL_BIOS_SUCCESS, developers});
});

