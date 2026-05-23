// Three hero variants for PSTN homepage
const { useState: useStateH, useEffect: useEffectH } = React;

function HeroEditorial({ goShop }) {
  return (
    <section className="hero-edit">
      <div className="hero-edit-left" data-comment-anchor="9612b28c1a-div-7-7">
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>Drop 02 / Service Issue</div>
          <h1 className="hero-edit-title">
            Considered<br />
            garments for<br />
            <em>uncommon</em> wear.
          </h1>
        </div>
        <div>
          <p style={{ maxWidth: "44ch", color: "var(--char)", fontSize: 15, lineHeight: 1.6 }}>
            A study in heavyweight loopback, brushed interiors, and patient construction.
            Six pieces. Limited run. Released the 14th of every quarter.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button className="btn btn-solid" onClick={goShop}>Shop the Drop →</button>
            <button className="btn">View Lookbook</button>
          </div>
          <dl className="hero-edit-meta">
            <div>
              <dt>Edition</dt>
              <dd>02 / IV — 2026</dd>
            </div>
            <div>
              <dt>Pieces</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>Made in</dt>
              <dd>Portugal</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>14.06.2026 — 00:00 PT</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="hero-edit-right">
        <div className="hero-tag"><span className="dot"></span> Live — Drop 02</div>
        <Placeholder
          silhouette
          glyph={<em>02</em>}
          label="P.HOOD.001 — STUDIO / FRONT / 4:5" />
        
      </div>
    </section>);

}

function HeroBrutalist({ goShop }) {
  return (
    <section className="hero-brut">
      <div className="hero-brut-title">
        <div className="row">
          <span>Pastion</span>
          <span className="hero-brut-sub">Drop 02 / Service Issue<br />Live 14.06.2026 — 00:00 PT</span>
        </div>
        <div className="row">
          <span style={{ fontStyle: "italic", fontFamily: "var(--f-display)", fontWeight: 400 }}>since 2024</span>
          <span>PSTN®</span>
        </div>
      </div>
      <div className="hero-brut-grid">
        <div><Placeholder silhouette label="P.HOOD.001 — BONE" /></div>
        <div><Placeholder silhouette label="P.QZIP.002 — ASH" /></div>
        <div><Placeholder silhouette label="P.HOOD.003 — COAL" /></div>
        <div><Placeholder silhouette label="P.QZIP.004 — TOBACCO" /></div>
      </div>
      <div className="hero-brut-foot">
        <span>06 PIECES — HEAVYWEIGHT — MADE IN PORTUGAL</span>
        <button className="btn btn-solid" onClick={goShop} style={{ padding: "12px 20px" }}>Shop the Drop →</button>
      </div>
    </section>);

}

function HeroDrop({ goShop }) {
  const [t, setT] = useStateH(diffTo());
  useEffectH(() => {
    const id = setInterval(() => setT(diffTo()), 1000);
    return () => clearInterval(id);
  }, []);

  function diffTo() {
    const target = new Date();
    // Set to next Saturday 00:00 PT (just an aesthetic countdown)
    target.setDate(target.getDate() + ((6 - target.getDay() + 7) % 7 || 7));
    target.setHours(0, 0, 0, 0);
    const ms = Math.max(0, target - new Date());
    const d = Math.floor(ms / 86400000);
    const h = Math.floor(ms % 86400000 / 3600000);
    const m = Math.floor(ms % 3600000 / 60000);
    const s = Math.floor(ms % 60000 / 1000);
    return { d, h, m, s };
  }
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="hero-drop">
      <div className="hero-drop-stage">
        <div>
          <div>
            <div className="eyebrow">Drop 02 · Service</div>
            <h2 className="display" style={{ fontSize: 64, marginTop: 16, marginBottom: 0 }}>
              <em>Six pieces.</em><br />Quarter-released.
            </h2>
          </div>
          <div className="drop-countdown">
            <div>
              <div className="unit">{pad(t.d)}</div>
              <div className="lbl">Days</div>
            </div>
            <div>
              <div className="unit">{pad(t.h)}</div>
              <div className="lbl">Hours</div>
            </div>
            <div>
              <div className="unit">{pad(t.m)}</div>
              <div className="lbl">Min</div>
            </div>
            <div>
              <div className="unit">{pad(t.s)}</div>
              <div className="lbl">Sec</div>
            </div>
          </div>
        </div>
        <div className="hero-drop-center">
          <Placeholder
            silhouette
            glyph={<em>02</em>}
            label="P.HOOD.001 — STUDIO" />
          
        </div>
        <div>
          <div>
            <div className="eyebrow">Restock — Sold Out 04.06</div>
            <p style={{ marginTop: 14, color: "var(--char)", fontSize: 14, lineHeight: 1.55, maxWidth: "30ch" }}>
              Atelier Hoodie returning in Bone and Coal. Allocation strictly limited.
              Subscribed members get a 24h window before public release.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn btn-solid" onClick={goShop}>Shop the Drop →</button>
            <button className="btn btn-ghost">Join Members List</button>
          </div>
        </div>
      </div>
      <div className="hero-drop-marquee">
        <div className="hero-drop-marquee-track">
          <span>Pastion</span>
          <span className="acc">/ Service Issue 02 /</span>
          <span><em>uncommon wear</em></span>
          <span className="acc">/ Heavyweight 500GSM /</span>
          <span>Made in Portugal</span>
          <span className="acc">/ 14.06.2026 /</span>
          <span><em>Pastion</em></span>
          <span className="acc">/ Service Issue 02 /</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { HeroEditorial, HeroBrutalist, HeroDrop });