// Page components for PSTN
const { useState: useStateP, useEffect: useEffectP } = React;

function ProductCard({ p, onOpen, onQuickAdd }) {
  const { total, low } = stockSummary(p);
  return (
    <article className="card" onClick={() => onOpen(p)}>
      {p.tag && <div className={"card-tag " + (p.tag === "LOW" ? "low" : "")}>{p.tag === "LOW" ? "Low Stock" : "New"}</div>}
      <div className="card-media">
        <Placeholder silhouette label={p.label} />
        <div className="card-quickadd">
          <button onClick={(e) => { e.stopPropagation(); onQuickAdd(p, "M"); }}>+ Add — M</button>
          <button onClick={(e) => { e.stopPropagation(); onOpen(p); }}>Quick Look</button>
        </div>
      </div>
      <div className="card-meta">
        <div>
          <div className="card-title">{p.name}</div>
          <div className="card-sub">{p.sub} · {p.color}</div>
        </div>
        <div className="card-price">${p.price}</div>
      </div>
    </article>
  );
}

function Home({ setPage, openProduct, addToCart, heroVariant }) {
  const goShop = () => setPage("shop");
  return (
    <div>
      {heroVariant === "editorial" && <HeroEditorial goShop={goShop} />}
      {heroVariant === "brutalist" && <HeroBrutalist goShop={goShop} />}
      {heroVariant === "drop" && <HeroDrop goShop={goShop} />}

      <div className="section-head">
        <span className="left">Index / 06 pieces</span>
        <h2>The <em>drop</em></h2>
        <span className="right">Service Issue — 02</span>
      </div>
      <div className="product-grid" style={{ "--cols": 3 }}>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={openProduct} onQuickAdd={addToCart} />
        ))}
      </div>

      <div className="section-head">
        <span className="left">Editorial / 02</span>
        <h2><em>Field</em> notes</h2>
        <span className="right">Studio + Process</span>
      </div>
      <div className="edit-strip">
        <div>
          <Placeholder label="LK.002 — STUDIO / 4:5" />
          <div className="eyebrow">Process — 04.2026</div>
          <h3>500GSM, twin-needle, garment-dyed.</h3>
          <p>Sixteen weeks from sketch to seam. The weight tells you everything you need to know — pick one up. We work with a single mill outside Porto on a quarterly cadence; small runs, considered fabrics, no compromise on the finish.</p>
          <button className="btn" style={{ alignSelf: "flex-start" }}>Read the field note →</button>
        </div>
        <div>
          <Placeholder silhouette label="LK.005 — LOCATION / 4:5" />
          <div className="eyebrow">Lookbook — Service Issue</div>
          <h3>Garments for routine, weather, repair.</h3>
          <p>Photographed in late February near the studio. Pieces shown on Léon and Marie; sized true to label. Conditions: cold, intermittent rain, brick light.</p>
          <button className="btn" style={{ alignSelf: "flex-start" }} onClick={() => setPage("lookbook")}>View the lookbook →</button>
        </div>
      </div>
    </div>
  );
}

