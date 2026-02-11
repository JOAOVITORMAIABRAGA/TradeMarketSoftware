using Microsoft.Extensions.Configuration;
using System.Text.Json;
using TradeMarket.Domain.Entities;
using TradeMarket.Domain.Repositories;

namespace TradeMarket.Infrastructure.Repositories;

public class FinnhubAssetRepository : IAssetRepository
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public FinnhubAssetRepository(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Finnhub:ApiKey"]!;
    }

    public async Task<AssetSnapshot?> GetSnapshotAsync(string ticker)
    {
        var quoteUrl =
            $"https://finnhub.io/api/v1/quote?symbol={ticker}&token={_apiKey}";

        var profileUrl =
            $"https://finnhub.io/api/v1/stock/profile2?symbol={ticker}&token={_apiKey}";

        var metricsUrl =
            $"https://finnhub.io/api/v1/stock/metric?symbol={ticker}&metric=all&token={_apiKey}";

        // ===== QUOTE =====
        var quoteResponse = await _httpClient.GetAsync(quoteUrl);
        if (!quoteResponse.IsSuccessStatusCode)
            return null;

        using var quoteStream = await quoteResponse.Content.ReadAsStreamAsync();
        using var quoteJson = await JsonDocument.ParseAsync(quoteStream);

        var quoteRoot = quoteJson.RootElement;

        if (!quoteRoot.TryGetProperty("c", out var currentPriceProp) ||
            currentPriceProp.GetDecimal() == 0)
            return null;

        var currentPrice = quoteRoot.GetProperty("c").GetDecimal();
        var previousClose = quoteRoot.GetProperty("pc").GetDecimal();

        var changePercent = previousClose != 0
            ? ((currentPrice - previousClose) / previousClose) * 100
            : 0;

        // ===== PROFILE =====
        string name = ticker;
        string sector = "Unknown";
        string country = "Unknown";

        var profileResponse = await _httpClient.GetAsync(profileUrl);

        if (profileResponse.IsSuccessStatusCode)
        {
            using var profileStream = await profileResponse.Content.ReadAsStreamAsync();
            using var profileJson = await JsonDocument.ParseAsync(profileStream);

            var profileRoot = profileJson.RootElement;

            if (profileRoot.TryGetProperty("name", out var nameProp))
                name = nameProp.GetString() ?? ticker;

            if (profileRoot.TryGetProperty("finnhubIndustry", out var sectorProp))
                sector = sectorProp.GetString() ?? "Unknown";

            if (profileRoot.TryGetProperty("country", out var countryProp))
                country = countryProp.GetString() ?? "Unknown";
        }

        // ===== METRICS =====
        decimal? dividendYield = null;
        decimal? high52 = null;
        decimal? low52 = null;
        decimal? marketCap = null;

        var metricsResponse = await _httpClient.GetAsync(metricsUrl);

        if (metricsResponse.IsSuccessStatusCode)
        {
            using var metricsStream = await metricsResponse.Content.ReadAsStreamAsync();
            using var metricsJson = await JsonDocument.ParseAsync(metricsStream);

            var metricsRoot = metricsJson.RootElement;

            if (metricsRoot.TryGetProperty("metric", out var metricNode))
            {
                if (metricNode.TryGetProperty("dividendYieldIndicatedAnnual", out var dy))
                    dividendYield = dy.ValueKind != JsonValueKind.Null ? dy.GetDecimal() : null;

                if (metricNode.TryGetProperty("52WeekHigh", out var h))
                    high52 = h.ValueKind != JsonValueKind.Null ? h.GetDecimal() : null;

                if (metricNode.TryGetProperty("52WeekLow", out var l))
                    low52 = l.ValueKind != JsonValueKind.Null ? l.GetDecimal() : null;

                if (metricNode.TryGetProperty("marketCapitalization", out var mc))
                    marketCap = mc.ValueKind != JsonValueKind.Null ? mc.GetDecimal() : null;
            }
        }

        return new AssetSnapshot
        {
            Ticker = ticker,
            Name = name,
            Sector = sector,
            Country = country,

            CurrentPrice = currentPrice,
            PriceChangePercent = changePercent,

            High52Week = high52,
            Low52Week = low52,
            MarketCap = marketCap,

            LastUpdated = DateTime.UtcNow
        };
    }
}
