import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHowWeWorkPage(container, openAuditModal) {
  const steps = [
    {
      num: '01',
      title: 'Structural CAD & Dieline Engineering',
      desc: 'We analyze your product dimensions, drop-protection requirements, and transit tolerances across Indian courier networks to generate precision CAD dielines that eliminate volumetric air waste.',
      details: 'Turnaround: 2–3 Business Days • 1:1 Vector CAD & 3D digital mockup'
    },
    {
      num: '02',
      title: 'Substrate & Embellishment Curation',
      desc: 'Choose from FSC-certified Indian Kappa boards, tree-free Jaipur virgin cottons, molded bamboo-sugarcane bagasse, and heated foil embellishments. We test foil stamp adhesion and hinge tension.',
      details: 'Curated library of 20+ luxury boards & 100% recyclable molded pulps'
    },
    {
      num: '03',
      title: 'Physical Pre-Production Proofing',
      desc: 'Before full manufacturing, we produce and dispatch actual physical proof samples directly to your studio via BlueDart / Delhivery Express so you can test tactile weight, closure acoustics, and assembly speed.',
      details: 'Delivered in 3–5 business days • 100% pre-press verified'
    },
    {
      num: '04',
      title: 'Precision High-Speed Production',
      desc: 'Your approved order enters automated die-cutting, embossing, rigid wrapping, and automated QC inspection with PAN-India freight delivery straight to your 3PL fulfillment warehouse.',
      details: 'Standard lead time: 10–16 business days • 100% GST ITC Invoicing'
    }
  ];

  const faqs = [
    {
      q: 'What is your minimum order quantity (MOQ) in India?',
      a: 'Our standard production minimum is 500 units per format for custom rigid magnetic boxes and corrugated mailers, with zero die-line tooling surcharges.'
    },
    {
      q: 'Are your invoices 100% GST compliant?',
      a: 'Yes, all invoices are issued with valid 18% GST HSN tax codes (4819 / 4820) so your company can claim full Input Tax Credit (ITC).'
    },
    {
      q: 'Can you provide free dieline templates for our design team?',
      a: 'Yes! Once you share your product dimensions or packaging requirements, our engineering team in Bengaluru supplies exact 1:1 CAD vector dielines (.AI, .PDF, .DXF).'
    },
    {
      q: 'How does the Packaging Audit process work?',
      a: 'You share your current packaging formats and shipment volume. We perform a 25-point teardown covering unboxing presentation, durability, and carrier volumetric weight surcharges.'
    },
    {
      q: 'Are your packaging solutions compliant with Indian Plastic EPR norms?',
      a: 'Yes, all our molded pulp cradles, Kappa paperboards, cotton papers, and water-activated sealing tapes are 100% plastic-free and fully exempt from plastic EPR levies.'
    }
  ];

  function renderHTML() {
    container.innerHTML = `
      <!-- Page Hero Header -->
      <header class="page-hero">
        <div class="container">
          <span class="sub-tag">Studio Methodology</span>
          <h1 class="page-title">How We Collaborate in India</h1>
          <p class="page-lead">
            From ready-to-run production orders to full-scale unboxing teardowns, we offer two distinct engagement paths tailored for Indian D2C and luxury brands.
          </p>
        </div>
      </header>

      <!-- Dual Pathways In-Depth -->
      <section class="section-container" style="background: var(--bg-primary); padding: 3.5rem 0;">
        <div class="container">
          <div class="pathways-grid">
            <!-- Pathway 1: Production SKUs -->
            <div class="pathway-card">
              <div>
                <span class="pathway-badge">Pathway 01 • Production</span>
                <h3 class="pathway-headline">Custom Packaging Manufacturing</h3>
                <p class="pathway-desc">
                  Ideal for brands that have existing brand artwork or established dimensions and need reliable, high-volume production with low minimums.
                </p>

                <div style="background: var(--bg-card); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
                  <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-copper); margin-bottom: 0.25rem;">Best For</div>
                  <div style="font-size: 0.85rem; color: var(--text-primary); font-weight: 500;">Indian D2C brands, luxury apparel houses, and seasonal product launches needing 500 to 50,000+ units.</div>
                </div>

                <ul class="pathway-features">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>500 Unit Minimums:</strong> Accessible entry points with zero tooling surcharges.</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>10–16 Day Turnaround:</strong> High-speed Indian manufacturing and PAN-India delivery.</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>Free Physical Proofs:</strong> Pre-production verification sample included.</span>
                  </li>
                </ul>
              </div>

              <a href="#/cost-estimator" class="btn-primary btn-copper" style="margin-top: 1rem;">
                <span>Configure SKUs & Instant Quote (₹)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>

            <!-- Pathway 2: Studio Advisory & Audits -->
            <div class="pathway-card featured">
              <div>
                <span class="pathway-badge">Pathway 02 • Advisory</span>
                <h3 class="pathway-headline">Studio Design & Courier Audits</h3>
                <p class="pathway-desc">
                  A high-touch structural engagement. We dismantle your current unboxing experience, eliminate volumetric courier fees, and engineer bespoke structures from scratch.
                </p>

                <div style="background: rgba(255,255,255,0.08); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
                  <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-copper-light); margin-bottom: 0.25rem;">Best For</div>
                  <div style="font-size: 0.85rem; color: #FFF; font-weight: 500;">Founders and creative teams seeking to elevate brand presence, cut carrier fees, or eliminate plastic.</div>
                </div>

                <ul class="pathway-features">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>25-Point Teardown:</strong> Tactile heft, drop resistance, and acoustic analysis.</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>Volumetric Freight Audit:</strong> Save ₹18–₹35 per package in carrier fees.</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>White-Glove Mockups:</strong> 3 rounds of physical prototypes delivered to your door.</span>
                  </li>
                </ul>
              </div>

              <button class="btn-primary" id="work-audit-btn" style="background: #FFF; color: #111; border-color: #FFF; margin-top: 1rem;">
                <span>Book a Diagnostic Audit</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 4-Stage Process Timeline -->
      <section class="section-container" style="background: var(--bg-secondary); padding: 4.5rem 0;">
        <div class="container">
          <div class="section-header">
            <span class="sub-tag">The 4-Stage Process</span>
            <h2 class="section-title">From initial CAD concept to your warehouse.</h2>
            <p class="section-subtext">Our rigorous engineering pipeline ensures millimeter precision at every step.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2.5rem;">
            ${steps.map(step => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 0.85rem; padding: 1.5rem; display: flex; flex-direction: column;">
                <div style="font-size: 1.75rem; font-weight: 800; color: var(--accent-copper); margin-bottom: 0.5rem;">${step.num}</div>
                <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.3;">${step.title}</h4>
                <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem; flex: 1;">${step.desc}</p>
                <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-light); font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${step.details}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="section-container" style="background: var(--bg-primary); padding: 4.5rem 0;">
        <div class="container" style="max-width: 820px;">
          <div class="section-header">
            <span class="sub-tag">Common Indian D2C Questions</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
            ${faqs.map(f => `
              <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 0.65rem; padding: 1.25rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-primary);">${f.q}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    const auditBtn = container.querySelector('#work-audit-btn');
    if (auditBtn) {
      auditBtn.addEventListener('click', () => {
        tactileAudio.playCardSelect();
        openAuditModal();
      });
    }
  }

  renderHTML();
}
