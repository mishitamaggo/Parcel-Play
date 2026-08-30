import { renderHeroUnboxing } from '../components/HeroUnboxing.js?v=2.0';
import { CASE_STUDIES, MATERIAL_SWATCHES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHomePage(container, appState, openAuditModal) {
  container.innerHTML = `
    <div id="home-hero-mount"></div>

    <!-- Featured Case Studies Spotlight -->
    <section class="section-container" style="background: var(--bg-secondary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="section-header-split">
          <div>
            <span class="sub-tag">Selected Indian Work</span>
            <h2 class="section-title">Engineered packaging in production.</h2>
            <p class="section-subtext">A preview of custom unboxing structures delivered for modern Indian D2C and luxury brands.</p>
          </div>
          <a href="#/case-studies" class="btn-secondary" style="align-self: flex-end;">
            <span>View All Case Studies</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div class="projects-masonry" style="margin-top: 1.75rem;">
          ${CASE_STUDIES.slice(0, 2).map(project => `
            <article class="project-card" data-id="${project.id}">
              <div class="project-media-wrap">
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

    <!-- How We Work Spotlight -->
    <section class="section-container" style="background: var(--bg-primary); border-top: 1px solid var(--border-light);">
      <div class="container">
        <div class="section-header">
          <span class="sub-tag">Collaboration Tracks</span>
          <h2 class="section-title">Designed for scaling Indian brands.</h2>
          <p class="section-subtext">Choose between turnkey custom SKU production and bespoke structural design audits.</p>
        </div>

        <div class="pathways-grid" style="margin-top: 2rem;">
          <div class="pathway-card">
            <div>
              <span class="pathway-badge">Production SKUs</span>
              <h3 class="pathway-headline">Custom Packaging Manufacturing</h3>
              <p class="pathway-desc">High-volume rigid Kappa boxes, fluted mailers, and molded inserts engineered for rapid production with low 500-unit minimums.</p>
            </div>
            <a href="#/how-we-work" class="btn-primary btn-copper" style="margin-top: 1.25rem;">
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
              <h3 class="pathway-headline">Packaging Design & Courier Audits</h3>
              <p class="pathway-desc">Comprehensive teardown of your current unboxing experience, volumetric courier savings, and signature dieline development.</p>
            </div>
            <a href="#/how-we-work" class="btn-primary" style="background: #FFF; color: #111; border-color: #FFF; margin-top: 1.25rem;">
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
            <span class="sub-tag">Material Library</span>
            <h2 class="section-title">Explore Indian cotton papers & Kappa boards.</h2>
            <p class="section-subtext">Tree-free Jaipur cottons, unbleached boards, and zero-plastic Assam bamboo pulp.</p>
          </div>
          <a href="#/material-library" class="btn-secondary" style="align-self: flex-end;">
            <span>Browse Full Swatch Catalog</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div class="swatch-library-grid" style="grid-template-columns: repeat(4, 1fr); margin-top: 1.75rem;">
          ${MATERIAL_SWATCHES.slice(0, 4).map(swatch => `
            <a href="#/material-library" class="swatch-card" style="text-decoration: none; color: inherit;">
              <div class="swatch-preview-img-wrap" style="height: 110px;">
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
        <div class="calculator-banner-card" style="background: var(--bg-dark); color: #FFF; border-radius: 0.85rem; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;">
          <div style="max-width: 540px;">
            <span class="sub-tag" style="color: var(--accent-copper-light);">Instant Pricing in INR (₹)</span>
            <h2 style="color: #FFF; font-size: 1.75rem; margin-bottom: 0.5rem;">Calculate Packaging Economics in Real Time</h2>
            <p style="color: var(--text-light-muted); font-size: 0.95rem; line-height: 1.55;">
              Configure box formats, substrate weights, and custom embellishments with real-time volume discounts and domestic logistics optimization.
            </p>
          </div>
          <a href="#/cost-estimator" class="btn-primary btn-copper" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
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

  // Mount 3D Hero Box
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
