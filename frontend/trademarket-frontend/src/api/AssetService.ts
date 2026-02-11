import { AssetDetails } from "../types/asset";

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
