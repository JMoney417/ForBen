import { render, screen } from "@testing-library/react"
import FakeComponent from "../testUtils/FakeComponent"
import { act } from 'react-dom/test-utils';
import AuthContextProvider from "../contexts/AuthContextProvider"
import React from "react";
import { Auth } from "aws-amplify";
import { regularUser } from '../testUtils/authUsers';

let authUserSpy;

beforeEach(() => {
    jest.clearAllMocks();
    authUserSpy = jest.spyOn(Auth, "currentAuthenticatedUser").mockResolvedValue(regularUser);
});

it(`should render a child component that has access to the context`, async () => {

    await act(async () =>
        render(
            <AuthContextProvider>
                <FakeComponent  />
            </AuthContextProvider>
        ))

    expect(authUserSpy).toHaveBeenCalled();

})