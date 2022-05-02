import { apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME, PATH_METHOD_GET_ALL_BRANDS,
  PORT
} from "../../properties/properties";

export function fetchBrands (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_BRANDS, GET, ob.data.data, ob.data.credentials)
}

