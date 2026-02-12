using TradeMarket.Application.Extensions;
using TradeMarket.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

//
// ─────────────────────────────────────────────────────────────
// Service registration (Dependency Injection)
// ─────────────────────────────────────────────────────────────
//

// Registers MVC controllers for the API layer
builder.Services.AddControllers();

// Registers application-level services (use cases, services, view models)
// NOTE: Application layer contains only abstractions and business logic
builder.Services.AddApplication();

// Registers infrastructure services (repositories, cache, external APIs)
// NOTE: Infrastructure depends on Application, never the other way around
builder.Services.AddInfrastructure();

// Enables endpoint discovery for Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();

// Registers Swagger generator for API documentation
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "TradeMarket API",
        Version = "v1",
        Description = "Educational API for stock market assets, metrics, and investment concepts"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


var app = builder.Build();

//
// ─────────────────────────────────────────────────────────────
// HTTP request pipeline
// ─────────────────────────────────────────────────────────────
//

// Enables Swagger UI only in Development environment
// Exposes interactive API documentation
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "TradeMarket API v1");
    });
}

// Redirects HTTP requests to HTTPS
app.UseHttpsRedirection();

// Enables authorization middleware (ready for future auth mechanisms)
app.UseAuthorization();

app.UseCors("AllowFrontend");

// Maps controller endpoints
app.MapControllers();

// Starts the application
app.Run();
