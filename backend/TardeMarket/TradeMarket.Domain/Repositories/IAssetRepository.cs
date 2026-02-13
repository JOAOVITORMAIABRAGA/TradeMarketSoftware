using TradeMarket.Domain.Entities;

namespace TradeMarket.Domain.Repositories;

public interface IAssetRepository
{
    Task<AssetSnapshot?> GetSnapshotAsync(string ticker);
}
