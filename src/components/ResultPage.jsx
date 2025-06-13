import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PrinterInfo } from "./inventorResults";

function ResultPage() {
  const { inn } = useParams();
  const [result, setResult] = useState({});
  const scandData = async () => {
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
      console.log(data.results[0]);

      return setResult(data.results[0]);
    }
  };

  useEffect(() => {
    scandData();
  }, [inn]);

  // const renderEquipment = () => {
  //   if()
  // }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <PrinterInfo equipment={result} />
      </div>
    </div>
  );
}

export default ResultPage;
