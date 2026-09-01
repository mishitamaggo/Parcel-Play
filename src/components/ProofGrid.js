import { CASE_STUDIES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderProofGrid(container) {
  const categories = ['All', 'Kinetic & Bloom', 'Plantable Eco-Luxury', 'Bridal & Festive Trousseau', 'Rigid Boxes', 'Corrugated Mailers', 'Molded Pulp & Trays', 'Foil Tape & Bands'];
  let currentFilter = 'All';

  function getFilteredProjects() {
    if (currentFilter === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter(p => p.category === currentFilter);
  }

  function renderHTML() {
    const projects = getFilteredProjects();

    container.innerHTML = `
      <section class="proof-section" id="proof">
        <div class="container">
          <div class="section-header">
            <span class="sub-tag">Selected Case Studies</span>
            <h2 class="section-title">Engineered to make an impression.</h2>
            <p class="section-subtext">
              See how we translate brand identity into physical structures, tactile substrates, and seamless unboxing experiences.
            </p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="filter-tabs-wrap">
            ${categories.map(cat => `
              <button class="filter-tab ${cat === currentFilter ? 'active' : ''}" data-category="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Masonry Case Studies Grid -->
          <div class="projects-masonry" id="projects-grid">
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
                    </div>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Filter click handlers
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

    // Technical specs accordion toggle
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

    // Macro Zoom Loupe Magnifier Logic
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
  }

  renderHTML();
}
