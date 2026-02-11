namespace TradeMarket.Domain.Entities;

public class AssetSnapshot
{
    public string Ticker { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public decimal CurrentPrice { get; init; }
    public decimal DividendYield { get; init; }
}
