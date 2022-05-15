import { apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME, PATH_METHOD_CHANGE_TASK_STATUS_TO_FINISHED, PATH_METHOD_CHANGE_TASK_STATUS_TO_VALIDATED,
  PATH_METHOD_GET_ALL_TASKS,
  PATH_METHOD_GET_FREE_TASKS,
  PATH_METHOD_GET_MINE_TASKS, PATH_METHOD_POST_CREATE_REPORT, PATH_METHOD_POST_CREATE_TASK, PATH_METHOD_TAKE_TASK,
  PORT, POST, PUT
} from "../../properties/properties";

export function fetchTasks (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_TASKS, GET, ob.data.data, ob.data.credentials)
}

export function fetchMineTasks(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_MINE_TASKS + '?userId=' + ob.data.data.id, GET, ob.data.data, ob.data.credentials)
}

export function fetchFreeTasks(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_FREE_TASKS, GET, ob.data.data, ob.data.credentials)
}

export function createTask(ob) {
  let body = ob.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_POST_CREATE_TASK, POST, body, ob.data.credentials)
}

export function updateTaskApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_TAKE_TASK + '?taskId=' + body.taskId + '&carId=' + body.carId, PUT, body, ob.data.credentials)
}

export function updateTaskToValidateStatusApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CHANGE_TASK_STATUS_TO_VALIDATED + '?taskId=' + body.taskId + '&statusId=' + body.statusId, PUT, body, ob.data.credentials)
}

export function updateTaskToFinishStatusApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CHANGE_TASK_STATUS_TO_FINISHED + '?taskId=' + body.taskId + '&statusId=' + body.statusId, PUT, body, ob.data.credentials)
}
