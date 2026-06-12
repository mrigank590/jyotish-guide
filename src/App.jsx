import { useState, useEffect, useContext, createContext } from "react";

// ─── Static data ───────────────────────────────────────────────────────────────

const SIGNS = [
  { num:1,  name:"Aries",       hindi:"Mesh",     sym:"♈" },
  { num:2,  name:"Taurus",      hindi:"Vrishabh", sym:"♉" },
  { num:3,  name:"Gemini",      hindi:"Mithun",   sym:"♊" },
  { num:4,  name:"Cancer",      hindi:"Kark",     sym:"♋" },
  { num:5,  name:"Leo",         hindi:"Simha",    sym:"♌" },
  { num:6,  name:"Virgo",       hindi:"Kanya",    sym:"♍" },
  { num:7,  name:"Libra",       hindi:"Tula",     sym:"♎" },
  { num:8,  name:"Scorpio",     hindi:"Vrischik", sym:"♏" },
  { num:9,  name:"Sagittarius", hindi:"Dhanu",    sym:"♐" },
  { num:10, name:"Capricorn",   hindi:"Makar",    sym:"♑" },
  { num:11, name:"Aquarius",    hindi:"Kumbh",    sym:"♒" },
  { num:12, name:"Pisces",      hindi:"Meen",     sym:"♓" },
];

const PLANETS = [
  { abbr:"Su", name:"Sun",     hindi:"Surya"   },
  { abbr:"Mo", name:"Moon",    hindi:"Chandra" },
  { abbr:"Ma", name:"Mars",    hindi:"Mangal"  },
  { abbr:"Me", name:"Mercury", hindi:"Budha"   },
  { abbr:"Ju", name:"Jupiter", hindi:"Guru"    },
  { abbr:"Ve", name:"Venus",   hindi:"Shukra"  },
  { abbr:"Sa", name:"Saturn",  hindi:"Shani"   },
  { abbr:"Ra", name:"Rahu",    hindi:"Rahu"    },
  { abbr:"Ke", name:"Ketu",    hindi:"Ketu"    },
];

const HOUSE_INFO = [
  { h:1,  meaning:"Self, body, personality, general fortune"          },
  { h:2,  meaning:"Wealth, family, speech, accumulated assets"        },
  { h:3,  meaning:"Siblings, courage, short journeys, communication"  },
  { h:4,  meaning:"Home, mother, property, emotional foundation"      },
  { h:5,  meaning:"Children, creativity, intelligence, education"     },
  { h:6,  meaning:"Enemies, health, service, daily routine, debt"     },
  { h:7,  meaning:"Partner, marriage, business partner, public"       },
  { h:8,  meaning:"Longevity, transformation, hidden wealth, in-laws" },
  { h:9,  meaning:"Luck, dharma, father, higher learning, travel"     },
  { h:10, meaning:"Career, status, government, public reputation"     },
  { h:11, meaning:"Gains, networks, elder siblings, income"           },
  { h:12, meaning:"Loss, liberation, foreign lands, moksha"           },
];

const DASHAS = [
  { planet:"Ketu",    years:7,  col:"#A0855A" },
  { planet:"Venus",   years:20, col:"#C084B0" },
  { planet:"Sun",     years:6,  col:"#E8834A" },
  { planet:"Moon",    years:10, col:"#6BA3C8" },
  { planet:"Mars",    years:7,  col:"#D05050" },
  { planet:"Rahu",    years:18, col:"#7B8FAA" },
  { planet:"Jupiter", years:16, col:"#C4A84A" },
  { planet:"Saturn",  years:19, col:"#909090" },
  { planet:"Mercury", years:17, col:"#5A9A6A" },
];

const VARGAS = [
  { code:"D1",  name:"Rashi",            div:"1/1",   use:"Overall life — the main chart",              hi:false },
  { code:"D2",  name:"Hora",             div:"1/2",   use:"Wealth and finances",                        hi:false },
  { code:"D3",  name:"Drekkana",         div:"1/3",   use:"Siblings, courage, short travel",            hi:false },
  { code:"D4",  name:"Chaturthamsha",    div:"1/4",   use:"Property, home, fortune",                    hi:false },
  { code:"D7",  name:"Saptamsha",        div:"1/7",   use:"Children and grandchildren",                 hi:false },
  { code:"D9",  name:"Navamsha",         div:"1/9",   use:"Marriage, dharma, soul purpose ★ start here",hi:true  },
  { code:"D10", name:"Dashamsha",        div:"1/10",  use:"Career, status, profession ★ start here",   hi:true  },
  { code:"D12", name:"Dwadashamsha",     div:"1/12",  use:"Parents, ancestry",                          hi:false },
  { code:"D16", name:"Shodashamsha",     div:"1/16",  use:"Vehicles, conveyances, comforts",            hi:false },
  { code:"D20", name:"Vimshamsha",       div:"1/20",  use:"Spiritual practices, deity",                 hi:false },
  { code:"D24", name:"Chaturvimshamsha", div:"1/24",  use:"Education, learning",                        hi:false },
  { code:"D27", name:"Saptavimshamsha",  div:"1/27",  use:"Strength and weakness",                      hi:false },
  { code:"D30", name:"Trimshamsha",      div:"1/30",  use:"Misfortunes, health challenges",             hi:false },
  { code:"D40", name:"Khavedamsha",      div:"1/40",  use:"Auspicious/inauspicious effects",            hi:false },
  { code:"D45", name:"Akshavedamsha",    div:"1/45",  use:"General character, all matters",             hi:false },
  { code:"D60", name:"Shashtiamsha",     div:"1/60",  use:"Past karma, general indications",            hi:false },
];

const NAV = [
  { id:"overview",    label:"Overview"                },
  { id:"kundli",      label:"North Indian Kundli"     },
  { id:"foundations", label:"Phase 1 — Foundations"  },
  { id:"charts",      label:"Phase 2 — Chart Reading" },
  { id:"dasha",       label:"Phase 3 — Dasha System"  },
  { id:"vargas",      label:"Phase 4 — Vargas"        },
  { id:"advanced",    label:"Phase 5 — Advanced"      },
  { id:"youtube",     label:"YouTube Channels"        },
  { id:"websites",    label:"Websites & Tools"        },
  { id:"software",    label:"Free Software"           },
  { id:"books",       label:"Books"                   },
  { id:"courses",     label:"Paid Courses"            },
  { id:"community",   label:"Communities"             },
  { id:"redflags",    label:"⚠ Red Flags"             },
  { id:"studyplan",   label:"Study Plan"              },
];

// ─── Colour palettes ───────────────────────────────────────────────────────────
//
// LIGHT: warm parchment / saffron / brown — classic Indian manuscript feel
// DARK:  deep indigo-navy / gold / soft cream — night sky / celestial feel

const LIGHT = {
  bg:       "#FAF6EF",
  card:     "#FFF8EE",
  cardAlt:  "#FFFDF7",
  border:   "#D4A050",
  ink:      "#3D1F00",
  mid:      "#5B3A29",
  muted:    "#9A7050",
  lagna:    "#8B3A00",
  head:     "#3D1F00",        // header / table-header bg
  headText: "#FFFDF7",
  warn:     "#7A2010",
  warnBg:   "#FFF4F0",
  warnBd:   "#E8A090",
  warnTxt:  "#6A3020",
  hi:       "#FFF4C8",
  hiBd:     "#C4933A",
  hiTxt:    "#5B3A00",
  accent:   "#D4A050",
  accentSub:"#C4933A",
  // svg / chart
  svgBg:    "#FFFDF7",
  svgBd:    "#5B3A29",
  svgX:     "#C4933A",
  svgLagna: "#FFF3B0",
  svgHov:   "#FFF0D0",
  svgLagnaHov: "#FFE58A",
  svgHNum:  "#3D1F00",
  svgLNum:  "#8B3A00",
  svgSign:  "#9A6030",
  svgLagnaLabel: "#C47A30",
  // nav active
  navActive:"#8B3A00",
  navInactive:"#5B3A29",
  // Dasha cards
  dashaCard:"#FFF8EE",
  // badges
  freeBg:"#E8F5E9",  freeTxt:"#2E7D32",  freeBd:"#A5D6A7",
  paidBg:"#FFF3E0",  paidTxt:"#E65100",  paidBd:"#FFCC80",
  // strength/warn inline
  strengthTxt:"#2E7D32",
  dangerTxt:  "#B71C1C",
  // week label
  weekBg:   "#3D1F00",
  weekTxt:  "#FFFDF7",
  // footer quote
  quoteBg:  "transparent",
  quoteBd:  "#D4A050",
  // scrollbar
  scrollThumb:"#D4A050",
  scrollTrack:"#FAF6EF",
  // sidebar mobile bg
  sidebarMobBg:"#FAF6EF",
};

