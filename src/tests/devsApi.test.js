import React from 'react';
import '@testing-library/jest-dom';
import Developer from '../models/developer';
import { getDevelopers, postDeveloper, putDeveloper } from '../api/devsApi';

const baseURL = "https://tech-services-1000201953.uc.r.appspot.com";

let developers = [
        new Developer(1, "Jason", "Monroe", "JavaScript", 1999),
        new Developer(2, "Steve", "Wozniac", "Objective C", 1970)
];

let fetchSpy;


it('should have a getDevelopers function that calls GET url and returns the response', () => {
    fetchSpy = jest.spyOn(global, "fetch").mockImplementation( () =>
        Promise.resolve({
            json: () => developers 
        })
    );

    getDevelopers()
    .then(res => expect(res).toEqual(developers));

    expect(fetchSpy).toHaveBeenCalledWith(baseURL+"/developers");

});

it('should have a postDeveloper function that calls POST url with dev and returns the response', () => {
    fetchSpy = jest.spyOn(global, "fetch").mockImplementation( () =>
        Promise.resolve({
            json: () => developers[1] 
        })
    );

    postDeveloper(developers[1])
    .then(res => expect(res).toEqual(developers[1]));

    expect(fetchSpy).toHaveBeenCalledWith(baseURL+"/developer", {"body": JSON.stringify(developers[1]), "headers": {"Content-Type": "application/json"}, "method": "POST"});

});

it('should have a putDeveloper function that calls PUT url with dev and returns the response', () => {
    fetchSpy = jest.spyOn(global, "fetch").mockImplementation( () =>
        Promise.resolve({
            json: () => developers[1] 
        })
    );

    putDeveloper(developers[1])
    .then(res => expect(res).toEqual(developers[1]));

    expect(fetchSpy).toHaveBeenCalledWith(baseURL+"/developer", {"body": JSON.stringify(developers[1]), "headers": {"Content-Type": "application/json"}, "method": "PUT"});

})