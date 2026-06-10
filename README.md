# ✦ Jyotish Study Guide

A single-file React app for learning **Vedic astrology (Jyotish)** — covering the North Indian Kundli, Mahadasha/Antardasha dasha systems, divisional charts, and curated free & paid resources.

Built as a personal study reference. No backend, no API keys, no dependencies beyond React.

**[→ View the Live Guide](https://mrigank590.github.io/jyotish-guide)**

---

## Features

- **Interactive North Indian Kundli chart** — select any of the 12 Lagnas and signs rotate in real time; hover any house to see its meaning and assigned sign
- **Scroll-spy sidebar navigation** across 15 content sections
- **Full study roadmap** across 5 learning phases (Foundations → Chart Reading → Dasha System → Divisional Charts → Advanced Topics)
- **Curated resource directory** — free YouTube channels, websites, software, books (free and paid), and courses, each with honest pros/cons and star ratings
- **Red flags section** — community-sourced criticism of popular resources, known inaccuracies, and realistic timelines
- **4-month weekly study plan**
- Responsive layout — sidebar collapses on mobile

---

## Tech stack

| What | Details |
|---|---|
| Framework | React 18+ |
| Dependencies | `react`, `react-dom` only — no third-party libraries |
| Hooks used | `useState`, `useEffect` |
| Styling | Inline styles — no CSS framework, no CSS files |
| Chart | Pure SVG rendered in JSX — no chart library |
| File count | 1 (`VedicAstrologyGuide.jsx`) |

---

## Customising content

All content is plain JavaScript constants at the top of `VedicAstrologyGuide.jsx`. No build step, no CMS.

| Constant | What to edit |
|---|---|
| `SIGNS` | The 12 zodiac signs with Sanskrit names and symbols |
| `PLANETS` | The 9 Grahas with abbreviations and Sanskrit names |
| `HOUSE_INFO` | House numbers, meanings, and keywords |
| `DASHAS` | Vimshottari Dasha planets, durations, and display colours |
| `VARGAS` | The 16 divisional charts with descriptions |
| `NAV` | Sidebar navigation labels and section IDs |

To add a new section: add an entry to `NAV`, create a `<Sec id="your-id" title="...">` block inside `<main>` in the `App` component, and write the content using the existing components (`H3`, `P`, `DataTable`, `Card`, etc.).

---

## Content sections

| # | Section | What it covers |
|---|---|---|
| 1 | Overview | What Jyotish is; Vedic vs Western astrology comparison table |
| 2 | North Indian Kundli | Interactive chart; the 5 core rules; house positions; opposite-axis pairs |
| 3 | Phase 1 — Foundations | 9 planets, 12 signs, 12 houses, core vocabulary |
| 4 | Phase 2 — Chart Reading | Step-by-step D1 reading; aspects (Drishti); Yogas |
| 5 | Phase 3 — Dasha System | Vimshottari 120-year cycle; Mahadasha/Antardasha; sub-period hierarchy |
| 6 | Phase 4 — Vargas | All 16 divisional charts; Navamsha (D9) and Dashamsha (D10) in depth |
| 7 | Phase 5 — Advanced | Ashtakavarga, Jaimini, KP, Nadi, Prashna, Muhurta, Varshaphala, Sade Sati |
| 8 | YouTube Channels | Ranked with pros/cons — Ryan Kurczak, KRSchannel, Komilla Sutton, PVR Rao, Sanjay Rath |
| 9 | Websites & Tools | Chart generators, Dasha calculators, free e-books |
| 10 | Free Software | JHora, Maitreya's Dream, Drik Panchang, AstroSage mobile |
| 11 | Books | Free (BV Raman, BPHS, PVR Rao) and paid (Kurczak, Sutton, de Fouw, Rath) |
| 12 | Paid Courses | Asheville Vedic, Komilla Sutton's School, SJC, Udemy, BAVA |
| 13 | Communities | Reddit, Facebook groups, forums, Substack newsletters |
| 14 | ⚠ Red Flags | Platform reviews, known inaccuracies, realistic learning timelines |
| 15 | Study Plan | Month-by-month, week-by-week schedule for the first 4 months |

---

## Notes on the Kundli chart

The North Indian chart uses a **3-column × 4-row grid**:

```
┌──────┬──────┬──────┐
│  12  │  1   │  2   │   Row 0
├──────┤  ╲╱  ├──────┤
│  11  │  ╱╲  │  3   │   Row 1  (center cell = decorative X)
├──────┼──────┼──────┤
│  10  │  9   │  4   │   Row 2
├──────┼──────┼──┬───┤
│   8  │  7   │5 │ 6 │   Row 3  (H5 top half, H6 bottom half of right cell)
└──────┴──────┴──┴───┘
```

House 1 (Lagna) is **always top-center**. Signs are assigned clockwise starting from the Lagna sign. The `getSignForHouse(houseNum, lagnaSign)` function handles this with a single modulo operation.

---

## Disclaimer

This is a study reference tool, not a prediction service. Vedic astrology as a predictive system has not been validated by controlled scientific studies. The content reflects traditional Jyotish teaching and community consensus among practitioners. Always cross-reference multiple sources when learning.

---

## License

MIT — use it, fork it, extend it however you like.
