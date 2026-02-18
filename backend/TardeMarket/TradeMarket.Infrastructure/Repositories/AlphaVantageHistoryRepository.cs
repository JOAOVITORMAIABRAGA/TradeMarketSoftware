using System.Globalization;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using TradeMarket.Application.Interfaces;
using TradeMarket.Application.ViewModels;

namespace TradeMarket.Infrastructure.External;

public class AlphaVantageHistoryRepository : IAssetHistoryRepository
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AlphaVantageHistoryRepository(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["AlphaVantage:ApiKey"]
                  ?? throw new InvalidOperationException("AlphaVantage ApiKey not configured.");
    }

    public async Task<List<AssetHistoryViewModel>> GetHistoryAsync(string ticker)
    {
        var url =
            $"https://www.alphavantage.co/query" +
            $"?function=TIME_SERIES_DAILY" +
            $"&symbol={ticker}" +
            $"&outputsize=compact" +
            $"&apikey={_apiKey}";

        var response = await _httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            return new List<AssetHistoryViewModel>();

        var json = await response.Content.ReadAsStringAsync();

        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;

        if (!root.TryGetProperty("Time Series (Daily)", out JsonElement timeSeries))
            return new List<AssetHistoryViewModel>();

        var result = new List<AssetHistoryViewModel>();

        foreach (var day in timeSeries.EnumerateObject())
        {
            if (!DateTime.TryParseExact(
                    day.Name,
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var date))
                continue;

            var values = day.Value;

            decimal TryParseDecimal(string propertyName)
            {
                if (!values.TryGetProperty(propertyName, out var prop))
                    return 0;

                var str = prop.GetString();
                if (decimal.TryParse(str, NumberStyles.Any, CultureInfo.InvariantCulture, out var value))
                    return value;

                return 0;
            }

            result.Add(new AssetHistoryViewModel
            {
                Date = date,
                Open = TryParseDecimal("1. open"),
                High = TryParseDecimal("2. high"),
                Low = TryParseDecimal("3. low"),
                Close = TryParseDecimal("4. close")
            });
        }

        return result
            .OrderBy(x => x.Date)
            .ToList();
    }

}
