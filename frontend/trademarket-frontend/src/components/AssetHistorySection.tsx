import React, { useEffect, useState } from "react";
import AssetHistoryChart from "./AssetHistoryChart";
import DateRangeSelector, { RangeOption } from "./DateRangeSelector";
import { getAssetHistory } from "../api/AssetService";
import { AssetHistoryPoint } from "../types/assetHistory";

interface Props {
  ticker: string;
}

const AssetHistorySection: React.FC<Props> = ({ ticker }) => {
  const [range, setRange] = useState<RangeOption>("6M");
  const [data, setData] = useState<AssetHistoryPoint[]>([]);

  const calculateDates = (range: RangeOption) => {
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
        from = new Date(2000, 0, 1);
        break;
    }

    return { from, to: today };
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const { from, to } = calculateDates(range);

      const result = await getAssetHistory(
        ticker,
        from.toISOString().split("T")[0],
        to.toISOString().split("T")[0]
      );

      setData(result);
    };

    fetchHistory();
  }, [ticker, range]);

  return (
    <div>
      <h3>Price History ({range})</h3>

      <DateRangeSelector selected={range} onChange={setRange} />

      <AssetHistoryChart data={data} />
    </div>
  );
};

export default AssetHistorySection;
