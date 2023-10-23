import React from 'react';
import '@testing-library/jest-dom';
import devActions from '../reducers/devReducers';
import { getDevBios, postDevBio, putDevBio } from '../sagas/devsSagas';
import Developer from '../models/developer';
import * as api from '../api/devsApi';
import { runSaga } from 'redux-saga';

let developers = [
        new Developer(1, "Jason", "Monroe", "JavaScript", 1999),
        new Developer(2, "Steve", "Wozniac", "Objective C", 1970)
];


it('getDevBios saga should call api and dispatch success action', async () => {

    const getDevelopersSpy = jest.spyOn(api, 'getDevelopers')
        .mockImplementation(() => Promise.resolve(developers));
    const dispatched = [];
    const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    }, getDevBios);

    expect(getDevelopersSpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([devActions.getAllBiosSuccessActionCreator(developers)]);
    getDevelopersSpy.mockClear();
});

it('postDevBio saga should call api and dispatch getAllRequest', async () => {

    const postDeveloperSpy = jest.spyOn(api, 'postDeveloper')
        .mockImplementation(() => Promise.resolve(developers[1]));
    const dispatched = [];
    const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    }, postDevBio, {developer: developers[1]});

    expect(postDeveloperSpy).toHaveBeenCalledWith(developers[1]);
    expect(dispatched).toEqual([devActions.getAllBiosRequestActionCreator()]);
    postDeveloperSpy.mockClear();
});

it('putDevBio saga should call api and dispatch getAllRequest', async () => {

    const putDeveloperSpy = jest.spyOn(api, 'putDeveloper')
        .mockImplementation(() => Promise.resolve(developers[1]));
    const dispatched = [];
    const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    }, putDevBio, {developer: developers[1]});

    expect(putDeveloperSpy).toHaveBeenCalledWith(developers[1]);
    expect(dispatched).toEqual([devActions.getAllBiosRequestActionCreator()]);
    putDeveloperSpy.mockClear();
});