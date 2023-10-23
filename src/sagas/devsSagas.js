import { call, fork, put, takeLatest} from 'redux-saga/effects';
import devActions, { Types } from '../reducers/devReducers';
import { getDevelopers, postDeveloper, putDeveloper } from '../api/devsApi';


//workers
export function* getDevBios(){
    try{
        const developers = yield call(getDevelopers);
        yield put(devActions.getAllBiosSuccessActionCreator(developers));
    }catch(error){
        console.log('Error occurred fetching Developers: '+error);
    }
}

export function* postDevBio({developer}){
    try{
        yield call(postDeveloper,developer);
        yield put(devActions.getAllBiosRequestActionCreator());/*update possible stale state from 
        AddDeveloper navigating to DisplayBios before POST has completed
        */
    }catch(error){
        console.log('Error occured posting bio:'+error);
    }
}


export function* putDevBio({developer}){
    try{
        yield call(putDeveloper, developer);
        yield put(devActions.getAllBiosRequestActionCreator());/*update possible stale state from 
        EditDeveloper navigating to DisplayBios before POST has completed
        */
    }catch(error){
        console.log('Error occured posting bio:'+error);
    }
}

//watchers
function* watchGetAllBiosRequest(){
    yield takeLatest(Types.GET_ALL_BIOS_REQUEST, getDevBios);
}

function* watchAddBioPost(){
    yield takeLatest(Types.ADD_BIO, postDevBio)
}

function* watchEditBioPut(){
    yield takeLatest(Types.EDIT_BIO, putDevBio)
}

const developerSagas = [
    fork(watchGetAllBiosRequest),
    fork(watchAddBioPost),
    fork(watchEditBioPut)
];

export default developerSagas;