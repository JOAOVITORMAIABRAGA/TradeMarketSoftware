using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using TradeMarket.Domain.Entities;
using TradeMarket.Domain.Repositories;
using TradeMarket.Infrastructure.Dtos;

namespace TradeMarket.Infrastructure.Repositories;

public class YahooAssetRepository : IAssetRepository
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;

    private const int CacheMinutes = 10;

    public YahooAssetRepository(HttpClient httpClient, IMemoryCache cache)
    {
        _httpClient = httpClient;
        _cache = cache;
    }

    public async Task<AssetSnapshot?> GetSnapshotAsync(string ticker)
    {
        var cacheKey = $"asset_snapshot_{ticker}";

        if (_cache.TryGetValue(cacheKey, out AssetSnapshot cached))
            return cached;

        var url =
            $"https://query2.finance.yahoo.com/v10/finance/quoteSummary/{ticker}.SA?modules=price,summaryDetail";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode) return null;

        using var stream = await response.Content.ReadAsStreamAsync();
        using var json = await JsonDocument.ParseAsync(stream);

        var result = json.RootElement
            .GetProperty("quoteSummary")
            .GetProperty("result")[0];

        var dto = new YahooAssetDto
        {
            Symbol = result.GetProperty("price").GetProperty("symbol").GetString()!,
            ShortName = result.GetProperty("price").GetProperty("shortName").GetString()!,
            RegularMarketPrice = result.GetProperty("price").GetProperty("regularMarketPrice").GetProperty("raw").GetDecimal(),
            DividendYield = result
                .GetProperty("summaryDetail")
                .GetProperty("dividendYield")
                .GetProperty("raw")
                .GetDecimal()
        };

        var snapshot = new AssetSnapshot
        {
            Ticker = dto.Symbol,
            Name = dto.ShortName,
            Type = "FII",
            Sector = "Logistics",

            CurrentPrice = dto.RegularMarketPrice,
            PriceChangePercent = result
        .GetProperty("price")
        .GetProperty("regularMarketChangePercent")
        .GetProperty("raw")
        .GetDecimal(),

            DividendYield = dto.DividendYield * 100,
            DividendYield12M = dto.DividendYield * 100,

            LastUpdated = DateTime.UtcNow
        };


        _cache.Set(cacheKey, snapshot, TimeSpan.FromMinutes(CacheMinutes));

        return snapshot;
    }
}
