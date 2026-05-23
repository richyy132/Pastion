// Shared components for PSTN
const { useState, useEffect, useRef, useMemo } = React;

function Wordmark({ small }) {
  return (
    <div className="wordmark" style={{ fontSize: small ? 22 : undefined }}>
      <em>Pastion</em>
      <sup>PSTN®</sup>
    </div>);

}

function Placeholder({ label, glyph, silhouette, style }) {
  return (
    <div className="ph" style={style}>
      {silhouette && <div className="silhouette" />}
      {glyph && <div className="ph-glyph">{glyph}</div>}
      {label && <div className="ph-label">{label}</div>}
    </div>);

}

function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="announce-track">
        <span>Drop 02 — Service Issue — Shipping worldwide</span>
        <span>Complimentary returns within 30 days</span>
        <span>Members access drops 24h early — Join the list</span>
        <span>Drop 02 — Service Issue — Shipping worldwide</span>
        <span>Complimentary returns within 30 days</span>
      </div>
    </div>);

}

function NavDropdown({ trigger, columns, isActive, onItemClick }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapRef = useRef(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={"nav-dd " + (open ? "is-open " : "") + (isActive ? "is-active" : "")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
      
      <a
        className={"nav-link " + (isActive ? "is-active" : "")}
        href="#"
        onClick={(e) => {e.preventDefault();setOpen((v) => !v);}}
        aria-expanded={open}>
        
        {trigger}
        <span className="nav-caret" aria-hidden="true">+</span>
      </a>
      <div className="nav-dd-panel" role="menu">
        <div className="nav-dd-inner">
          {columns.map((col, i) =>
          <div className="nav-dd-col" key={i}>
              {col.heading && <div className="nav-dd-head">{col.heading}</div>}
              <ul>
                {col.items.map((it) =>
              <li key={it.label}>
                    <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    if (onItemClick) onItemClick(it);
                  }}>
                  
                      <span>{it.label}</span>
                      {it.note && <em className="nav-dd-note">{it.note}</em>}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>);

}

function Nav({ page, setPage, cart, openCart }) {
  const count = cart.reduce((a, b) => a + b.qty, 0);

  const shopColumns = [
  {
    heading: "Featured",
    items: [
    { label: "New Arrivals", note: "Drop 02", to: "shop" },
    { label: "Best Sellers", note: "Top 06", to: "shop" },
    { label: "Restocked", to: "shop" },
    { label: "Archive", note: "Past drops", to: "shop" }]

  },
  {
    heading: "Garments",
    items: [
    { label: "Hoodies", note: "04", to: "shop" },
    { label: "Quarter-Zips", note: "02", to: "shop" },
    { label: "Tees", note: "Forthcoming", to: "shop" },
    { label: "Pants", note: "Forthcoming", to: "shop" },
    { label: "Outerwear", note: "Forthcoming", to: "shop" }]

  },
  {
    heading: "Shop all",
    items: [
    { label: "View entire collection →", to: "shop" }],

    promo: true
  }];


  const studioColumns = [
  {
    heading: "My Account",
    items: [
    { label: "Account", to: null },
    { label: "Order Status", to: null },
    { label: "Returns & Exchanges", to: null }]

  },
  {
    heading: "Help",
    items: [
    { label: "FAQ", to: null },
    { label: "Shipping", to: null },
    { label: "Contact", to: null }]

  },
  {
    heading: "Community",
    items: [
    { label: "About", to: "about" },
    { label: "Discord", to: null },
    { label: "Instagram", to: null }]

  }];


  const handleItem = (it) => {
    if (it.to) setPage(it.to);
  };

  return (
    <header className="nav">
      <div className="nav-inner" data-comment-anchor="0a6fd58923-div-172-7">
        <nav className="nav-links">
          <NavDropdown
            trigger="Shop"
            columns={shopColumns}
            isActive={page === "shop" || page === "pdp"}
            onItemClick={handleItem} />
        </nav>
        <a href="#" onClick={(e) => {e.preventDefault();setPage("home");}}>
          <Wordmark />
        </a>
        <div className="nav-right">
          <NavDropdown
            trigger="Everything Else"
            columns={studioColumns}
            isActive={page === "about"}
            onItemClick={handleItem} />
          <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>Search</a>
          <a
            className="nav-link nav-cart"
            href="#"
            onClick={(e) => {e.preventDefault();openCart();}}>

            Cart <span className="count">{count}</span>
          </a>
        </div>
      </div>
    </header>);

}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Newsletter — 24h Early Access</h4>
          <p style={{ maxWidth: "36ch", color: "var(--char)", marginTop: 0 }}>
            Drops, restocks, and longform editorial. No noise.
          </p>
          <div className="newsletter">
            <input type="email" placeholder="your@email.com" />
            <button>Subscribe →</button>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li onClick={() => setPage("shop")}>All</li>
            <li onClick={() => setPage("shop")}>Hoodies</li>
            <li onClick={() => setPage("shop")}>Quarter-Zips</li>
            <li onClick={() => setPage("shop")}>Archive</li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li onClick={() => setPage("about")}>About</li>
            <li onClick={() => setPage("lookbook")}>Lookbook</li>
            <li>Journal</li>
            <li>Stockists</li>
          </ul>
        </div>
        <div>
          <h4>Service</h4>
          <ul>
            <li>Size Guide</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="footer-display"><em>Pastion</em></div>
      <div className="footer-base">
        <span>© PSTN Studio — Est. MMXXIV</span>
        <span>Vancouver / Worldwide</span>
        <span>Instagram — TikTok — Discord</span>
      </div>
    </footer>);

}

function CartDrawer({ open, onClose, cart, updateQty, removeItem }) {
  if (!open) return null;
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  return (
    <>
      <div className="scrim" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <span>Cart — {cart.reduce((a, b) => a + b.qty, 0)} items</span>
          <button onClick={onClose}>Close ✕</button>
        </div>
        {cart.length === 0 ?
        <div className="drawer-empty">
            <div className="display"><em>Empty.</em></div>
            <p style={{ color: "var(--char)", maxWidth: "28ch", margin: 0 }}>
              Considered purchases, considered carriage. Add a piece to begin.
            </p>
            <button className="btn btn-solid" onClick={onClose}>Continue Shopping</button>
          </div> :

        <>
            <div className="drawer-body">
              {cart.map((item) =>
            <div key={item.lineId} className="drawer-item">
                  <Placeholder
                silhouette
                label={null}
                style={{ aspectRatio: "auto" }} />
              
                  <div>
                    <div className="name">{item.name}</div>
                    <div className="specs">{item.color} / Size {item.size}</div>
                    <div className="qty">
                      <button onClick={() => updateQty(item.lineId, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.lineId, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <div className="price">${item.price * item.qty}</div>
                    <a className="remove" href="#" onClick={(e) => {e.preventDefault();removeItem(item.lineId);}}>Remove</a>
                  </div>
                </div>
            )}
            </div>
            <div className="drawer-foot">
              <div className="row"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="row"><span>Shipping</span><span>Calculated at checkout</span></div>
              <div className="row" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                <span>Total</span><span className="total">${subtotal}</span>
              </div>
              <button className="btn btn-solid btn-block" style={{ marginTop: 18 }}>
                Checkout — Secure Payment
              </button>
              <p style={{ textAlign: "center", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginTop: 12 }}>
                Shop Pay · Apple Pay · Google Pay
              </p>
            </div>
          </>
        }
      </aside>
    </>);

}

Object.assign(window, { Wordmark, Placeholder, AnnouncementBar, Nav, Footer, CartDrawer });