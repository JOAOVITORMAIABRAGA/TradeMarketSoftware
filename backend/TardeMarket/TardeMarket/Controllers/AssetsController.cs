using Microsoft.AspNetCore.Mvc;
using TradeMarket.Application.Services;

namespace TradeMarket.Api.Controllers;

[ApiController]
[Route("api/assets")]
public class AssetsController : ControllerBase
{
    private readonly IAssetService _service;

    public AssetsController(IAssetService service)
    {
        _service = service;
    }

    [HttpGet("{ticker}")]
    public async Task<IActionResult> Get(string ticker)
    {
        var result = await _service.GetAssetDetailsAsync(ticker);
        if (result is null) return NotFound();

        return Ok(result);
    }
}
