import { tactileAudio } from '../utils/audio.js?v=2.0';

export function createAuditModal() {
  let modalEl = document.getElementById('audit-modal-container');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'audit-modal-container';
    modalEl.className = 'modal-backdrop';
    document.body.appendChild(modalEl);
  }

  let currentStep = 1;
  const auditState = {
    category: '',
    painPoint: '',
    volume: '',
    name: '',
    email: '',
    phone: '',
    cityPin: '',
    brand: '',
    notes: ''
  };

  function renderModalContent() {
    modalEl.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" id="close-audit-modal-btn" aria-label="Close modal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-content-inner">
          <!-- Step indicator -->
          <div class="audit-step-indicator">
            <div class="step-pip ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-pip ${currentStep >= 2 ? 'active' : ''}"></div>
            <div class="step-pip ${currentStep >= 3 ? 'active' : ''}"></div>
          </div>

          ${currentStep === 1 ? `
            <span class="sub-tag">Step 01 • Product Category</span>
            <h2 class="audit-question-title">What type of packaging does your brand need?</h2>
            <p class="audit-question-sub">Select your primary product category to tailor dieline tolerances and substrate recommendations.</p>

            <div class="audit-choice-grid">
              <button class="audit-choice-btn ${auditState.category === 'Luxury Fragrance & Beauty' ? 'selected' : ''}" data-val="Luxury Fragrance & Beauty">
                <span>Luxury Fragrance, Skincare & Cosmetics</span>
                <span>✨</span>
              </button>
              <button class="audit-choice-btn ${auditState.category === 'Jewelry & Watches' ? 'selected' : ''}" data-val="Jewelry & Watches">
                <span>Fine Jewelry, Gems & Timepieces</span>
                <span>💍</span>
              </button>
              <button class="audit-choice-btn ${auditState.category === 'D2C Apparel & Footwear' ? 'selected' : ''}" data-val="D2C Apparel & Footwear">
                <span>D2C Apparel, Textiles & Footwear</span>
                <span>👕</span>
              </button>
              <button class="audit-choice-btn ${auditState.category === 'Festive Hampers & Food' ? 'selected' : ''}" data-val="Festive Hampers & Food">
                <span>Festive Gift Hampers, Confectionery & Tea</span>
                <span>🎁</span>
              </button>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
              <button class="btn-primary btn-copper" id="step1-next-btn" ${!auditState.category ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <span>Continue to Step 2</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          ` : currentStep === 2 ? `
            <span class="sub-tag">Step 02 • Packaging Priorities & Volume</span>
            <h2 class="audit-question-title">What is your primary goal & volume tier?</h2>
            <p class="audit-question-sub">We calibrate structural engineering based on your production requirements.</p>

            <div style="margin-bottom: 1.25rem;">
              <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Primary Objective</label>
              <div class="audit-choice-grid">
                <button class="audit-choice-btn ${auditState.painPoint === 'Elevate Unboxing & Social Share' ? 'selected' : ''}" data-pain="Elevate Unboxing & Social Share">
                  <span>Elevate Unboxing & Social Viral Share Rate</span>
                </button>
                <button class="audit-choice-btn ${auditState.painPoint === 'Eliminate Plastic & EPR Compliance' ? 'selected' : ''}" data-pain="Eliminate Plastic & EPR Compliance">
                  <span>Eliminate Plastic & Ensure 100% Indian EPR Compliance</span>
                </button>
                <button class="audit-choice-btn ${auditState.painPoint === 'Reduce Volumetric Courier Costs' ? 'selected' : ''}" data-pain="Reduce Volumetric Courier Costs">
                  <span>Reduce BlueDart / Delhivery Volumetric Courier Surcharges</span>
                </button>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Budget / Volume Allocation (INR ₹)</label>
              <div class="audit-choice-grid">
                <button class="audit-choice-btn ${auditState.volume === '< ₹1 Lakh (Pilot Run 500 units)' ? 'selected' : ''}" data-vol="< ₹1 Lakh (Pilot Run 500 units)">
                  <span>Under ₹1,00,000 (Pilot 500 units)</span>
                </button>
                <button class="audit-choice-btn ${auditState.volume === '₹1 Lakh - ₹5 Lakhs (Growth Tier)' ? 'selected' : ''}" data-vol="₹1 Lakh - ₹5 Lakhs (Growth Tier)">
                  <span>₹1,00,000 – ₹5,00,000 (1,000 to 5,000 units)</span>
                </button>
                <button class="audit-choice-btn ${auditState.volume === '₹5 Lakhs+ (Scale Production)' ? 'selected' : ''}" data-vol="₹5 Lakhs+ (Scale Production)">
                  <span>₹5,00,000+ (10,000+ units Enterprise)</span>
                </button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
              <button class="btn-secondary" id="step2-back-btn">
                <span>Back</span>
              </button>
              <button class="btn-primary btn-copper" id="step2-next-btn" ${(!auditState.painPoint || !auditState.volume) ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <span>Final Step</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          ` : `
            <span class="sub-tag">Step 03 • Contact & Brand Details</span>
            <h2 class="audit-question-title">Where should we send your CAD dielines?</h2>
            <p class="audit-question-sub">Our design engineering team will review your specifications and dispatch physical proof samples to your studio.</p>

            <form id="audit-final-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
                <div>
                  <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Full Name *</label>
                  <input type="text" required class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="e.g. Rahul Sharma" value="${auditState.name}" id="audit-input-name" />
                </div>
                <div>
                  <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Work Email (.in / company) *</label>
                  <input type="email" required class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="founder@brand.in" value="${auditState.email}" id="audit-input-email" />
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
                <div>
                  <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Mobile / WhatsApp (+91) *</label>
                  <input type="tel" required class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="+91 98765 43210" value="${auditState.phone}" id="audit-input-phone" />
                </div>
                <div>
                  <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">City & PIN Code *</label>
                  <input type="text" required class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="e.g. Bengaluru - 560001" value="${auditState.cityPin}" id="audit-input-citypin" />
                </div>
              </div>

              <div>
                <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Brand Name & Website</label>
                <input type="text" class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="e.g. Aurelia Fragrances (aurelia.in)" value="${auditState.brand}" id="audit-input-brand" />
              </div>

              <div>
                <label style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Packaging Dimensions & Notes (Optional)</label>
                <textarea rows="2" class="newsletter-input" style="width: 100%; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-medium);" placeholder="Dimensions in mm, bottle glass weights, special foil requirements...">${auditState.notes}</textarea>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <button type="button" class="btn-secondary" id="step3-back-btn">
                  <span>Back</span>
                </button>
                <button type="submit" class="btn-primary btn-copper" style="padding: 0.75rem 1.5rem;">
                  <span>Confirm Packaging Audit Booking</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </form>
          `}
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Close button
    const closeBtn = modalEl.querySelector('#close-audit-modal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal());
    }

    // Step 1 Category
    const catBtns = modalEl.querySelectorAll('[data-val]');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        auditState.category = btn.getAttribute('data-val');
        tactileAudio.playCardSelect();
        renderModalContent();
      });
    });

    const next1 = modalEl.querySelector('#step1-next-btn');
    if (next1) {
      next1.addEventListener('click', () => {
        currentStep = 2;
        tactileAudio.playDrawerSlide();
        renderModalContent();
      });
    }

    // Step 2 Pain Point & Volume
    const painBtns = modalEl.querySelectorAll('[data-pain]');
    painBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        auditState.painPoint = btn.getAttribute('data-pain');
        tactileAudio.playCardSelect();
        renderModalContent();
      });
    });

    const volBtns = modalEl.querySelectorAll('[data-vol]');
    volBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        auditState.volume = btn.getAttribute('data-vol');
        tactileAudio.playCardSelect();
        renderModalContent();
      });
    });

    const back2 = modalEl.querySelector('#step2-back-btn');
    if (back2) {
      back2.addEventListener('click', () => {
        currentStep = 1;
        tactileAudio.playDrawerSlide();
        renderModalContent();
      });
    }

    const next2 = modalEl.querySelector('#step2-next-btn');
    if (next2) {
      next2.addEventListener('click', () => {
        currentStep = 3;
        tactileAudio.playDrawerSlide();
        renderModalContent();
      });
    }

    // Step 3 Back
    const back3 = modalEl.querySelector('#step3-back-btn');
    if (back3) {
      back3.addEventListener('click', () => {
        currentStep = 2;
        tactileAudio.playDrawerSlide();
        renderModalContent();
      });
    }

    // Final form submission
    const form = modalEl.querySelector('#audit-final-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        tactileAudio.playFoilShimmer();
        alert(`🎉 Thank you, ${document.getElementById('audit-input-name').value}! Your Packaging Diagnostic Audit request has been queued. Our engineering team in Bengaluru will contact you via WhatsApp / email within 24 hours with custom CAD dieline vectors.`);
        closeModal();
      });
    }
  }

  function openModal() {
    currentStep = 1;
    modalEl.classList.add('open');
    renderModalContent();
  }

  function closeModal() {
    modalEl.classList.remove('open');
  }

  // Backdrop click to close
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  });

  return {
    open: openModal,
    close: closeModal
  };
}
