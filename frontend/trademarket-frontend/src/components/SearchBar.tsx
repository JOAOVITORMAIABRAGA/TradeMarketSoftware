import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface Props {
  initialValue?: string;
}

const SearchBar: React.FC<Props> = ({ initialValue = "" }) => {
  const [symbol, setSymbol] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!symbol.trim()) return;

    navigate(`/asset/${symbol.toUpperCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Digite o ticker (ex: AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSearch}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
