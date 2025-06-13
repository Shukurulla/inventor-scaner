import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UniversalEquipmentInfo } from "./inventorResults";
import { inventoryAPI } from "../services/apiService";

function ResultPage() {
  const { inn } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scandData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await inventoryAPI.searchByInn(inn);

      if (data && data.results && data.results.length > 0) {
        console.log("Equipment data:", data.results[0]);
        setResult(data.results[0]);
      } else {
        setError("Оборудование с данным ИНН не найдено");
      }
    } catch (error) {
      console.error("API error:", error);

      if (error.response?.status === 401) {
        setError("Сессия истекла. Пожалуйста, войдите снова");
      } else if (error.response?.status === 404) {
        setError("Оборудование с данным ИНН не найдено");
      } else if (error.response?.status >= 500) {
        setError("Ошибка сервера. Попробуйте позже");
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        setError("Ошибка сети. Проверьте подключение к интернету");
      } else {
        setError("Ошибка при загрузке данных");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inn) {
      scandData();
    }
  }, [inn]);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Загрузка информации об оборудовании...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Ошибка</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={scandData}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Попробовать снова
              </button>
              <button
                onClick={handleBackClick}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800 transition"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Назад
          </button>
          <div className="text-sm text-gray-500">ID: {result.id}</div>
        </div>

        <UniversalEquipmentInfo equipment={result} />
      </div>
    </div>
  );
}

export default ResultPage;
