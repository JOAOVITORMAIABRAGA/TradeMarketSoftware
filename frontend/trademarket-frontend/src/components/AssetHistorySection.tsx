import React, { useEffect, useMemo, useState } from "react";
import AssetHistoryChart from "./AssetHistoryChart";
import DateRangeSelector, { RangeOption } from "./DateRangeSelector";
import { getAssetHistory } from "../api/AssetService";
import { AssetHistoryPoint } from "../types/assetHistory";

interface Props {
  ticker: string;
}

const RANGE_DAYS: Record<RangeOption, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "YTD": 365, // tratado dinamicamente
  "MAX": 10000
};

const AssetHistorySection: React.FC<Props> = ({ ticker }) => {
  const [range, setRange] = useState<RangeOption>("3M");
  const [data, setData] = useState<AssetHistoryPoint[]>([]);
  const [availableDays, setAvailableDays] = useState<number>(0);

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
      setAvailableDays(result.length);
    };

    fetchHistory();
  }, [ticker, range]);

  // 🔥 Filtros habilitados dinamicamente
  const enabledRanges = useMemo(() => {
    return (Object.keys(RANGE_DAYS) as RangeOption[]).filter(r => {
      if (r === "YTD") {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const diffDays = Math.ceil(
          (new Date().getTime() - startOfYear.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return availableDays >= diffDays;
      }

      return availableDays >= RANGE_DAYS[r];
    });
  }, [availableDays]);

  // 🔥 Se o range atual não for mais válido, ajusta automaticamente
  useEffect(() => {
    if (!enabledRanges.includes(range) && enabledRanges.length > 0) {
      setRange(enabledRanges[enabledRanges.length - 1]);
    }
  }, [enabledRanges, range]);

  return (
    <div>
      <h3>Price History ({range})</h3>

      <DateRangeSelector
        selected={range}
        onChange={setRange}
        enabledRanges={enabledRanges}
      />

      <AssetHistoryChart data={data} />
    </div>
  );
};

export default AssetHistorySection;
