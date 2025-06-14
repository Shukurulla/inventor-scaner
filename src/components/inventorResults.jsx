import {
  FaComputer,
  FaTv,
  FaWifi,
  FaLaptop,
  FaKeyboard,
} from "react-icons/fa6";
import { FiPrinter, FiMonitor } from "react-icons/fi";
import { MdOutlineScreenShare, MdTabletMac } from "react-icons/md";
import { BiExtension } from "react-icons/bi";

// Status mapping function
const statusGenerate = (status) => {
  const statusMap = {
    NEEDS_REPAIR: "Требуется ремонт",
    NEW: "Новое",
    WORKING: "Работает",
    DISPOSED: "Утилизировано",
  };
  return statusMap[status] || status;
};

// Equipment type icon mapping
const getEquipmentIcon = (typeId, typeName) => {
  const iconProps = { size: 20, color: "#10B981" };

  if (typeName === "Компьютер") return <FaComputer {...iconProps} />;
  if (typeName === "Проектор") return <MdOutlineScreenShare {...iconProps} />;
  if (typeName === "Принтер") return <FiPrinter {...iconProps} />;
  if (typeName === "Телевизор") return <FaTv {...iconProps} />;
  if (typeName === "Ноутбук") return <FaLaptop {...iconProps} />;
  if (typeName === "Моноблок") return <FaComputer {...iconProps} />;
  if (typeName === "Монитор") return <FiMonitor {...iconProps} />;
  if (typeName === "Роутер") return <FaWifi {...iconProps} />;
  if (typeName === "Удлинитель") return <BiExtension {...iconProps} />;
  if (typeName === "Доска") return <FaKeyboard {...iconProps} />;

  return <FaComputer {...iconProps} />; // Default icon
};

// Disk type mapping
const getDiskTypeDisplay = (diskType) => {
  const diskMap = {
    HDD: "HDD",
    SSD: "SSD",
    NVMEM2SSD: "NVMe M.2 SSD",
  };
  return diskMap[diskType] || diskType;
};

// Throw type mapping for projectors
const getThrowTypeDisplay = (throwType) => {
  const throwMap = {
    short: "Короткофокусный",
    long: "Длиннофокусный",
    ultra_short: "Ультракороткофокусный",
  };
  return throwMap[throwType] || throwType;
};

