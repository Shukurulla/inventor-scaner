function ResultPage({ scanResult }) {
  const parsedBody = scanResult?.body ? JSON.parse(scanResult.body) : {};

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Результат сканирования
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Название:</span>
            <span>{scanResult?.name || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">ИНН:</span>
            <span>{parsedBody?.inn || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Тип:</span>
            <span>{scanResult?.type_data?.name || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Описание:</span>
            <span>{parsedBody?.description || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Статус:</span>
            <span>{parsedBody?.status || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Диск(и):</span>
            <span>
              {scanResult?.disks
                ?.map((d) => `${d.disk_type} ${d.capacity_gb}GB`)
                .join(", ") || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Видеокарта:</span>
            <span>{scanResult?.gpus?.[0]?.model || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Договор:</span>
            <a
              href={scanResult?.contract?.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Скачать PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