const DARK = {
  bg:       "#0F1120",        // deep space navy
  card:     "#1A1E35",        // slightly lighter navy
  cardAlt:  "#161929",
  border:   "#3D3060",        // muted indigo border
  ink:      "#E8E0D0",        // warm off-white
  mid:      "#B8A898",        // warm medium grey
  muted:    "#7A7090",        // muted purple-grey
  lagna:    "#F0C060",        // gold
  head:     "#0A0C18",        // near-black header
  headText: "#E8E0D0",
  warn:     "#F08070",
  warnBg:   "#2A1418",
  warnBd:   "#6A2A28",
  warnTxt:  "#E8A090",
  hi:       "#2A2540",        // highlighted row — deep purple
  hiBd:     "#C4A050",
  hiTxt:    "#F0D080",
  accent:   "#C4A050",        // gold accent
  accentSub:"#A08040",
  // svg / chart
  svgBg:    "#12152A",
  svgBd:    "#4A3A80",
  svgX:     "#8060C0",
  svgLagna: "#2A2040",        // lagna cell bg in dark
  svgHov:   "#241E3A",
  svgLagnaHov: "#3A2E50",
  svgHNum:  "#D0C8B8",
  svgLNum:  "#F0C060",
  svgSign:  "#9080C0",
  svgLagnaLabel:"#C4A050",
  // nav
  navActive:"#F0C060",
  navInactive:"#8A8098",
  // Dasha
  dashaCard:"#1A1E35",
  // badges
  freeBg:"#142818",  freeTxt:"#80D890",  freeBd:"#306040",
  paidBg:"#281808",  paidTxt:"#F0A060",  paidBd:"#604020",
  // strength/warn inline
  strengthTxt:"#80C890",
  dangerTxt:  "#F08070",
  // week label
  weekBg:   "#0A0C18",
  weekTxt:  "#E8E0D0",
  // footer quote
  quoteBg:  "transparent",
  quoteBd:  "#3D3060",
  // scrollbar
  scrollThumb:"#4A3A70",
  scrollTrack:"#0F1120",
  // sidebar mobile bg
  sidebarMobBg:"#0F1120",
};

// ─── Theme context ─────────────────────────────────────────────────────────────

const ThemeCtx = createContext({ C: LIGHT, dark: false });
const useTheme = () => useContext(ThemeCtx);

// ─── Kundli chart ──────────────────────────────────────────────────────────────

const GRID_COLS = [0, 100, 200, 300];
const GRID_ROWS = [0, 75, 150, 225, 300];

const HOUSE_GRID = {
  12:{ col:0, row:0 },
   1:{ col:1, row:0, isLagna:true },
   2:{ col:2, row:0 },
  11:{ col:0, row:1 },
   3:{ col:2, row:1 },
  10:{ col:0, row:2 },
   9:{ col:1, row:2 },
   4:{ col:2, row:2 },
   8:{ col:0, row:3 },
   7:{ col:1, row:3 },
};

function getSignForHouse(houseNum, lagnaSign) {
  return SIGNS[(lagnaSign - 1 + houseNum - 1) % 12];
}

function KundliChart({ lagnaSign }) {
  const { C } = useTheme();
  const [hovered, setHovered] = useState(null);

  const cW = (col) => GRID_COLS[col+1] - GRID_COLS[col];
  const cH = (row) => GRID_ROWS[row+1] - GRID_ROWS[row];

  const houseCells = Object.entries(HOUSE_GRID).map(([h, pos]) => ({
    h: Number(h), x: GRID_COLS[pos.col], y: GRID_ROWS[pos.row],
    w: cW(pos.col), ht: cH(pos.row), isLagna: pos.isLagna||false,
  }));

  const h56x=GRID_COLS[2], h56y=GRID_ROWS[3], h56w=cW(2), h56ht=cH(3);
  const ctX=GRID_COLS[1], ctY=GRID_ROWS[1], ctW=cW(1), ctHt=cH(1);

  const hoverInfo = hovered ? HOUSE_INFO.find(i=>i.h===hovered) : null;
  const hoverSign = hovered ? getSignForHouse(hovered, lagnaSign) : null;

  return (
    <div style={{ width:"100%", maxWidth:340 }}>
      <svg viewBox="0 0 300 300"
        style={{ display:"block", width:"100%", border:`2px solid ${C.svgBd}`, borderRadius:3, background:C.svgBg }}>

        {houseCells.map(({ h, x, y, w, ht, isLagna }) => {
          const sign = getSignForHouse(h, lagnaSign);
          const isHov = hovered===h;
          let bg = C.svgBg;
          if (isLagna) bg = isHov ? C.svgLagnaHov : C.svgLagna;
          else if (isHov) bg = C.svgHov;
          return (
            <g key={h} onMouseEnter={()=>setHovered(h)} onMouseLeave={()=>setHovered(null)} style={{cursor:"pointer"}}>
              <rect x={x} y={y} width={w} height={ht} fill={bg} stroke={C.svgBd} strokeWidth={isLagna?1.5:1}/>
              <text x={x+w/2} y={y+ht/2-7} textAnchor="middle" dominantBaseline="middle"
                fontSize="13" fontWeight="700" fontFamily="Georgia,serif"
                fill={isLagna ? C.svgLNum : C.svgHNum}>{h}</text>
              <text x={x+w/2} y={y+ht/2+10} textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontFamily="sans-serif" fill={C.svgSign}>{sign.sym} {sign.num}</text>
              {isLagna && (
                <text x={x+w/2} y={y+ht/2+22} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontFamily="sans-serif" fill={C.svgLagnaLabel} fontStyle="italic">Lagna</text>
              )}
            </g>
          );
        })}

        {[5,6].map(h => {
          const isTop = h===5;
          const y = isTop ? h56y : h56y+h56ht/2;
          const ht = h56ht/2;
          const sign = getSignForHouse(h, lagnaSign);
          const isHov = hovered===h;
          return (
            <g key={h} onMouseEnter={()=>setHovered(h)} onMouseLeave={()=>setHovered(null)} style={{cursor:"pointer"}}>
              <rect x={h56x} y={y} width={h56w} height={ht}
                fill={isHov ? C.svgHov : C.svgBg} stroke={C.svgBd} strokeWidth="1"/>
              <text x={h56x+h56w/2} y={y+ht/2-5} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="700" fontFamily="Georgia,serif" fill={C.svgHNum}>{h}</text>
              <text x={h56x+h56w/2} y={y+ht/2+7} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontFamily="sans-serif" fill={C.svgSign}>{sign.sym} {sign.num}</text>
            </g>
          );
        })}

        <rect x={ctX} y={ctY} width={ctW} height={ctHt} fill={C.svgBg} stroke={C.svgBd} strokeWidth="1"/>
        <line x1={ctX} y1={ctY} x2={ctX+ctW} y2={ctY+ctHt} stroke={C.svgX} strokeWidth="1" opacity="0.5"/>
        <line x1={ctX+ctW} y1={ctY} x2={ctX} y2={ctY+ctHt} stroke={C.svgX} strokeWidth="1" opacity="0.5"/>
        <rect x="0" y="0" width="300" height="300" fill="none" stroke={C.svgBd} strokeWidth="2"/>
      </svg>

      <div style={{ minHeight:54, marginTop:6, padding:"8px 12px", background:C.card,
        border:`1px solid ${C.border}`, borderRadius:3, fontSize:12, fontFamily:"sans-serif", color:C.mid }}>
        {hoverInfo ? (
          <>
            <span style={{fontWeight:700, color:C.ink}}>House {hovered}</span>
            {" — "}
            <span style={{fontWeight:600, color:C.lagna}}>{hoverSign?.name}</span>
            {" "}
            <span style={{color:C.muted}}>({hoverSign?.hindi})</span>
            <div style={{marginTop:3, color:C.mid, lineHeight:1.4}}>{hoverInfo.meaning}</div>
          </>
        ) : (
          <span style={{color:C.muted, fontStyle:"italic"}}>Hover a house to see its meaning and sign</span>
        )}
      </div>
    </div>
  );
}

