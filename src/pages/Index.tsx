import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NOVELTIES = [
  {
    id: 1,
    title: "Бюст Артемиды",
    type: "Статуэтка",
    price: 2400,
    image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/d5168c41-434e-4679-8eec-3b6c63b66928.jpg",
    tag: "Новинка",
  },
  {
    id: 2,
    title: "Рука с лозой",
    type: "Кашпо",
    price: 1850,
    image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/5c125c43-e3ad-4d7b-a6ce-7e62f1bc7e5e.jpg",
    tag: "Новинка",
  },
  {
    id: 3,
    title: "Колонна-подсвечник",
    type: "Подсвечник",
    price: 1200,
    image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/221064f9-8dcc-41ce-a475-1552ac90a262.jpg",
    tag: "Хит",
  },
  {
    id: 4,
    title: "Торс Афродиты",
    type: "Статуэтка",
    price: 3200,
    image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/55305271-c137-4fdf-b7ef-afb6ffd67dd9.jpg",
    tag: "Новинка",
  },
];

const CATALOG = [
  { id: 1, title: "Голова Персефоны", type: "Статуэтка", price: 2800, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/d5168c41-434e-4679-8eec-3b6c63b66928.jpg" },
  { id: 2, title: "Ладонь с цветком", type: "Кашпо", price: 1650, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/5c125c43-e3ad-4d7b-a6ce-7e62f1bc7e5e.jpg" },
  { id: 3, title: "Дорический подсвечник", type: "Подсвечник", price: 980, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/221064f9-8dcc-41ce-a475-1552ac90a262.jpg" },
  { id: 4, title: "Силуэт Наяды", type: "Статуэтка", price: 3600, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/55305271-c137-4fdf-b7ef-afb6ffd67dd9.jpg" },
  { id: 5, title: "Бюст Артемиды", type: "Статуэтка", price: 2400, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/d5168c41-434e-4679-8eec-3b6c63b66928.jpg" },
  { id: 6, title: "Рука с лозой", type: "Кашпо", price: 1850, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/5c125c43-e3ad-4d7b-a6ce-7e62f1bc7e5e.jpg" },
  { id: 7, title: "Колонна двойная", type: "Подсвечник", price: 2200, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/221064f9-8dcc-41ce-a475-1552ac90a262.jpg" },
  { id: 8, title: "Торс Афродиты", type: "Статуэтка", price: 3200, image: "https://cdn.poehali.dev/projects/5e84085e-da6b-42e5-bcbf-34ad4596ec7c/files/55305271-c137-4fdf-b7ef-afb6ffd67dd9.jpg" },
];

const TYPES = ["Все", "Статуэтка", "Кашпо", "Подсвечник"];
const PRICE_RANGES = [
  { label: "Все цены", min: 0, max: Infinity },
  { label: "До 1 500 ₽", min: 0, max: 1500 },
  { label: "1 500 – 2 500 ₽", min: 1500, max: 2500 },
  { label: "От 2 500 ₽", min: 2500, max: Infinity },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function ColumnOrnament() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--marble-mid)]" />
      <div className="flex gap-1 items-end">
        {[16, 24, 32, 24, 16].map((h, i) => (
          <div key={i} style={{ height: h }} className="w-[2px] bg-[var(--gold-soft)] opacity-60 rounded-full" />
        ))}
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--marble-mid)]" />
    </div>
  );
}

function Header({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(248,246,242,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--marble-mid)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setActive("home")} className="flex flex-col items-start group">
          <span className="font-caps text-xl tracking-[0.3em] text-[var(--stone-deep)] leading-none">
            GYPSOS
          </span>
          <span className="font-body text-[9px] tracking-[0.25em] text-[var(--marble-dark)] uppercase mt-0.5">
            Античная мастерская
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`nav-link font-caps text-sm tracking-widest transition-colors ${
                active === item.id
                  ? "active text-[var(--stone-deep)]"
                  : "text-[var(--marble-dark)] hover:text-[var(--stone-deep)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-[var(--stone-deep)] transition-all ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--stone-deep)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--stone-deep)] transition-all ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[var(--marble-mid)]" style={{ background: "rgba(248,246,242,0.98)" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMenuOpen(false); }}
              className="block w-full text-left px-6 py-4 font-caps text-sm tracking-widest text-[var(--stone-deep)] border-b border-[var(--marble-light)]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HeroSection({ setActive }: { setActive: (s: string) => void }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % NOVELTIES.length);
  const prev = () => goTo((current - 1 + NOVELTIES.length) % NOVELTIES.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current]);

  const item = NOVELTIES[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden marble-bg">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 flex flex-col justify-between py-8 px-4 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-px bg-[var(--marble-mid)]" />
        ))}
        <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[var(--marble-mid)] to-transparent" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 flex flex-col justify-between py-8 px-4 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-px bg-[var(--marble-mid)]" />
        ))}
        <div className="absolute right-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[var(--marble-mid)] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-16 w-full pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-line" />
              <span className="font-caps text-xs tracking-[0.3em] text-[var(--gold-soft)] uppercase">
                Новинки коллекции
              </span>
            </div>

            <div key={current} className="animate-fade-up">
              <span className="inline-block font-caps text-[11px] tracking-[0.2em] text-[var(--marble-dark)] border border-[var(--marble-mid)] px-3 py-1 mb-4">
                {item.type}
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-[var(--stone-deep)] mb-4">
                {item.title}
              </h1>
              <p className="font-caps text-2xl tracking-widest text-[var(--gold-soft)] mb-8">
                {item.price.toLocaleString("ru")} ₽
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActive("catalog")}
                className="font-caps text-xs tracking-[0.2em] px-8 py-3.5 bg-[var(--stone-deep)] text-[var(--marble-white)] hover:bg-[var(--stone-mid)] transition-colors"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => setActive("contacts")}
                className="font-caps text-xs tracking-[0.2em] px-6 py-3.5 border border-[var(--marble-mid)] text-[var(--stone-deep)] hover:border-[var(--stone-deep)] transition-colors"
              >
                Связаться
              </button>
            </div>

            <div className="flex items-center gap-3 mt-10">
              {NOVELTIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 1,
                    background: i === current ? "var(--gold-soft)" : "var(--marble-mid)",
                  }}
                />
              ))}
              <div className="ml-4 flex gap-2">
                <button
                  onClick={prev}
                  className="w-8 h-8 border border-[var(--marble-mid)] flex items-center justify-center hover:border-[var(--stone-deep)] transition-colors text-[var(--stone-deep)]"
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 border border-[var(--marble-mid)] flex items-center justify-center hover:border-[var(--stone-deep)] transition-colors text-[var(--stone-deep)]"
                >
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border border-[var(--marble-mid)]" style={{ zIndex: 0 }} />
              <div
                key={`img-${current}`}
                className="relative overflow-hidden"
                style={{
                  width: "clamp(260px, 40vw, 420px)",
                  height: "clamp(320px, 50vw, 520px)",
                  opacity: animating ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                }}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 font-caps text-[10px] tracking-[0.2em] bg-[var(--stone-deep)] text-[var(--marble-white)] px-3 py-1.5">
                  {item.tag}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--marble-dark)]">Листайте</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--marble-mid)] to-transparent" />
      </div>
    </section>
  );
}

function CatalogSection() {
  const [activeType, setActiveType] = useState("Все");
  const [activePriceIdx, setActivePriceIdx] = useState(0);

  const filtered = CATALOG.filter((item) => {
    const typeOk = activeType === "Все" || item.type === activeType;
    const { min, max } = PRICE_RANGES[activePriceIdx];
    const priceOk = item.price >= min && item.price <= max;
    return typeOk && priceOk;
  });

  return (
    <section className="min-h-screen py-24 px-6 md:px-12" style={{ background: "var(--marble-white)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--gold-soft)]">
            Ручная работа · Белый гипс
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[var(--stone-deep)] mt-2 mb-3">
            Каталог
          </h2>
          <ColumnOrnament />
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`filter-btn ${activeType === t ? "active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {PRICE_RANGES.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setActivePriceIdx(i)}
                className={`filter-btn ${activePriceIdx === i ? "active" : ""}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[var(--marble-dark)] font-caps tracking-widest">
            Ничего не найдено
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <div key={item.id} className="product-card group cursor-pointer" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="overflow-hidden mb-3" style={{ aspectRatio: "3/4", background: "var(--marble-light)" }}>
                  <img src={item.image} alt={item.title} className="product-img w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--marble-dark)]">
                    {item.type}
                  </span>
                  <h3 className="font-display text-lg font-light text-[var(--stone-deep)] leading-tight mt-0.5">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-caps text-sm tracking-wider text-[var(--stone-deep)]">
                      {item.price.toLocaleString("ru")} ₽
                    </span>
                    <button className="font-caps text-[9px] tracking-[0.15em] text-[var(--marble-dark)] border-b border-[var(--marble-mid)] hover:text-[var(--stone-deep)] hover:border-[var(--stone-deep)] transition-colors pb-0.5">
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section className="py-24 px-6 md:px-12 marble-dark-bg min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-14">
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--gold-soft)]">
            Связаться с нами
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[var(--marble-white)] mt-2 mb-3">
            Контакты
          </h2>
          <ColumnOrnament />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-caps text-xs tracking-[0.3em] text-[var(--gold-soft)] uppercase mb-6">
              Реквизиты
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Организация", value: "ИП Иванова А.В." },
                { label: "ИНН", value: "770123456789" },
                { label: "ОГРН", value: "321774600123456" },
                { label: "Расчётный счёт", value: "40802810123456789012" },
                { label: "Банк", value: "АО «Тинькофф Банк»" },
                { label: "БИК", value: "044525974" },
              ].map((row) => (
                <li key={row.label} className="flex justify-between items-baseline border-b border-[rgba(255,255,255,0.06)] pb-3">
                  <span className="font-body text-xs text-[var(--marble-dark)] tracking-wide">{row.label}</span>
                  <span className="font-caps text-xs tracking-wider text-[var(--marble-light)]">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-caps text-xs tracking-[0.3em] text-[var(--gold-soft)] uppercase mb-6">
              Связь
            </h3>
            <ul className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "Email", value: "hello@gypsos.ru" },
                { icon: "Instagram", label: "Instagram", value: "@gypsos_art" },
                { icon: "MapPin", label: "Город", value: "Москва, работаем онлайн" },
              ].map((row) => (
                <li key={row.label} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(200,184,122,0.3)" }}
                  >
                    <Icon name={row.icon} size={14} className="text-[var(--gold-soft)]" fallback="CircleAlert" />
                  </div>
                  <div>
                    <div className="font-body text-[10px] text-[var(--marble-dark)] tracking-wider uppercase mb-0.5">
                      {row.label}
                    </div>
                    <div className="font-caps text-sm tracking-wider text-[var(--marble-light)]">
                      {row.value}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setActive }: { setActive: (s: string) => void }) {
  return (
    <footer
      className="py-8 px-6 border-t"
      style={{ background: "var(--stone-deep)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button onClick={() => setActive("home")}>
          <span className="font-caps text-sm tracking-[0.3em] text-[var(--marble-mid)]">GYPSOS</span>
        </button>

        <div className="flex items-center gap-6">
          {[
            { id: "home", label: "Главная" },
            { id: "catalog", label: "Каталог" },
            { id: "contacts", label: "Контакты" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="font-caps text-[10px] tracking-[0.2em] text-[var(--marble-dark)] hover:text-[var(--marble-light)] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <span className="font-body text-[10px] text-[var(--marble-dark)] tracking-wider">
          © {new Date().getFullYear()} GYPSOS. Все права защищены.
        </span>
      </div>
    </footer>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function Index() {
  const [active, setActive] = useState("home");

  const handleSetActive = (section: string) => {
    setActive(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--marble-white)" }}>
      <Header active={active} setActive={handleSetActive} />
      <main>
        {active === "home" && <HeroSection setActive={handleSetActive} />}
        {active === "catalog" && <CatalogSection />}
        {active === "contacts" && <ContactsSection />}
      </main>
      <Footer setActive={handleSetActive} />
    </div>
  );
}
