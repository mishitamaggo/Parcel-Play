import { MATERIAL_SWATCHES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderMaterialLibraryPage(container, state, onAddToSampleKit) {
  let selectedSwatch = MATERIAL_SWATCHES[0];
  let currentCategory = 'All';

  const categories = ['All', 'Sculpted Resins & Composites', 'Botanical & Living Papers', 'Textiles & Couture Trims', 'Luxury Canisters & Metal', 'Paperboard', 'Corrugated', 'Molded Pulp', 'Hot Foils & Tape'];

  function getFilteredSwatches() {
    if (currentCategory === 'All') return MATERIAL_SWATCHES;
    return MATERIAL_SWATCHES.filter(s => s.category === currentCategory);
  }

  function renderHTML() {
    const swatches = getFilteredSwatches();

    container.innerHTML = `
      <!-- Page Hero Header -->
      <header class="page-hero">
        <div class="container">
          <span class="sub-tag">Tactile Atelier</span>
          <h1 class="page-title">Material Library & Swatches</h1>
          <p class="page-lead">
            We curate and mill virgin cottons, heavy unbleached boards, non-toxic foils, and molded agricultural residues for unmatched physical quality.
          </p>

          <!-- Category Filter Bar -->
          <div class="filter-tabs-wrap" style="margin-top: 1.75rem; margin-bottom: 0; justify-content: flex-start;">
            ${categories.map(cat => `
              <button class="filter-tab ${cat === currentCategory ? 'active' : ''}" data-material-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
      </header>

      <!-- Main Material Studio Section -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 3rem 0 5rem;">
        <div class="container">
          <div class="material-studio-container">
            <!-- Left: Swatch Deck Selection Grid -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
                <span class="sub-tag" style="margin-bottom: 0;">Substrate Deck</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${swatches.length} Available in Catalog</span>
              </div>

              <div class="swatch-library-grid">
                ${swatches.map(swatch => `
                  <div class="swatch-card ${swatch.id === selectedSwatch.id ? 'active' : ''}" data-id="${swatch.id}">
                    <div class="swatch-preview-img-wrap">
                      <img src="${swatch.textureImage}" alt="${swatch.name}" class="swatch-preview-img" />
                    </div>
                    <h4 class="swatch-name">${swatch.name}</h4>
                    <span class="swatch-weight">${swatch.weight} • ${swatch.category}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Right: Dynamic Light Reactive Substrate Stage -->
            <div class="material-detail-stage" id="swatch-detail-stage">
              <div class="material-stage-header">
                <div>
                  <span class="material-stage-category">${selectedSwatch.category}</span>
                  <h3 class="material-stage-title">${selectedSwatch.name}</h3>
                </div>
                <span class="sub-tag" style="margin-bottom: 0; color: var(--text-primary); font-weight: 700;">${selectedSwatch.weight}</span>
              </div>

              <!-- Tactile Macro Stage with Cursor Light Overlay -->
              <div class="tactile-macro-stage" id="macro-light-stage">
                <img src="${selectedSwatch.textureImage}" alt="${selectedSwatch.name}" class="tactile-macro-img" id="stage-macro-img" />
                <div class="light-sheen-overlay" id="sheen-overlay"></div>
              </div>

              <!-- Substrate Properties -->
              <div class="substrate-props-grid">
                <div class="substrate-prop-item">
                  <strong>Texture Profile</strong>
                  <p>${selectedSwatch.tactileFeel}</p>
                </div>
                <div class="substrate-prop-item">
                  <strong>Surface Finish</strong>
                  <p>${selectedSwatch.finish}</p>
                </div>
                <div class="substrate-prop-item">
                  <strong>Foil & Deboss Compatibility</strong>
                  <p>${selectedSwatch.foilSuitability}</p>
                </div>
                <div class="substrate-prop-item">
                  <strong>Sustainability Standard</strong>
                  <p>${selectedSwatch.ecoIndex}</p>
                </div>
                <div class="substrate-prop-item" style="grid-column: span 2;">
                  <strong>Recommended Applications</strong>
                  <p>${selectedSwatch.bestFor} • MOQ: ${selectedSwatch.moq}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="material-actions-row">
                <button class="btn-primary btn-copper" id="add-to-sample-box-btn" style="flex: 1; justify-content: center; padding: 0.75rem;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add to Custom Sample Box</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Sample Box Promotion Callout -->
          <div style="margin-top: 3.5rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div style="width: 48px; height: 48px; border-radius: 0.5rem; background: rgba(194, 99, 56, 0.1); color: var(--accent-copper); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
              </div>
              <div>
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.2rem;">Order a Complimentary Physical Swatch Pack</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">Select up to 5 material swatches and we'll dispatch a custom presentation case to your studio free of charge.</p>
              </div>
            </div>
            <button class="btn-secondary" id="open-box-drawer-btn">
              <span>View Sample Box (${state.sampleKit.length} items)</span>
            </button>
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Category tabs
    const tabs = container.querySelectorAll('[data-material-cat]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-material-cat');
        if (cat !== currentCategory) {
          currentCategory = cat;
          tactileAudio.playCardSelect();
          renderHTML();
        }
      });
    });

    // Swatch selection
    const cards = container.querySelectorAll('.swatch-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const found = MATERIAL_SWATCHES.find(s => s.id === id);
        if (found) {
          selectedSwatch = found;
          tactileAudio.playCardSelect();
          renderHTML();
        }
      });
    });

    // Light reflection
    const macroStage = container.querySelector('#macro-light-stage');
    const sheen = container.querySelector('#sheen-overlay');
    if (macroStage && sheen) {
      macroStage.addEventListener('mousemove', (e) => {
        const rect = macroStage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        sheen.style.setProperty('--mouse-x', `${x}%`);
        sheen.style.setProperty('--mouse-y', `${y}%`);
      });
    }

    // Add to Sample Box
    const addBtn = container.querySelector('#add-to-sample-box-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        tactileAudio.playFoilShimmer();
        onAddToSampleKit(selectedSwatch);
      });
    }

    // Open box drawer
    const openBoxBtn = container.querySelector('#open-box-drawer-btn');
    if (openBoxBtn) {
      openBoxBtn.addEventListener('click', () => {
        const drawerBtn = document.getElementById('open-sample-drawer-btn');
        if (drawerBtn) drawerBtn.click();
      });
    }
  }

  renderHTML();
}
