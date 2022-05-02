import { takeEvery, call, put } from 'redux-saga/effects'
import {
    fetchProjects,
    fetchMineProjects,
    fetchFreeProjects,
    createProject,
    updateProjectApi,
    updateProjectToValidateStatusApi,
    updateProjectToFinishStatusApi
} from "./projectApi";
import {
    SUCCESS,
    FAILURE,
    UNAUTHORIZED,
    GET_PROJECTS,
    GET_MINE_PROJECT,
    GET_FREE_PROJECT,
    PROJECT_WAS_SUCCESSFULLY_CREATED,
    CREATE_PROJECT,
    TAKE_PROJECT,
    PROJECT_WAS_SUCCESSFULLY_ASSIGNED,
    CHANGE_USER_TO_BUSY,
    VALIDATE_PROJECT,
    PROJECT_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS, FINISH_PROJECT, PROJECT_WAS_SUCCESSFULLY_VALIDATED_BY_ADMIN
} from './projectActions'
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES} from "../flash/flashActions";
import {delay} from "redux-saga";

export function fetchApi (data) {
    return fetchProjects(data)
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
            yield put({type: GET_PROJECTS + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: GET_PROJECTS + SUCCESS, response })
        } else {
            yield put({ type: GET_PROJECTS + FAILURE, error })
        }

}

export function * projectsFetch () {
    yield takeEvery(GET_PROJECTS, tryFetch)
}


export function fetchMineApi (data) {
    return fetchMineProjects(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchMine (data) {
    const { response, error } = yield call(fetchMineApi, data);
    if (response.httpStatus === 401) {
        yield put({type: GET_PROJECTS + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_PROJECTS + SUCCESS, response })
    } else {
        yield put({ type: GET_PROJECTS + FAILURE, error })
    }

}

export function * mineProjectsFetch () {
    yield takeEvery(GET_MINE_PROJECT, tryFetchMine)
}


export function fetchFreeApi (data) {
    return fetchFreeProjects(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchFreeProject (data) {
    const { response, error } = yield call(fetchFreeApi, data);
    if (response.httpStatus === 401) {
        yield put({type: GET_FREE_PROJECT + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_FREE_PROJECT + SUCCESS, response })
    } else {
        yield put({ type: GET_FREE_PROJECT + FAILURE, error })
    }

}

export function * freeProjectsFetch () {
    yield takeEvery(GET_FREE_PROJECT, tryFetchFreeProject)
}


export function createProjectApi (data) {
    return createProject(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * newProjectSaga (data) {
    const { response } = yield call(createProjectApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: PROJECT_WAS_SUCCESSFULLY_CREATED}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: PROJECT_WAS_SUCCESSFULLY_CREATED})
    }

}

export function * createNewProjectSaga () {
    yield takeEvery(CREATE_PROJECT, newProjectSaga)
}


export function tryUpdateProjectkApi (data) {
    return updateProjectApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateProject (data) {
    const { response } = yield call(tryUpdateProjectApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: PROJECT_WAS_SUCCESSFULLY_ASSIGNED}});
        yield put({type: CHANGE_USER_TO_BUSY, data: {}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: PROJECT_WAS_SUCCESSFULLY_ASSIGNED})
    }

}

export function * updateProjectSaga () {
    yield takeEvery(TAKE_PROJECT, tryUpdateProject)
}


export function tryUpdateProjectToValidateStatusApi (data) {
    return updateProjectToValidateStatusApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateProjectToValidateStatus (data) {
    const { response } = yield call(tryUpdateProjectToValidateStatusApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: PROJECT_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS}});
        yield put({type: CHANGE_USER_TO_BUSY, data: {}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: PROJECT_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS})
    }

}

export function * updateProjectToValidateStatusSaga () {
    yield takeEvery(VALIDATE_PROJECT, tryUpdateProjectToValidateStatus)
}


export function tryUpdateProjectToFinishStatusApi (data) {
    return updateProjectToFinishStatusApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateProjectToFinishStatus (data) {
    const { response } = yield call(tryUpdateProjectToFinishStatusApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: PROJECT_WAS_SUCCESSFULLY_VALIDATED_BY_ADMIN}});
        yield put({type: CHANGE_USER_TO_BUSY, data: {}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: PROJECT_WAS_SUCCESSFULLY_VALIDATED_BY_ADMIN})
    }

}

export function * updateProjectToFinishStatusSaga () {
    yield takeEvery(FINISH_PROJECT, tryUpdateProjectToFinishStatus)
}

