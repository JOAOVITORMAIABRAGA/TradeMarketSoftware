using TradeMarket.Domain.Entities;

namespace TradeMarket.Domain.Repositories;

public interface IAssetRepository
{
    Task<AssetSnapshot?> GetSnapshotAsync(string ticker);

    Task<List<AssetHistory>> GetHistoryAsync(string ticker, DateTime from, DateTime to);

}
