import { SKU_PRODUCTS, CASE_STUDIES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderProductDetailPage(container, slug, appState, onAddToSampleKit, openAuditModal) {
  const product = SKU_PRODUCTS.find(p => p.slug === slug) || SKU_PRODUCTS[0];
  const matchingCase = CASE_STUDIES.find(c => c.id === product.matchingCaseStudy) || CASE_STUDIES[0];
  const otherSkus = SKU_PRODUCTS.filter(p => p.slug !== product.slug);

  // Configuration state for this product
  let selectedDimensionIdx = 1; // Default medium/standard
  let selectedSubstrateIdx = 0;
  let selectedFinishes = [product.finishOptions[0]?.id].filter(Boolean);
  let orderQuantity = product.moq || 500;

  function formatIndianCurrency(num) {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
  }

  function calculateConfig() {
    const dim = product.dimensionsPresets[selectedDimensionIdx] || product.dimensionsPresets[0];
    const sub = product.substrateOptions[selectedSubstrateIdx] || product.substrateOptions[0];
    
    let base = (product.basePrice * (dim.baseMult || 1.0)) + (sub.priceAdd || 0);

    selectedFinishes.forEach(fId => {
      const f = product.finishOptions.find(opt => opt.id === fId);
      if (f) base += f.cost;
    });

    const volumeDiscountFactor = Math.pow(product.moq / Math.max(product.moq, orderQuantity), 0.22);
    const unitPrice = (base * volumeDiscountFactor).toFixed(2);
    const totalOrder = formatIndianCurrency(Math.round(unitPrice * orderQuantity));
    const discountPercent = Math.round((1 - volumeDiscountFactor) * 100);

    return {
      unitPrice,
      totalOrder,
      discountPercent,
      dimension: dim,
      substrate: sub
    };
  }

  function renderHTML() {
    const config = calculateConfig();

    container.innerHTML = `
      <!-- Breadcrumbs & Product Hero Header -->
      <section class="page-hero" style="padding-bottom: 2rem;">
        <div class="container">
          <nav style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">
            <a href="#/" style="color: var(--text-muted); text-decoration: none;">Home</a>
            <span>/</span>
            <a href="#/cost-estimator" style="color: var(--text-muted); text-decoration: none;">Packaging SKUs</a>
            <span>/</span>
            <span style="color: var(--text-primary); font-weight: 600;">${product.name}</span>
          </nav>

          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; flex-wrap: wrap;">
            <div>
              <span class="sub-tag">${product.tag} • Made in India</span>
              <h1 class="page-title" style="margin-bottom: 0.25rem;">${product.name}</h1>
              <p class="page-lead" style="font-size: 1rem; color: var(--text-secondary);">${product.headline}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.65rem; font-weight: 800; color: var(--accent-copper);">₹${config.unitPrice} <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">${product.unitLabel}</span></div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Lead Time: ${product.leadTime} • Min MOQ: ${product.moq}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Product Studio Grid -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 3rem 0 5rem;">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 2.5rem; align-items: start;">
            
            <!-- Left: High-Res Visual Showcase -->
            <div>
              <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; overflow: hidden; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
                <div style="height: 340px; position: relative; overflow: hidden; background: #18191E;">
                  <img src="${product.heroImage}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" id="main-product-img" />
                  <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(17, 19, 23, 0.85); backdrop-filter: blur(8px); padding: 0.35rem 0.75rem; border-radius: 2rem; color: #FFF; font-size: 0.7rem; font-weight: 600;">
                    FSC-C10483 Certified • GST Ready
                  </div>
                </div>

                <!-- Feature Highlights Strip -->
                <div style="padding: 1.25rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; background: var(--bg-surface); border-top: 1px solid var(--border-light); text-align: center;">
                  <div>
                    <strong style="display: block; font-size: 0.95rem; color: var(--text-primary);">100%</strong>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">Plastic-Free</span>
                  </div>
                  <div>
                    <strong style="display: block; font-size: 0.95rem; color: var(--text-primary);">ISTA 3A</strong>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">Drop Certified</span>
                  </div>
                  <div>
                    <strong style="display: block; font-size: 0.95rem; color: var(--text-primary);">${product.leadTime}</strong>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">PAN-India Delivery</span>
                  </div>
                </div>
              </div>

              <!-- Product Summary Paragraph -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 1.5rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem;">Product Overview</h4>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">${product.desc}</p>
              </div>
            </div>

            <!-- Right: Interactive Specification & Live Pricing Configurator -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 2rem; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-light);">
                Configure SKU Specifications (INR ₹)
              </h3>

              <!-- 1. Dimension Preset Selector -->
              <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; justify-content: space-between;">
                  <span>1. Dimensions & Sizing Preset</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Length × Width × Depth</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;">
                  ${product.dimensionsPresets.map((dim, idx) => `
                    <button class="calc-option-btn ${idx === selectedDimensionIdx ? 'active' : ''}" data-dim-idx="${idx}">
                      <span class="opt-name">${dim.name}</span>
                      <span class="opt-sub">${dim.size}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- 2. Substrate Stock Selector -->
              <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; justify-content: space-between;">
                  <span>2. Substrate & Outer Wrap</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Board Caliper</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem;">
                  ${product.substrateOptions.map((sub, idx) => `
                    <button class="calc-option-btn ${idx === selectedSubstrateIdx ? 'active' : ''}" data-sub-idx="${idx}" style="flex-direction: row; justify-content: space-between; align-items: center;">
                      <div style="display: flex; align-items: center; gap: 0.65rem;">
                        <span style="width: 14px; height: 14px; border-radius: 50%; background: ${sub.color}; border: 1px solid var(--border-medium); display: inline-block;"></span>
                        <span class="opt-name">${sub.name}</span>
                      </div>
                      <span class="opt-sub" style="margin-top: 0; font-weight: 600;">+${sub.priceAdd > 0 ? '₹' + sub.priceAdd.toFixed(2) : 'Included'}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- 3. Finish Embellishments -->
              <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; justify-content: space-between;">
                  <span>3. Embellishments & Foil Stamping</span>
                  <span class="sub-tag" style="margin-bottom: 0;">Multi-select</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;">
                  ${product.finishOptions.map(fin => `
                    <button class="calc-option-btn ${selectedFinishes.includes(fin.id) ? 'active' : ''}" data-fin-id="${fin.id}">
                      <span class="opt-name">${fin.name}</span>
                      <span class="opt-sub">+₹${fin.cost.toFixed(2)} / unit</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- 4. Quantity Volume Slider -->
              <div style="margin-bottom: 2rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; justify-content: space-between;">
                  <span>4. Production Quantity Tier</span>
                  <span class="sub-tag" style="margin-bottom: 0;">${config.discountPercent}% Discount</span>
                </div>
                <div class="volume-slider-wrap">
                  <div class="volume-display-row">
                    <span class="volume-number">${orderQuantity.toLocaleString('en-IN')} <span style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">units</span></span>
                    <span class="volume-tier-tag">₹${config.unitPrice} / unit</span>
                  </div>
                  <input type="range" min="${product.moq}" max="50000" step="500" value="${orderQuantity}" class="lid-slider" id="sku-qty-slider" />
                </div>
              </div>

              <!-- Price Breakdown & Actions -->
              <div style="background: var(--bg-dark); color: #FFF; border-radius: 0.65rem; padding: 1.35rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.85rem; color: var(--text-light-muted);">Estimated Order Total:</span>
                  <span style="font-size: 1.5rem; font-weight: 800; color: var(--accent-copper-light);">₹${config.totalOrder}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-light-muted); line-height: 1.4;">
                  Includes free 1:1 CAD vector dielines, physical pre-production sample, 100% GST Tax Invoice, and BlueDart / Delhivery dispatch.
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem;">
                <button class="btn-primary btn-copper" id="sku-quote-btn" style="flex: 1; justify-content: center; padding: 0.85rem;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                  <span>Request CAD Dieline & Physical Proof</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Technical Specifications Table Section -->
          <div style="margin-top: 3.5rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 2rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;">Technical Substrate & Manufacturing Specifications</h3>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
              ${Object.entries(product.technicalSpecs).map(([key, val]) => `
                <div style="padding: 1rem; background: var(--bg-card); border-radius: 0.5rem;">
                  <strong style="display: block; font-size: 0.725rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">${key.replace(/([A-Z])/g, ' $1')}</strong>
                  <span style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">${val}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Live Production Case Study Match -->
          <div style="margin-top: 3.5rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; overflow: hidden; display: grid; grid-template-columns: 1fr 1.15fr;">
            <div style="height: 100%; min-height: 260px; background: #1B1C22;">
              <img src="${matchingCase.image}" alt="${matchingCase.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span class="sub-tag">Live Indian Production Example</span>
                <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.35rem;">${matchingCase.title}</h3>
                <p style="font-size: 0.85rem; color: var(--accent-copper-dark); font-weight: 600; margin-bottom: 0.75rem;">${matchingCase.subtitle}</p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55;">${matchingCase.description}</p>
              </div>
              <div style="margin-top: 1.25rem;">
                <a href="#/case-studies" class="btn-secondary" style="font-size: 0.8rem;">
                  <span>Explore Case Study</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Cross-Browse Other Packaging SKUs -->
          <div style="margin-top: 4rem;">
            <div class="section-header-split" style="margin-bottom: 1.5rem;">
              <div>
                <span class="sub-tag">Explore Formats</span>
                <h3 style="font-size: 1.35rem; font-weight: 700;">Other Indian Packaging SKUs</h3>
              </div>
              <a href="#/cost-estimator" class="btn-secondary" style="font-size: 0.8rem;">
                <span>View Full Estimator</span>
              </a>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              ${otherSkus.map(item => `
                <a href="#/sku/${item.slug}" class="project-card" style="text-decoration: none; color: inherit;">
                  <div style="height: 160px; overflow: hidden; background: var(--bg-card);">
                    <img src="${item.heroImage}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 1rem;">
                    <span style="font-size: 0.7rem; color: var(--accent-copper); font-weight: 600; text-transform: uppercase;">From ₹${item.basePrice.toFixed(0)}</span>
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin-top: 0.15rem;">${item.name}</h4>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Dimension presets
    const dimBtns = container.querySelectorAll('[data-dim-idx]');
    dimBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDimensionIdx = parseInt(btn.getAttribute('data-dim-idx'), 10);
        tactileAudio.playCardSelect();
        renderHTML();
      });
    });

    // Substrate options
    const subBtns = container.querySelectorAll('[data-sub-idx]');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSubstrateIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
        tactileAudio.playCardSelect();
        renderHTML();
      });
    });

    // Finish options
    const finBtns = container.querySelectorAll('[data-fin-id]');
    finBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-fin-id');
        if (selectedFinishes.includes(id)) {
          selectedFinishes = selectedFinishes.filter(f => f !== id);
        } else {
          selectedFinishes.push(id);
        }
        tactileAudio.playFoilShimmer();
        renderHTML();
      });
    });

    // Quantity slider
    const qtySlider = container.querySelector('#sku-qty-slider');
    if (qtySlider) {
      qtySlider.addEventListener('input', (e) => {
        orderQuantity = parseInt(e.target.value, 10);
        renderHTML();
        const newSlider = container.querySelector('#sku-qty-slider');
        if (newSlider) newSlider.focus();
      });
    }

    // Quote CTA
    const quoteBtn = container.querySelector('#sku-quote-btn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        tactileAudio.playFoilShimmer();
        openAuditModal();
      });
    }
  }

  renderHTML();
}
