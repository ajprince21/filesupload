// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Files from "./components/Files";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>File Upload Service</h1>
          <nav>
            <ul className="nav-links">
              {!token ? (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/upload">Upload</Link>
                  </li>
                  <li>
                    <Link to="/files">Files</Link>
                  </li>
                  <li>
                    <Link onClick={() => setToken(null)}>Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route
              path="/upload"
              element={
                token ? <Upload token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/files"
              element={
                token ? <Files token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                token ? <Navigate to="/upload" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
