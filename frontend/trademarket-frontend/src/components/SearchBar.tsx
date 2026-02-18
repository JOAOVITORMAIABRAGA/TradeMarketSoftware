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
  <div
    style={{
      display: "flex",
      gap: "0.5rem",
      width: "100%",
    }}
  >
    <input
      type="text"
      placeholder="Digite o ticker (ex: AAPL)"
      value={symbol}
      onChange={(e) => setSymbol(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{
        flex: 1,
        padding: "0.75rem 1rem",
        borderRadius: 8,
        border: "1px solid #334155",
        background: "#0f172a",
        color: "#e2e8f0",
        outline: "none"
      }}
    />

    <button
      onClick={handleSearch}
      style={{
        padding: "0 1rem",
        borderRadius: 8,
        border: "none",
        background: "#3b82f6",
        color: "white",
        cursor: "pointer"
      }}
    >
      🔍
    </button>
  </div>
);

};

export default SearchBar;
