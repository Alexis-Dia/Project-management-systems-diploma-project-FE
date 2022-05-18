import { takeEvery, call, put } from 'redux-saga/effects'
import {delay} from "redux-saga";
import {SUCCESS, FAILURE, UNAUTHORIZED, GET_REPORTS, GET_REPORTS_BY_TASK_ID, SAVE_REPORT} from './reportActions'
import {fetchReports, fetchReportsById, createNewReport} from "./reportApi";
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES, REPORT_WAS_SUCCESSFULLY_ADDED} from "../flash/flashActions";

export function fetchApi (data) {
    return fetchReports(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetch (data) {
        const { response, error } = yield call(fetchApi, data);
        if (response.httpStatus === 401) {
            yield put({type: GET_REPORTS + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: GET_REPORTS + SUCCESS, response })
        } else {
            yield put({ type: GET_REPORTS + FAILURE, error })
        }

}

export function * reportsFetch () {
    yield takeEvery(GET_REPORTS, tryFetch)
}


export function fetchByIdApi (data) {
    return fetchReportsById(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchById (data) {
    const { response, error } = yield call(fetchByIdApi, data);
    if (response.httpStatus === 401) {
        yield put({type: GET_REPORTS + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_REPORTS + SUCCESS, response })
    } else {
        yield put({ type: GET_REPORTS + FAILURE, error })
    }

}

export function * reportsByIdFetch () {
    yield takeEvery(GET_REPORTS_BY_TASK_ID, tryFetchById)
}


export function fetchCreateNewReport (data) {
  console.log("2")
    return createNewReport(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchCreateNewReport (data) {
    console.log("1")
    const { response } = yield call(fetchCreateNewReport, data);
     if (response.httpStatus === 200) {
         yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: REPORT_WAS_SUCCESSFULLY_ADDED}});
         yield delay(3000, true);
         yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: REPORT_WAS_SUCCESSFULLY_ADDED})
     }

}

export function * createNewReportFetch () {
    yield takeEvery(SAVE_REPORT, tryFetchCreateNewReport)
}
