import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import CountryDetail from "./components/CountryDetail";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/country/:iso" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
