import React from "react";
import { AssetDetails } from "../types/asset";
import AssetHistorySection from "./AssetHistorySection";
import Tooltip from "./InfoTooltip";

interface Props {
  asset: AssetDetails;
}

const AssetCard: React.FC<Props> = ({ asset }) => {

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
        <strong>
          Current Price
          <Tooltip text="Último preço negociado no mercado durante o horário regular da bolsa." />
        </strong>{" "}
        {formatCurrency(asset.currentPrice)}
      </p>

      <p>
        <strong>
          Change
          <Tooltip text="Variação percentual do preço em relação ao fechamento anterior." />
        </strong>{" "}
        <span style={{ color: changeColor, fontWeight: "bold" }}>
          {asset.priceChangePercent.toFixed(2)}%
        </span>
      </p>

      <hr />

      <p>
        <strong>
          52W Range
          <Tooltip text="Menor e maior preço registrados nos últimos 12 meses." />
        </strong>{" "}
        {formatCurrency(asset.low52Week)} - {formatCurrency(asset.high52Week)}
      </p>

      <p>
        <strong>
          Market Cap
          <Tooltip text="Valor total da empresa no mercado. Calculado multiplicando o preço atual pelo número total de ações emitidas." />
        </strong>{" "}
        {formatNumber(asset.marketCap)}
      </p>

      <hr />

      <p style={{ fontSize: "0.85rem", color: "#555" }}>
        Last updated:{" "}
        {new Date(asset.lastUpdated).toLocaleString()}
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <AssetHistorySection ticker={asset.ticker} />
      </div>
    </div>
  );
};

export default AssetCard;
