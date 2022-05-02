import {apiSignUp, apiCall, apiCallForBasicAuth} from "../../services/api/axiosApi";
import {GET, HOSTNAME, PATH_METHOD_GET_ALL_EMPLOYEES, PATH_METHOD_SIGN_UP, PORT, POST} from "../../properties/properties";

export function fetchAuth (ob) {
  return  apiCall(HOSTNAME, PORT, GET, ob)
}

export function fetchEmployees(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_EMPLOYEES, POST, ob.data, ob.data.credentials)
}

export function createNewUser(ob) {
  return  apiSignUp(HOSTNAME, PORT, PATH_METHOD_SIGN_UP, POST, ob.data)
}
