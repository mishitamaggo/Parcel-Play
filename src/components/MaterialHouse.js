import { MATERIAL_SWATCHES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderMaterialHouse(container, state, onAddToSampleKit) {
  let selectedSwatch = MATERIAL_SWATCHES[0];

  function renderHTML() {
    container.innerHTML = `
      <section class="material-house-section" id="materials">
        <div class="container">
          <div class="section-header">
            <span class="sub-tag">Material Library</span>
            <h2 class="section-title">Curated substrates & finishes.</h2>
            <p class="section-subtext">
              We source and mill virgin cottons, heavy unbleached boards, non-toxic foils, and molded cellulose fibers for tactile physical quality.
            </p>
          </div>

          <div class="material-studio-container">
            <!-- Left: Swatch Deck Selection Grid -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
                <span class="sub-tag" style="margin-bottom: 0;">Select Substrate Sample</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${MATERIAL_SWATCHES.length} Curated Substrates</span>
              </div>

              <div class="swatch-library-grid">
                ${MATERIAL_SWATCHES.map(swatch => `
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
                <span class="sub-tag" style="margin-bottom: 0; color: var(--text-primary); font-weight: 600;">${selectedSwatch.weight}</span>
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
                  <strong>Emboss & Foil Compatibility</strong>
                  <p>${selectedSwatch.foilSuitability}</p>
                </div>
                <div class="substrate-prop-item">
                  <strong>Sustainability Standard</strong>
                  <p>${selectedSwatch.ecoIndex}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="material-actions-row">
                <button class="btn-primary btn-copper" id="add-to-sample-box-btn" style="flex: 1; justify-content: center;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add to Custom Sample Box</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Swatch card selection
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

    // Dynamic Cursor Light Angle Tracking over the Macro Viewport
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

    // Add to Sample Box Button
    const addBtn = container.querySelector('#add-to-sample-box-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        tactileAudio.playFoilShimmer();
        onAddToSampleKit(selectedSwatch);
      });
    }
  }

  renderHTML();
}
