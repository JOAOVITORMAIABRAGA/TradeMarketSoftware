namespace TradeMarket.Domain.Entities;

public class AssetSnapshot
{
    // Identity
    public string Ticker { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Type { get; init; } = string.Empty;
    public string Sector { get; init; } = string.Empty;

    // Price
    public decimal CurrentPrice { get; init; }
    public decimal PriceChangePercent { get; init; }

    // Income
    public decimal DividendYield { get; init; }
    public decimal DividendYield12M { get; init; }

    // Metadata
    public DateTime LastUpdated { get; init; }
}
