import React from "react";
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        TradeMarket Software
      </h1>

      <p className="text-gray-600 max-w-xl mb-8">
        Plataforma educacional para visualizar o histórico de preços de ações,
        entender variações ao longo do tempo e explorar dados de mercado
        de forma simples e intuitiva.
      </p>

      <SearchBar />
    </div>
  );
};

export default Home;
