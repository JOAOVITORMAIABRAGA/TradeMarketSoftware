using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using TradeMarket.Application.Interfaces;
using TradeMarket.Domain.Repositories;
using TradeMarket.Infrastructure.Repositories;
using TradeMarket.Infrastructure.External;

namespace TradeMarket.Infrastructure.Extensions;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddMemoryCache();

        services.AddHttpClient<IAssetRepository, FinnhubAssetRepository>();

        services.AddHttpClient<IAssetHistoryRepository, AlphaVantageHistoryRepository>();


        return services;
    }
}
