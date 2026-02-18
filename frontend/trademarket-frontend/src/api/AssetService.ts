import { AssetDetails } from "../types/asset";
import { AssetHistoryPoint } from "../types/assetHistory";

const API_BASE = "https://localhost:7096/api/assets"; // ajuste se necessário

export const getAsset = async (ticker: string): Promise<AssetDetails> => {
  const response = await fetch(`${API_BASE}/${ticker}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar ativo");
  }

  return response.json();
};

export const getAssetHistory = async (
  ticker: string
): Promise<AssetHistoryPoint[]> => {
  const response = await fetch(`${API_BASE}/${ticker}/history`);

  if (!response.ok) {
    throw new Error("Erro ao buscar histórico");
  }

  return response.json();
};
