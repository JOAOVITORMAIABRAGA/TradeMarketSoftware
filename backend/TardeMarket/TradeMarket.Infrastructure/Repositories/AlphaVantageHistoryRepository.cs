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

    public async Task<List<AssetHistoryViewModel>> GetHistoryAsync(
        string ticker,
        DateTime from,
        DateTime to)
    {
        Console.WriteLine("========== DEBUG START ==========");
        Console.WriteLine($"Ticker: {ticker}");
        Console.WriteLine($"From: {from}");
        Console.WriteLine($"To: {to}");

        from = from.Date;
        to = to.Date;

        if (to > DateTime.UtcNow.Date)
            to = DateTime.UtcNow.Date;

        var url =
            $"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&outputsize=compact&apikey={_apiKey}";

        Console.WriteLine($"Request URL: {url}");

        var response = await _httpClient.GetAsync(url);

        Console.WriteLine($"Status Code: {response.StatusCode}");

        if (!response.IsSuccessStatusCode)
        {
            Console.WriteLine("Request failed.");
            return new List<AssetHistoryViewModel>();
        }

        var json = await response.Content.ReadAsStringAsync();

        Console.WriteLine("Raw JSON received:");
        Console.WriteLine(json.Substring(0, Math.Min(json.Length, 1000))); // limita para não explodir console

        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;

        if (!root.TryGetProperty("Time Series (Daily)", out JsonElement timeSeries))
        {
            Console.WriteLine("Time Series (Daily) NOT FOUND.");
            Console.WriteLine("========== DEBUG END ==========");
            return new List<AssetHistoryViewModel>();
        }

        Console.WriteLine($"Total days returned by API: {timeSeries.EnumerateObject().Count()}");

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

            if (date < from || date > to)
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

        Console.WriteLine($"Filtered results count: {result.Count}");

        if (result.Any())
        {
            Console.WriteLine($"Min date: {result.Min(x => x.Date)}");
            Console.WriteLine($"Max date: {result.Max(x => x.Date)}");
        }

        Console.WriteLine("========== DEBUG END ==========");

        return result
            .OrderBy(x => x.Date)
            .ToList();
    }
}
