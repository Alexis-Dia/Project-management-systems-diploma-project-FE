import { combineReducers } from 'redux';
import locationReducer from './location';
import loginReducer from '../api/login/loginReducer';
import carReducer from '../api/car/carReducer';
import brandReducer from '../api/brand/brandReducer';
import projectReducer from '../api/project/projectReducer';
import taskReducer from '../api/task/taskReducer';
import reportReducer from '../api/report/reportReducer';
import flashReducer from "../api/flash/flashReducer";


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: loginReducer,
    car: carReducer,
    brand: brandReducer,
    project: projectReducer,
    task: taskReducer,
    report: reportReducer,
    flashMessages: flashReducer,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer
