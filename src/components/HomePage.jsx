import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/apiService";

function HomePage({ setScanResult }) {
  const navigate = useNavigate();

  const handleScanClick = () => {
    setScanResult(null);
    navigate("/scanner");
  };

  const handleLogout = () => {
    authAPI.logout();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header with logout button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Выйти
        </button>
      </div>

      {/* Main content */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Главная страница
      </h1>
      <button
        onClick={handleScanClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m0 0V4m0 4h.01M4 16h4m0 0v4m0-4h.01m8-12h.01M20 12h.01"
          />
        </svg>
        Сканировать QR
      </button>
    </div>
  );
}

export default HomePage;
