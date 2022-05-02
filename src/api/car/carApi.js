import { apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME,
  PATH_METHOD_GET_ALL_CARS,
  PATH_METHOD_GET_ALL_DRIVERS,
  PATH_METHOD_GET_ALL_FREE_CARS,
  PATH_METHOD_POST_CREATE_NEW_CAR,
  PATH_METHOD_POST_CREATE_TASK,
  PORT,
  POST
} from "../../properties/properties";

export function fetchCars (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_CARS, GET, ob.data.data, ob.data.credentials)
}

export function createNewCar(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_POST_CREATE_NEW_CAR, POST, ob.data, ob.data.credentials)
}

export function fetchFreeCars(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_FREE_CARS, GET, ob.data, ob.data.credentials)
}