// Computer specifications component
const ComputerSpecs = ({ equipment }) => {
  const { computer_details, disks, gpus } = equipment;

  if (!computer_details) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Процессор:</div>
          <div className="text-sm">{computer_details.cpu}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Оперативная память:</div>
          <div className="text-sm">{computer_details.ram}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Клавиатура:</div>
          <div className="text-sm">
            {computer_details.has_keyboard ? "Есть" : "Нет"}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Мышь:</div>
          <div className="text-sm">
            {computer_details.has_mouse ? "Есть" : "Нет"}
          </div>
        </div>

        {gpus && gpus.length > 0 && (
          <div>
            <div className="text-[#727272] mb-1">Видеокарты:</div>
            {gpus.map((gpu, index) => (
              <div key={gpu.id} className="text-sm ml-4">
                • {gpu.model}
              </div>
            ))}
          </div>
        )}

        {disks && disks.length > 0 && (
          <div>
            <div className="text-[#727272] mb-1">Диски:</div>
            {disks.map((disk) => (
              <div key={disk.id} className="text-sm ml-4">
                • {getDiskTypeDisplay(disk.disk_type)} - {disk.capacity_gb} GB
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Projector specifications component
const ProjectorSpecs = ({ equipment }) => {
  const projector = equipment.projector_char;

  if (!projector) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{projector.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Яркость (люмен):</div>
          <div className="text-sm">{projector.lumens}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Разрешение:</div>
          <div className="text-sm">{projector.resolution}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Тип проекции:</div>
          <div className="text-sm">
            {getThrowTypeDisplay(projector.throw_type)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Printer specifications component
const PrinterSpecs = ({ equipment }) => {
  const printer = equipment.printer_char;

  if (!printer) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{printer.model}</div>
        </div>
        {printer.serial_number && (
          <div className="flex items-center justify-between">
            <div className="text-[#727272]">Серийный номер:</div>
            <div className="text-sm">{printer.serial_number}</div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Цветной:</div>
          <div className="text-sm">{printer.color ? "Да" : "Нет"}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Двусторонняя печать:</div>
          <div className="text-sm">{printer.duplex ? "Да" : "Нет"}</div>
        </div>
      </div>
    </div>
  );
};

// TV specifications component
const TvSpecs = ({ equipment }) => {
  const tv = equipment.tv_char;

  if (!tv) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{tv.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Размер (дюймы):</div>
          <div className="text-sm">{tv.size_inches}"</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Разрешение:</div>
          <div className="text-sm">{tv.resolution}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Smart TV:</div>
          <div className="text-sm">{tv.is_smart ? "Да" : "Нет"}</div>
        </div>
      </div>
    </div>
  );
};

// Notebook specifications component
const NotebookSpecs = ({ equipment }) => {
  const notebook = equipment.notebook_char;

  if (!notebook) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{notebook.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Процессор:</div>
          <div className="text-sm">{notebook.cpu}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Оперативная память:</div>
          <div className="text-sm">{notebook.ram}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Размер экрана:</div>
          <div className="text-sm">{notebook.screen_size}"</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Разрешение:</div>
          <div className="text-sm">{notebook.screen_resolution}</div>
        </div>
      </div>
    </div>
  );
};

// Monitor specifications component
const MonitorSpecs = ({ equipment }) => {
  const monitor = equipment.monitor_char;

  if (!monitor) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{monitor.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Размер экрана:</div>
          <div className="text-sm">{monitor.screen_size}"</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Разрешение:</div>
          <div className="text-sm">{monitor.resolution}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Частота обновления:</div>
          <div className="text-sm">{monitor.refresh_rate} Hz</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Тип панели:</div>
          <div className="text-sm">{monitor.panel_type}</div>
        </div>
      </div>
    </div>
  );
};

// Router specifications component
const RouterSpecs = ({ equipment }) => {
  const router = equipment.router_char;

  if (!router) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{router.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Стандарт Wi-Fi:</div>
          <div className="text-sm">{router.wifi_standard}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Частота:</div>
          <div className="text-sm">{router.frequency}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Скорость:</div>
          <div className="text-sm">{router.speed}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Количество антенн:</div>
          <div className="text-sm">{router.antenna_count}</div>
        </div>
      </div>
    </div>
  );
};

// Extender specifications component
const ExtenderSpecs = ({ equipment }) => {
  const extender = equipment.extender_char;

  if (!extender) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Модель:</div>
          <div className="text-sm">{extender.model}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Количество розеток:</div>
          <div className="text-sm">{extender.outlet_count}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Длина кабеля:</div>
          <div className="text-sm">{extender.cable_length} м</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Максимальная мощность:</div>
          <div className="text-sm">{extender.max_power} Вт</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Защита от перенапряжения:</div>
          <div className="text-sm">
            {extender.surge_protection ? "Да" : "Нет"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Whiteboard specifications component
const WhiteboardSpecs = ({ equipment }) => {
  const whiteboard = equipment.whiteboard_char;

  if (!whiteboard) return null;

  return (
    <div>
      <div className="text-md font-semibold">Характеристики</div>
      <div className="space-y-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Размер:</div>
          <div className="text-sm">{whiteboard.size}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Материал:</div>
          <div className="text-sm">{whiteboard.material}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#727272]">Магнитная:</div>
          <div className="text-sm">{whiteboard.is_magnetic ? "Да" : "Нет"}</div>
        </div>
      </div>
    </div>
  );
};

// Main universal equipment info component
export const UniversalEquipmentInfo = ({ equipment }) => {
  if (!equipment || !equipment.type_data) {
    return (
      <div className="text-center text-gray-500">
        Информация об оборудовании не найдена
      </div>
    );
  }

  const renderSpecifications = () => {
    const typeName = equipment.type_data.name;

    switch (typeName) {
      case "Компьютер":
        return <ComputerSpecs equipment={equipment} />;
      case "Проектор":
        return <ProjectorSpecs equipment={equipment} />;
      case "Принтер":
        return <PrinterSpecs equipment={equipment} />;
      case "Телевизор":
        return <TvSpecs equipment={equipment} />;
      case "Ноутбук":
        return <NotebookSpecs equipment={equipment} />;
      case "Моноблок":
        return <ComputerSpecs equipment={equipment} />; // Same as computer
      case "Монитор":
        return <MonitorSpecs equipment={equipment} />;
      case "Роутер":
        return <RouterSpecs equipment={equipment} />;
      case "Удлинитель":
        return <ExtenderSpecs equipment={equipment} />;
      case "Доска":
        return <WhiteboardSpecs equipment={equipment} />;
      default:
        return (
          <div className="text-sm text-gray-500">
            Характеристики для данного типа оборудования не определены
          </div>
        );
    }
  };

  return (
    <div>
      <div className="icon">
        <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#F3F4F6]">
          {getEquipmentIcon(equipment.type, equipment.type_data.name)}
        </div>
        <div className="text-center text-xl mt-3 font-semibold">
          {equipment.name}
        </div>
        <div className="text-md font-semibold text-center text-gray-500">
          ИНН: {equipment.inn}
        </div>
        <div className="text-sm text-center text-gray-400 mt-1">
          {equipment.type_data.name}
        </div>

        <div className="info mt-4">
          {equipment.description && equipment.description.trim() !== "" && (
            <div className="mb-4">
              <div className="text-md font-semibold">Описание</div>
              <p className="text-sm text-gray-700 mt-1">
                {equipment.description}
              </p>
            </div>
          )}

          <div className="flex my-3 items-center justify-between">
            <div className="text-md font-semibold">Состояние</div>
            <div className="p-2 border rounded-md text-sm">
              {statusGenerate(equipment.status)}
            </div>
          </div>

          {/* Location info */}
          {equipment.room_data && (
            <div className="mb-4">
              <div className="text-md font-semibold mb-2">Местоположение</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-[#727272]">Кабинет:</div>
                  <div className="text-sm">{equipment.room_data.name}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[#727272]">Номер:</div>
                  <div className="text-sm">{equipment.room_data.number}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[#727272]">Этаж:</div>
                  <div className="text-sm">{equipment.room_data.floor}</div>
                </div>
              </div>
            </div>
          )}

          {/* Equipment specifications */}
          <div className="mb-4">{renderSpecifications()}</div>

          {/* Contract information */}
          {equipment.contract && (
            <div>
              <div className="text-md font-semibold my-2">Договор</div>
              <div className="p-2 border text-center rounded-md text-sm mb-2">
                {equipment.contract.number}
              </div>
              {equipment.contract.file && (
                <a
                  href={equipment.contract.file}
                  download={equipment.contract.number}
                  className="p-2 border w-full mt-2 block bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition"
                >
                  Скачать файл договора
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the old PrinterInfo for backward compatibility
export const PrinterInfo = UniversalEquipmentInfo;
