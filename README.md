# Cinnamon — Mobile Wealth & Holdings Tracker

A high-fidelity mobile web application prototype for **Cinnamon**, tailored for UK **Upward Movers** (professionals earning £75k–£100k, time-poor, seeking transparency and zero market noise).

Based on the **Cinnamon Case Study** and real-world economics of **Nutmeg** (founded by Nick Hungerford in 2012).

---

## Key Features

- **Strictly "Holdings-Only" Architecture**: Zero trading distractions — strictly no Buy, Sell, Trade, or Discover buttons. Eliminates market noise and impulse trading.
- **3-Second Glance Portfolio Dashboard**: Instant visibility into Net Worth (£34,500.00), Today's Return (+£120.00 / +0.35%), and All-Time Return (+£3,400.00 / +10.93%).
- **Benchmark Comparison (12 Months)**: Interactive chart comparing portfolio performance against FTSE 100 (+5.80%) and S&P 500 (+10.20%).
- **Read-Only Holdings List**: Clean grouped view of owned assets (Vanguard S&P 500, Apple, UK Sovereign Gilts, Microsoft, AstraZeneca, Liquid Cash) with purchase cost, market price, and returns.
- **Visual Asset Allocation**: Interactive donut chart breaking down portfolio by Sector and Asset Class.
- **Nutmeg-Accurate Transparent Fee Module**:
  - Tiered annual fee structure (Fully Managed: 0.75% up to £100k, 0.35% above; Fixed Allocation: 0.45% up to £100k, 0.25% above).
  - Three-pillar fee disclosure: Management Fee + Underlying ETF Fund Costs (0.14%–0.39%) + Market Spread (0.04%).
  - Zero setup, exit, withdrawal, or trading commission fees.
  - Interactive slider showcasing the £100,000 tier rate drop.
  - Case study economics: £20 operating cost, £230 CAC, and £20,000 breakeven threshold.
  - UK Tax wrappers guide: Stocks & Shares ISA, Lifetime ISA (LISA), and GIA rules.
- **Authentic iPhone 16 Pro Device Frame**: Exact 19.5:9 aspect ratio (393px × 852px) with in-device scrolling and a toggle for full-width view.
- **London Tube Commute Privacy Mode**: One-tap toggle to obscure monetary values on public transport.
- **Dual Light & Dark Theme**: Warm British financial editorial light theme paired with an iOS dark mode.

---

## Tech Stack

- **React 18** with **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Recharts**
- **Lucide React**

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd Cinnamon_prototype

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
