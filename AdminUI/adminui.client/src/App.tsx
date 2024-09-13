import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

const AdminUIPage = lazy(() => import("./components/pages/AdminUIPage"));

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-ui" replace={true} />} />
      <Route path="/admin-ui" element={<AdminUIPage />} />
    </Routes>
  </Router>
);

export default App;
