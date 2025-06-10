import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

function ScannerPage({ setScanResult }) {
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // DOM elementini tekshirish
    const readerElement = document.getElementById("reader");
    if (!readerElement) {
      console.error("Элемент reader не найден в DOM");
      alert("Ошибка: Элемент сканера не найден. Перезагрузите страницу.");
      return;
    }

    // Kamera ruxsatini tekshirish va skanerni ishga tushirish
    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          try {
            const inn = decodedText;
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
              alert("Токен доступа не найден. Пожалуйста, войдите снова.");
              navigate("/");
              return;
            }

            const response = await fetch(
              `https://invenmaster.pythonanywhere.com/inventory/equipment/search-by-inn-prefix/?exact_inn=${inn}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            if (response.ok) {
              setScanResult(data);
              await html5QrCode.stop();
              navigate("/result");
            } else {
              alert(
                `Ошибка сканирования: ${data.detail || "Проверьте QR-код."}`
              );
            }
          } catch (error) {
            console.error("API ошибка:", error);
            alert(
              "Ошибка сети или сервера: " +
                (error.message || "Неизвестная ошибка")
            );
          }
        },
        (error) => {
          console.warn("Ошибка сканирования QR:", error);
          if (error === "Permission denied") {
            alert(
              "Разрешение камеры не предоставлено. Проверьте настройки браузера."
            );
          } else {
            alert("Ошибка сканирования: " + error);
          }
        }
      )
      .catch((err) => {
        console.error("Ошибка запуска сканера:", err);
        if (err.name === "InvalidStateError") {
          alert(
            "Ошибка: Неверное состояние элемента. Убедитесь, что камера доступна и страница загружена корректно."
          );
        } else {
          alert(
            "Не удалось запустить сканер. Проверьте разрешение камеры или перезагрузите страницу."
          );
        }
      });

    // Tozalash funksiyasi
    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .catch((err) => console.error("Ошибка остановки сканера:", err));
      }
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
            {/* SVG ko'rsatkichni o'chirib qo'yildi, agar kerak bo'lsa qayta qo'shish mumkin */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScannerPage;
