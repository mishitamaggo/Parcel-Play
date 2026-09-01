import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHeroUnboxing(container, state) {
  let activeMode = 'lotus'; // 'lotus' | 'plantable' | 'trousseau'
  let bloomPercent = 65;
  let isTorn = false;
  let isPlanted = false;
  let activeHotspot = 'mannequin';

  const HOTSPOTS = {
    mannequin: {
      title: 'Haute Couture Bridal Lehenga Mannequin',
      category: 'Sculptural Centerpiece',
      detail: 'Handcrafted miniature bridal gown mannequin in dusty rose shimmer with hand-embroidered bodice and tiered ruffled lehenga skirt.',
      material: 'Metallic Shimmer Silk Organza & Rose Gold Zari'
    },
    jewelry: {
      title: 'Fine Diamond Suite on Silk Bolster',
      category: 'Jewelry Vitrine',
      detail: 'Tiered velvet presentation case resting on a pure mulberry golden silk bolster cushion displaying diamond necklace and drop earrings.',
      material: 'Italian Velvet & 100% Mulberry Silk'
    },
    pralines: {
      title: '16-Cavity Gold Leaf Confection Chest',
      category: 'Artisanal Confections',
      detail: 'Rigid gold foil tray holding artisanal Belgian truffles and gilded chocolates in custom molded compartments.',
      material: 'FSC Food-Grade Gold Leaf Paperboard'
    },
    potli: {
      title: 'Banarasi Gold Brocade Potli',
      category: 'Heritage Keepsake',
      detail: 'Pure handloom Banarasi brocade pouch with gold Gota cord and authentic freshwater pearl jhumka tassels.',
      material: 'Varanasi Zari Brocade & Seed Pearls'
    },
    caddies: {
      title: 'Rose Gold Satin Scent Caddies',
      category: 'Luxury Canisters',
      detail: 'Airtight brushed rose gold satin canisters for loose leaf Darjeeling teas and artisanal floral potpourri.',
      material: 'Anodized Brushed Tinplate'
    }
  };

  function renderHTML() {
    container.innerHTML = `
      <section class="hero-section" id="hero">
        <div class="container">
          <div class="hero-grid">
            <!-- Left Column: Studio Manifesto & Hook -->
            <div class="hero-content">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span class="sub-tag" style="margin-bottom: 0;">Bespoke Packaging Atelier</span>
                <span style="font-size: 0.75rem; color: var(--border-medium);">•</span>
                <span class="monogram-badge">Est. Mumbai & Delhi</span>
              </div>

              <h1 class="hero-headline">
                Packaging engineered for the <em>sacred wonder</em> of the reveal.
              </h1>

              <p class="hero-description">
                We craft kinetic blooming jewelry spheres, plantable wildflower paper vitrines, and royal bridal trousseau hampers for modern Indian D2C and haute couture luxury houses.
              </p>

              <div class="hero-ctas">
                <a href="#/cost-estimator" class="btn-primary btn-gold" id="hero-explore-skus-btn">
                  <span>Configure Masterpieces (₹)</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>

                <button class="btn-secondary" id="hero-audit-trigger-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Book Studio Audit</span>
                </button>
              </div>

              <!-- Social Proof / Metrics Row -->
              <div class="hero-stats-row">
                <div class="hero-stat-item">
                  <div class="stat-num">500+</div>
                  <div class="stat-label">Luxury SKUs Produced</div>
                </div>
                <div class="hero-stat-item">
                  <div class="stat-num">100%</div>
                  <div class="stat-label">Plastic-Free Living Papers</div>
                </div>
                <div class="hero-stat-item">
                  <div class="stat-num">10–16<span>d</span></div>
                  <div class="stat-label">PAN-India Dispatch</div>
                </div>
              </div>
            </div>

            <!-- Right Column: Interactive Masterpiece Atelier Stage -->
            <div class="stage-container" id="unboxing-stage">
              <!-- Mode Tabs Bar -->
              <div class="showcase-tabs-bar">
                <button class="showcase-tab ${activeMode === 'lotus' ? 'active' : ''}" data-mode="lotus">
                  <span>🌸</span> Kinetic Lotus
                </button>
                <button class="showcase-tab ${activeMode === 'plantable' ? 'active' : ''}" data-mode="plantable">
                  <span>🌱</span> Plantable Seed
                </button>
                <button class="showcase-tab ${activeMode === 'trousseau' ? 'active' : ''}" data-mode="trousseau">
                  <span>👑</span> Royal Hamper
                </button>
              </div>

              <!-- Dynamic Viewport per Mode -->
              <div class="stage-body-wrap" id="stage-body-mount">
                ${renderStageContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    attachStageEvents();
  }

  function renderStageContent() {
    if (activeMode === 'lotus') {
      return `
        <div class="masterpiece-viewport">
          <div class="lotus-stage-wrap">
            <img src="assets/images/aura_lotus_bloom.jpg" alt="Aura Kinetic Lotus Bloom" class="lotus-preview-img" style="filter: brightness(${0.9 + (bloomPercent * 0.002)}) contrast(1.05);" />
            <div class="lotus-bloom-overlay" style="opacity: ${bloomPercent / 100};"></div>
            
            <div class="lotus-reveal-badge">
              <span style="color: var(--accent-gold);">✨</span>
              <span>8-Axis Kinetic Petal Bloom</span>
            </div>

            ${bloomPercent > 40 ? `<div class="lotus-necklace-glow" style="top: 25%; right: 20%;"></div>` : ''}

            <!-- Floating Micro Spec Card -->
            <div class="living-bloom-card" style="bottom: 0.75rem; left: 0.75rem; right: 0.75rem;">
              <div>
                <strong>Aura Kinetic Lotus Bloom</strong>
                <span>Amethyst Plum Composite • Concentric Arc Deboss</span>
              </div>
              <a href="#/sku/kinetic-lotus-spheres" class="btn-primary btn-gold" style="padding: 0.35rem 0.75rem; font-size: 0.72rem;">
                <span>View SKU</span>
              </a>
            </div>
          </div>
        </div>

        <div class="stage-footer-controls">
          <div class="stage-action-bar" style="padding-top: 0; border-top: none;">
            <div class="lid-slider-wrap">
              <span class="lid-slider-label">Petal Bloom</span>
              <input type="range" min="0" max="100" value="${bloomPercent}" class="lid-slider" id="lotus-bloom-slider" />
              <span class="lid-slider-label" id="lotus-percent-label">${bloomPercent}%</span>
            </div>

            <button class="btn-choreography" id="toggle-lotus-btn">
              <span style="color: var(--accent-gold);">✨</span>
              <span>${bloomPercent > 50 ? 'Close Petals' : 'Bloom Lotus'}</span>
            </button>
          </div>
        </div>
      `;
    }

    if (activeMode === 'plantable') {
      return `
        <div class="masterpiece-viewport">
          <div class="plantable-stage-wrap">
            <img src="assets/images/aura_plantable_wildflower.jpg" alt="Aura Plantable Wildflower Vitrine" class="plantable-preview-img" style="transform: ${isPlanted ? 'scale(1.04)' : 'scale(1)'}; transition: transform 0.5s ease;" />
            
            <div class="seed-ritual-badge">
              <span style="color: #7ED321;">🌱</span>
              <span>${isPlanted ? 'Sprouting in Ceramic Pot' : isTorn ? 'Sleeve Torn • Ready to Plant' : 'Deckle-Edge Seed Paper Cylinder'}</span>
            </div>

            <div class="living-bloom-card" style="bottom: 0.75rem; left: 0.75rem; right: 0.75rem;">
              <div>
                <strong>Aura Botanical Seed-Paper Vitrine</strong>
                <span>${isPlanted ? '🌸 Wildflower Seeds Germinating in Soil' : isTorn ? '✨ Acrylic Crystal Vitrine Revealed' : '100% Tree-Free Cotton Rag with Cosmos Seeds'}</span>
              </div>
              <a href="#/sku/plantable-wildflower-vitrines" class="btn-primary btn-gold" style="padding: 0.35rem 0.75rem; font-size: 0.72rem;">
                <span>View SKU</span>
              </a>
            </div>
          </div>
        </div>

        <div class="stage-footer-controls">
          <div class="stage-action-bar" style="padding-top: 0; border-top: none;">
            <button class="btn-choreography ${isTorn ? 'active' : ''}" id="tear-sleeve-btn" style="flex: 1; justify-content: center;">
              <span>✂️</span>
              <span>${isTorn ? 'Sleeve Torn (Vitrine Open)' : '1. Tear Seed Sleeve'}</span>
            </button>

            <button class="btn-choreography ${isPlanted ? 'active' : ''}" id="plant-pot-btn" style="flex: 1; justify-content: center;" ${!isTorn ? 'disabled style="opacity:0.5;"' : ''}>
              <span>🌸</span>
              <span>${isPlanted ? 'Planted & Sprouting!' : '2. Plant in Pot'}</span>
            </button>

            ${(isTorn || isPlanted) ? `
              <button class="btn-secondary" id="reset-plantable-btn" style="padding: 0.45rem 0.75rem; font-size: 0.75rem;">
                <span>Reset</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }

    if (activeMode === 'trousseau') {
      const activeInfo = HOTSPOTS[activeHotspot] || HOTSPOTS.mannequin;
      return `
        <div class="masterpiece-viewport">
          <div class="trousseau-stage-wrap">
            <img src="assets/images/royal_maharani_hamper.jpg" alt="The Royal Maharani Bridal Trousseau" class="trousseau-preview-img" />
            
            <div class="royal-hamper-badge">
              <span style="color: var(--accent-gold);">👑</span>
              <span>Royal Maharani Bridal Trousseau</span>
            </div>

            <!-- Interactive Hotspot Pins -->
            <!-- 1: Mannequin -->
            <button class="hamper-hotspot ${activeHotspot === 'mannequin' ? 'active' : ''}" data-spot="mannequin" style="top: 48%; left: 45%;" title="Couture Lehenga Mannequin">
              <span>1</span>
              <div class="hotspot-pulse"></div>
            </button>

            <!-- 2: Diamond Jewelry -->
            <button class="hamper-hotspot ${activeHotspot === 'jewelry' ? 'active' : ''}" data-spot="jewelry" style="top: 62%; left: 22%;" title="Velvet Jewelry Case">
              <span>2</span>
              <div class="hotspot-pulse"></div>
            </button>

            <!-- 3: Pralines -->
            <button class="hamper-hotspot ${activeHotspot === 'pralines' ? 'active' : ''}" data-spot="pralines" style="top: 52%; left: 66%;" title="Gold Praline Chest">
              <span>3</span>
              <div class="hotspot-pulse"></div>
            </button>

            <!-- 4: Potli -->
            <button class="hamper-hotspot ${activeHotspot === 'potli' ? 'active' : ''}" data-spot="potli" style="top: 68%; left: 88%;" title="Banarasi Zari Potli">
              <span>4</span>
              <div class="hotspot-pulse"></div>
            </button>

            <!-- 5: Caddies -->
            <button class="hamper-hotspot ${activeHotspot === 'caddies' ? 'active' : ''}" data-spot="caddies" style="top: 72%; left: 73%;" title="Rose Gold Scent Caddies">
              <span>5</span>
              <div class="hotspot-pulse"></div>
            </button>

            <!-- Hotspot Inspector Card -->
            <div class="hamper-hotspot-info">
              <div>
                <strong>${activeInfo.title}</strong>
                <span>${activeInfo.detail} • <em>${activeInfo.material}</em></span>
              </div>
              <a href="#/sku/couture-trousseau-hampers" class="btn-primary btn-gold" style="padding: 0.35rem 0.75rem; font-size: 0.72rem; white-space: nowrap; margin-left: 0.5rem;">
                <span>Configure Suite</span>
              </a>
            </div>
          </div>
        </div>

        <div class="stage-footer-controls">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
            <span>Click any numbered golden pin to inspect luxury elements</span>
            <span style="font-weight: 700; color: var(--accent-gold-dark);">5 Elements Curated</span>
          </div>
        </div>
      `;
    }
  }

  function attachStageEvents() {
    // Mode switcher buttons
    const modeTabs = container.querySelectorAll('.showcase-tab');
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tactileAudio.playCardSelect();
        activeMode = tab.dataset.mode;
        renderHTML();
      });
    });

    // Mode 1: Lotus Slider & Toggle
    const lotusSlider = document.getElementById('lotus-bloom-slider');
    const lotusPercentLabel = document.getElementById('lotus-percent-label');
    const toggleLotusBtn = document.getElementById('toggle-lotus-btn');

    if (lotusSlider) {
      lotusSlider.addEventListener('input', (e) => {
        bloomPercent = parseInt(e.target.value, 10);
        if (lotusPercentLabel) lotusPercentLabel.textContent = `${bloomPercent}%`;
        const preview = container.querySelector('.lotus-preview-img');
        const overlay = container.querySelector('.lotus-bloom-overlay');
        if (preview) preview.style.filter = `brightness(${0.9 + (bloomPercent * 0.002)}) contrast(1.05)`;
        if (overlay) overlay.style.opacity = `${bloomPercent / 100}`;
      });
    }

    if (toggleLotusBtn) {
      toggleLotusBtn.addEventListener('click', () => {
        tactileAudio.playHapticSnap();
        bloomPercent = bloomPercent > 50 ? 10 : 90;
        renderHTML();
      });
    }

    // Mode 2: Plantable events
    const tearBtn = document.getElementById('tear-sleeve-btn');
    const plantBtn = document.getElementById('plant-pot-btn');
    const resetPlantBtn = document.getElementById('reset-plantable-btn');

    if (tearBtn) {
      tearBtn.addEventListener('click', () => {
        tactileAudio.playHapticSnap();
        isTorn = true;
        renderHTML();
      });
    }

    if (plantBtn && isTorn) {
      plantBtn.addEventListener('click', () => {
        tactileAudio.playToneBurst();
        isPlanted = true;
        renderHTML();
      });
    }

    if (resetPlantBtn) {
      resetPlantBtn.addEventListener('click', () => {
        isTorn = false;
        isPlanted = false;
        renderHTML();
      });
    }

    // Mode 3: Trousseau hotspots
    const hotspots = container.querySelectorAll('.hamper-hotspot');
    hotspots.forEach(spot => {
      spot.addEventListener('click', () => {
        tactileAudio.playCardSelect();
        activeHotspot = spot.dataset.spot;
        renderHTML();
      });
    });
  }

  // Initial Render
  renderHTML();
}
