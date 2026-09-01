import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderCostEstimatorPage(container, onOrderQuote) {
  let currentFormat = 'kinetic-lotus';
  let currentSubstrate = 'amethyst-velvet';
  let currentFinishes = ['champagne-foil'];
  let quantity = 1000;

  const FORMATS = [
    { id: 'kinetic-lotus', name: 'Kinetic Lotus Bloom Sphere', base: 640.00, minMoq: 300, time: '16-20 Days', desc: '8-Axis articulating petals + suspended jewel vitrine' },
    { id: 'plantable-seed', name: 'Plantable Wildflower Vitrine', base: 165.00, minMoq: 500, time: '10-14 Days', desc: 'Deckle seed cylinder + crystal acrylic display' },
    { id: 'couture-trousseau', name: 'Royal Bridal Trousseau Hamper', base: 1450.00, minMoq: 50, time: '14-18 Days', desc: 'Champagne tulle tray + couture lehenga mannequin' },
    { id: 'rigid-magnetic', name: 'Rigid Magnetic Box', base: 285.00, minMoq: 500, time: '12-16 Days', desc: '1400gsm Indian Kappa board + hidden magnet' },
    { id: 'slide-drawer', name: 'Slide-Drawer Box', base: 245.00, minMoq: 500, time: '12-16 Days', desc: 'Outer sleeve + grosgrain ribbon pull drawer' },
    { id: 'corrugated-mailer', name: 'Fluted Kraft Mailer', base: 78.00, minMoq: 500, time: '8-12 Days', desc: 'E-flute micro corrugated + dual tear strip' }
  ];

  const SUBSTRATES = [
    { id: 'amethyst-velvet', name: 'Amethyst Velvet Composite (3.2mm)', priceMod: 85.00, desc: 'Sculpted matte plum' },
    { id: 'wildflower-seed', name: 'Wildflower Seed Cotton (320 GSM)', priceMod: 35.00, desc: '100% Plantable paper' },
    { id: 'banarasi-brocade', name: 'Banarasi Gold Brocade & Tulle', priceMod: 180.00, desc: 'Pure Zari heritage silk' },
    { id: 'obsidian-450', name: 'Obsidian Velvet Board (450 GSM)', priceMod: 38.00, desc: 'Anti-scuff matte finish' },
    { id: 'virgin-cotton-600', name: 'Virgin Cotton Uncoated (600 GSM)', priceMod: 48.00, desc: 'High deboss depth' },
    { id: 'linen-cloth-380', name: 'Forest Sage Linen (380 GSM)', priceMod: 58.00, desc: 'Woven organic textile' }
  ];

  const FINISH_OPTIONS = [
    { id: 'champagne-foil', name: 'Champagne Gold Foil Stamping', cost: 38.00 },
    { id: 'mini-mannequin', name: 'Miniature Bridal Lehenga Mannequin', cost: 380.00 },
    { id: 'acrylic-vitrine', name: 'Optical Acrylic Gemstone Vitrine', cost: 45.00 },
    { id: 'banarasi-potli', name: 'Banarasi Zari Potli with Pearls', cost: 95.00 },
    { id: 'copper-foil', name: 'Hot Stamped Copper Foil', cost: 28.00 },
    { id: 'blind-deboss', name: 'Deep Blind Deboss (0.8mm)', cost: 22.00 }
  ];

  function formatIndianCurrency(num) {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
  }

  function calculateEconomics() {
    const format = FORMATS.find(f => f.id === currentFormat);
    const substrate = SUBSTRATES.find(s => s.id === currentSubstrate);
    
    let basePrice = format.base + substrate.priceMod;
    
    currentFinishes.forEach(fId => {
      const finish = FINISH_OPTIONS.find(f => f.id === fId);
      if (finish) basePrice += finish.cost;
    });

    let volumeDiscountFactor = Math.pow(500 / quantity, 0.22);
    let unitPrice = basePrice * volumeDiscountFactor;
    let totalPrice = unitPrice * quantity;
    let freightSavings = Math.round(quantity * 28);

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: formatIndianCurrency(Math.round(totalPrice)),
      leadTime: format.time,
      freightSavings: formatIndianCurrency(freightSavings),
      tierDiscount: Math.round((1 - volumeDiscountFactor) * 100)
    };
  }

  function renderHTML() {
    const economics = calculateEconomics();

    container.innerHTML = `
      <!-- Page Hero Header -->
      <header class="page-hero">
        <div class="container">
          <span class="sub-tag">Indian Production Economics</span>
          <h1 class="page-title">Packaging Cost Estimator (INR ₹)</h1>
          <p class="page-lead">
            Calculate box geometry, Indian Kappa board caliper, and custom foil treatments with live volume tier discounts and volumetric courier savings in INR.
          </p>
        </div>
      </header>

      <!-- Main Configurator Section -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 3rem 0 5rem;">
        <div class="container">
          <div class="calculator-grid">
            <!-- Left: Interactive Configurator Controls -->
            <div class="calc-configurator-card">
              <!-- Step 1: Packaging Format -->
              <div class="calc-group">
                <div class="calc-group-label">
                  <span>1. Packaging Format</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Box Style</span>
                </div>
                <div class="calc-options-grid">
                  ${FORMATS.map(f => `
                    <button class="calc-option-btn ${f.id === currentFormat ? 'active' : ''}" data-format="${f.id}">
                      <span class="opt-name">${f.name}</span>
                      <span class="opt-sub">${f.desc}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Step 2: Substrate & Weight -->
              <div class="calc-group">
                <div class="calc-group-label">
                  <span>2. Substrate & Board Stock</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Caliper</span>
                </div>
                <div class="calc-options-grid">
                  ${SUBSTRATES.map(s => `
                    <button class="calc-option-btn ${s.id === currentSubstrate ? 'active' : ''}" data-substrate="${s.id}">
                      <span class="opt-name">${s.name}</span>
                      <span class="opt-sub">${s.desc}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Step 3: Finishes -->
              <div class="calc-group">
                <div class="calc-group-label">
                  <span>3. Embellishments & Treatments</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Multi-Select</span>
                </div>
                <div class="calc-options-grid">
                  ${FINISH_OPTIONS.map(fin => `
                    <button class="calc-option-btn ${currentFinishes.includes(fin.id) ? 'active' : ''}" data-finish="${fin.id}">
                      <span class="opt-name">${fin.name}</span>
                      <span class="opt-sub">+₹${fin.cost.toFixed(2)} / unit</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Step 4: Volume Slider -->
              <div class="calc-group" style="margin-bottom: 0;">
                <div class="calc-group-label">
                  <span>4. Production Quantity</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Volume Tier</span>
                </div>
                <div class="volume-slider-wrap">
                  <div class="volume-display-row">
                    <span class="volume-number">${quantity.toLocaleString('en-IN')} <span style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">units</span></span>
                    <span class="volume-tier-tag">${economics.tierDiscount}% Volume Discount Applied</span>
                  </div>
                  <input type="range" min="500" max="50000" step="500" value="${quantity}" class="lid-slider" id="quantity-slider" />
                  <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.5rem;">
                    <span>500 (MOQ)</span>
                    <span>5,000</span>
                    <span>25,000</span>
                    <span>50,000+</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Real-time Price Breakdown Summary Card -->
            <div class="calc-summary-card">
              <span class="sub-tag" style="color: var(--accent-copper-light);">Estimate Summary</span>
              <h3>Unit Economics (INR)</h3>

              <div class="price-metric-main">
                <div class="unit-price">₹${economics.unitPrice}</div>
                <div class="unit-sub">Estimated per unit (Ex-Works India + GST applicable)</div>
              </div>

              <ul class="price-breakdown-list">
                <li>
                  <span>Total Order Investment</span>
                  <strong>₹${economics.totalPrice}</strong>
                </li>
                <li>
                  <span>Production Turnaround</span>
                  <strong>${economics.leadTime}</strong>
                </li>
                <li>
                  <span>Physical Pre-Production Proof</span>
                  <strong>Included Free</strong>
                </li>
                <li>
                  <span>1:1 CAD Dieline Calibration</span>
                  <strong>Complimentary</strong>
                </li>
                <li>
                  <span>GST Input Tax Credit (ITC)</span>
                  <strong>100% Tax Invoice</strong>
                </li>
                <li>
                  <span>PAN-India Doorstep Logistics</span>
                  <strong>BlueDart / Delhivery</strong>
                </li>
              </ul>

              <!-- Freight Savings Callout -->
              <div class="freight-saving-callout">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div>
                  <strong>~₹${economics.freightSavings} Est. Courier Surcharges Saved</strong>
                  <p>Snug custom dielines eliminate dimensional air waste across Indian air and surface courier networks.</p>
                </div>
              </div>

              <button class="btn-primary btn-copper" id="request-quote-spec-btn" style="width: 100%; justify-content: center; padding: 0.85rem;">
                <span>Lock Specs & Request GST Quote</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Formats
    const formatBtns = container.querySelectorAll('[data-format]');
    formatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFormat = btn.getAttribute('data-format');
        tactileAudio.playCardSelect();
        renderHTML();
      });
    });

    // Substrates
    const subBtns = container.querySelectorAll('[data-substrate]');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentSubstrate = btn.getAttribute('data-substrate');
        tactileAudio.playCardSelect();
        renderHTML();
      });
    });

    // Finishes
    const finishBtns = container.querySelectorAll('[data-finish]');
    finishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.getAttribute('data-finish');
        if (currentFinishes.includes(fId)) {
          currentFinishes = currentFinishes.filter(id => id !== fId);
        } else {
          currentFinishes.push(fId);
        }
        tactileAudio.playFoilShimmer();
        renderHTML();
      });
    });

    // Quantity slider
    const qSlider = container.querySelector('#quantity-slider');
    if (qSlider) {
      qSlider.addEventListener('input', (e) => {
        quantity = parseInt(e.target.value, 10);
        renderHTML();
        const newSlider = container.querySelector('#quantity-slider');
        if (newSlider) newSlider.focus();
      });
    }

    // Quote CTA
    const quoteBtn = container.querySelector('#request-quote-spec-btn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        tactileAudio.playFoilShimmer();
        onOrderQuote({
          format: currentFormat,
          substrate: currentSubstrate,
          finishes: currentFinishes,
          quantity: quantity,
          economics: calculateEconomics()
        });
      });
    }
  }

  renderHTML();
}
