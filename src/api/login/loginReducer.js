import { DELETE_CURRENT_USER, SUCCESS, FAILURE, LOGIN, GET_DRIVERS } from './loginActions'
import { LOGIN_INVALID_CREDENTIALS } from './loginProperties'
import {CHANGE_USER_TO_BUSY, CHANGE_USER_TO_FREE} from "../task/taskActions";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty';
import {ADD_USER_TO_THE_PROJECT, REMOVE_USER_FROM_THE_PROJECT} from "../project/projectActions";

const initialState = {
    isAuthenticated: false,
    user: {},
    list: []
};

const loginReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case LOGIN + FAILURE:

      let message = action.error.message;
      return {
        isAuthenticated: false,
        user: {errors: message}
      };

    case LOGIN + SUCCESS:
      const token = action.response.result.jwt;
      const userID = action.response.result.userID;
      const userStatus = action.response.result.userStatus;
      if (token) {
        localStorage.setItem('userID', userID);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userStatus', userStatus);
        setAuthorizationToken(token);
        const user = jwt.decode(token);
        user["username"] = user.sub;
        user["id"] = user.jti;
        return {
          isAuthenticated: true,
          user: {...action.response.result}
        }
      }
      return state;

    case "SET_CURRENT_USER_FROM_TOKEN":
      const user = jwt.decode(localStorage.jwtToken);
      user["username"] = user.sub;
      user["id"] = user.jti;
      if (user.sub && user.sub === 'admin@gmail.com') {
        user["userRole"] = "ADMIN";
      } else {
        user["userRole"] = "USER";
      }
      const id = localStorage.userID;
      const status = localStorage.userStatus;
      user["userID"] = id;
      user["userStatus"] = status;

      return {
        isAuthenticated: isEmpty(user.errors),
        user: user
      }
      return state;

    case GET_DRIVERS + FAILURE:
      return  {
        ...state,
        list: []
      };

    case GET_DRIVERS + SUCCESS:
      return  {
        ...state,
        list: action.response.result
      };

    case ADD_USER_TO_THE_PROJECT + SUCCESS:
      return  {
        ...state,
        //list: action.response.result
      };

    case REMOVE_USER_FROM_THE_PROJECT + SUCCESS:
      return  {
        ...state,
        //list: action.response.result
      };

    case DELETE_CURRENT_USER:
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      return {
        isAuthenticated: false,
        user: {  }
      };

    case CHANGE_USER_TO_BUSY:
      return {
        ...state,
        user: {...state.user, userStatus: 'BUSY'}
      };

    case CHANGE_USER_TO_FREE:
      let optionalParams = action.data.status;
      let updatedStatus = "";
      if (optionalParams == "IN_PROGRESS") {
        updatedStatus = 'BUSY'
      } else {
        updatedStatus = 'FREE'
      }
      return {
        ...state,
        user: {...state.user, userStatus: updatedStatus}
      };

    default:
      return state;
  }

}
export default loginReducer
