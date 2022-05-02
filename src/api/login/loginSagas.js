import { fetchAuth, fetchEmployees, createNewUser } from './loginApi';
import { takeEvery, call, put } from 'redux-saga/effects';
import {delay} from "redux-saga";
import {
    SUCCESS,
    FAILURE,
    UNAUTHORIZED,
    LOGIN,
    GET_DRIVERS,
    SIGN_UP,
    USER_WAS_SUCCESSFULLY_CREATED, USER_EXISTS_WITH_THE_SAME_EMAIL
} from './loginActions';
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES} from "../flash/flashActions";

export function fetchAuthApi (data) {
    return fetchAuth(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchAuth (data) {
        const { response, error } = yield call(fetchAuthApi, data);
        if (response.httpStatus === 401) {
            yield put({type: LOGIN + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: LOGIN + SUCCESS, response })
        } else {
            yield put({ type: LOGIN + FAILURE, error:{message: response.data.message} })
        }

}

export function * loginAuthFetch () {
    yield takeEvery(LOGIN, tryFetchAuth)
}



export function fetchDriversApi (data) {
    return fetchEmployees(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchDrivers (data) {
    const { response, error } = yield call(fetchDriversApi, data);
    if (response.httpStatus === 401) {
        yield put({type: GET_DRIVERS + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_DRIVERS + SUCCESS, response })
    } else {
        yield put({ type: GET_DRIVERS + FAILURE, error })
    }

}

export function * driversFetch () {
    yield takeEvery(GET_DRIVERS, tryFetchDrivers)
}


export function signUpApi (data) {
    return createNewUser(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * createUser (data) {
    const { response } = yield call(signUpApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: USER_WAS_SUCCESSFULLY_CREATED}});
        yield delay(7000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: USER_WAS_SUCCESSFULLY_CREATED})
    } else {
        let errMessage = response.data.message;
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "error", text: errMessage}});
        yield delay(7000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: errMessage})
    }

}

export function * createUserSaga () {
    yield takeEvery(SIGN_UP, createUser)
}
