namespace TradeMarket.Infrastructure.Dtos;

public class YahooAssetDto
{
    public string Symbol { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    public decimal RegularMarketPrice { get; set; }
    public decimal DividendYield { get; set; }
}
