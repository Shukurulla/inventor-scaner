import { FaComputer } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";

const statusGenerate = (status) => {
  if (status == "NEEDS_REPAIR") {
    return "Требуется ремонт";
  }
  if (status == "NEW") {
    return "Новое";
  }
  if (status == "WORKING") {
    return "Работает";
  }
  if (status == "DISPOSED") {
    return "Утилизировано";
  }
};

export const PrinterInfo = ({ equipment }) => {
  return (
    <div>
      <div className="icon">
        <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#F3F4F6]">
          <FiPrinter size={20} color="#10B981" />
        </div>
        <div className="text-center text-xl mt-3 font-semibold">
          {equipment.name}
        </div>
        <div className="text-md font-semibold text-center text-gray-500">
          ИНН {equipment.inn}
        </div>

        <div className="info">
          {equipment.description !== "" ? (
            <div>
              <div className="text-md font-semibold">Описание</div>
              <p className="text-sm text-gray-700 font-semibold">
                {equipment.description}
              </p>
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="flex my-3 items-center justify-between">
              <div className="text-md font-semibold">Состояние</div>
              <div className="p-2 border rounded-md">
                {statusGenerate(equipment.status)}
              </div>
            </div>
            <div className="text-md font-semibold">Характеристики</div>
            <p className="text-sm text-gray-700 text-center my-2 font-semibold">
              <div className="p-2 border rounded-md">
                {`${equipment["projector_char"]?.model}, ${equipment["projector_char"].resolution},   ${equipment["projector_char"].lumens}`}
              </div>
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[#727272]">Модель: </div>
              <div>{equipment["projector_char"].model}</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[#727272]">Яркость (люмен): </div>
              <div>{equipment["projector_char"].lumens}</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[#727272]">Разрешение: </div>
              <div>{equipment["projector_char"].resolution}</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[#727272]">Тип проекции: </div>
              <div>{equipment["projector_char"].throw_type}</div>
            </div>
            <div className="text-md font-semibold my-2">Договор</div>
            <div className="p-2 border text-center rounded-md">
              {equipment.contract.number}
            </div>
            <a
              href={equipment.contract.file}
              download={equipment.contract.number}
              className="p-2 border w-[100%] mt-2 block bg-indigo-600 text-white text-center rounded-md"
            >
              Скачать PDF договора
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
// export const ComputerInfo = ({ equipment }) => {
//   return (
//     <div>
//       <div className="icon">
//         <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#F3F4F6]">
//           <FaComputer size={20} color="#10B981" />
//         </div>
//         <div className="text-center text-xl mt-3 font-semibold">
//           {equipment.name}
//         </div>
//         <div className="text-md font-semibold text-center text-gray-500">
//           ИНН {equipment.inn}
//         </div>

//         <div className="info">
//           {equipment.description !== "" ? (
//             <div>
//               <div className="text-md font-semibold">Описание</div>
//               <p className="text-sm text-gray-700 font-semibold">
//                 {equipment.description}
//               </p>
//             </div>
//           ) : (
//             ""
//           )}
//           <div>
//             <div className="flex my-3 items-center justify-between">
//               <div className="text-md font-semibold">Состояние</div>
//               <div className="p-2 border rounded-md">
//                 {statusGenerate(equipment.status)}
//               </div>
//             </div>
//             <div className="text-md font-semibold">Характеристики</div>
//             <p className="text-sm text-gray-700 text-center my-2 font-semibold">
//               <div className="p-2 border rounded-md">
//                 {`${equipment["projector_char"].model}, ${equipment["projector_char"].resolution},   ${equipment["projector_char"].lumens}`}
//               </div>
//             </p>
//             <div className="flex items-center justify-between mt-2">
//               <div className="text-[#727272]">Модель: </div>
//               <div>{equipment["projector_char"].model}</div>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <div className="text-[#727272]">Яркость (люмен): </div>
//               <div>{equipment["projector_char"].lumens}</div>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <div className="text-[#727272]">Разрешение: </div>
//               <div>{equipment["projector_char"].resolution}</div>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <div className="text-[#727272]">Тип проекции: </div>
//               <div>{equipment["projector_char"].throw_type}</div>
//             </div>
//             <div className="text-md font-semibold my-2">Договор</div>
//             <div className="p-2 border text-center rounded-md">
//               {equipment.contract.number}
//             </div>
//             <a
//               href={equipment.contract.file}
//               download={equipment.contract.number}
//               className="p-2 border w-[100%] mt-2 block bg-indigo-600 text-white text-center rounded-md"
//             >
//               Скачать PDF договора
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
