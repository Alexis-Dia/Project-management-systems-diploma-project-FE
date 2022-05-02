import {apiSignUp, apiCall, apiCallForBasicAuth} from "../../services/api/axiosApi";
import {GET, HOSTNAME, PATH_METHOD_GET_ALL_DRIVERS, PATH_METHOD_SIGN_UP, PORT, POST} from "../../properties/properties";

export function fetchAuth (ob) {
  return  apiCall(HOSTNAME, PORT, GET, ob)
}

export function fetchDrivers(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_DRIVERS, GET, ob.data.data, ob.data.credentials)
}

export function createNewUser(ob) {
  return  apiSignUp(HOSTNAME, PORT, PATH_METHOD_SIGN_UP, POST, ob.data)
}
