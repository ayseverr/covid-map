import { all } from "redux-saga/effects";
import { covidSaga } from "../features/covid/covidSaga";

export default function* rootSaga() {
  yield all([covidSaga()]);
}
