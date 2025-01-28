import { combineReducers } from "redux";
import covidReducer from "../features/covid/covidSlice";

export default combineReducers({
  covid: covidReducer,
});
