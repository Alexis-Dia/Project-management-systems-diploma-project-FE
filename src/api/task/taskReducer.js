import {GET_TASKS, SUCCESS, FAILURE, GET_FREE_TASK, DELETE_TASK} from './taskActions'
import { TASK } from './taskProperties'

const initialState = {
    list: [],
    freeTaskList: [],
};

const taskReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_TASKS + FAILURE:

      return  {
        ...state,
        list: action.response.result
      };

    case GET_TASKS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    case DELETE_TASK:

      return  {
        list: [],
        freeTaskList: [],
      };

    case GET_FREE_TASK + FAILURE:

      return  {
        ...state,
        freeTaskList: action.response.result
      };

    case GET_FREE_TASK + SUCCESS:

      return  {
        ...state,
        freeTaskList: action.response.result
      };

    default:
      return state;
  }

}
export default taskReducer