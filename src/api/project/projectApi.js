import {apiCall, apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME,
  PATH_METHOD_CHANGE_PROJECT_STATUS_TO_FINISHED,
  PATH_METHOD_CHANGE_PROJECT_STATUS_TO_VALIDATED,
  PATH_METHOD_GET_ADD_USER_TO_THE_PROJECT,
  PATH_METHOD_GET_ALL_PROJECTS,
  PATH_METHOD_GET_FREE_PROJECTS,
  PATH_METHOD_GET_MINE_PROJECTS, PATH_METHOD_GET_REMOVE_USER_FROM_THE_PROJECT,
  PATH_METHOD_POST_CREATE_PROJECT,
  PATH_METHOD_TAKE_PROJECT,
  PORT,
  POST,
  PUT
} from "../../properties/properties";

export function fetchProjects (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_PROJECTS, POST, ob.data, ob.data.credentials)
}

export function fetchMineProjects(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_MINE_PROJECTS + '?userId=' + ob.data.data.id, GET, ob.data.data, ob.data.credentials)
}

export function fetchFreeProjects(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_FREE_PROJECTS, GET, ob.data.data, ob.data.credentials)
}

export function createProject(ob) {
  let body = ob.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_POST_CREATE_PROJECT, PUT, body, ob.data.credentials)
}

export function updateProjectApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_TAKE_PROJECT + '?projectId=' + body.projectId + '&carId=' + body.carId, PUT, body, ob.data.credentials)
}

export function updateProjectToValidateStatusApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CHANGE_PROJECT_STATUS_TO_VALIDATED + '?projectId=' + body.projectId + '&statusId=' + body.statusId, PUT, body, ob.data.credentials)
}

export function updateProjectToFinishStatusApi(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CHANGE_PROJECT_STATUS_TO_FINISHED + '?projectId=' + body.projectId + '&status=' + body.status, PUT, body, ob.data.credentials)
}

export function addUserToProject(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ADD_USER_TO_THE_PROJECT + '?projectId=' + body.projectId + '&userId=' + body.userId, GET, body, ob.data.credentials)
}

export function removeUserFromProject(ob) {
  let body = ob.data.data;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_REMOVE_USER_FROM_THE_PROJECT + '?projectId=' + body.projectId + '&userId=' + body.userId, GET, body, ob.data.credentials)
}
