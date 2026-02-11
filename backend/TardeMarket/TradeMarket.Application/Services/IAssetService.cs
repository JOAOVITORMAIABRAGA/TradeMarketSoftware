using TradeMarket.Application.ViewModels;

namespace TradeMarket.Application.Services;

public interface IAssetService
{
    Task<AssetDetailsViewModel?> GetAssetDetailsAsync(string ticker);
}
