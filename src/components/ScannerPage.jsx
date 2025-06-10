import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

function ScannerPage({ setScanResult }) {
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      async (decodedText) => {
        try {
          const inn = decodedText;
          const accessToken = localStorage.getItem("access_token");
          const { data } = await axios.get(
            "https://invenmaster.pythonanywhere.com/inventory/equipment/search-by-inn-prefix/?exact_inn=" +
              inn,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (data) {
            setScanResult(data);
            html5QrCode.stop();
            navigate("/result");
          } else {
            alert("Ошибка сканирования. Проверьте QR-код.");
          }
        } catch (error) {
          console.error("API ошибка:", error);
          alert(
            "Ошибка сети или сервера." +
              `https://invenmaster.pythonanywhere.com/inventory/equipment/search-by-inn-prefix/?exact_inn=${decodedText}`
          );
        }
      },
      (error) => {
        console.warn("Ошибка сканирования QR:", error);
      }
    );

    return () => {
      html5QrCode
        .stop()
        .catch((err) => console.error("Ошибка остановки сканера:", err));
    };
  }, [setScanResult, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Сканер QR-кода
        </h2>
        <div className="relative">
          <div
            id="reader"
            className="w-full aspect-square border-4 border-blue-500 rounded-lg"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.5-5.5a4.5 4.5 0 110-6.364L9 4m6 16l5.5-5.5a4.5 4.5 0 10-6.364 0L15 20m-6 0v-7a2 2 0 012-2h4a2 2 0 012 2v7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScannerPage;
