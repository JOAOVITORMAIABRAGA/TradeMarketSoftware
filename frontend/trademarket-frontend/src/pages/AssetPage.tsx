import React, { useEffect, useState } from "react";
import { AssetDetails } from "../types/asset";
import { getAsset } from "../api/AssetService";
import AssetCard from "../components/AssetCard";

const AssetPage: React.FC = () => {
  const [asset, setAsset] = useState<AssetDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState("GOOG");

  useEffect(() => {
    async function fetchAsset() {
      setLoading(true);
      const data = await getAsset(ticker);
      setAsset(data);
      setLoading(false);
    }
    fetchAsset();
  }, [ticker]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>TradeMarket - Asset Info</h1>

      <input
        type="text"
        value={ticker}
        onChange={e => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter ticker"
        style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
      />

      {loading && <p>Loading...</p>}
      {asset && <AssetCard asset={asset} />}
      {!loading && !asset && <p>Asset not found</p>}
    </div>
  );
};

export default AssetPage;
