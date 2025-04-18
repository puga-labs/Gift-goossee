import React from "react";

const HeroBoxesBottom = () => {
  return (
    <div className="flex items-center justify-center space-x-[40px] w-full">
      <Box color="red">Customize</Box>
      <Box color="blue">Send</Box>
      <Box color="green">Enjoy</Box>
    </div>
  );
};

const Box = ({ children, color }) => {
  // Маппинг для безопасного использования динамических классов Tailwind
  const bgColor = {
    red: "bg-red-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
  }[color] || "bg-gray-200"; // запасной вариант, если цвет не найден

  return (
    <div className="h-[20vh] w-[15vw] bg-white rounded-lg border shadow-[2px_2px_0_#000] p-2">
      <div className={`w-full h-1/3 rounded-lg ${bgColor} flex items-center justify-center`}>
      icon
      </div>
      <div className="flex flex-col items-center justify-center h-2/3 text-center space-y-2">
        <h1 className="text-xl font-bold">{children}</h1>
        <p className="text-sm ">Lorem ipsum dolor sit amet consectetur consectetur </p>
      </div>
    </div>
  );
};

export default HeroBoxesBottom;

