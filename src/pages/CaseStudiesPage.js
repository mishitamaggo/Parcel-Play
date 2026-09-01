import { CASE_STUDIES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderCaseStudiesPage(container, openAuditModal) {
  let currentFilter = 'All';
  let searchQuery = '';
  const categories = ['All', 'Kinetic & Bloom', 'Plantable Eco-Luxury', 'Bridal & Festive Trousseau', 'Rigid Boxes', 'Corrugated Mailers', 'Molded Pulp & Trays', 'Foil Tape & Bands'];

  function getFilteredProjects() {
    return CASE_STUDIES.filter(p => {
      const matchCat = currentFilter === 'All' || p.category === currentFilter;
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specs.substrate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function renderHTML() {
    const projects = getFilteredProjects();

    container.innerHTML = `
      <!-- Page Hero Header -->
      <header class="page-hero">
        <div class="container">
          <span class="sub-tag">Portfolio & Proof</span>
          <h1 class="page-title">Case Studies & Selected Work</h1>
          <p class="page-lead">
            Explore how we translate brand vision into tangible structures, durable dielines, and unboxing moments that drive retention.
          </p>

          <!-- Controls: Category Filters & Search -->
          <div class="page-controls-bar" style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div class="filter-tabs-wrap" style="margin-bottom: 0;">
              ${categories.map(cat => `
                <button class="filter-tab ${cat === currentFilter ? 'active' : ''}" data-category="${cat}">
                  ${cat}
                </button>
              `).join('')}
            </div>

            <div class="search-input-wrap" style="position: relative; min-width: 240px;">
              <input type="text" id="case-search-input" placeholder="Search substrates, brands..." value="${searchQuery}" class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium); padding-left: 2rem;" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Case Studies Grid Section -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 3rem 0 5rem;">
        <div class="container">
          ${projects.length === 0 ? `
            <div style="text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem;">
              <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">No case studies found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">Try clearing your search query or selecting a different category.</p>
              <button class="btn-secondary" id="reset-filter-btn">
                <span>Reset Filters</span>
              </button>
            </div>
          ` : `
            <div class="projects-masonry">
              ${projects.map(project => `
                <article class="project-card" data-id="${project.id}">
                  <!-- Interactive Macro Loupe Image Container -->
                  <div class="project-media-wrap" data-macro="${project.macroImage}">
                    <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
                    <div class="project-category-badge">${project.category}</div>
                    <div class="macro-loupe" style="background-image: url('${project.macroImage}');"></div>
                  </div>

                  <div class="project-details">
                    <div class="project-header-row">
                      <h3 class="project-title">${project.title}</h3>
                      <span class="project-client">${project.client}</span>
                    </div>

                    <div class="project-subtitle">${project.subtitle}</div>
                    <p class="project-desc">${project.description}</p>

                    <!-- Client Quote Callout -->
                    <blockquote style="margin: 0 0 1.25rem 0; padding: 0.75rem 1rem; background: var(--bg-card); border-left: 3px solid var(--accent-copper); border-radius: 0.35rem; font-size: 0.825rem; font-style: italic; color: var(--text-secondary); line-height: 1.45;">
                      ${project.quote}
                      <footer style="margin-top: 0.35rem; font-style: normal; font-weight: 600; font-size: 0.75rem; color: var(--text-primary);">— ${project.author}</footer>
                    </blockquote>

                    <!-- Performance Metrics -->
                    <div class="project-metrics-grid">
                      ${project.metrics.map(m => `
                        <div class="metric-cell">
                          <div class="metric-val">${m.value}</div>
                          <div class="metric-lbl">${m.label}</div>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Expandable Technical Spec Drawer -->
                    <div class="project-spec-toggle" data-target="spec-${project.id}">
                      <span>Technical Substrate & Dieline Specs</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    <div class="project-specs-body" id="spec-${project.id}">
                      <div class="spec-list">
                        <div class="spec-row">
                          <strong>Substrate</strong>
                          <span>${project.specs.substrate}</span>
                        </div>
                        <div class="spec-row">
                          <strong>Finishes & Print</strong>
                          <span>${project.specs.finish}</span>
                        </div>
                        <div class="spec-row">
                          <strong>Closure Type</strong>
                          <span>${project.specs.closure}</span>
                        </div>
                        <div class="spec-row">
                          <strong>Dimensions & MOQ</strong>
                          <span>${project.specs.dimensions} • ${project.specs.moq}</span>
                        </div>
                        <div class="spec-row" style="grid-column: span 2;">
                          <strong>Sustainability</strong>
                          <span>${project.specs.sustainability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
          `}

          <!-- Bottom Audit Banner -->
          <div style="margin-top: 3.5rem; background: var(--bg-dark); color: #FFF; border-radius: 0.85rem; padding: 2rem 2.5rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div>
              <h3 style="color: #FFF; font-size: 1.35rem; margin-bottom: 0.25rem;">Have a unique product geometry?</h3>
              <p style="color: var(--text-light-muted); font-size: 0.875rem;">Book a structural packaging audit or request custom CAD dieline mockups.</p>
            </div>
            <button class="btn-primary btn-copper" id="case-study-audit-btn">
              <span>Book Packaging Audit</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Category tabs
    const tabs = container.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-category');
        if (cat !== currentFilter) {
          currentFilter = cat;
          tactileAudio.playCardSelect();
          renderHTML();
        }
      });
    });

    // Search input
    const searchInput = container.querySelector('#case-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderHTML();
        // Keep focus
        const newSearch = container.querySelector('#case-search-input');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
        }
      });
    }

    // Reset button
    const resetBtn = container.querySelector('#reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentFilter = 'All';
        searchQuery = '';
        renderHTML();
      });
    }

    // Spec toggles
    const toggles = container.querySelectorAll('.project-spec-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const targetId = toggle.getAttribute('data-target');
        const body = document.getElementById(targetId);
        if (body) {
          const isOpen = body.classList.contains('open');
          body.classList.toggle('open');
          tactileAudio.playDrawerSlide();
          toggle.querySelector('svg').style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    });

    // Macro loupe
    const mediaWraps = container.querySelectorAll('.project-media-wrap');
    mediaWraps.forEach(wrap => {
      const loupe = wrap.querySelector('.macro-loupe');
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        loupe.style.left = `${x}px`;
        loupe.style.top = `${y}px`;

        const zoomFactor = 2.2;
        const bgWidth = rect.width * zoomFactor;
        const bgHeight = rect.height * zoomFactor;
        const bgX = -((x * zoomFactor) - (loupe.offsetWidth / 2));
        const bgY = -((y * zoomFactor) - (loupe.offsetHeight / 2));

        loupe.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        loupe.style.backgroundPosition = `${bgX}px ${bgY}px`;
      });
    });

    // Audit trigger
    const auditBtn = container.querySelector('#case-study-audit-btn');
    if (auditBtn) {
      auditBtn.addEventListener('click', () => {
        tactileAudio.playCardSelect();
        openAuditModal();
      });
    }
  }

  renderHTML();
}
