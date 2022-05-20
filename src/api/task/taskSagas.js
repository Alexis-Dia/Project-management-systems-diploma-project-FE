import { takeEvery, call, put } from 'redux-saga/effects'
import {
    fetchTasks,
    fetchMineTasks,
    fetchFreeTasks,
    createTask,
    updateTaskApi,
    updateTaskToValidateStatusApi,
    updateTaskToFinishStatusApi
} from "./taskApi";
import {
    SUCCESS,
    FAILURE,
    UNAUTHORIZED,
    GET_TASKS,
    GET_MINE_TASK,
    GET_FREE_TASK,
    TASK_WAS_SUCCESSFULLY_CREATED,
    CREATE_TASK,
    TAKE_TASK,
    TASK_WAS_SUCCESSFULLY_ASSIGNED,
    CHANGE_USER_TO_BUSY,
    VALIDATE_TASK,
    TASK_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS,
    FINISH_TASK,
    TASK_WAS_SUCCESSFULLY_FINISHED_BY_USER, CHANGE_USER_TO_FREE
} from './taskActions'
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES} from "../flash/flashActions";
import {delay} from "redux-saga";

export function fetchApi (data) {
    return fetchTasks(data)
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
            yield put({type: GET_TASKS + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: GET_TASKS + SUCCESS, response })
        } else {
            yield put({ type: GET_TASKS + FAILURE, error })
        }

}

export function * tasksFetch () {
    yield takeEvery(GET_TASKS, tryFetch)
}


export function fetchMineApi (data) {
    return fetchMineTasks(data)
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
        yield put({type: GET_TASKS + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_TASKS + SUCCESS, response })
    } else {
        yield put({ type: GET_TASKS + FAILURE, error })
    }

}

export function * mineTasksFetch () {
    yield takeEvery(GET_MINE_TASK, tryFetchMine)
}


export function fetchFreeApi (data) {
    return fetchFreeTasks(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchFreeTask (data) {
    const { response, error } = yield call(fetchFreeApi, data);
    if (response.httpStatus === 401) {
        yield put({type: GET_FREE_TASK + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: GET_FREE_TASK + SUCCESS, response })
    } else {
        yield put({ type: GET_FREE_TASK + FAILURE, error })
    }

}

export function * freeTasksFetch () {
    yield takeEvery(GET_FREE_TASK, tryFetchFreeTask)
}


export function createTaskApi (data) {
    return createTask(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * newTaskSaga (data) {
    const { response } = yield call(createTaskApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: TASK_WAS_SUCCESSFULLY_CREATED}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: TASK_WAS_SUCCESSFULLY_CREATED})
    }

}

export function * createNewTaskSaga () {
    yield takeEvery(CREATE_TASK, newTaskSaga)
}


export function tryUpdateTaskApi (data) {
    return updateTaskApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateTask (data) {
    const { response } = yield call(tryUpdateTaskApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: TASK_WAS_SUCCESSFULLY_ASSIGNED}});
        yield put({type: CHANGE_USER_TO_BUSY, data: {}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: TASK_WAS_SUCCESSFULLY_ASSIGNED})
    }

}

export function * updateTaskSaga () {
    yield takeEvery(TAKE_TASK, tryUpdateTask)
}


export function tryUpdateTaskToValidateStatusApi (data) {
    return updateTaskToValidateStatusApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateTaskToValidateStatus (data) {
    const { response } = yield call(tryUpdateTaskToValidateStatusApi, data);
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: TASK_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS}});
        yield put({type: CHANGE_USER_TO_BUSY, data: {}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: TASK_WAS_SUCCESSFULLY_MOVED_TO_VALIDATING_STATUS})
    }

}

export function * updateTaskToValidateStatusSaga () {
    yield takeEvery(VALIDATE_TASK, tryUpdateTaskToValidateStatus)
}


export function tryUpdateTaskToFinishStatusApi (data) {
    return updateTaskToFinishStatusApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryUpdateTaskToFinishStatus (data) {
    const { response } = yield call(tryUpdateTaskToFinishStatusApi, data);
    let status = data.data.data.status;
    let msg = 'Task was successfully moved to the ' + status + '-status by user!'
    if (response.httpStatus === 200) {
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: msg}});
        yield put({type: CHANGE_USER_TO_FREE, data: {status}});
        yield delay(5000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: msg})
    }
}

export function * updateTaskToFinishStatusSaga () {
    yield takeEvery(FINISH_TASK, tryUpdateTaskToFinishStatus)
}

