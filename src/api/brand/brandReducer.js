import { GET_BRANDS, SUCCESS, FAILURE } from './brandActions'

const initialState = {
    list: [],
};

const brandReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_BRANDS + FAILURE:
      return  {
        ...state,
        list: action.response.result
      };

    case GET_BRANDS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    default:
      return state;
  }

}
export default brandReducer