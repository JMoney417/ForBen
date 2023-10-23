import { handleActions } from "redux-actions";

export const Types = {
    GET_ALL_BIOS_REQUEST: 'GET_ALL_BIOS_REQUEST',
    GET_ALL_BIOS_SUCCESS: 'GET_ALL_BIOS_SUCCESS',
    ADD_BIO: 'ADD_BIO',
    EDIT_BIO: 'EDIT_BIO'
}

const devActions = {
    getAllBiosRequestActionCreator: () => ({
        type: Types.GET_ALL_BIOS_REQUEST
    }),
    getAllBiosSuccessActionCreator: (developers) => ({
        type: Types.GET_ALL_BIOS_SUCCESS,
        developers
    }),
    addBioActionCreator: (developer) => ({
        type: Types.ADD_BIO,
        developer
    }),
    editBioActionCreator: (developer) => ({
        type: Types.EDIT_BIO,
        developer
    }),
    reducer: handleActions({
        [Types.GET_ALL_BIOS_REQUEST]: (state) => ({state}),
        [Types.GET_ALL_BIOS_SUCCESS]: (state, action) => ({
            ...state,
            developers: action.developers
        }),
        [Types.ADD_BIO]: (state) => ({state}),
        [Types.EDIT_BIO]: (state) => ({state})
    },{
        myOtherStuff: "hello from redux",
        developers: []//initial state
    })
}


export default devActions;