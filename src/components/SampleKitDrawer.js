import { tactileAudio } from '../utils/audio.js?v=2.0';

export function createSampleKitDrawer(state, onStateChange) {
  let drawerContainer = document.getElementById('sample-drawer-container');
  if (!drawerContainer) {
    drawerContainer = document.createElement('div');
    drawerContainer.id = 'sample-drawer-container';
    drawerContainer.className = 'sample-drawer-overlay';
    document.body.appendChild(drawerContainer);
  }

  function renderDrawer() {
    drawerContainer.innerHTML = `
      <div class="sample-drawer">
        <!-- Header -->
        <div class="drawer-header">
          <div>
            <span class="sub-tag" style="margin-bottom: 0;">Physical Swatch Box</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.15rem;">Complimentary Swatch Pack</h3>
          </div>
          <button class="modal-close-btn" id="close-sample-drawer-btn" style="position: static;" aria-label="Close drawer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="drawer-body">
          <div style="background: rgba(194, 99, 56, 0.08); border: 1px solid var(--border-copper); border-radius: 0.5rem; padding: 0.85rem; margin-bottom: 1.25rem;">
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45;">
              Curate up to <strong>5 physical substrate swatches</strong>. We mill and deliver a custom presentation box directly to your Indian office/studio free of charge.
            </p>
          </div>

          <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; color: var(--text-muted);">
            Selected Substrates (${state.sampleKit.length}/5)
          </h4>

          <div id="drawer-swatch-list">
            ${state.sampleKit.length === 0 ? `
              <div style="text-align: center; padding: 2.5rem 1rem; border: 1px dashed var(--border-medium); border-radius: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">
                Your sample box is empty.<br>Browse the <a href="#/material-library" style="color: var(--accent-copper); font-weight: 600;">Material Library</a> to add swatches!
              </div>
            ` : state.sampleKit.map(item => `
              <div class="sample-item-card">
                <div class="sample-item-info">
                  <img src="${item.textureImage}" alt="${item.name}" class="sample-mini-img" />
                  <div>
                    <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.1rem;">${item.name}</h5>
                    <span style="font-size: 0.72rem; color: var(--accent-copper); font-weight: 500;">${item.weight} • ${item.category}</span>
                  </div>
                </div>
                <button class="sample-remove-btn" data-remove-id="${item.id}" title="Remove from sample kit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Dispatch Form -->
          <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-light);">
            <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; color: var(--text-muted);">
              PAN-India Delivery Address
            </h4>

            <form id="drawer-dispatch-form" style="display: flex; flex-direction: column; gap: 0.65rem;">
              <input type="text" required placeholder="Recipient Full Name" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
              <input type="email" required placeholder="Work Email (.in / company)" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
              <input type="tel" required placeholder="Mobile Number (+91)" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
              <input type="text" required placeholder="Studio / Office Street Address" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
                <input type="text" required placeholder="City (e.g. Bengaluru)" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
                <input type="text" required placeholder="PIN Code (6 digits)" maxlength="6" class="newsletter-input" style="color: var(--text-primary); background: var(--bg-surface); border: 1px solid var(--border-medium);" />
              </div>

              <button type="submit" class="btn-primary btn-copper" style="margin-top: 0.75rem; justify-content: center; padding: 0.75rem;" ${state.sampleKit.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span>Dispatch Complimentary Swatch Pack</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="drawer-footer">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
            <span>Courier: BlueDart / Delhivery Express</span>
            <span style="color: var(--accent-copper); font-weight: 700;">₹0 Free Shipping</span>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    const closeBtn = drawerContainer.querySelector('#close-sample-drawer-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeDrawer());
    }

    // Remove buttons
    const removeBtns = drawerContainer.querySelectorAll('[data-remove-id]');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-id');
        const idx = state.sampleKit.findIndex(i => i.id === id);
        if (idx !== -1) {
          state.sampleKit.splice(idx, 1);
          tactileAudio.playCardSelect();
          onStateChange();
          renderDrawer();
        }
      });
    });

    // Form submit
    const form = drawerContainer.querySelector('#drawer-dispatch-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        tactileAudio.playFoilShimmer();
        alert('📦 Swatch Box Dispatch Queued! Your complimentary physical presentation kit will be delivered to your studio within 3 business days.');
        closeDrawer();
      });
    }
  }

  function openDrawer() {
    drawerContainer.classList.add('open');
    renderDrawer();
  }

  function closeDrawer() {
    drawerContainer.classList.remove('open');
  }

  drawerContainer.addEventListener('click', (e) => {
    if (e.target === drawerContainer) {
      closeDrawer();
    }
  });

  return {
    open: openDrawer,
    close: closeDrawer
  };
}
