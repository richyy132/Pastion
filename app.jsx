// PSTN main app
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "palette": "warm",
  "typePair": "editorial",
  "density": "default"
}/*EDITMODE-END*/;

const PALETTE_OPTIONS = [
  ["#ffffff", "#0a0a0a", "#888888"],
  ["#f5f5f4", "#0a0a0a", "#737373"],
  ["#ebe6dd", "#1f1a14", "#a68a64"],
];
const PALETTE_KEYS = ["warm", "mono", "sand"];

function applyTheme(t) {
  const body = document.body;
  body.classList.remove("pal-warm", "pal-mono", "pal-sand");
  body.classList.add("pal-" + t.palette);
  body.classList.remove("type-editorial", "type-modern", "type-brutal");
  body.classList.add("type-" + t.typePair);
  body.classList.remove("dens-default", "dens-airy", "dens-compact");
  body.classList.add("dens-" + t.density);
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useStateA("home");
  const [activeProduct, setActiveProduct] = useStateA(null);
  const [cart, setCart] = useStateA([
    {
      lineId: "L1",
      id: "psn-001",
      name: "Atelier Hoodie",
      color: "Bone",
      size: "M",
      price: 245,
      qty: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useStateA(false);

  useEffectA(() => { applyTheme(tweaks); }, [tweaks.palette, tweaks.typePair, tweaks.density]);
  useEffectA(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  function openProduct(p) {
    setActiveProduct(p);
    setPage("pdp");
  }

  function addToCart(p, size = "M") {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id && x.size === size);
      if (existing) {
        return prev.map((x) => x === existing ? { ...x, qty: x.qty + 1 } : x);
      }
      return [
        ...prev,
        {
          lineId: "L" + Date.now(),
          id: p.id,
          name: p.name,
          color: p.color,
          size,
          price: p.price,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  }

  function updateQty(lineId, qty) {
    if (qty < 1) {
      setCart((prev) => prev.filter((x) => x.lineId !== lineId));
      return;
    }
    setCart((prev) => prev.map((x) => x.lineId === lineId ? { ...x, qty } : x));
  }
  function removeItem(lineId) {
    setCart((prev) => prev.filter((x) => x.lineId !== lineId));
  }

  function renderPage() {
    if (page === "home") return <Home setPage={setPage} openProduct={openProduct} addToCart={addToCart} heroVariant={tweaks.heroVariant} />;
    if (page === "shop") return <Shop openProduct={openProduct} addToCart={addToCart} />;
    if (page === "pdp" && activeProduct) return <PDP product={activeProduct} addToCart={addToCart} goBack={() => setPage("shop")} />;
    if (page === "lookbook") return <Lookbook />;
    if (page === "about") return <About />;
    if (page === "journal") {
      return (
        <div style={{ padding: "120px 28px", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Journal — Coming 14.06.2026</div>
          <h1 className="display" style={{ fontSize: 88 }}>Field notes <em>forthcoming.</em></h1>
        </div>
      );
    }
    return null;
  }

  // Map palette key <-> swatch array (TweakColor's value is the array itself)
  const palIdx = PALETTE_KEYS.indexOf(tweaks.palette);
  const palValue = PALETTE_OPTIONS[palIdx >= 0 ? palIdx : 0];

  return (
    <div>
      <Nav page={page} setPage={setPage} cart={cart} openCart={() => setCartOpen(true)} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero Variant" />
        <TweakRadio
          label="Layout"
          value={tweaks.heroVariant}
          onChange={(v) => { setTweak("heroVariant", v); if (page !== "home") setPage("home"); }}
          options={[
            { value: "editorial", label: "Editorial" },
            { value: "brutalist", label: "Grid" },
            { value: "drop", label: "Drop" },
          ]}
        />

        <TweakSection label="Palette" />
        <TweakColor
          label="Surface"
          value={palValue}
          options={PALETTE_OPTIONS}
          onChange={(v) => {
            const i = PALETTE_OPTIONS.findIndex((arr) => JSON.stringify(arr) === JSON.stringify(v));
            if (i >= 0) setTweak("palette", PALETTE_KEYS[i]);
          }}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Pairing"
          value={tweaks.typePair}
          onChange={(v) => setTweak("typePair", v)}
          options={[
            { value: "editorial", label: "Editorial" },
            { value: "modern", label: "Modern" },
            { value: "brutal", label: "Brutal" },
          ]}
        />

        <TweakSection label="Density" />
        <TweakRadio
          label="Spacing"
          value={tweaks.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "airy", label: "Airy" },
            { value: "default", label: "Default" },
            { value: "compact", label: "Compact" },
          ]}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
