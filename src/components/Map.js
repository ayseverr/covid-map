import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesStart } from "../features/covid/covidSlice";
import { useNavigate } from "react-router-dom";
import WorldMap from "react-svg-worldmap";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import * as iso from "iso-country-codes"; // For ISO conversions

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries, loading, error } = useSelector((state) => state.covid);

  // Fetch countries on component mount
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountriesStart());
    }
  }, [dispatch, countries.length]);

  // Convert ISO3 to ISO2 for map data
  const mapData = countries
    .map((country) => {
      const countryInfo = iso.byAlpha3[country.iso]; // Get country info from ISO3
      if (!countryInfo) return null;
      return {
        country: countryInfo.alpha2.toLowerCase(), // ISO2 in lowercase
        value: country.iso, // Store ISO3 for later use
      };
    })
    .filter((item) => item !== null); // Filter out invalid countries

  // Handle country click
  const handleCountryClick = ({ countryCode }) => {
    const countryInfo = iso.byAlpha2[countryCode.toUpperCase()]; // Get country info from ISO2
    if (countryInfo) {
      navigate(`/country/${countryInfo.alpha3}`); // Navigate to country detail page
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading countries...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Error: {error}</h4>
          <button
            onClick={() => dispatch(fetchCountriesStart())}
            className="btn btn-primary mt-3"
          >
            Retry
          </button>
        </Alert>
      </Container>
    );
  }

  // Render world map
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">COVID-19 World Map</h1>
      <Row>
        <Col>
          <div className="map-container shadow-lg rounded">
            <WorldMap
              color="var(--bs-primary)"
              size="responsive"
              data={mapData}
              onClickFunction={handleCountryClick}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <div className="legend text-center">
            <small>Click on any country to view detailed statistics</small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Map;
