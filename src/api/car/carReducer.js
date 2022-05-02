import {GET_CARS, CREATE_CAR, SUCCESS, FAILURE, GET_ALL_FREE_CARS} from './carActions'
import { CAR } from './carProperties'

const initialState = {
    list: [],
    listOfFreeCars: [],
};

const carReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_CARS + FAILURE:
      return  {
        ...state,
        list: action.response.result
      };

    case GET_CARS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    case GET_ALL_FREE_CARS + SUCCESS:

      return  {
        ...state,
        listOfFreeCars: action.response.result
      };

    case GET_ALL_FREE_CARS + SUCCESS:

      return  {
        ...state,
        listOfFreeCars: action.response.result
      };

    default:
      return state;
  }

}
export default carReducer