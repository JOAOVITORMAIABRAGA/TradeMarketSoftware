using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeMarket.Application.ViewModels;

namespace TradeMarket.Application.Interfaces
{
    public interface IAssetHistoryRepository
    {
        Task<List<AssetHistoryViewModel>> GetHistoryAsync(
            string ticker);
    }
}
