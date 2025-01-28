import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCountriesSuccess,
  fetchCountrySuccess,
  fetchFailure,
} from "./covidSlice";

// Axios instance for API requests
const API = axios.create({
  baseURL: "https://covid-19-statistics.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
  },
});

// Fetch all countries
function* fetchCountries() {
  try {
    const { data } = yield call(API.get, "/regions");

    // Map API response to valid country format
    const validCountries = data.data.map((country) => ({
      iso: country.iso, // ISO3 code (e.g., "AFG")
      name: country.name,
    }));

    yield put(fetchCountriesSuccess(validCountries));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

// Fetch data for a specific country
function* fetchCountry({ payload: isoCode }) {
  try {
    const fixedDate = "2023-03-09"; // Fixed date for API request

    const { data } = yield call(API.get, "/reports", {
      params: {
        iso: isoCode,
        date: fixedDate,
      },
    });

    // Handle empty data response
    if (!data.data || data.data.length === 0) {
      throw new Error("No data found for this country");
    }

    yield put(fetchCountrySuccess(data.data[0]));
  } catch (error) {
    console.error("API Error:", error);
    yield put(fetchFailure(error.message));
  }
}

// Root saga
export function* covidSaga() {
  yield takeLatest("covid/fetchCountriesStart", fetchCountries);
  yield takeLatest("covid/fetchCountryStart", fetchCountry);
}
