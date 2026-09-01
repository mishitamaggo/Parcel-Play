import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHeader(container, state) {
  container.innerHTML = `
    <header class="site-header" id="main-header">
      <div class="container header-inner">
        <!-- Logo -->
        <a href="#/" class="brand-logo" id="header-logo-btn">
          <span class="brand-name">Parcel Play</span>
        </a>

        <!-- Navigation Links -->
        <nav>
          <ul class="nav-links">
            <li><a href="#/case-studies" class="nav-link" data-route="/case-studies">Case Studies</a></li>
            <li><a href="#/how-we-work" class="nav-link" data-route="/how-we-work">How We Work</a></li>
            <li><a href="#/material-library" class="nav-link" data-route="/material-library">Material Library</a></li>
            <li><a href="#/cost-estimator" class="nav-link" data-route="/cost-estimator">Cost Estimator</a></li>
            <li><a href="#/studio-journal" class="nav-link" data-route="/studio-journal">Studio Journal</a></li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Audio Toggle -->
          <button class="audio-toggle-btn active" id="audio-toggle" title="Tactile Sound Feedback" aria-label="Toggle Tactile Sounds">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>

          <!-- Sample Kit Bag Badge -->
          <button class="sample-bag-btn" id="open-sample-drawer-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Sample Box</span>
            <span class="sample-count-badge" id="sample-badge-count">${state.sampleKit.length}</span>
          </button>

          <!-- Book Audit Trigger -->
          <button class="btn-primary" id="header-audit-btn">
            <span>Book Audit</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;

  // Scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Audio Toggle event
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isMuted = tactileAudio.toggleMute();
      if (isMuted) {
        audioBtn.classList.remove('active');
        audioBtn.innerHTML = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        `;
      } else {
        audioBtn.classList.add('active');
        audioBtn.innerHTML = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        `;
        tactileAudio.playCardSelect();
      }
    });
  }
}
