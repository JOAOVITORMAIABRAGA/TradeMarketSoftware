export interface AssetDetails {
  ticker: string;
  name: string;
  sector: string;
  country: string;

  currentPrice: number;
  priceChangePercent: number;

  high52Week: number;
  low52Week: number;
  marketCap: number;

  lastUpdated: string;
}
