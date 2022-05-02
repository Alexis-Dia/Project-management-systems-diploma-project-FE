import { takeEvery, call, put } from 'redux-saga/effects';
import {delay} from "redux-saga";
import {SUCCESS, FAILURE, UNAUTHORIZED, GET_BRANDS} from './brandActions';
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES} from "../flash/flashActions";
import {fetchBrands} from "./brandApi";

export function fetchBrandsApi (data) {
    return fetchBrands(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchBrands (data) {
        const { response, error } = yield call(fetchBrandsApi, data);
        if (response.httpStatus === 401) {
            yield put({type: GET_BRANDS + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: GET_BRANDS + SUCCESS, response })
        } else {
            yield put({ type: GET_BRANDS + FAILURE, error })
        }

}

export function * brandsFetch () {
    yield takeEvery(GET_BRANDS, tryFetchBrands)
}
