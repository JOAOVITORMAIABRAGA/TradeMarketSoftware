using Microsoft.Extensions.DependencyInjection;
using TradeMarket.Domain.Repositories;
using TradeMarket.Infrastructure.Repositories;

namespace TradeMarket.Infrastructure.Extensions;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddMemoryCache();

        services.AddHttpClient<IAssetRepository, YahooAssetRepository>();

        return services;
    }
}
