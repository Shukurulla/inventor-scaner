import { useNavigate } from "react-router-dom";

function HomePage({ setScanResult }) {
  const navigate = useNavigate();

  const handleScanClick = () => {
    setScanResult(null);
    navigate("/scanner");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 22V12h6v10"
          />
        </svg>
        Сканировать QR
      </button>
    </div>
  );
}

export default HomePage;
