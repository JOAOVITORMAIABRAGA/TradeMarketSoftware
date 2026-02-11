namespace TradeMarket.Application.ViewModels;

public class AssetDetailsViewModel
{
    // Identity
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Sector { get; set; } = string.Empty;

    // Price
    public decimal CurrentPrice { get; set; }
    public decimal PriceVariationPercent { get; set; }

    // Income
    public decimal DividendYield { get; set; }
    public string DividendYieldStatus { get; set; } = string.Empty;
    public string DividendYieldExplanation { get; set; } = string.Empty;

    // Metadata
    public DateTime LastUpdated { get; set; }
}


