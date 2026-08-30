import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderDualPathways(container, openAuditModal) {
  container.innerHTML = `
    <section class="pathways-section" id="pathways">
      <div class="container">
        <div class="section-header">
          <span class="sub-tag">How We Work</span>
          <h2 class="section-title">Two ways to collaborate.</h2>
          <p class="section-subtext">
            Whether you need production-ready SKUs for your next run or a complete packaging overhaul led by our structural team.
          </p>
        </div>

        <div class="pathways-grid">
          <!-- Pathway 1: Production SKUs -->
          <div class="pathway-card">
            <div>
              <span class="pathway-badge">Production SKUs</span>
              <h3 class="pathway-headline">Custom Packaging Manufacturing</h3>
              <p class="pathway-desc">
                High-volume, precision-manufactured mailer boxes, rigid magnetic boxes, custom foil tape, and custom inserts ready for production.
              </p>

              <ul class="pathway-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Accessible Minimums:</strong> Start from 500 units per format with zero dieline tooling penalties.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Fast Turnaround:</strong> Production in 12–18 business days with door-to-door freight.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Complimentary Dielines:</strong> CAD vector templates calibrated to your exact product dimensions.</span>
                </li>
              </ul>
            </div>

            <a href="#calculator" class="btn-primary btn-copper" id="pathway-sku-cta">
              <span>Configure SKUs & Pricing</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <!-- Pathway 2: Studio Design & Audits -->
          <div class="pathway-card featured">
            <div>
              <span class="pathway-badge">Studio Advisory</span>
              <h3 class="pathway-headline">Packaging Design & Audits</h3>
              <p class="pathway-desc">
                A collaborative design engagement. We review your current packaging, audit freight efficiency, and design a custom unboxing experience from scratch.
              </p>

              <ul class="pathway-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Packaging Teardown:</strong> Comprehensive review of substrate durability, opening sequence, and customer ergonomics.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Freight Optimization:</strong> Tight dieline engineering designed to eliminate excess carrier dimensional charges.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Physical Prototypes:</strong> White-glove structural mockups and printed samples delivered directly to your office.</span>
                </li>
              </ul>
            </div>

            <button class="btn-primary" id="pathway-audit-cta" style="background: #FFFFFF; color: #121316; border-color: #FFFFFF;">
              <span>Book a Packaging Audit</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach button events
  const auditBtn = container.querySelector('#pathway-audit-cta');
  if (auditBtn) {
    auditBtn.addEventListener('click', () => {
      tactileAudio.playCardSelect();
      openAuditModal();
    });
  }

  const skuBtn = container.querySelector('#pathway-sku-cta');
  if (skuBtn) {
    skuBtn.addEventListener('click', () => {
      tactileAudio.playCardSelect();
    });
  }
}