function Shop({ openProduct, addToCart }) {
  const [filter, setFilter] = useStateP("all");
  const filtered = PRODUCTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "hoodies") return p.silhouette !== "Half-zip";
    if (filter === "qzips") return p.silhouette === "Half-zip";
    return true;
  });
  return (
    <div>
      <div className="plp-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Shop / Drop 02</div>
          <h1>The <em>collection</em></h1>
        </div>
        <div className="plp-filters">
          <span style={{ color: "var(--char)" }}>Filter:</span>
          <span className={"chip " + (filter === "all" ? "is-on" : "")} onClick={() => setFilter("all")}>All — {PRODUCTS.length}</span>
          <span className={"chip " + (filter === "hoodies" ? "is-on" : "")} onClick={() => setFilter("hoodies")}>Hoodies</span>
          <span className={"chip " + (filter === "qzips" ? "is-on" : "")} onClick={() => setFilter("qzips")}>Quarter-Zips</span>
          <span style={{ color: "var(--char)", marginLeft: 16 }}>Sort:</span>
          <span className="chip">Newest ↓</span>
        </div>
      </div>
      <div className="product-grid" style={{ "--cols": 3 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={openProduct} onQuickAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}

function SizeGuideModal({ onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Reference — Hoodies & Quarter-Zips</div>
        <h3><em>Size guide.</em></h3>
        <p style={{ color: "var(--char)", fontSize: 14, lineHeight: 1.55, maxWidth: "52ch" }}>
          Measurements taken flat, garment laid out. Pastion pieces are cut for a boxed, relaxed fit —
          size down for a closer silhouette, size up for the intended drop.
        </p>
        <table className="size-table">
          <thead>
            <tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th><th>Sleeve (cm)</th><th>Shoulder (cm)</th></tr>
          </thead>
          <tbody>
            <tr><td>XS</td><td>104</td><td>66</td><td>62</td><td>52</td></tr>
            <tr><td>S</td><td>110</td><td>68</td><td>63</td><td>54</td></tr>
            <tr><td>M</td><td>116</td><td>70</td><td>64</td><td>56</td></tr>
            <tr><td>L</td><td>122</td><td>72</td><td>65</td><td>58</td></tr>
            <tr><td>XL</td><td>128</td><td>74</td><td>66</td><td>60</td></tr>
            <tr><td>XXL</td><td>134</td><td>76</td><td>67</td><td>62</td></tr>
          </tbody>
        </table>
        <p style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--stone)", marginTop: 18 }}>
          Model wears M / 184cm / 78kg
        </p>
      </div>
    </div>
  );
}

function PDP({ product, addToCart, goBack }) {
  const [size, setSize] = useStateP(null);
  const [colorIdx, setColorIdx] = useStateP(0);
  const [showGuide, setShowGuide] = useStateP(false);
  const sel = product.sizes.find((x) => x.s === size);
  const lowStock = sel && sel.stock > 0 && sel.stock <= 4;
  const oos = sel && sel.stock === 0;

  function handleAdd() {
    if (!size) {
      alert("Please select a size.");
      return;
    }
    if (oos) return;
    addToCart(product, size);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 16, padding: "20px var(--gutter)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--char)" }}>
        <a href="#" onClick={(e) => { e.preventDefault(); goBack(); }}>← Shop</a>
        <span>/</span>
        <span>{product.silhouette === "Half-zip" ? "Quarter-Zips" : "Hoodies"}</span>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>
      <div className="pdp">
        <div className="pdp-gallery">
          <Placeholder silhouette label={`${product.label} — FRONT`} />
          <Placeholder silhouette label={`${product.label} — BACK`} />
          <Placeholder label={`${product.label} — DETAIL`} />
          <Placeholder silhouette label={`${product.label} — ON BODY`} />
        </div>
        <div className="pdp-info">
          <div>
            <div className="eyebrow">{product.label}</div>
            <h1 className="pdp-title" style={{ marginTop: 8 }}>{product.name.split(" ").slice(0, -1).join(" ")} <em>{product.name.split(" ").slice(-1)[0]}</em></h1>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14 }}>
              <span className="pdp-price">${product.price} USD</span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--char)" }}>4 interest-free of ${Math.round(product.price / 4)}</span>
            </div>
          </div>

          <div className="pdp-section">
            <h4><span>Color — {product.color}</span></h4>
            <div className="color-row">
              {product.swatches.map((c, i) => (
                <span
                  key={i}
                  className={"swatch " + (colorIdx === i ? "is-on" : "")}
                  style={{ background: c }}
                  onClick={() => setColorIdx(i)}
                />
              ))}
            </div>
          </div>

          <div className="pdp-section">
            <h4>
              <span>Size {size && `— ${size}`}</span>
              <button onClick={() => setShowGuide(true)}>Size Guide ↗</button>
            </h4>
            <div className="size-row">
              {product.sizes.map((sz) => (
                <button
                  key={sz.s}
                  className={"size-btn " + (size === sz.s ? "is-on " : "") + (sz.stock === 0 ? "is-oos" : "")}
                  onClick={() => sz.stock > 0 && setSize(sz.s)}
                  disabled={sz.stock === 0}
                >{sz.s}</button>
              ))}
            </div>
            {sel && (
              <div className={"pdp-stock " + (lowStock ? "low" : "")} style={{ marginTop: 14 }}>
                <div className="bar"><i style={{ width: `${Math.min(100, sel.stock * 8)}%` }}></i></div>
                <span>{oos ? "Sold out" : lowStock ? `Only ${sel.stock} left` : `In stock`}</span>
              </div>
            )}
          </div>

          <button className="btn btn-solid btn-block" onClick={handleAdd}>
            {oos ? "Sold Out — Notify Me" : "Add to Cart — $" + product.price}
          </button>

          <div>
            <details className="accordion" open>
              <summary><span>Description</span><span className="sym">+</span></summary>
              <div className="body">
                <p>
                  The {product.name} is constructed from 500GSM brushed loopback cotton,
                  garment-dyed for a softened hand and a deep, even saturation that wears in slowly.
                  Cut for a boxed, relaxed silhouette with a dropped shoulder and twin-needle finish at every seam.
                </p>
              </div>
            </details>
            <details className="accordion">
              <summary><span>Composition & Care</span><span className="sym">+</span></summary>
              <div className="body">
                <dl className="spec-row">
                  <dt>Composition</dt><dd>100% Organic Cotton</dd>
                  <dt>Weight</dt><dd>500 GSM</dd>
                  <dt>Construction</dt><dd>Loopback, brushed</dd>
                  <dt>Dye</dt><dd>Garment-dyed</dd>
                  <dt>Care</dt><dd>30°C — Inside out</dd>
                  <dt>Origin</dt><dd>Made in Portugal</dd>
                </dl>
              </div>
            </details>
            <details className="accordion">
              <summary><span>Shipping & Returns</span><span className="sym">+</span></summary>
              <div className="body">
                <p>Complimentary worldwide shipping on orders over $200. Standard delivery 3–5 business days within North America, 5–9 internationally.</p>
                <p>30-day returns on unworn items. Initiate via your account.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
      {showGuide && <SizeGuideModal onClose={() => setShowGuide(false)} />}
    </div>
  );
}

