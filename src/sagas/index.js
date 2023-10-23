import { all } from "redux-saga/effects";
import developerSagas from "./devsSagas";

export default function* rootSaga(){
    yield all([
        ...developerSagas
    ]);
}