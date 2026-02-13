import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AssetHistorySection from "../components/AssetHistorySection";
import AssetCard from "../components/AssetCard";
import { getAsset } from "../api/AssetService";
import { AssetDetails as AssetDetailsType } from "../types/asset";

const AssetDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [asset, setAsset] = useState<AssetDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;

    const fetchAsset = async () => {
      setLoading(true);
      try {
        const result = await getAsset(symbol);
        setAsset(result);
      } catch (error) {
        console.error("Erro ao buscar ativo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [symbol]);

  if (!symbol) {
    return <div className="p-4">Nenhum ativo informado.</div>;
  }

  return (
    <div className="min-h-screen p-6 space-y-6">

      <div className="flex justify-center">
        <SearchBar initialValue={symbol} />
      </div>

      {loading && <p>Loading...</p>}

      {asset && (
        <>
          <AssetCard asset={asset} />
          <AssetHistorySection ticker={symbol} />
        </>
      )}
    </div>
  );
};

export default AssetDetails;
