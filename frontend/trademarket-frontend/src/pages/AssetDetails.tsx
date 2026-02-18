import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AssetHistorySection from "../components/AssetHistorySection";
import AssetCard from "../components/AssetCard";
import { getAsset } from "../api/AssetService";
import { AssetDetails as AssetDetailsType } from "../types/asset";
import bgHome from "../images/bg-home.jpg";

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
    return <div style={{ padding: "2rem" }}>Nenhum ativo informado.</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Fundo */}
      <img
        src={bgHome}
        alt="Fundo"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: -1,
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem 1.5rem",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER COM BUSCA */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            padding: "1.8rem",
            borderRadius: 20,
            boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: 500 }}>
            <SearchBar initialValue={symbol} />
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <div
              style={{
                border: "6px solid rgba(255,255,255,0.2)",
                borderTop: "6px solid #3b82f6",
                borderRadius: "50%",
                width: 60,
                height: 60,
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* CONTEÚDO PRINCIPAL */}
        {asset && !loading && (
          <div
            style={{
              background: "rgba(30, 41, 59, 0.85)",
              padding: "2rem",
              borderRadius: 20,
              boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              boxSizing: "border-box",
            }}
          >
            {/* COLUNA INFO */}
            <div
              style={{
                flex: "1 1 350px",
                minWidth: 300,
              }}
            >
              <AssetCard asset={asset} />
            </div>

            {/* COLUNA GRÁFICO */}
            <div
              style={{
                flex: "2 1 600px",
                minWidth: 350,
                display: "flex",
              }}
            >
              <div style={{ flex: 1 }}>
                <AssetHistorySection ticker={symbol} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;
