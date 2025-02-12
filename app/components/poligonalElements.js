import React from "react";
import Image from "next/image"; // Melhor para otimização no Next.js
import hexFilled from "../assets/hexFilled.svg"; // Verifique se a imagem está no caminho correto
import trianglesFilled from "../assets/trianglesFilled.svg";
import trianglesOutfilled from "../assets/trianglesOutfilled.svg";
import hexOutfilled from "../assets/hexOutfilled.svg";


const PoligonalElements = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Image 
          src={hexFilled} 
          alt="Hexágono decorativo" 
          className="absolute top-0 left-0 w-80"
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <Image 
          src={trianglesFilled} 
          alt="Triângulos decorativos" 
          className="absolute top-0 right-0 w-80 "
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <Image 
          src={trianglesOutfilled} 
          alt="Triângulos decorativos" 
          className="absolute bottom-0 left-0 w-80"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
        <Image 
          src={hexOutfilled} 
          alt="hexagonos decorativos" 
          className="absolute bottom-0 right-0 w-80"
        />
      </div>
    </>
  );
};

export default PoligonalElements;