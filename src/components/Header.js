import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHeader(container, state) {
  container.innerHTML = `
    <header class="site-header" id="main-header">
      <div class="container header-inner">
        <!-- Logo -->
        <a href="#/" class="brand-logo" id="header-logo-btn">
          <div class="logo-mark-wrap">
            <svg class="logo-mark-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12 L85 30 L85 70 L50 88 L15 70 L15 30 Z" fill="#1C1E24" stroke="#121316" stroke-width="4" stroke-linejoin="round"/>
              <path d="M50 16 L80 32 L50 48 L20 32 Z" fill="#E4E6EB" stroke="#1C1E24" stroke-width="2.5"/>
              <path d="M50 48 L80 32 L80 66 L50 82 Z" fill="#D2D5DC" stroke="#1C1E24" stroke-width="2.5"/>
              <path d="M20 32 L50 48 L50 82 L20 66 Z" fill="#262A34" stroke="#1C1E24" stroke-width="2.5"/>
              <path d="M63 23 L74 29 L46 44 L35 38 Z" fill="url(#copperTapeGrad)" stroke="#9C5535" stroke-width="1"/>
              <path d="M74 29 L74 38 L50 51 L50 42 Z" fill="url(#copperTapeSideGrad)" opacity="0.9"/>
              <path d="M22 28 L48 28 C58 28 64 34 64 42 C64 50 58 56 48 56 L35 56 L35 76 L22 76 Z" fill="none" stroke="#121316" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 28 L48 28 C58 28 64 34 64 42 C64 50 58 56 48 56 L35 56 L35 76 L22 76 Z" fill="none" stroke="#E2E5EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="copperTapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#9C5535"/>
                  <stop offset="35%" stop-color="#E29E7A"/>
                  <stop offset="60%" stop-color="#FFFFFF"/>
                  <stop offset="70%" stop-color="#C26338"/>
                  <stop offset="100%" stop-color="#844528"/>
                </linearGradient>
                <linearGradient id="copperTapeSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#844528"/>
                  <stop offset="100%" stop-color="#C26338"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">Parcel Play <span style="font-size: 0.75rem; font-weight: 600; color: var(--accent-copper);">.in</span></span>
            <span class="brand-tagline">Packaging & Material Studio India</span>
          </div>
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
