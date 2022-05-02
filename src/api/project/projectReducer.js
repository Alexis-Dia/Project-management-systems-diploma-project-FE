import {GET_PROJECTS, SUCCESS, FAILURE, GET_FREE_PROJECT, DELETE_PROJECT} from './projectActions'
import { PROJECT } from './projectProperties'

const initialState = {
    list: [],
    freeProjectList: [],
};

const projectReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_PROJECTS + FAILURE:

      return  {
        ...state,
        list: action.response.result
      };

    case GET_PROJECTS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    case DELETE_PROJECT:

      return  {
        list: [],
        freeProjectList: [],
      };

    case GET_FREE_PROJECT + FAILURE:

      return  {
        ...state,
        freeProjectList: action.response.result
      };

    case GET_FREE_PROJECT + SUCCESS:

      return  {
        ...state,
        freeProjectList: action.response.result
      };

    default:
      return state;
  }

}
export default projectReducer
