import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TimeOut from "./pages/TimeOut";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/seller-admin" element={<AdminDashboard />} />
          <Route path="/" element={<Landing />} />
          {/* <Route path="/" element={<TimeOut />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