function Lookbook() {
  return (
    <div>
      <div className="lookbook-hero">
        <h1>Service<br /><em>Issue.</em></h1>
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Lookbook / Drop 02 — Spring 2026</div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--char)", maxWidth: "44ch" }}>
            Photographed over three days in late February. Léon and Marie wear the
            full edition across the studio, the laundromat, and a deserted lot south of the river.
            Light: overcast, mid-morning.
          </p>
          <div style={{ marginTop: 24, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--char)" }}>
            Photography — Adèle Marin<br />
            Styling — Pastion Studio<br />
            Location — Lisbon, PT
          </div>
        </div>
      </div>
      <div className="lookbook-grid">
        <div className="lk-1"><Placeholder silhouette label="LK.01" /><div className="lk-caption">P.HOOD.001 — BONE</div></div>
        <div className="lk-2"><Placeholder label="LK.02" /><div className="lk-caption">Detail — Loopback</div></div>
        <div className="lk-3"><Placeholder silhouette label="LK.03" /><div className="lk-caption">P.QZIP.002 — ASH</div></div>
        <div className="lk-4"><Placeholder silhouette label="LK.04" /><div className="lk-caption">P.HOOD.003 — COAL</div></div>
        <div className="lk-5"><Placeholder label="LK.05" /><div className="lk-caption">Studio — Composition</div></div>
        <div className="lk-6"><Placeholder silhouette label="LK.06" /><div className="lk-caption">P.QZIP.004 — TOBACCO</div></div>
        <div className="lk-7"><Placeholder silhouette label="LK.07" /><div className="lk-caption">P.HOOD.005 — CARBON</div></div>
        <div className="lk-8"><Placeholder silhouette label="LK.08" /><div className="lk-caption">Full edition — Group</div></div>
      </div>
      <div className="section-head">
        <span className="left">Index — 08 frames</span>
        <h2>Shop the <em>edition</em></h2>
        <span className="right">All 06 pieces available</span>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>About — Pastion Studio</div>
          <h1>Slow garments<br />for <em>everyday</em><br />practice.</h1>
        </div>
        <div>
          <p className="about-lede">
            Pastion is a small studio working between streetwear and ready-to-wear —
            considered hoodies and quarter-zips, made quarterly in limited editions.
          </p>
          <p>
            We started Pastion in 2024 with a single question: what would it look like to make
            the basics we couldn't find anywhere — heavy, honest, intentional pieces sized for
            real bodies and built to outlast a season. The answer is a four-times-a-year drop,
            six pieces at a time, sewn at a family mill in northern Portugal we've worked with
            since the beginning.
          </p>
          <p>
            No prints. No logos pasted on. The only branding is a small embroidered wordmark
            at the cuff and the weight of the cloth in your hand. We don't restock most pieces —
            when a drop is gone, it's archive.
          </p>
        </div>
      </div>
      <div className="about-pillars">
        <div>
          <span className="num">01</span>
          <h3>Made <em>slowly</em>.</h3>
          <p>Each drop takes sixteen weeks from sketch to seam. Single mill, single dye-house, no rushed lots. The pieces show it.</p>
        </div>
        <div>
          <span className="num">02</span>
          <h3>Made <em>well</em>.</h3>
          <p>500 GSM brushed loopback, twin-needle construction, reinforced cuffs and hems. The kind of build that survives a hundred wears and a hundred washes.</p>
        </div>
        <div>
          <span className="num">03</span>
          <h3>Made <em>once</em>.</h3>
          <p>Six pieces per drop. Limited allocation. When it's gone, it's gone. We'd rather sell out than discount.</p>
        </div>
      </div>
      <div className="about-timeline">
        <h2>The <em>record.</em></h2>
        <ul>
          <li>
            <span className="yr">2024 / 03</span>
            <span className="ttl"><em>Founding</em></span>
            <span className="desc">Pastion Studio incorporated. First samples cut in a borrowed Vancouver workshop.</span>
          </li>
          <li>
            <span className="yr">2024 / 09</span>
            <span className="ttl">Drop 01 — <em>First Issue</em></span>
            <span className="desc">Three hoodies, two quarter-zips, one tee. Sold through in eleven days.</span>
          </li>
          <li>
            <span className="yr">2025 / 02</span>
            <span className="ttl">Porto <em>partnership</em></span>
            <span className="desc">Long-term agreement with our mill. Move to 100% Portuguese construction.</span>
          </li>
          <li>
            <span className="yr">2025 / 11</span>
            <span className="ttl">Drop 04 — <em>Cold Issue</em></span>
            <span className="desc">Heavyweight winter capsule. First piece in our permanent archive: the Atelier Hoodie.</span>
          </li>
          <li>
            <span className="yr">2026 / 06</span>
            <span className="ttl">Drop 02 — <em>Service Issue</em></span>
            <span className="desc">Releasing 14 June. Six pieces. The drop you're looking at now.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

Object.assign(window, { Home, Shop, PDP, Lookbook, About, ProductCard });
