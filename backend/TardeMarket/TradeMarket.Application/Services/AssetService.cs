using System.Diagnostics.Metrics;
using System.Xml.Linq;
using TradeMarket.Application.Interfaces;
using TradeMarket.Application.ViewModels;
using TradeMarket.Domain.Repositories;

namespace TradeMarket.Application.Services;

public class AssetService : IAssetService
{
    private readonly IAssetRepository _repository;
    private readonly IAssetHistoryRepository _historyRepository;

    public AssetService(
        IAssetRepository assetRepository,
        IAssetHistoryRepository historyRepository)
    {
        _repository = assetRepository;
        _historyRepository = historyRepository;
    }

    public async Task<AssetDetailsViewModel?> GetAssetDetailsAsync(string ticker)
    {
        var snapshot = await _repository.GetSnapshotAsync(ticker);
        if (snapshot is null) return null;

        return new AssetDetailsViewModel
        {
            Ticker = snapshot.Ticker,
            Name = snapshot.Name,
            Sector = snapshot.Sector,
            Country = snapshot.Country,

            CurrentPrice = snapshot.CurrentPrice,
            PriceChangePercent = snapshot.PriceChangePercent,

            High52Week = snapshot.High52Week,
            Low52Week = snapshot.Low52Week,
            MarketCap = snapshot.MarketCap,

            LastUpdated = DateTime.UtcNow
        };
    }

    public async Task<List<AssetHistoryViewModel>> GetHistoryAsync(
        string ticker,
        DateTime from,
        DateTime to)
    {
        return await _historyRepository.GetHistoryAsync(ticker, from, to);
    }

}
