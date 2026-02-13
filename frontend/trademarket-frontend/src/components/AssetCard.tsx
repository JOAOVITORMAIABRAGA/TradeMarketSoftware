import React, { useEffect, useState } from "react";
import { AssetDetails } from "../types/asset";
import { AssetHistoryPoint } from "../types/assetHistory";
import { getAssetHistory } from "../api/AssetService";
import AssetHistoryChart from "./AssetHistoryChart";

interface Props {
  asset: AssetDetails;
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  const [history, setHistory] = useState<AssetHistoryPoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHistory() {
      setLoadingHistory(true);

      const to = new Date();
      const from = new Date();
      from.setMonth(from.getMonth() - 6);

      const formattedFrom = from.toISOString().split("T")[0];
      const formattedTo = to.toISOString().split("T")[0];

      const data = await getAssetHistory(
        asset.ticker,
        formattedFrom,
        formattedTo
      );

      setHistory(data);
      setLoadingHistory(false);
    }

    fetchHistory();
  }, [asset.ticker]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const formatNumber = (value: number) =>
    value.toLocaleString("en-US");

  const changeColor =
    asset.priceChangePercent > 0
      ? "green"
      : asset.priceChangePercent < 0
      ? "red"
      : "gray";

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1.5rem",
        borderRadius: 12,
        maxWidth: 600,
        marginBottom: "1.5rem",
        background: "#f9f9f9",
      }}
    >
      <h2>
        {asset.name} ({asset.ticker})
      </h2>

      <p><strong>Sector:</strong> {asset.sector}</p>
      <p><strong>Country:</strong> {asset.country}</p>

      <hr />

      <p>
        <strong>Current Price:</strong>{" "}
        {formatCurrency(asset.currentPrice)}
      </p>

      <p>
        <strong>Change:</strong>{" "}
        <span style={{ color: changeColor, fontWeight: "bold" }}>
          {asset.priceChangePercent.toFixed(2)}%
        </span>
      </p>

      <hr />

      <p>
        <strong>52W Range:</strong>{" "}
        {formatCurrency(asset.low52Week)} -{" "}
        {formatCurrency(asset.high52Week)}
      </p>

      <p>
        <strong>Market Cap:</strong>{" "}
        {formatNumber(asset.marketCap)} M
      </p>

      <hr />

      <p style={{ fontSize: "0.85rem", color: "#555" }}>
        Last updated:{" "}
        {new Date(asset.lastUpdated).toLocaleString()}
      </p>

      {/* 📈 Historical Chart */}
      <div style={{ marginTop: "1.5rem" }}>
        <h3>6M History</h3>

        {loadingHistory ? (
          <p>Loading chart...</p>
        ) : history.length > 0 ? (
          <AssetHistoryChart data={history} />
        ) : (
          <p>No historical data available</p>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
