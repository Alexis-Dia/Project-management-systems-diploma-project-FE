import { apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME,
  PATH_METHOD_GET_ALL_REPORTS,
  PATH_METHOD_GET_REPORTS_BY_TASK_ID, PATH_METHOD_POST_CREATE_REPORT,
  PORT, POST
} from "../../properties/properties";

export function fetchReports (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_REPORTS, POST, ob.data.data, ob.data.credentials)
}

export function fetchReportsById(ob) {
  let taskId = ob.data.data.taskId;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_REPORTS_BY_TASK_ID + taskId, GET, ob.data.data, ob.data.credentials)
}

export function createNewReport(ob) {
  let taskId = ob.data.taskId;
  let body1 = {data: ob.data.data};
  let body2 = {data: ob.data.data.data};
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_POST_CREATE_REPORT + taskId, POST, ob.data, ob.data.credentials)
}
