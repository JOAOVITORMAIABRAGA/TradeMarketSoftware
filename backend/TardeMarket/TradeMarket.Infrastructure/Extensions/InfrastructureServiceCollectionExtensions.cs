using Microsoft.Extensions.DependencyInjection;
using TradeMarket.Domain.Repositories;
using TradeMarket.Infrastructure.Repositories;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Http;

namespace TradeMarket.Infrastructure.Extensions;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddMemoryCache();

        services.AddHttpClient<IAssetRepository, FinnhubAssetRepository>();

        return services;
    }
}
