import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCountryStart } from "../features/covid/covidSlice";
import { Container, Alert, Spinner, Card, Row, Col } from "react-bootstrap";

const CountryDetail = () => {
  const { iso } = useParams(); // Get ISO code from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countryData, loading, error } = useSelector((state) => state.covid);

  // Fetch country data on component mount or ISO change
  useEffect(() => {
    dispatch(fetchCountryStart(iso));
  }, [iso]);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num ? new Intl.NumberFormat().format(num) : "N/A";
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading country data...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Error: {error}</h4>
          <p className="mt-3">Possible reasons:</p>
          <ul>
            <li>
              Country code format: <code>{iso}</code> (should be 3-letter ISO)
            </li>
            <li>Last available date: {new Date().toLocaleDateString()}</li>
            <li>
              API Status:{" "}
              <a
                href="https://rapidapi.com/KishCom/api/covid-19-statistics"
                target="_blank"
                rel="noreferrer"
              >
                Check here
              </a>
            </li>
          </ul>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <button
              onClick={() => dispatch(fetchCountryStart(iso))}
              className="btn btn-primary"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline-primary"
            >
              ← Back to Map
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Render country data
  return (
    <Container className="py-4">
      <button onClick={() => navigate("/")} className="btn btn-link mb-4">
        ← Back to Map
      </button>

      {countryData && (
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h2 className="mb-0">
              {countryData.region.name} COVID-19 Statistics
            </h2>
          </Card.Header>
          <Card.Body>
            <Row className="g-4">
              <Col md={6} lg={3} className="stats-column">
                <div className="p-3 bg-light rounded">
                  <h5>Confirmed Cases</h5>
                  <p className="display-6 text-primary">
                    {formatNumber(countryData.confirmed)}
                  </p>
                </div>
              </Col>
              <Col md={6} lg={3} className="stats-column">
                <div className="p-3 bg-light rounded">
                  <h5>Deaths</h5>
                  <p className="display-6 text-danger">
                    {formatNumber(countryData.deaths)}
                  </p>
                </div>
              </Col>
              <Col md={6} lg={3} className="stats-column">
                <div className="p-3 bg-light rounded">
                  <h5>Recovered</h5>
                  <p className="display-6 text-success">
                    {formatNumber(countryData.recovered)}
                  </p>
                </div>
              </Col>
              <Col md={6} lg={3} className="stats-column">
                <div className="p-3 bg-light rounded">
                  <h5>Active Cases</h5>
                  <p className="display-6 text-warning">
                    {formatNumber(countryData.active)}
                  </p>
                </div>
              </Col>
            </Row>

            <div className="mt-4 text-muted small">
              Last Updated: {new Date(countryData.last_update).toLocaleString()}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default CountryDetail;
