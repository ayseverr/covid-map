// src/features/covid/__tests__/covidSlice.test.js
import covidReducer, {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountryStart,
  fetchCountrySuccess,
  fetchFailure,
} from "../covidSlice";

describe("covidSlice Reducer", () => {
  const initialState = {
    countries: [],
    countryData: null,
    loading: false,
    error: null,
    lastUpdated: null,
    __debug: {
      lastAction: null,
      receivedCountries: [],
    },
  };

  // Initial State Test
  it("should return initial state when no action passed", () => {
    expect(covidReducer(undefined, {})).toEqual(initialState);
  });

  // Fetch Countries Tests.
  describe("fetchCountries actions", () => {
    it("should set loading=true on fetchCountriesStart", () => {
      const nextState = covidReducer(initialState, fetchCountriesStart());
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it("should update countries list on fetchCountriesSuccess", () => {
      const mockCountries = [
        { iso: "TUR", name: "Turkey" },
        { iso: "USA", name: "United States" },
      ];

      const nextState = covidReducer(
        initialState,
        fetchCountriesSuccess(mockCountries)
      );

      expect(nextState.countries).toEqual(mockCountries);
      expect(nextState.__debug.receivedCountries).toEqual(mockCountries);
      expect(nextState.loading).toBe(false);
    });
  });

  // fetch Country tests
  describe("fetchCountry actions", () => {
    it("should set loading=true on fetchCountryStart", () => {
      const nextState = covidReducer(initialState, fetchCountryStart());
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it("should update countryData on fetchCountrySuccess", () => {
      const mockCountryData = {
        region: {
          name: "Turkey",
          iso: "TUR",
        },
        confirmed: 15000000,
        deaths: 100000,
        recovered: 14000000,
        active: 900000,
        last_update: "2023-03-09T12:00:00Z",
      };

      const nextState = covidReducer(
        initialState,
        fetchCountrySuccess(mockCountryData)
      );

      expect(nextState.countryData).toEqual(mockCountryData);
      expect(nextState.loading).toBe(false);
      expect(nextState.lastUpdated).toBeTruthy();
    });
  });

  // Eeror handling tests.
  describe("error handling", () => {
    it("should handle fetchFailure", () => {
      const errorMessage = "API Rate Limit Exceeded";
      const nextState = covidReducer(initialState, fetchFailure(errorMessage));

      expect(nextState.error).toBe(errorMessage);
      expect(nextState.loading).toBe(false);
      expect(nextState.lastUpdated).toBeTruthy();
    });

    it("should clear previous error on new fetchStart", () => {
      const errorState = covidReducer(
        initialState,
        fetchFailure("Previous Error")
      );

      const nextState = covidReducer(errorState, fetchCountriesStart());
      expect(nextState.error).toBeNull();
    });
  });

  // Edge Cases
  describe("edge cases", () => {
    it("should handle empty country list", () => {
      const nextState = covidReducer(initialState, fetchCountriesSuccess([]));

      expect(nextState.countries).toHaveLength(0);
      expect(nextState.__debug.receivedCountries).toHaveLength(0);
    });

    it("should handle partial country data", () => {
      const mockCountryData = {
        region: { name: "Turkey" }, // missing ISO
        confirmed: 15000000,
        // missing other fields
      };

      const nextState = covidReducer(
        initialState,
        fetchCountrySuccess(mockCountryData)
      );

      expect(nextState.countryData.region.iso).toBeUndefined();
      expect(nextState.countryData.deaths).toBeUndefined();
    });
  });
});
