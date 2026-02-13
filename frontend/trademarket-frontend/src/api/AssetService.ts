import { AssetDetails } from "../types/asset";
import { AssetHistoryPoint } from "../types/assetHistory";

const API_BASE = "https://localhost:7096/api/assets";

export async function getAsset(ticker: string): Promise<AssetDetails | null> {
  try {
    const res = await fetch(`${API_BASE}/${ticker}`);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Failed to fetch asset:", err);
    return null;
  }
}

export async function getAssetHistory(
  ticker: string,
  from: string,
  to: string
): Promise<AssetHistoryPoint[]> {
  try {
    const res = await fetch(
      `${API_BASE}/${ticker}/history?from=${from}&to=${to}`
    );

    if (!res.ok) return [];

    return res.json();
  } catch (err) {
    console.error("Failed to fetch history:", err);
    return [];
  }
}