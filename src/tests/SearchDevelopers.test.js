import React from 'react';
import { fireEvent, render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
    BrowserRouter as Router
}from 'react-router-dom';
import clean from 'clean-tagged-string';
import SearchDevelopers from '../components/SearchDevelopers';
import Developer from '../models/developer';

const graphQLResponse = {
    data: {
        devsByLastName: [
            new Developer(1, "Jay", "Monroe", "C#", 2010),
            new Developer(2, "Marilyn", "Monroe", "Java", 2010)
        ]
    }
}

it('should have a dropdown with the 4 search options and a textbox', () => { 
    render(<SearchDevelopers />);

    const textSearch  = screen.getByTestId("txtSearch");
    const dropDown = screen.getByTestId("ddlSearch");
    const options = screen.getAllByTestId("ddlSearchField");
    const searchButton = screen.getByText("Search");

    expect(textSearch).toBeInTheDocument();
    expect(textSearch.getAttribute("type")).toBe("text");

    expect(dropDown).toBeInTheDocument();
    expect(options[0].value).toBe("devsByFirstName");
    expect(options[1].value).toBe("devsByLastName");
    expect(options[2].value).toBe("devsByFavLang");
    expect(options[3].value).toBe("devsByYearStarted");

    expect(searchButton).toBeInTheDocument();
    expect(searchButton.getAttribute("type")).toBe("submit");

});

it('should send correct query to GraphQL endpoing', async () => {
    let fetchSpy = jest.spyOn(global, "fetch").mockImplementation(()=>
        Promise.resolve({
            json: () => graphQLResponse
        })
    );

    render(<Router ><SearchDevelopers /></Router>);

    const textSearch  = screen.getByTestId("txtSearch");
    const dropDown = screen.getByTestId("ddlSearch");
    const searchButton = screen.getByText("Search");

    await act(() => { 
        fireEvent.change(dropDown, { target: { value: "devsByLastName"}});
        fireEvent.change(textSearch, { target: { value: "Monroe"}});
        fireEvent.click(searchButton);
    });


    const query = clean `{
        devsByLastName(name:"Monroe"){
            id,
            firstName,
            lastName,
            favoriteLanguage,
            yearStarted
        }
    }`

    const queryURL = `https://dev-bios-graphql-dot-tech-services-1000201953.uc.r.appspot.com/q?query=${query}`
    expect(fetchSpy).toHaveBeenCalledWith(queryURL);

});