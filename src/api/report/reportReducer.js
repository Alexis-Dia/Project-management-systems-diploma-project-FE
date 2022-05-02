import { GET_REPORTS, SUCCESS, FAILURE } from './reportActions'
import { REPORT } from './reportProperties'

const initialState = {
    list: [],
};

const reportReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_REPORTS + FAILURE:
      return  {
        ...state,
        list: action.response.result
      };

    case GET_REPORTS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    default:
      return state;
  }

}
export default reportReducer