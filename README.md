# TradeMarket 📈

**TradeMarket** is an educational web platform designed to help users understand stock market assets beyond raw numbers.  
Instead of only displaying financial data, the platform explains *what each indicator means*, *why it matters*, and *how to interpret it*.

---

## 🎯 Problem

Most financial applications focus on displaying charts and indicators, assuming the user already understands them.  
For beginners and intermediate investors, this creates a knowledge gap between *seeing data* and *understanding decisions*.

---

## 💡 Solution

TradeMarket combines **real market data** with **educational explanations**.  
Each asset indicator is enriched with:
- Clear definitions
- Practical interpretation
- Visual status indicators (good / neutral / bad)
- Contextual explanations (tooltips & hover interactions)

The goal is to transform market data into **learning-oriented insights**.

---

## 🧠 Educational Focus

For every indicator (e.g. Dividend Yield, P/VP):
- **What is it?**
- **Why is it important?**
- **When is it considered good or bad?**
- **Why is the current value classified as such?**

This makes TradeMarket suitable for:
- Beginners learning about the stock market
- Developers interested in financial systems
- Educational or portfolio-oriented projects

---

## 🧱 Architecture Overview

The project follows **Clean Architecture principles** with a clear separation of concerns.

TradeMarket.Api
│── Controllers (HTTP layer)
│
TradeMarket.Application
│── Services (Business logic)
│── ViewModels (API responses)
│── Extensions (Dependency Injection)
│
TradeMarket.Domain
│── Entities
│── Repository Interfaces
│
TradeMarket.Infrastructure
│── External API integrations
│── Repositories
│── Caching layer
│── Dependency Injection


### Key architectural decisions:
- MVC for API exposure
- Business rules isolated in Application layer
- External APIs abstracted behind repositories
- Infrastructure concerns (cache, HTTP) fully decoupled
- Designed for easy replacement of data providers

---

## 🔌 Data Source & Caching

- External data is fetched from **Yahoo Finance API**
- Results are cached in-memory for **10 minutes**
- Cache logic is isolated in the Infrastructure layer

This approach reduces external calls while keeping data reasonably fresh.

---

## 🌐 API Endpoints (initial)

```http
GET /api/assets/{ticker}
Returns:

Asset identity

Current price

Dividend yield

Educational explanations

Indicator status classification

🛠️ Tech Stack
Backend: .NET / ASP.NET Core

Frontend: React

Architecture: Clean Architecture + MVC

Caching: IMemoryCache

External API: Yahoo Finance

🚀 Roadmap
Planned next steps:

Price history charts

Dividend history and consistency analysis

Risk indicators (vacancy, concentration, interest sensitivity)

Asset comparison by sector

Educational glossary module

⚠️ Disclaimer
This project is educational and does not provide financial advice.
All classifications and explanations are intended for learning purposes only.

👤 Author
Developed as a portfolio and educational project focused on:

Software architecture

API design

Clean code practices

Financial data interpretation