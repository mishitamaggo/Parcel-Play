import { renderHeroUnboxing } from '../components/HeroUnboxing.js?v=2.0';
import { CASE_STUDIES, MATERIAL_SWATCHES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHomePage(container, appState, openAuditModal) {
  container.innerHTML = `
    <div id="home-hero-mount"></div>

    <!-- Featured Masterpieces Spotlight -->
    <section class="section-container" style="background: var(--bg-secondary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="section-header-split">
          <div>
            <span class="sub-tag">Masterpiece Gallery</span>
            <h2 class="section-title">Selected Haute Couture & Sensory Work</h2>
            <p class="section-subtext">Sculptural kinetic reveals, plantable seed-paper vitrines, and bespoke royal wedding trousseau hampers engineered in India.</p>
          </div>
          <a href="#/case-studies" class="btn-secondary" style="align-self: flex-end;">
            <span>View All Masterpieces</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div class="projects-masonry" style="margin-top: 2.25rem;">
          ${CASE_STUDIES.slice(0, 3).map(project => `
            <article class="project-card" data-id="${project.id}">
              <div class="project-media-wrap" data-macro="${project.macroImage}">
                <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
                <div class="project-category-badge">${project.category}</div>
              </div>
              <div class="project-details">
                <div class="project-header-row">
                  <h3 class="project-title">${project.title}</h3>
                  <span class="project-client">${project.client}</span>
                </div>
                <div class="project-subtitle">${project.subtitle}</div>
                <p class="project-desc">${project.description}</p>
                <div class="project-metrics-grid">
                  ${project.metrics.map(m => `
                    <div class="metric-cell">
                      <div class="metric-val">${m.value}</div>
                      <div class="metric-lbl">${m.label}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Collaboration Tracks / Pathways -->
    <section class="section-container" style="background: var(--bg-primary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="section-header">
          <span class="sub-tag">Collaboration Tracks</span>
          <h2 class="section-title">Engineered for luxury & modern D2C houses.</h2>
          <p class="section-subtext">Choose between turnkey bespoke packaging manufacturing and architectural unboxing audits.</p>
        </div>

        <div class="pathways-grid" style="margin-top: 2.25rem;">
          <div class="pathway-card">
            <div>
              <span class="pathway-badge">Turnkey SKUs</span>
              <h3 class="pathway-headline">Haute Couture & Production SKUs</h3>
              <p class="pathway-desc">Kinetic bloom spheres, plantable wildflower vitrines, royal bridal trousseau hampers, and rigid Kappa boxes with bespoke sampling and low MOQs.</p>
            </div>
            <a href="#/how-we-work" class="btn-primary btn-gold" style="margin-top: 1.5rem;">
              <span>Explore Production Process</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div class="pathway-card featured">
            <div>
              <span class="pathway-badge">Studio Advisory</span>
              <h3 class="pathway-headline">Structural Design & Unboxing Audits</h3>
              <p class="pathway-desc">Comprehensive teardown of your unboxing ritual, kinetic reveal engineering, dieline optimization, and volumetric freight reductions.</p>
            </div>
            <a href="#/how-we-work" class="btn-primary" style="background: #FFF; color: #111; border-color: #FFF; margin-top: 1.5rem;">
              <span>Explore Studio Audits</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Material Library Banner Spotlight -->
    <section class="section-container" style="background: var(--bg-secondary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="section-header-split">
          <div>
            <span class="sub-tag">Tactile Atelier</span>
            <h2 class="section-title">Living papers, velvets & Banarasi zari silk.</h2>
            <p class="section-subtext">Tree-free wildflower seed paper, sculpted amethyst composites, and heritage handloom brocades.</p>
          </div>
          <a href="#/material-library" class="btn-secondary" style="align-self: flex-end;">
            <span>Browse Full Swatch Catalog</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div class="swatch-library-grid" style="grid-template-columns: repeat(4, 1fr); margin-top: 2rem;">
          ${MATERIAL_SWATCHES.slice(0, 4).map(swatch => `
            <a href="#/material-library" class="swatch-card" style="text-decoration: none; color: inherit;">
              <div class="swatch-preview-img-wrap" style="height: 115px;">
                <img src="${swatch.textureImage}" alt="${swatch.name}" class="swatch-preview-img" />
              </div>
              <h4 class="swatch-name">${swatch.name}</h4>
              <span class="swatch-weight">${swatch.weight}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Cost Estimator Spotlight Callout in INR -->
    <section class="section-container" style="background: var(--bg-primary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="calculator-banner-card" style="background: linear-gradient(135deg, var(--bg-dark) 0%, var(--accent-plum-deep) 100%); color: #FFF; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 1rem; padding: 2.75rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; box-shadow: var(--shadow-float);">
          <div style="max-width: 560px;">
            <span class="sub-tag" style="color: var(--accent-gold-light);">Instant Pricing in INR (₹)</span>
            <h2 style="color: #FFF; font-size: 2rem; margin-bottom: 0.65rem;">Calculate Packaging Economics in Real Time</h2>
            <p style="color: var(--text-light-muted); font-size: 0.95rem; line-height: 1.6;">
              Configure kinetic spheres, plantable wildflower vitrines, royal trousseau hampers, and rigid Kappa boxes with live volume curves and domestic PAN-India dispatch.
            </p>
          </div>
          <a href="#/cost-estimator" class="btn-primary btn-gold" style="padding: 0.85rem 1.65rem; font-size: 0.9rem;">
            <span>Launch Cost Estimator (₹)</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `;

  // Mount Hero Box
  const heroMount = container.querySelector('#home-hero-mount');
  renderHeroUnboxing(heroMount, appState);

  // Hook audit triggers
  const auditBtn = container.querySelector('#hero-audit-trigger-btn');
  if (auditBtn) {
    auditBtn.addEventListener('click', () => {
      tactileAudio.playCardSelect();
      openAuditModal();
    });
  }
}
