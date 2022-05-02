import { fork } from 'redux-saga/effects';

import { loginAuthFetch, driversFetch, createUserSaga } from '../api/login/loginSagas';
import { carsFetch, newCarCreate, freeCarsFetch } from '../api/car/carSagas';
import { brandsFetch } from '../api/brand/brandSagas';
import { reportsFetch, reportsByIdFetch, createNewReportFetch } from '../api/report/reportSagas';
import {
  tasksFetch,
  mineTasksFetch,
  freeTasksFetch,
  createNewTaskSaga,
  updateTaskSaga,
  updateTaskToValidateStatusSaga,
  updateTaskToFinishStatusSaga
} from '../api/task/taskSagas';

// Your sagas for this container
export default function * rootSaga () {
  yield [
    fork(loginAuthFetch),
    fork(createUserSaga),
    fork(driversFetch),
    fork(carsFetch),
    fork(newCarCreate),
    fork(freeCarsFetch),
    fork(brandsFetch),
    fork(reportsFetch),
    fork(reportsByIdFetch),
    fork(createNewReportFetch),
    fork(tasksFetch),
    fork(updateTaskSaga),
    fork(updateTaskToValidateStatusSaga),
    fork(updateTaskToFinishStatusSaga),
    fork(mineTasksFetch),
    fork(createNewTaskSaga),
    fork(freeTasksFetch),
  ]
}
