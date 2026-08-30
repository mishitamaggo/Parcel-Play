import { JOURNAL_ARTICLES } from '../data/mockData.js?v=2.0';
import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderJournalEditorial(container, onReadArticle) {
  container.innerHTML = `
    <section class="journal-section" id="journal">
      <div class="container">
        <div class="section-header">
          <span class="sub-tag">Studio Journal</span>
          <h2 class="section-title">Insights on structural packaging.</h2>
          <p class="section-subtext">
            Practical guides, substrate breakdowns, and unboxing case studies written by our packaging engineers.
          </p>
        </div>

        <div class="journal-grid">
          ${JOURNAL_ARTICLES.map(article => `
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

  // Attach card click handlers
  const cards = container.querySelectorAll('.journal-card');
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
