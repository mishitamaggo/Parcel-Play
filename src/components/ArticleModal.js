import { tactileAudio } from '../utils/audio.js?v=2.0';

export function createArticleModal() {
  let modalContainer = document.getElementById('article-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'article-modal-container';
    document.body.appendChild(modalContainer);
  }

  function renderModal(article = null) {
    if (!article) {
      modalContainer.innerHTML = '';
      return;
    }

    modalContainer.innerHTML = `
      <div class="modal-backdrop open" id="article-backdrop">
        <div class="modal-card" style="max-width: 740px;">
          <button class="modal-close-btn" id="article-close-btn" aria-label="Close article">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div style="height: 240px; width: 100%; overflow: hidden; background: var(--bg-card); position: relative;">
            <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 1rem; left: 1.5rem; background: rgba(18, 19, 22, 0.85); backdrop-filter: blur(8px); padding: 0.3rem 0.75rem; border-radius: 2rem;">
              <span class="sub-tag" style="color: #FFF; margin-bottom: 0;">${article.category} • ${article.readTime}</span>
            </div>
          </div>

          <div class="modal-content-inner" style="padding: 2rem 2.25rem;">
            <span class="sub-tag">${article.date} • Studio Journal</span>
            <h2 style="font-size: 1.65rem; font-weight: 700; line-height: 1.25; margin: 0.35rem 0 0.5rem;">${article.title}</h2>
            <h4 style="font-size: 0.95rem; color: var(--accent-copper-dark); font-weight: 500; margin-bottom: 1.5rem;">${article.subtitle}</h4>

            <!-- Key Stats Highlight Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; padding: 1rem; background: var(--bg-card); border-radius: 0.75rem; margin-bottom: 1.75rem;">
              ${article.keyStats.map(s => `
                <div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-copper);">${s.stat}</div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3; margin-top: 0.2rem;">${s.label}</div>
                </div>
              `).join('')}
            </div>

            <!-- Article Body -->
            <div class="editorial-article-body" style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
              ${article.content}
            </div>

            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="display: block; font-size: 0.95rem; font-weight: 600;">Parcel Play Studio Journal</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Published for founders and packaging designers.</span>
              </div>
              <button class="btn-primary" id="article-done-btn" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
                <span>Close Article</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    const backdrop = document.getElementById('article-backdrop');
    const closeBtn = document.getElementById('article-close-btn');
    const doneBtn = document.getElementById('article-done-btn');

    const close = () => {
      tactileAudio.playDrawerSlide();
      renderModal(null);
    };

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (doneBtn) doneBtn.addEventListener('click', close);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close();
      });
    }
  }

  return {
    open: (article) => {
      tactileAudio.playDrawerSlide();
      renderModal(article);
    }
  };
}
