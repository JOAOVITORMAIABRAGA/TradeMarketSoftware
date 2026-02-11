using TradeMarket.Application.ViewModels;
using TradeMarket.Domain.Repositories;

namespace TradeMarket.Application.Services;

public class AssetService : IAssetService
{
    private readonly IAssetRepository _repository;

    public AssetService(IAssetRepository repository)
    {
        _repository = repository;
    }

    public async Task<AssetDetailsViewModel?> GetAssetDetailsAsync(string ticker)
    {
        var snapshot = await _repository.GetSnapshotAsync(ticker);
        if (snapshot is null) return null;

        return new AssetDetailsViewModel
        {
            Ticker = snapshot.Ticker,
            Name = snapshot.Name,
            Type = snapshot.Type,
            Sector = snapshot.Sector,

            CurrentPrice = snapshot.CurrentPrice,
            PriceVariationPercent = snapshot.PriceChangePercent,

            DividendYield = snapshot.DividendYield,
            DividendYieldStatus = GetYieldStatus(snapshot.DividendYield),
            DividendYieldExplanation = GetYieldExplanation(snapshot.DividendYield),

            LastUpdated = snapshot.LastUpdated
        };
    }


    private string GetYieldStatus(decimal yield)
    {
        if (yield >= 8) return "Good";
        if (yield >= 5) return "Neutral";
        return "Bad";
    }

    private string GetYieldExplanation(decimal yield)
    {
        return yield switch
        {
            >= 8 => "The dividend yield is above the market average, indicating strong income generation.",
            >= 5 => "The dividend yield is within the market average range.",
            _ => "The dividend yield is below expectations, which may indicate lower income generation."
        };
    }
}
