import React, { useEffect, useState } from "react";
import AssetHistoryChart from "./AssetHistoryChart";
import DateRangeSelector, { RangeOption } from "./DateRangeSelector";
import { getAssetHistory } from "../api/AssetService";
import { AssetHistoryPoint } from "../types/assetHistory";

interface Props {
  ticker: string;
}

const AssetHistorySection: React.FC<Props> = ({ ticker }) => {
  const [range, setRange] = useState<RangeOption>("3M");
  const [fullData, setFullData] = useState<AssetHistoryPoint[]>([]);
  const [filteredData, setFilteredData] = useState<AssetHistoryPoint[]>([]);

  // 🔥 BUSCA APENAS UMA VEZ POR TICKER
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getAssetHistory(ticker);
        setFullData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setFullData([]);
        setFilteredData([]);
      }
    };

    fetchHistory();
  }, [ticker]);

  // 🔥 FILTRO LOCAL (SEM NOVA CHAMADA)
  useEffect(() => {
    if (!fullData.length) return;

    const today = new Date();
    let from = new Date();

    switch (range) {
      case "1M":
        from.setMonth(today.getMonth() - 1);
        break;
      case "3M":
        from.setMonth(today.getMonth() - 3);
        break;
      case "6M":
        from.setMonth(today.getMonth() - 6);
        break;
      case "1Y":
        from.setFullYear(today.getFullYear() - 1);
        break;
      case "YTD":
        from = new Date(today.getFullYear(), 0, 1);
        break;
      case "MAX":
        setFilteredData(fullData);
        return;
    }

    const filtered = fullData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= from;
    });

    setFilteredData(filtered);
  }, [range, fullData]);

  return (
    <div>
      <h3>Price History ({range})</h3>

      <DateRangeSelector
        selected={range}
        onChange={setRange}
      />

      <AssetHistoryChart data={filteredData} />
    </div>
  );
};

export default AssetHistorySection;
