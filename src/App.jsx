import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ScannerPage from "./components/ScannerPage";
import ResultPage from "./components/ResultPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage setScanResult={setScanResult} />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/scanner"
            element={
              isLoggedIn ? (
                <ScannerPage setScanResult={setScanResult} />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/result"
            element={
              isLoggedIn && scanResult ? (
                <ResultPage scanResult={scanResult} />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
