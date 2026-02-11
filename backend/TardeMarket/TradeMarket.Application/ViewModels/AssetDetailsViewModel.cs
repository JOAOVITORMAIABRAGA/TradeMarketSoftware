namespace TradeMarket.Application.ViewModels;

public class AssetDetailsViewModel
{
    public string Ticker { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Sector { get; set; } = default!;
    public string Country { get; set; } = default!;

    public decimal CurrentPrice { get; set; }
    public decimal PriceChangePercent { get; set; }

    public decimal? High52Week { get; set; }
    public decimal? Low52Week { get; set; }
    public decimal? MarketCap { get; set; }

    public DateTime LastUpdated { get; set; }
}


