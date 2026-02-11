# 📈 TradeMarket

TradeMarket is an educational web platform designed to help users understand stock market assets beyond raw numbers.

Instead of only displaying financial data, the platform explains what each indicator means, why it matters, and how to interpret it.

---

## 🎯 Problem

Most financial applications focus only on displaying charts and indicators, assuming the user already understands them.

For beginners and intermediate investors, this creates a knowledge gap between seeing data and understanding decisions.

---

## 💡 Solution

TradeMarket combines real market data with educational explanations.

Each asset response is enriched with:

- Clear definitions  
- Practical interpretation  
- Structured API responses  
- Clean architectural separation  
- Abstraction of external providers  

The goal is to transform raw market data into structured, learning-oriented insights.

---

## 🧠 Educational Focus

For every financial indicator:

- What is it?  
- Why is it important?  
- How should it be interpreted?  
- What does the current variation suggest?  

This makes TradeMarket suitable for:

- Beginners learning about the stock market  
- Developers interested in financial system architecture  
- Portfolio-oriented backend projects  

---

## 🧱 Architecture Overview

The project follows **Clean Architecture principles** with strict separation of concerns.

### 📂 Project Structure

TradeMarket
│
├── TradeMarket.Api
│ └── Controllers (HTTP layer)
│
├── TradeMarket.Application
│ ├── Services (Business orchestration)
│ ├── ViewModels (API contracts)
│ └── Extensions (Dependency Injection)
│
├── TradeMarket.Domain
│ ├── Entities
│ └── Repository Interfaces
│
└── TradeMarket.Infrastructure
├── External API integrations (Finnhub)
├── Repository implementations
└── Dependency Injection


### 🔑 Key Architectural Decisions

- MVC for API exposure  
- Business rules isolated in Application layer  
- External APIs abstracted behind repository interfaces  
- Infrastructure fully decoupled from domain logic  
- Easy replacement of data providers (Yahoo → Finnhub migration implemented)  
- HttpClientFactory for external communication  

---

## 🔌 External Data Provider

Market data is fetched from:

**Finnhub API**  
https://finnhub.io/

### Endpoints Used

- `/quote` → Current price and variation  
- `/stock/profile2` → Company information  

The provider is abstracted via `IAssetRepository`, allowing future replacement without impacting business logic.

---

## 🌐 API Endpoint

### `GET /api/assets/{ticker}`

Example request:

GET /api/assets/AAPL


Example response:

```json
{
  "ticker": "AAPL",
  "name": "Apple Inc",
  "type": "Stock",
  "sector": "Technology",
  "currentPrice": 189.42,
  "priceVariationPercent": -0.54,
  "lastUpdated": "2026-02-11T12:48:00Z"
}

📊 Current Indicators
Asset identity

Sector

Current price

Daily price variation (%)

Dividend Yield was removed in the current version due to API plan limitations.

🛠️ Tech Stack
Backend
.NET

ASP.NET Core

Clean Architecture

HttpClientFactory

Frontend (Planned)
React

External API
Finnhub

🚀 Roadmap
Planned improvements:

📈 Historical price charts using /stock/candle

📊 Frontend visualization with React

🔁 Retry policies (Polly)

💾 Optional historical data persistence

🧪 Unit tests for Application layer

⚠️ Disclaimer
This project is educational and does not provide financial advice.

All classifications and explanations are intended for learning purposes only.

👤 Author
João Vítor Maia Braga

Developed as a portfolio and educational project focused on:

Clean Architecture

API design

External service integration

Backend engineering best practices