// ─── Shared UI components ──────────────────────────────────────────────────────

function Sec({ id, title, children }) {
  const { C } = useTheme();
  return (
    <section id={id} style={{ marginBottom:48, scrollMarginTop:64 }}>
      <h2 style={{ fontSize:19, fontWeight:700, color:C.ink,
        borderBottom:`2px solid ${C.border}`, paddingBottom:8, marginBottom:20,
        fontFamily:"Georgia,serif", letterSpacing:"0.01em" }}>{title}</h2>
      {children}
    </section>
  );
}

function H3({ children }) {
  const { C } = useTheme();
  return <h3 style={{ fontSize:13, fontWeight:700, color:C.lagna, marginTop:22, marginBottom:10,
    fontFamily:"sans-serif", textTransform:"uppercase", letterSpacing:"0.07em" }}>{children}</h3>;
}

function P({ children }) {
  const { C } = useTheme();
  return <p style={{ fontSize:13, lineHeight:1.75, color:C.ink, marginBottom:14, fontFamily:"sans-serif" }}>{children}</p>;
}

function DataTable({ headers, rows, hiRow }) {
  const { C } = useTheme();
  return (
    <div style={{ overflowX:"auto", marginBottom:16 }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, fontFamily:"sans-serif" }}>
        <thead>
          <tr>{headers.map(h => (
            <th key={h} style={{ padding:"7px 12px", background:C.head, color:C.headText,
              textAlign:"left", fontWeight:600, fontSize:11, letterSpacing:"0.04em" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isHi = hiRow ? hiRow(row) : false;
            return (
              <tr key={i} style={{ background: isHi ? C.hi : i%2===0 ? C.card : C.cardAlt }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding:"6px 12px", borderBottom:`1px solid ${C.border}`,
                    color: isHi ? C.hiTxt : C.ink, fontWeight: isHi&&j===0?700:400 }}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, items, warn }) {
  const { C } = useTheme();
  return (
    <div style={{ background: warn?C.warnBg:C.card, border:`1px solid ${warn?C.warnBd:C.border}`,
      borderRadius:5, padding:"12px 16px", marginBottom:12 }}>
      <div style={{ fontWeight:700, fontSize:13, fontFamily:"sans-serif",
        color: warn?C.warn:"#5B3A00" === C.lagna ? C.lagna : C.lagna, marginBottom:7 }}>{title}</div>
      <ul style={{ margin:0, paddingLeft:18 }}>
        {items.map((item,i) => (
          <li key={i} style={{ marginBottom:5, color: warn?C.warnTxt:C.mid,
            fontSize:12, fontFamily:"sans-serif", lineHeight:1.6 }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ResourceCard({ name, badge, sub, pros, cons, rating, url }) {
  const { C } = useTheme();
  const badgeStyle = badge==="Free"
    ? { bg:C.freeBg, txt:C.freeTxt, bd:C.freeBd }
    : { bg:C.paidBg, txt:C.paidTxt, bd:C.paidBd };
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:5,
      padding:"12px 16px", marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:6 }}>
        <div>
          <span style={{ fontWeight:700, fontSize:13, fontFamily:"sans-serif", color:C.ink }}>{name}</span>
          {badge && <span style={{ marginLeft:8, fontSize:10, fontWeight:700, fontFamily:"sans-serif",
            padding:"2px 7px", borderRadius:10,
            background:badgeStyle.bg, color:badgeStyle.txt, border:`1px solid ${badgeStyle.bd}` }}>{badge}</span>}
          {sub && <span style={{ marginLeft:8, fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>{sub}</span>}
        </div>
        {rating && <span style={{ color:C.accent, letterSpacing:1, fontSize:13 }}>{"★".repeat(rating)}{"☆".repeat(5-rating)}</span>}
      </div>
      {url && <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>↗ {url}</div>}
      {(pros||cons) && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:6 }}>
          {pros && <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.strengthTxt, marginBottom:4, fontFamily:"sans-serif" }}>✓ Strengths</div>
            <ul style={{ margin:0, paddingLeft:14 }}>
              {pros.map((p,i) => <li key={i} style={{ fontSize:11, color:C.ink, lineHeight:1.6, fontFamily:"sans-serif" }}>{p}</li>)}
            </ul>
          </div>}
          {cons && <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.dangerTxt, marginBottom:4, fontFamily:"sans-serif" }}>⚠ Watch out</div>
            <ul style={{ margin:0, paddingLeft:14 }}>
              {cons.map((c,i) => <li key={i} style={{ fontSize:11, color:C.mid, lineHeight:1.6, fontFamily:"sans-serif" }}>{c}</li>)}
            </ul>
          </div>}
        </div>
      )}
    </div>
  );
}

function WeekRow({ label, text }) {
  const { C } = useTheme();
  return (
    <div style={{ display:"flex", gap:10, marginBottom:10 }}>
      <div style={{ minWidth:72, background:C.weekBg, color:C.weekTxt, borderRadius:3,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:10, fontWeight:700, fontFamily:"sans-serif", padding:"4px 6px",
        textAlign:"center", lineHeight:1.3, flexShrink:0 }}>{label}</div>
      <div style={{ flex:1, background:C.card, border:`1px solid ${C.border}`, borderRadius:3,
        padding:"8px 12px", fontSize:12, color:C.ink, fontFamily:"sans-serif", lineHeight:1.6 }}>{text}</div>
    </div>
  );
}

function GridCards({ items }) {
  const { C } = useTheme();
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:10, marginBottom:16 }}>
      {items.map(({ title, desc }) => (
        <div key={title} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:"10px 12px" }}>
          <div style={{ fontWeight:700, fontSize:12, fontFamily:"sans-serif", color:C.lagna, marginBottom:4 }}>{title}</div>
          <div style={{ fontSize:11, fontFamily:"sans-serif", color:C.mid, lineHeight:1.55 }}>{desc}</div>
        </div>
      ))}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive]     = useState("overview");
  const [lagnaSign, setLagnaSign] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark mode — persisted to localStorage
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("jyotish-dark") === "true"; } catch { return false; }
  });

  const toggleDark = () => setDark(d => {
    const next = !d;
    try { localStorage.setItem("jyotish-dark", String(next)); } catch {}
    return next;
  });

  const C = dark ? DARK : LIGHT;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:"-64px 0px -70% 0px" }
    );
    NAV.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setMenuOpen(false);
  };

  return (
    <ThemeCtx.Provider value={{ C, dark }}>
    <div style={{ fontFamily:"sans-serif", background:C.bg, minHeight:"100vh", color:C.ink,
      transition:"background 0.25s, color 0.25s" }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header style={{ background:C.head, color:C.headText, padding:"16px 24px",
        position:"sticky", top:0, zIndex:200, boxShadow:"0 2px 10px rgba(0,0,0,0.45)",
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:17, fontWeight:700, fontFamily:"Georgia,serif", letterSpacing:"0.02em" }}>
            ✦ Jyotish Study Guide
          </div>
          <div style={{ fontSize:11, color:C.accent, marginTop:2, fontStyle:"italic" }}>
            Vedic Astrology · North Indian Kundli · Mahadasha & Antardasha
          </div>
        </div>

        {/* Right-side controls: dark toggle + mobile menu */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {/* Dark mode toggle */}
          <button onClick={toggleDark} title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ background:"none", border:`1px solid ${C.accent}`, color:C.accent,
              padding:"5px 10px", borderRadius:3, cursor:"pointer", fontSize:15, lineHeight:1,
              transition:"all 0.2s" }}>
            {dark ? "☀" : "☽"}
          </button>
          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(o=>!o)}
            style={{ background:"none", border:`1px solid ${C.accent}`, color:C.accent,
              padding:"5px 11px", borderRadius:3, cursor:"pointer", fontSize:12, display:"none" }}
            className="mob-btn">☰ Menu</button>
        </div>
      </header>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)}
          style={{ position:"fixed", inset:0, zIndex:150, background:"rgba(0,0,0,0.5)" }} />
      )}

      <div style={{ display:"flex", maxWidth:1080, margin:"0 auto", padding:"0 12px" }}>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <nav className={`sidebar${menuOpen?" is-open":""}`}
          style={{ width:196, minWidth:196, flexShrink:0, borderRight:`1px solid ${C.border}`,
            padding:"18px 0", position:"sticky", top:55,
            height:"calc(100vh - 55px)", overflowY:"auto",
            transition:"background 0.25s",
            "--sidebar-mob-bg": C.sidebarMobBg }}>
          <div style={{ fontSize:9, color:C.muted, padding:"0 16px 8px",
            textTransform:"uppercase", letterSpacing:"0.12em" }}>Contents</div>
          {NAV.map(s => (
            <button key={s.id} onClick={() => goto(s.id)}
              style={{ display:"block", width:"100%", textAlign:"left", background:"none",
                border:"none", padding:"6px 16px", fontSize:12, cursor:"pointer", lineHeight:1.4,
                color: active===s.id ? C.navActive : C.navInactive,
                fontWeight: active===s.id ? 700 : 400,
                borderLeft: active===s.id ? `3px solid ${C.accent}` : "3px solid transparent",
                transition:"color 0.2s" }}>
              {s.label}
            </button>
          ))}
        </nav>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <main style={{ flex:1, padding:"26px 28px 80px", minWidth:0 }}>

          {/* ── Overview ───────────────────────────────────────────────── */}
          <Sec id="overview" title="What You're Actually Learning">
            <P>Vedic astrology (Jyotish = "light/knowledge") uses name, birth date, exact birth time, and birth place to construct a detailed map of tendencies, timing, and life areas.</P>
            <DataTable
              headers={["Chart / Tool","What It Shows"]}
              rows={[
                ["Janma Kundli (D1)","The main birth chart — your complete life blueprint"],
                ["Navamsha (D9)","Marriage, dharma, the deeper purpose of planets"],
                ["Dashamsha (D10)","Career, status, professional life"],
                ["Other Vargas (D2–D60)","Specific life areas: wealth, siblings, children, health, etc."],
                ["Vimshottari Dasha","120-year planetary timeline — Mahadasha + Antardasha sub-periods"],
                ["Gochar (Transits)","Current planetary movements against the natal chart"],
                ["Yogas","Special planetary combinations that modify life outcomes"],
                ["Nakshatras","The 27 lunar mansions — a deeper layer beneath zodiac signs"],
              ]}
            />
            <H3>Vedic vs Western Astrology</H3>
            <DataTable
              headers={["Dimension","Vedic / Jyotish","Western Astrology"]}
              rows={[
                ["Zodiac","Sidereal — fixed to actual star positions","Tropical — fixed to seasons/equinoxes"],
                ["Primary anchor","Rising sign (Lagna)","Sun sign"],
                ["Sign shift","~24° behind Western — your Western Scorpio is often Vedic Libra","—"],
                ["Moon importance","Moon sign is critical — mind and emotions","Sun sign most emphasised"],
                ["Timing system","Dasha system (Mahadasha / Antardasha)","Transits, progressions, solar returns"],
                ["Extra bodies","Rahu & Ketu (nodes) prominent in predictions","Includes Uranus/Neptune/Pluto; nodes less central"],
                ["Kundli equivalent","Natal/Birth Chart — same concept, different calculation","Natal Chart"],
                ["Dasha equivalent","No direct Western equivalent — closest: Firdaria (Hellenistic)","—"],
              ]}
            />
            <P>If you see Westerners talking about "natal chart," "houses," "conjunctions," and "aspects" — they mean very similar things. The technical framework and emphasis differ significantly, but the vocabulary overlaps.</P>
          </Sec>

          {/* ── North Indian Kundli ────────────────────────────────────── */}
          <Sec id="kundli" title="North Indian Kundli — Chart Layout">
            <P>This guide focuses on the <strong>North Indian (Uttar Bharatiya) style</strong> — the standard across North India, Delhi, UP, MP, Rajasthan, Punjab, Gujarat, Maharashtra, and most Hindi-language books. It is also the default in JHora and AstroSage.</P>

            <div style={{ display:"flex", gap:28, flexWrap:"wrap", alignItems:"flex-start", marginBottom:24 }}>
              <div style={{ flexShrink:0 }}>
                <div style={{ marginBottom:8, fontSize:12, fontWeight:700, color:C.lagna }}>
                  Select Lagna to see signs rotate:
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12, maxWidth:340 }}>
                  {SIGNS.map(s => (
                    <button key={s.num} onClick={() => setLagnaSign(s.num)}
                      style={{ padding:"3px 7px", fontSize:10, borderRadius:3, cursor:"pointer",
                        border: lagnaSign===s.num ? `2px solid ${C.lagna}` : `1px solid ${C.border}`,
                        background: lagnaSign===s.num ? C.hi : C.card,
                        color: lagnaSign===s.num ? C.lagna : C.mid,
                        fontWeight: lagnaSign===s.num ? 700 : 400,
                        transition:"all 0.15s" }}>
                      {s.sym} {s.name}
                    </button>
                  ))}
                </div>
                <KundliChart lagnaSign={lagnaSign} />
              </div>

              <div style={{ flex:1, minWidth:220 }}>
                <H3>The 5 core rules</H3>
                <ol style={{ paddingLeft:18, margin:0 }}>
                  {[
                    ["House positions are FIXED — signs move.","House 1 is always top-center. That never changes. What changes is which sign occupies it."],
                    ["Signs rotate clockwise from House 1.","The Lagna sign goes in H1. The next sign clockwise goes in H2 (top-right), and so on."],
                    ["Signs written as numbers 1–12.","Aries=1, Taurus=2 … Pisces=12. You'll see the number, not the name, in printed charts."],
                    ["Planets noted by abbreviations.","Su (Sun), Mo (Moon), Ma (Mars), Me (Mercury), Ju (Jupiter), Ve (Venus), Sa (Saturn), Ra (Rahu), Ke (Ketu)."],
                    ["Rahu & Ketu always opposite.","If Rahu is in H1, Ketu must be in H7. They are always 180° apart."],
                  ].map(([t,d],i) => (
                    <li key={i} style={{ marginBottom:10, fontSize:12, lineHeight:1.6, color:C.ink }}>
                      <strong>{t}</strong> {d}
                    </li>
                  ))}
                </ol>
                <H3>How to orient any new chart — 5 steps</H3>
                <ol style={{ paddingLeft:18, margin:0 }}>
                  {[
                    "Find House 1 (top-center). The number written there = Lagna sign.",
                    "House 2 (top-right) = Lagna sign + 1. Continue clockwise.",
                    "Assign all 12 signs to all 12 houses going clockwise.",
                    "Identify which house each planet falls in.",
                    "For each planet: note its sign (the sign of the house it sits in) and its house number.",
                  ].map((s,i) => (
                    <li key={i} style={{ marginBottom:7, fontSize:12, lineHeight:1.6, color:C.ink }}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>

            <H3>Opposite-house axis pairs</H3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:8, marginBottom:16 }}>
              {[
                ["1 ↔ 7","Self ↔ Partnership"],
                ["2 ↔ 8","Wealth ↔ Transformation / hidden assets"],
                ["3 ↔ 9","Courage / siblings ↔ Dharma / guru / father"],
                ["4 ↔ 10","Home / mother ↔ Career / public status"],
                ["5 ↔ 11","Children / creativity ↔ Gains / networks"],
                ["6 ↔ 12","Enemies / health ↔ Loss / liberation"],
              ].map(([axis,meaning]) => (
                <div key={axis} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:"8px 12px", fontSize:12 }}>
                  <span style={{ fontWeight:700, color:C.lagna, marginRight:6 }}>{axis}</span>
                  <span style={{ color:C.mid }}>{meaning}</span>
                </div>
              ))}
            </div>

            <div style={{ background:C.hi, border:`1px solid ${C.hiBd}`, borderRadius:4, padding:"10px 14px", fontSize:12, color:C.hiTxt }}>
              <strong>Other styles (for reference only):</strong>{"  "}
              <strong>South Indian:</strong> Signs are fixed; Lagna moves. Common in Tamil Nadu, AP, Karnataka, Kerala.{"  "}
              <strong>Bengali:</strong> Similar to North Indian with minor box differences. Used in West Bengal and Odisha.
            </div>
          </Sec>

          {/* ── Phase 1: Foundations ──────────────────────────────────── */}
          <Sec id="foundations" title="Phase 1 — Absolute Foundations">
            <P>Before touching any chart, get these concepts down solidly. Don't skip this phase.</P>
            <H3>Core vocabulary</H3>
            <GridCards items={[
              { title:"9 Grahas (Planets)",        desc:"Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu" },
              { title:"12 Rashis (Signs)",          desc:"Aries (Mesh) through Pisces (Meen)" },
              { title:"12 Bhavas (Houses)",         desc:"1st house (self) through 12th house (liberation/moksha)" },
              { title:"27 Nakshatras",              desc:"Lunar mansions — Ashwini through Revati. Deeper layer beneath zodiac signs." },
              { title:"Lagna (Ascendant)",          desc:"The rising sign at birth — the most important point in the chart." },
              { title:"Exaltation (Uccha)",         desc:"The sign where a planet is at its strongest." },
              { title:"Debilitation (Neecha)",      desc:"The sign where a planet is at its weakest." },
              { title:"Own sign (Svastha)",         desc:"A planet placed in the sign it rules — a strong, comfortable placement." },
              { title:"Retrograde (Vakri)",         desc:"Planet appearing to move backward in the sky. Effect on charts is debated across traditions." },
              { title:"Atmakaraka",                 desc:"The planet with the highest degree in the chart. Represents the soul's karmic purpose." },
            ]} />
            <H3>The 12 Signs (Rashis)</H3>
            <DataTable
              headers={["#","Sanskrit","English","Symbol","Ruling Planet"]}
              rows={[
                ["1","Mesh","Aries","♈","Mars (Mangal)"],
                ["2","Vrishabh","Taurus","♉","Venus (Shukra)"],
                ["3","Mithun","Gemini","♊","Mercury (Budha)"],
                ["4","Kark","Cancer","♋","Moon (Chandra)"],
                ["5","Simha","Leo","♌","Sun (Surya)"],
                ["6","Kanya","Virgo","♍","Mercury (Budha)"],
                ["7","Tula","Libra","♎","Venus (Shukra)"],
                ["8","Vrischik","Scorpio","♏","Mars (Mangal)"],
                ["9","Dhanu","Sagittarius","♐","Jupiter (Guru)"],
                ["10","Makar","Capricorn","♑","Saturn (Shani)"],
                ["11","Kumbh","Aquarius","♒","Saturn (Shani)"],
                ["12","Meen","Pisces","♓","Jupiter (Guru)"],
              ]}
            />
            <H3>Planet abbreviations</H3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:7, marginBottom:16 }}>
              {PLANETS.map(p => (
                <div key={p.abbr} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:"6px 10px", fontSize:12 }}>
                  <span style={{ fontWeight:700, color:C.lagna, marginRight:5 }}>{p.abbr}</span>
                  <span style={{ color:C.ink }}>{p.name}</span>
                  <span style={{ color:C.muted, fontSize:10, marginLeft:4 }}>({p.hindi})</span>
                </div>
              ))}
            </div>
          </Sec>

          {/* ── Phase 2: Chart Reading ─────────────────────────────────── */}
          <Sec id="charts" title="Phase 2 — Reading the D1 Birth Chart">
            <P>Once foundations are set, learn to read the D1 (Janma Kundli) systematically. Follow this order.</P>
            {[
              ["1. Find the Lagna and its lord","The Lagna defines the chart's entire theme. Its ruling planet (Lagna lord) is one of the most important planets for that person."],
              ["2. Place all 9 planets","Note each planet's sign and house. A planet is described by both: e.g., 'Sun in Aries in the 4th house.'"],
              ["3. Learn planetary aspects (Drishti)","All planets aspect the 7th house from themselves. Mars additionally: 4th and 8th. Jupiter: 5th and 9th. Saturn: 3rd and 10th."],
              ["4. Understand house lordships","For a given Lagna, identify which planet rules each house. The 10th lord = career planet; 7th lord = marriage significator."],
              ["5. Assess planetary strength","Check: exaltation/debilitation, own sign, friend/enemy sign, combustion by Sun. Stronger planets deliver results more cleanly."],
              ["6. Apply Kendra-Trikona rule","Kendra houses (1,4,7,10) + Trikona houses (1,5,9) are the most powerful. Lords of these connecting = Raj Yoga."],
              ["7. Identify major Yogas","Raj Yoga (power/success), Dhana Yoga (wealth), Viparita Raj Yoga (success through adversity) are the main starting Yogas."],
            ].map(([title,desc]) => (
              <div key={title} style={{ display:"flex", gap:12, marginBottom:10, padding:"8px 12px",
                background:C.card, border:`1px solid ${C.border}`, borderRadius:4 }}>
                <div style={{ minWidth:160, fontWeight:700, fontSize:12, color:C.lagna, lineHeight:1.5 }}>{title}</div>
                <div style={{ flex:1, fontSize:12, color:C.ink, lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
            <H3>All 12 house meanings</H3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:7 }}>
              {HOUSE_INFO.map(h => (
                <div key={h.h} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:"7px 10px", fontSize:12 }}>
                  <span style={{ fontWeight:700, color:C.lagna, marginRight:5 }}>H{h.h}</span>
                  <span style={{ color:C.mid }}>{h.meaning}</span>
                </div>
              ))}
            </div>
          </Sec>

          {/* ── Phase 3: Dasha ────────────────────────────────────────── */}
          <Sec id="dasha" title="Phase 3 — Dasha System (Mahadasha & Antardasha)">
            <P>This is the heart of Jyotish timing predictions. The Vimshottari Dasha is a 120-year planetary timeline triggered by the Moon's Nakshatra at birth. Learn this before any other dasha system.</P>
            <H3>Vimshottari Dasha — 120-year cycle</H3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              {DASHAS.map(d => (
                <div key={d.planet} style={{ background:C.card, border:`1px solid ${C.border}`,
                  borderRadius:5, padding:"9px 14px", textAlign:"center", minWidth:76 }}>
                  <div style={{ fontWeight:700, fontSize:12, color:C.ink }}>{d.planet}</div>
                  <div style={{ fontSize:24, fontWeight:700, color:d.col, margin:"3px 0" }}>{d.years}</div>
                  <div style={{ fontSize:10, color:C.muted }}>years</div>
                </div>
              ))}
            </div>
            <div style={{ background:C.hi, border:`1px solid ${C.hiBd}`, borderRadius:4,
              padding:"10px 14px", marginBottom:16, fontSize:12, color:C.hiTxt }}>
              <strong>How the starting Dasha is determined:</strong> The Nakshatra the Moon occupied at birth determines which Dasha you're born into and how much of it remains. This is why exact birth time matters — even a few minutes can shift the Nakshatra.
            </div>
            <H3>The sub-period hierarchy</H3>
            <DataTable
              headers={["Level","Name","Notes"]}
              rows={[
                ["1","Mahadasha","Major period — sets the broad life theme (e.g., Jupiter Mahadasha = 16 years)"],
                ["2","Antardasha (Bhukti)","Sub-period within the Mahadasha — more specific area of life"],
                ["3","Pratyantar Dasha","Sub-sub-period — useful for event timing within months"],
                ["4","Sookshma Dasha","Even finer division — weeks/days"],
                ["5","Prana Dasha","Finest practical level"],
              ]}
            />
            <Card title="Key interpretation rules for Dasha periods" items={[
              "The Mahadasha planet's placement in D1 is the primary filter — exalted = easier period; debilitated = more challenging",
              "Cross-check the same planet in D9 (Navamsha) — debilitated in D1 but well-placed in D9 can still give good results",
              "The relationship between Mahadasha lord and Antardasha lord matters — friendly planets cooperate, enemies create friction",
              "Mahadasha sets the broad theme; an Antardasha must also support the event to trigger it",
              "Transits (Gochar) of Saturn and Jupiter over key houses confirm or modify Dasha timing",
            ]} />
            <H3>Other Dasha systems — learn after Vimshottari</H3>
            <GridCards items={[
              { title:"Yogini Dasha",         desc:"36-year cycle. Often used alongside Vimshottari to cross-confirm readings." },
              { title:"Ashtottari Dasha",     desc:"108-year cycle. Some traditions apply it to Rahu-dominated charts." },
              { title:"Char Dasha (Jaimini)", desc:"Sign-based rather than planet-based. Highly respected for event timing." },
              { title:"Kalachakra Dasha",     desc:"Based on Moon's Nakshatra pada. Considered very accurate but more complex." },
            ]} />
          </Sec>

          {/* ── Phase 4: Vargas ───────────────────────────────────────── */}
          <Sec id="vargas" title="Phase 4 — Divisional Charts (Vargas)">
            <P>The 16 main divisional charts (Shodasha Vargas) mathematically divide each sign to reveal specifics about individual life areas. Start with D9 and D10 before the others.</P>
            <DataTable
              headers={["Code","Name","Division","Primary Use"]}
              rows={VARGAS.map(v=>[v.code,v.name,v.div,v.use])}
              hiRow={row=>row[0]==="D9"||row[0]==="D10"}
            />
            <Card title="Navamsha (D9) — the second most important chart" items={[
              "Judges the actual delivery of any planet — strong in D1 but weak in D9 = underdelivers",
              "Vargottama planets (same sign in D1 and D9) are exceptionally powerful",
              "Cross-check every D1 interpretation against D9 before finalising it",
              "Reveals marriage timing and spouse characteristics",
              "Shows whether the soul's dharmic path is supported",
            ]} />
            <Card title="Dashamsha (D10) — career and professional life" items={[
              "The 10th house lord's condition in D10 shows career outcomes",
              "The D10 Lagna lord and the Atmakaraka planet are key significators",
              "Cross-reference D10 with D1 Dasha periods and transits for career timing",
            ]} />
          </Sec>

          {/* ── Phase 5: Advanced ─────────────────────────────────────── */}
          <Sec id="advanced" title="Phase 5 — Advanced Topics">
            <P>Once comfortable with Phases 1–4, these techniques add significant predictive depth.</P>
            <GridCards items={[
              { title:"Ashtakavarga",           desc:"A numerical scoring system (0–8 per house) for evaluating transit strength." },
              { title:"Jaimini Astrology",      desc:"A parallel system using Char Dasha and Karakas (7 special planet roles). Highly respected for accuracy." },
              { title:"KP Astrology",           desc:"Krishnamurti Paddhati — uses sublord theory. Very popular in South India for event timing." },
              { title:"Nadi Astrology",         desc:"Reading from ancient palm leaf manuscripts. Requires knowing your Naadi Amsha." },
              { title:"Prashna (Horary)",       desc:"Answering a question based on the exact moment it is asked, without needing a birth chart." },
              { title:"Muhurta",                desc:"Selecting auspicious timing — marriage, business launches, surgeries, property purchase." },
              { title:"Varshaphala",            desc:"The annual solar return chart. Analysed each year to understand that year's major themes." },
              { title:"Sade Sati",              desc:"Saturn's ~7.5-year transit across 3 signs including the Moon sign. A period of testing and transformation." },
            ]} />
          </Sec>

          {/* ── YouTube ───────────────────────────────────────────────── */}
          <Sec id="youtube" title="YouTube Channels">
            <H3>Tier 1 — Best for beginners</H3>
            <ResourceCard name="Ryan Kurczak (Asheville Vedic Astrology)" rating={5}
              pros={["52 free videos, 15+ hours — a complete structured course","Methodical, based on his book; calm teaching style, no hype"]}
              cons={["Videos are older, not frequently updated","Paid courses on his site are where the real depth is"]} />
            <ResourceCard name="KRSchannel (Kapiel Raaj)" rating={3}
              pros={["591K+ subscribers; huge library covering every planet-sign-house combination","Accessible, casual, great for quick lookups"]}
              cons={["Widely criticised for oversimplification and inaccuracies vs classical texts","Mixes Western and Vedic ideas without flagging it","Treat as a starting point only — verify against classical sources"]} />
            <ResourceCard name="Penny Farrow (Good Stars Jyotish)" rating={4}
              pros={["Thoughtful, traditional, spiritually grounded","Excellent for Nakshatras, mythology, and cultural context"]}
              cons={["Smaller library than KRS"]} />
            <H3>Tier 2 — Intermediate & specialty</H3>
            {[
              { name:"Komilla Sutton (BAVA)", rating:5, desc:"One of the most respected Western Jyotish teachers. Excellent for Nakshatras and structured learning. Much free content on YouTube." },
              { name:"PVR Narasimha Rao", rating:5, desc:"Very technical, academically rigorous. Creator of the free JHora software. Best for those who want the classical textual basis." },
              { name:"Sanjay Rath", rating:4, desc:"One of the most respected living Jyotishis globally. Deep classical knowledge. Content assumes prior knowledge — not for beginners." },
              { name:"Hindi-language channels", rating:4, desc:"Dozens of excellent free channels in Hindi. Search: 'Kundli parhna seekho' or 'jyotish ke mool siddhant'." },
            ].map(ch => (
              <div key={ch.name} style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:4, padding:"10px 14px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontWeight:700, fontSize:13, color:C.ink }}>{ch.name}</span>
                  <span style={{ color:C.accent, letterSpacing:1 }}>{"★".repeat(ch.rating)}{"☆".repeat(5-ch.rating)}</span>
                </div>
                <p style={{ margin:0, fontSize:12, color:C.mid, lineHeight:1.6 }}>{ch.desc}</p>
              </div>
            ))}
          </Sec>

          {/* ── Websites ─────────────────────────────────────────────── */}
          <Sec id="websites" title="Free Websites & Online Tools">
            <H3>Chart generation (all free)</H3>
            <DataTable
              headers={["Site","What it does well"]}
              rows={[
                ["AstroSage.com","Most popular Indian site; generates Kundli, all vargas, Dasha table; Hindi & English"],
                ["Astromitra.com","All 16 divisional charts free; uses Swiss Ephemeris (NASA-grade accuracy)"],
                ["ProKerala.com","Clean Vimshottari Dasha calculator with good explanations"],
                ["Mahadasha.com","Focused specifically on Dasha and Antardasha calculations"],
                ["AppliedJyotish.com","Detailed Dasha calculator with Pratyantar Dasha levels"],
                ["Nakshamastro.com","Free D9 and D10 generator with Vargottama detection"],
                ["VedicAstrologer.org","Home of JHora software; free articles by PVR Narasimha Rao"],
              ]}
            />
            <H3>Learning articles</H3>
            <DataTable
              headers={["Site","Best for"]}
              rows={[
                ["MyKundliAI.com/blog","Clear beginner roadmaps and concept explanations"],
                ["Vedaayan.com","Mahadasha/Antardasha explanations with worked examples"],
                ["DashaClub.com","Vedic vs Western breakdowns, sign calculators"],
                ["AstroJagriti.substack.com","Traditional learning philosophy, book lists, free ebook links"],
              ]}
            />
            <Card title="Free e-books (legitimate)" items={[
              "PVR Narasimha Rao's Free Vedic Astrology E-book — vedicastrologer.org — best free modern text",
              "BV Raman's 'Astrology for Beginners' — archive.org — classic Indian foundational text",
              "Brihat Parashara Hora Shastra — archive.org — free English translation of the root classical text",
            ]} />
          </Sec>

          {/* ── Software ─────────────────────────────────────────────── */}
          <Sec id="software" title="Free Software">
            <ResourceCard name="Jagannatha Hora (JHora)" badge="Free" sub="Windows" url="vedicastrologer.org" rating={5}
              pros={["Gold standard of free Vedic astrology software — professionals use this","Generates all 16 divisional charts, all dasha systems, Ashtakavarga, transits","Created by PVR Narasimha Rao"]}
              cons={["Windows only (runs on Mac via Parallels or Wine)","Interface looks dated","Steep initial learning curve"]} />
            <ResourceCard name="Maitreya's Dream" badge="Free" sub="Linux / Mac / Windows" url="saravali.sourceforge.net" rating={3}
              pros={["Open-source; cross-platform","Supports Vedic, Western, and KP systems"]}
              cons={["Less feature-rich than JHora for Vedic-specific work"]} />
            <ResourceCard name="Drik Panchang" badge="Free" sub="Browser — no download" url="drikpanchang.com" rating={4}
              pros={["No download needed; excellent for Panchang (daily almanac) and Muhurta"]}
              cons={["Not designed for deep chart analysis"]} />
            <ResourceCard name="AstroSage Kundli" badge="Free" sub="Android / iOS" url="astrosage.com" rating={3}
              pros={["Good free chart generator on the go; all vargas and Dasha table"]}
              cons={["Ad-heavy; aggressively pushes paid consultations"]} />
          </Sec>

          {/* ── Books ────────────────────────────────────────────────── */}
          <Sec id="books" title="Books">
            <H3>Free / freely available</H3>
            {[
              { title:"Astrology for Beginners", author:"B.V. Raman", where:"Free at archive.org", badge:"Free", rating:5, note:"The classic Indian starting point. Clear, structured, with examples. Raman is considered one of the 20th century's greatest Jyotishis." },
              { title:"Fundamentals of Vedic Astrology", author:"Bepin Behari", where:"Free PDF", badge:"Free", rating:4, note:"Combines spiritual and technical. Good for understanding why the rules exist." },
              { title:"PVR Narasimha Rao's Free E-book", author:"PVR Narasimha Rao", where:"vedicastrologer.org", badge:"Free", rating:5, note:"Concise, modern, technically careful. Best free text for learning software-aided Jyotish." },
              { title:"Brihat Parashara Hora Shastra", author:"Attributed to Sage Parashara", where:"archive.org", badge:"Free", rating:5, note:"The root classical text. Not beginner-friendly but invaluable as a reference." },
            ].map(b => <ResourceCard key={b.title} name={b.title} badge={b.badge} sub={`${b.author} · ${b.where}`} rating={b.rating} pros={[b.note]} />)}

            <H3>Paid books worth buying</H3>
            {[
              { title:"The Art and Science of Vedic Astrology (Vol. 1 & 2)", author:"Ryan Kurczak & Richard Fish", price:"~₹1,500–2,000 / $20–25", rating:5, note:"The most recommended beginner-to-intermediate textbook. Structured like a course. Goodreads: 4.27/5." },
              { title:"The Essentials of Vedic Astrology", author:"Komilla Sutton", price:"~₹1,200–1,800", rating:5, note:"Excellent for signs, houses, planets, nakshatras. Goodreads: 4.31/5. Well-loved by both Indian and Western students." },
              { title:"Light on Life", author:"Hart de Fouw & Robert Svoboda", price:"~₹2,000–3,000", rating:5, note:"The most comprehensive English-language Jyotish textbook. Dense but thorough." },
              { title:"Astrology of the Seers", author:"David Frawley", price:"~₹1,000–1,500", rating:4, note:"A well-respected bridge between Vedic philosophy and astrology; very readable." },
              { title:"Path of Light (Vol. 1 & 2)", author:"James Kelleher", price:"~₹2,500–3,500", rating:4, note:"Deep treatment of Nakshatras with traditional artwork. Praised by David Frawley." },
              { title:"Crux of Vedic Astrology: Timing of Events", author:"Sanjay Rath", price:"~₹2,000–3,000", rating:5, note:"Best book in English on dasha systems and event timing. For intermediate+ students only." },
              { title:"Learn Think and Predict Through Astrology", author:"Prof. Arora", price:"~₹400–600", rating:3, note:"Budget-friendly, practical Indian perspective. 60% five-star reviews on Goodreads." },
            ].map(b => <ResourceCard key={b.title} name={b.title} badge="Paid" sub={`${b.author} · ${b.price}`} rating={b.rating} pros={[b.note]} />)}
          </Sec>

          {/* ── Paid Courses ─────────────────────────────────────────── */}
          <Sec id="courses" title="Paid Courses Worth Considering">
            <P>Do free resources first. These are for when you've completed Phase 1 and want structured progression.</P>
            {[
              { name:"Asheville Vedic Astrology — Ryan Kurczak", url:"ashevillevedicastrology.com", price:"~$42 per topic course", note:"Audio/video download courses. Navamsha + Dashamsha course is particularly good. Best Western-produced paid content available." },
              { name:"Komilla Sutton's School", url:"komillasutton.com", price:"Expensive — certificate programs", note:"Certificate programs. Thorough for those wanting a formal credential." },
              { name:"Sanjay Rath's Courses (SJC)", url:"sjc.org.in", price:"Varies", note:"For advanced students only. Highly technical and traditional. Not beginner-appropriate." },
              { name:"Udemy — Kundli Mastery (Astro Arun Pandit)", url:"udemy.com", price:"~₹500–1,500 on sale", note:"Covers foundations through Mahadasha/Antardasha with case studies. Always check recent reviews before buying." },
              { name:"BAVA (Bharat Astro Veda Academy)", url:"bharatastroveda.com", price:"Varies", note:"Live weekly classes. Covers Nakshatras, Dasha systems, D9/D10. 12 months access to recordings. Requires Phase 1 completion." },
            ].map(c => (
              <div key={c.name} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:"10px 14px", marginBottom:10 }}>
                <div style={{ fontWeight:700, fontSize:13, color:C.ink }}>{c.name}</div>
                <div style={{ fontSize:11, color:C.muted, margin:"2px 0 5px" }}>
                  <span style={{ marginRight:8, padding:"2px 7px", borderRadius:10, fontSize:10, fontWeight:700,
                    background:C.paidBg, color:C.paidTxt, border:`1px solid ${C.paidBd}` }}>Paid</span>
                  {c.url} · {c.price}
                </div>
                <p style={{ margin:0, fontSize:12, color:C.mid, lineHeight:1.6 }}>{c.note}</p>
              </div>
            ))}
          </Sec>

          {/* ── Communities ──────────────────────────────────────────── */}
          <Sec id="community" title="Communities to Join">
            <GridCards items={[
              { title:"r/vedicastrology (Reddit)",           desc:"Active community; good for chart questions, book recommendations, community-vetted resource threads." },
              { title:"r/astrology (Reddit)",                desc:"Larger but mostly Western. Useful for comparison and vocabulary overlap." },
              { title:"Vedic Astrology Students (Facebook)",  desc:"Large, active group for beginners and intermediate students." },
              { title:"Jyotish — Vedic Astrology (Facebook)", desc:"More classical-focused discussions. Good for intermediate learners." },
              { title:"LightOnVedicAstrology.com",           desc:"Older phpBB forum but a gold mine of serious discussion. Well-maintained book recommendation thread." },
              { title:"AstroSage Forums",                    desc:"Large Indian community. Hindi and English discussions." },
              { title:"Good Stars Jyotish (Substack)",       desc:"By Michelle R. Dean. Traditional, thoughtful, free tier available." },
              { title:"Jyotiṣa by Pt. Katti Narahari",      desc:"1,000+ subscribers. Traditional approach. Free tier available." },
            ]} />
          </Sec>

          {/* ── Red Flags ────────────────────────────────────────────── */}
          <Sec id="redflags" title="⚠ Red Flags & Honest Negatives">
            <P>These are real issues drawn from community discussions, Trustpilot reviews, and academic context. Go in with eyes open.</P>
            <Card warn title="About the subject itself" items={[
              "No scientific validation — astrology as a predictive system has not passed controlled double-blind studies.",
              "Interpretation varies wildly — two experienced Jyotishis can read the same chart and give completely different predictions.",
              "Birth time dependency — errors of even 2–4 minutes can change the Lagna, shift Navamsha placements, and alter Dasha start times.",
              "The '80–90% accuracy' claim seen on websites is unverifiable marketing. No systematic research supports it.",
            ]} />
            <Card warn title="About specific resources" items={[
              "KRSchannel: widely popular but criticised for oversimplification and mixing Western/Vedic ideas without flagging it. Good to start; verify against classical sources.",
              "Paid consultation platforms (AstroTalk, ClickAstro): ClickAstro has a 2.3/5 Trustpilot average with complaints about vague auto-generated reports and upselling.",
              "Computerised Kundli reports: auto-generated text applies cookbook interpretations without understanding the full chart as a system.",
              "YouTube 'sign/Lagna readings': general readings cannot account for your individual chart. They are entertainment, not personal astrology.",
              "'Free' courses that funnel to consultations: many channels use free content to push expensive one-on-one sessions.",
            ]} />
            <Card warn title="About the learning process" items={[
              "It takes years, not weeks — serious practitioners say 3–5 years of dedicated study before reading charts with real confidence.",
              "The 'guru problem' — traditional Jyotish was transmitted guru-to-student. Self-study can take you far, but some interpretations need a teacher.",
              "Different schools disagree on basics — Parashari vs Jaimini differ significantly. KP astrology contradicts some classical Parashari rules.",
            ]} />
          </Sec>

          {/* ── Study Plan ───────────────────────────────────────────── */}
          <Sec id="studyplan" title="Suggested Weekly Study Plan">
            <H3>Month 1 — Foundations</H3>
            <WeekRow label="Week 1" text="Watch Ryan Kurczak's free YouTube course, episodes 1–12. Learn the 9 planets, 12 signs, 12 houses, and the North Indian chart layout." />
            <WeekRow label="Week 2" text="Continue episodes 13–26. Learn Lagna, planetary dignities (exaltation, debilitation, own sign), and basic house meanings." />
            <WeekRow label="Week 3" text="Read BV Raman's 'Astrology for Beginners' (free at archive.org) alongside the videos. Focus on chapters 1–5." />
            <WeekRow label="Week 4" text="Generate your own Kundli on AstroSage or Astromitra (North Indian style). Identify every planet — its sign, house, and whether it's exalted or debilitated." />

            <H3>Month 2 — Reading Charts</H3>
            <WeekRow label="Weeks 5–6" text="Learn planetary aspects (Drishti). Practice on your own chart and 2–3 family members' charts." />
            <WeekRow label="Week 7" text="Study Yogas — start with Raj Yoga and Dhana Yoga. Watch KRS or Ryan Kurczak videos and verify rules against classical sources." />
            <WeekRow label="Week 8" text="Learn Nakshatras. Read Komilla Sutton's Essentials or watch her YouTube videos. Treat this week as an introduction." />

            <H3>Month 3 — Dasha Systems</H3>
            <WeekRow label="Weeks 9–10" text="Study Vimshottari Dasha deeply. Calculate your current Mahadasha and Antardasha using ProKerala or AppliedJyotish." />
            <WeekRow label="Week 11" text="Cross-reference your Dasha timeline against significant past events in your life. This is the single best learning exercise available." />
            <WeekRow label="Week 12" text="Begin reading PVR Narasimha Rao's free e-book for a more technical treatment of everything covered so far." />

            <H3>Month 4 — Divisional Charts</H3>
            <WeekRow label="Weeks 13–14" text="Study Navamsha (D9) exclusively. Learn what Vargottama means. Check your own D9 using Astromitra or JHora." />
            <WeekRow label="Week 15" text="Study Dashamsha (D10). Correlate its indications against your career timeline." />
            <WeekRow label="Week 16" text="Join r/vedicastrology and practice reading other people's charts for community feedback." />

            <div style={{ background:C.head, color:C.headText, borderRadius:5, padding:"14px 18px", marginTop:20, fontSize:12, lineHeight:1.75 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.accent, marginBottom:8 }}>Ongoing habits</div>
              <ul style={{ margin:0, paddingLeft:18 }}>
                {[
                  "Download JHora software — use it for all chart calculations once you're past the basics",
                  "Read one chapter of the BPHS (Brihat Parashara Hora Shastra) per week",
                  "Participate in community discussions — reading others' questions accelerates learning",
                  "Keep a prediction journal — note your predictions and verify them over time",
                ].map((t,i) => <li key={i} style={{ marginBottom:5 }}>{t}</li>)}
              </ul>
            </div>

            <div style={{ marginTop:24, padding:"12px 16px", border:`1px solid ${C.border}`,
              borderRadius:4, fontSize:12, fontStyle:"italic", color:C.muted,
              lineHeight:1.75, fontFamily:"Georgia,serif" }}>
              Jyotish is vast — even professional astrologers with decades of experience describe themselves as perpetual students. Progress over perfection.
            </div>
          </Sec>

        </main>
      </div>

      {/* ── Global styles ─────────────────────────────────────────────── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.scrollThumb}; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: ${C.scrollTrack}; }

        .mob-btn { display: none !important; }

        @media (max-width: 660px) {
          .mob-btn { display: block !important; }
          .sidebar {
            position: fixed !important;
            top: 55px !important;
            left: 0 !important;
            height: calc(100vh - 55px) !important;
            width: 220px !important;
            min-width: 220px !important;
            background: ${C.sidebarMobBg} !important;
            border-right: 1px solid ${C.border} !important;
            z-index: 160;
            transform: translateX(-100%);
            transition: transform 0.22s ease;
            overflow-y: auto !important;
          }
          .sidebar.is-open { transform: translateX(0); }
        }
      `}</style>
    </div>
    </ThemeCtx.Provider>
  );
}
