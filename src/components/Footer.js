import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderFooter(container, openAuditModal) {
  container.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-grid">
          <!-- Column 1: Studio & Description -->
          <div>
            <h3 class="footer-brand-title">Parcel Play <span style="font-size: 0.85rem; font-weight: 500; color: var(--accent-copper-light);">(.in)</span></h3>
            <p class="footer-brand-desc">
              Custom packaging design studio and material house for Indian D2C & luxury brands. We engineer rigid Kappa boxes, fluted mailers, and zero-plastic pulp packaging with PAN-India delivery.
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span class="sub-tag" style="background: rgba(255,255,255,0.08); padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.12); color: var(--accent-copper-light);">FSC Certified</span>
              <span class="sub-tag" style="background: rgba(255,255,255,0.08); padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.12); color: var(--accent-copper-light);">EPR Compliant</span>
              <span class="sub-tag" style="background: rgba(255,255,255,0.08); padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.12); color: var(--accent-copper-light);">100% Recyclable</span>
            </div>
          </div>

          <!-- Column 2: Packaging Solutions -->
          <div>
            <h4 class="footer-col-title">Packaging SKUs (INR ₹)</h4>
            <ul class="footer-nav-list">
              <li><a href="#/sku/rigid-magnetic-boxes">Rigid Magnetic Boxes</a></li>
              <li><a href="#/sku/corrugated-mailers">Corrugated Mailers</a></li>
              <li><a href="#/sku/precision-slide-drawers">Precision Slide Drawers</a></li>
              <li><a href="#/sku/molded-cellulose-trays">Molded Cellulose Trays</a></li>
              <li><a href="#/sku/custom-foil-tape">Custom Foil Sealing Tape</a></li>
            </ul>
          </div>

          <!-- Column 3: Studio & Services -->
          <div>
            <h4 class="footer-col-title">Studio Pages</h4>
            <ul class="footer-nav-list">
              <li><a href="#/case-studies">Case Studies & Dielines</a></li>
              <li><a href="#/how-we-work">How We Work & Timeline</a></li>
              <li><a href="#/material-library">Material Swatch Deck</a></li>
              <li><a href="#/cost-estimator">Instant Cost Estimator</a></li>
              <li><a href="#/studio-journal">Studio Journal & Guides</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div>
            <h4 class="footer-col-title">Studio Journal Dispatch</h4>
            <p style="font-size: 0.85rem; color: var(--text-light-muted); margin-bottom: 1rem; line-height: 1.5;">
              Monthly Indian D2C substrate breakthroughs, structural dielines, and unboxing case studies.
            </p>
            <form id="footer-newsletter-form" class="newsletter-form">
              <input type="email" required placeholder="founder@yourbrand.in" class="newsletter-input" />
              <button type="submit" class="btn-primary btn-copper" style="padding: 0.6rem 1rem; font-size: 0.8rem; justify-content: center;">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="footer-bottom-row">
          <div>
            © 2026 Parcel Play Packaging Studio Pvt. Ltd. (parcelplay.in). GST Registered.
          </div>
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <span>Bengaluru</span>
            <span>Mumbai</span>
            <span>New Delhi</span>
            <span>Ahmedabad</span>
            <span>Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Newsletter handler
  const form = container.querySelector('#footer-newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      tactileAudio.playFoilShimmer();
      alert('✨ You are subscribed to the Parcel Play India Studio Newsletter.');
      form.reset();
    });
  }
}
