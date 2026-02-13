using TradeMarket.Application.ViewModels;
using TradeMarket.Domain.Entities;

namespace TradeMarket.Application.Services;

public interface IAssetService
{
    Task<AssetDetailsViewModel?> GetAssetDetailsAsync(string ticker);
    Task<List<AssetHistoryViewModel>> GetHistoryAsync(
    string ticker,
    DateTime from,
    DateTime to);

}
