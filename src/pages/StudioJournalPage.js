import { JOURNAL_ARTICLES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderStudioJournalPage(container, onReadArticle) {
  let currentCategory = 'All';
  const categories = ['All', 'Design Strategy', 'Production & Logistics', 'Sustainable Materials'];

  function getFilteredArticles() {
    if (currentCategory === 'All') return JOURNAL_ARTICLES;
    return JOURNAL_ARTICLES.filter(a => a.category === currentCategory);
  }

  function renderHTML() {
    const articles = getFilteredArticles();
    const featured = articles[0] || JOURNAL_ARTICLES[0];

    container.innerHTML = `
      <!-- Page Hero Header -->
      <header class="page-hero">
        <div class="container">
          <span class="sub-tag">Studio Publications</span>
          <h1 class="page-title">Studio Journal & Case Teardowns</h1>
          <p class="page-lead">
            In-depth structural packaging essays, substrate breakdowns, and unboxing teardowns for founders and packaging designers.
          </p>

          <!-- Category Filter Bar -->
          <div class="filter-tabs-wrap" style="margin-top: 1.75rem; margin-bottom: 0; justify-content: flex-start;">
            ${categories.map(cat => `
              <button class="filter-tab ${cat === currentCategory ? 'active' : ''}" data-journal-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
      </header>

      <!-- Main Journal Section -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 3rem 0 5rem;">
        <div class="container">
          <!-- Featured Lead Story Card -->
          <div class="featured-journal-banner" data-id="${featured.id}" style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; overflow: hidden; margin-bottom: 2.5rem; display: grid; grid-template-columns: 1.15fr 1fr; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="height: 100%; min-height: 280px; background: var(--bg-card); overflow: hidden;">
              <img src="${featured.image}" alt="${featured.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                  <span class="sub-tag" style="margin-bottom: 0;">Featured Teardown</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">• ${featured.readTime}</span>
                </div>
                <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.25;">${featured.title}</h2>
                <h4 style="font-size: 0.9rem; color: var(--accent-copper-dark); font-weight: 500; margin-bottom: 1rem;">${featured.subtitle}</h4>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55;">${featured.excerpt}</p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid var(--border-light); margin-top: 1.25rem;">
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Published by Parcel Play Studio</span>
                <span class="read-more-link">
                  <span>Read Full Teardown</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </div>
          </div>

          <!-- All Journal Articles Grid -->
          <div class="journal-grid">
            ${articles.map(article => `
              <article class="journal-card" data-id="${article.id}">
                <div class="journal-img-wrap">
                  <img src="${article.image}" alt="${article.title}" class="journal-img" loading="lazy" />
                </div>
                <div class="journal-body">
                  <div class="journal-meta">
                    <span>${article.category}</span>
                    <span>${article.readTime}</span>
                  </div>
                  <h3 class="journal-title">${article.title}</h3>
                  <p class="journal-excerpt">${article.excerpt}</p>
                  <div class="read-more-link">
                    <span>Read Article</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
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
    // Filter buttons
    const tabs = container.querySelectorAll('[data-journal-cat]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-journal-cat');
        if (cat !== currentCategory) {
          currentCategory = cat;
          tactileAudio.playCardSelect();
          renderHTML();
        }
      });
    });

    // Article cards & featured banner
    const cards = container.querySelectorAll('.journal-card, .featured-journal-banner');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const article = JOURNAL_ARTICLES.find(a => a.id === id);
        if (article) {
          tactileAudio.playDrawerSlide();
          onReadArticle(article);
        }
      });
    });
  }

  renderHTML();
}
