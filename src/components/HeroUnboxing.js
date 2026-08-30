import { tactileAudio } from '../utils/audio.js?v=2.0';

export function renderHeroUnboxing(container, state) {
  container.innerHTML = `
    <section class="hero-section" id="hero">
      <div class="container">
        <div class="hero-grid">
          <!-- Left Column: Studio Manifesto & Hook -->
          <div class="hero-content">
            <h1 class="hero-headline">
              Custom packaging built for the moments that matter.
            </h1>

            <p class="hero-description">
              We design and manufacture rigid Kappa presentation boxes, custom mailers, and zero-plastic pulp inserts for modern Indian D2C and luxury brands.
            </p>

            <div class="hero-ctas">
              <a href="#/cost-estimator" class="btn-primary btn-copper" id="hero-explore-skus-btn">
                <span>Configure SKUs in INR (₹)</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <button class="btn-secondary" id="hero-audit-trigger-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Book a Packaging Audit</span>
              </button>
            </div>

            <!-- Social Proof / Metrics Row -->
            <div class="hero-stats-row">
              <div class="hero-stat-item">
                <div class="stat-num">500+</div>
                <div class="stat-label">Indian SKUs Delivered</div>
              </div>
              <div class="hero-stat-item">
                <div class="stat-num">100%</div>
                <div class="stat-label">Plastic EPR Compliant</div>
              </div>
              <div class="hero-stat-item">
                <div class="stat-num">10–16<span>d</span></div>
                <div class="stat-label">PAN-India Dispatch</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive 3D Unboxing Stage -->
          <div class="stage-container" id="unboxing-stage">
            <div class="stage-header">
              <div class="stage-title-wrap">
                <span class="stage-badge">3D Box Preview</span>
                <span class="sub-tag">Rigid Magnetic Box</span>
              </div>
              <div class="stage-controls-hint">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Drag to rotate</span>
              </div>
            </div>

            <!-- 3D Canvas Box Container -->
            <div class="interactive-unboxing-viewport" id="viewport-3d">
              <canvas id="unboxing-canvas"></canvas>
            </div>

            <!-- Stage Controls -->
            <div class="stage-footer-controls">
              <!-- Finish Selector -->
              <div class="finish-selector-row">
                <span class="finish-label" id="current-finish-name">Finish: Obsidian + Copper Foil</span>
                <div class="finish-swatch-pills">
                  <button class="finish-pill active" data-finish="obsidian" title="Obsidian Velvet + Copper Foil"></button>
                  <button class="finish-pill" data-finish="bone" title="Virgin Cotton Bone + Gold Foil"></button>
                  <button class="finish-pill" data-finish="kraft" title="Raw Kraft Flute + Charcoal"></button>
                  <button class="finish-pill" data-finish="sage" title="Forest Sage Linen + Silver"></button>
                </div>
              </div>

              <!-- Lid Open Slider & Play Unboxing Button -->
              <div class="stage-action-bar">
                <div class="lid-slider-wrap">
                  <span class="lid-slider-label">Lid Lift</span>
                  <input type="range" min="0" max="100" value="15" class="lid-slider" id="lid-range-input" />
                  <span class="lid-slider-label" id="lid-percent-display">15%</span>
                </div>

                <button class="btn-choreography" id="play-unboxing-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Animate Box</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Initialize the 3D Canvas Unboxing Box
  init3DUnboxingBox();
}

function init3DUnboxingBox() {
  const canvas = document.getElementById('unboxing-canvas');
  const viewport = document.getElementById('viewport-3d');
  const slider = document.getElementById('lid-range-input');
  const percentDisplay = document.getElementById('lid-percent-display');
  const playBtn = document.getElementById('play-unboxing-btn');
  const finishNameDisplay = document.getElementById('current-finish-name');
  const finishPills = document.querySelectorAll('.finish-pill');

  if (!canvas || !viewport) return;

  const ctx = canvas.getContext('2d');

  // Finish definitions
  const FINISHES = {
    obsidian: {
      name: 'Obsidian Velvet + Copper Foil',
      boxColor: '#18191D',
      boxDarkColor: '#101114',
      boxLightColor: '#262932',
      foilColor: '#C26338',
      foilGradStart: '#E8A382',
      foilGradEnd: '#8F3F1C',
      tissueColor: '#EBE5D8',
      tissueShadow: '#D2C9B6',
      productCard: '#FFFFFF',
      tapeColor: '#C26338'
    },
    bone: {
      name: 'Virgin Cotton Bone + Gold Foil',
      boxColor: '#F5EFE6',
      boxDarkColor: '#DDD4C4',
      boxLightColor: '#FFFDF9',
      foilColor: '#C99E2E',
      foilGradStart: '#FDECB0',
      foilGradEnd: '#8A6A12',
      tissueColor: '#1A1C22',
      tissueShadow: '#111215',
      productCard: '#181A20',
      tapeColor: '#C99E2E'
    },
    kraft: {
      name: 'Raw Kraft + Charcoal Ink',
      boxColor: '#C49E73',
      boxDarkColor: '#9E784F',
      boxLightColor: '#DCB991',
      foilColor: '#22252B',
      foilGradStart: '#444852',
      foilGradEnd: '#111215',
      tissueColor: '#F4ECE1',
      tissueShadow: '#DFD4C4',
      productCard: '#FAF6EE',
      tapeColor: '#C26338'
    },
    sage: {
      name: 'Forest Sage Linen + Silver Leaf',
      boxColor: '#4A5747',
      boxDarkColor: '#343E32',
      boxLightColor: '#62735E',
      foilColor: '#D5D8DF',
      foilGradStart: '#FFFFFF',
      foilGradEnd: '#8E939E',
      tissueColor: '#ECE6DC',
      tissueShadow: '#D3C9BC',
      productCard: '#F8F5EF',
      tapeColor: '#D5D8DF'
    }
  };

  let currentFinish = 'obsidian';
  let lidOpenPercent = 15; // 0 to 100
  let isAnimating = false;

  // 3D Rotation State
  let rotX = -0.32; // Pitch
  let rotY = 0.55;  // Yaw
  let targetRotX = rotX;
  let targetRotY = rotY;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  function resizeCanvas() {
    const rect = viewport.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse drag for 3D rotation
  viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    targetRotY += dx * 0.008;
    targetRotX += dy * 0.008;
    // Limit pitch angle to prevent flipping upside down
    targetRotX = Math.max(-0.8, Math.min(0.2, targetRotX));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch controls for mobile
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    targetRotY += dx * 0.008;
    targetRotX += dy * 0.008;
    targetRotX = Math.max(-0.8, Math.min(0.2, targetRotX));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Slider change
  slider.addEventListener('input', (e) => {
    lidOpenPercent = parseFloat(e.target.value);
    percentDisplay.textContent = `${Math.round(lidOpenPercent)}%`;
    if (lidOpenPercent > 0 && lidOpenPercent < 5) {
      tactileAudio.playMagneticSnap();
    }
  });

  // Finish change
  finishPills.forEach(pill => {
    pill.addEventListener('click', () => {
      finishPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFinish = pill.getAttribute('data-finish');
      finishNameDisplay.textContent = `Finish: ${FINISHES[currentFinish].name}`;
      tactileAudio.playFoilShimmer();
    });
  });

  // Choreography sequence
  playBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    tactileAudio.playDrawerSlide();

    let start = performance.now();
    let duration = 2200; // ms

    let initialPercent = lidOpenPercent;
    let targetPercent = initialPercent > 50 ? 0 : 90;

    function stepAnimation(now) {
      let progress = Math.min((now - start) / duration, 1);
      let ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      lidOpenPercent = initialPercent + (targetPercent - initialPercent) * ease;
      slider.value = lidOpenPercent;
      percentDisplay.textContent = `${Math.round(lidOpenPercent)}%`;

      if (progress > 0.4 && progress < 0.45 && targetPercent > 50) {
        tactileAudio.playTissueRuffle();
      }

      if (progress === 1 && targetPercent === 0) {
        tactileAudio.playMagneticSnap();
      }

      if (progress < 1) {
        requestAnimationFrame(stepAnimation);
      } else {
        isAnimating = false;
      }
    }

    requestAnimationFrame(stepAnimation);
  });

  // 3D Isometric / Perspective Box Render Loop
  function project3D(x, y, z, cx, cy) {
    let cosY = Math.cos(rotY);
    let sinY = Math.sin(rotY);
    let cosX = Math.cos(rotX);
    let sinX = Math.sin(rotX);

    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;

    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    let fov = 450;
    let scale = fov / (fov + z2 + 200);

    return {
      x: cx + x1 * scale,
      y: cy + y2 * scale,
      scale: scale,
      depth: z2
    };
  }

  function drawQuad(p1, p2, p3, p4, fillStyle, strokeStyle = null, lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function render() {
    rotX += (targetRotX - rotX) * 0.1;
    rotY += (targetRotY - rotY) * 0.1;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    const cx = width / 2;
    const cy = height / 2 + 10;

    ctx.clearRect(0, 0, width, height);

    const f = FINISHES[currentFinish];

    // Dimensions of the rigid box
    const bw = 150; // Box width
    const bh = 65;  // Box height
    const bd = 115; // Box depth

    // Draw Soft Contact Ground Shadow
    ctx.save();
    ctx.beginPath();
    let shadowY = cy + bh / 2 + 40;
    ctx.ellipse(cx, shadowY, bw * 0.95, bd * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.filter = 'blur(14px)';
    ctx.fill();
    ctx.restore();

    // Box Base Vertices
    const b00 = project3D(-bw/2, bh/2, -bd/2, cx, cy);
    const b10 = project3D(bw/2, bh/2, -bd/2, cx, cy);
    const b11 = project3D(bw/2, bh/2, bd/2, cx, cy);
    const b01 = project3D(-bw/2, bh/2, bd/2, cx, cy);

    const t00 = project3D(-bw/2, -bh/2, -bd/2, cx, cy);
    const t10 = project3D(bw/2, -bh/2, -bd/2, cx, cy);
    const t11 = project3D(bw/2, -bh/2, bd/2, cx, cy);
    const t01 = project3D(-bw/2, -bh/2, bd/2, cx, cy);

    // Draw Base Outer Sides
    drawQuad(t00, t01, b01, b00, f.boxDarkColor, 'rgba(0,0,0,0.25)');
    drawQuad(t10, t11, b11, b10, f.boxColor, 'rgba(0,0,0,0.25)');
    drawQuad(t01, t11, b11, b01, f.boxLightColor, 'rgba(0,0,0,0.2)');

    // Inside Cavity & Tissue Reveal when lid opens
    if (lidOpenPercent > 5) {
      const openFactor = lidOpenPercent / 100;
      
      const innerInset = 8;
      const ib00 = project3D(-bw/2 + innerInset, -bh/2 + innerInset, -bd/2 + innerInset, cx, cy);
      const ib10 = project3D(bw/2 - innerInset, -bh/2 + innerInset, -bd/2 + innerInset, cx, cy);
      const ib11 = project3D(bw/2 - innerInset, -bh/2 + innerInset, bd/2 - innerInset, cx, cy);
      const ib01 = project3D(-bw/2 + innerInset, -bh/2 + innerInset, bd/2 - innerInset, cx, cy);

      drawQuad(ib00, ib10, ib11, ib01, f.tissueShadow);

      const tissueFold = project3D(0, -bh/2 + 2 - openFactor * 8, 0, cx, cy);
      ctx.beginPath();
      ctx.moveTo(ib00.x, ib00.y);
      ctx.quadraticCurveTo(tissueFold.x, tissueFold.y - 12 * openFactor, ib10.x, ib10.y);
      ctx.lineTo(ib11.x, ib11.y);
      ctx.quadraticCurveTo(tissueFold.x, tissueFold.y + 6 * openFactor, ib01.x, ib01.y);
      ctx.closePath();
      ctx.fillStyle = f.tissueColor;
      ctx.fill();

      const pc0 = project3D(-bw/4, -bh/2 + 4 - openFactor * 14, -bd/4, cx, cy);
      const pc1 = project3D(bw/4, -bh/2 + 4 - openFactor * 14, -bd/4, cx, cy);
      const pc2 = project3D(bw/4, -bh/2 + 4 - openFactor * 14, bd/4, cx, cy);
      const pc3 = project3D(-bw/4, -bh/2 + 4 - openFactor * 14, bd/4, cx, cy);

      drawQuad(pc0, pc1, pc2, pc3, f.productCard, 'rgba(0,0,0,0.15)');

      const sealPos = project3D(0, -bh/2 + 3 - openFactor * 14, 0, cx, cy);
      ctx.beginPath();
      ctx.arc(sealPos.x, sealPos.y, 8 * sealPos.scale, 0, Math.PI * 2);
      ctx.fillStyle = f.foilColor;
      ctx.fill();
    }

    // Hinged Magnetic Top Lid Calculation
    const lidAngle = (lidOpenPercent / 100) * 1.85;
    const lh = 18;

    function rotateHinge(x, y, z, angle) {
      let py = -bh/2;
      let pz = -bd/2;

      let dy = y - py;
      let dz = z - pz;

      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);

      let ry = dy * cosA - dz * sinA;
      let rz = dy * sinA + dz * cosA;

      return { x: x, y: py + ry, z: pz + rz };
    }

    const l_c00 = rotateHinge(-bw/2, -bh/2 - lh, -bd/2, lidAngle);
    const l_c10 = rotateHinge(bw/2, -bh/2 - lh, -bd/2, lidAngle);
    const l_c11 = rotateHinge(bw/2, -bh/2 - lh, bd/2, lidAngle);
    const l_c01 = rotateHinge(-bw/2, -bh/2 - lh, bd/2, lidAngle);

    const l_b00 = rotateHinge(-bw/2, -bh/2, -bd/2, lidAngle);
    const l_b10 = rotateHinge(bw/2, -bh/2, -bd/2, lidAngle);
    const l_b11 = rotateHinge(bw/2, -bh/2, bd/2, lidAngle);
    const l_b01 = rotateHinge(-bw/2, -bh/2, bd/2, lidAngle);

    const pl_c00 = project3D(l_c00.x, l_c00.y, l_c00.z, cx, cy);
    const pl_c10 = project3D(l_c10.x, l_c10.y, l_c10.z, cx, cy);
    const pl_c11 = project3D(l_c11.x, l_c11.y, l_c11.z, cx, cy);
    const pl_c01 = project3D(l_c01.x, l_c01.y, l_c01.z, cx, cy);

    const pl_b00 = project3D(l_b00.x, l_b00.y, l_b00.z, cx, cy);
    const pl_b10 = project3D(l_b10.x, l_b10.y, l_b10.z, cx, cy);
    const pl_b11 = project3D(l_b11.x, l_b11.y, l_b11.z, cx, cy);
    const pl_b01 = project3D(l_b01.x, l_b01.y, l_b01.z, cx, cy);

    drawQuad(pl_b01, pl_b11, pl_c11, pl_c01, f.boxLightColor, 'rgba(0,0,0,0.2)');
    drawQuad(pl_b10, pl_b11, pl_c11, pl_c10, f.boxColor, 'rgba(0,0,0,0.2)');
    drawQuad(pl_b00, pl_b01, pl_c01, pl_c00, f.boxDarkColor, 'rgba(0,0,0,0.2)');

    const foilGrad = ctx.createLinearGradient(pl_c00.x, pl_c00.y, pl_c11.x, pl_c11.y);
    foilGrad.addColorStop(0, f.boxColor);
    foilGrad.addColorStop(0.5, f.boxLightColor);
    foilGrad.addColorStop(1, f.boxDarkColor);
    drawQuad(pl_c00, pl_c10, pl_c11, pl_c01, foilGrad, 'rgba(0,0,0,0.25)');

    // Sealing Tape Strip
    const tape_w = 24;
    const t1 = rotateHinge(tape_w/2, -bh/2 - lh - 0.5, -bd/2, lidAngle);
    const t2 = rotateHinge(-tape_w/2, -bh/2 - lh - 0.5, -bd/2, lidAngle);
    const t3 = rotateHinge(-tape_w/2, -bh/2 - lh - 0.5, bd/2, lidAngle);
    const t4 = rotateHinge(tape_w/2, -bh/2 - lh - 0.5, bd/2, lidAngle);

    const pt1 = project3D(t1.x, t1.y, t1.z, cx, cy);
    const pt2 = project3D(t2.x, t2.y, t2.z, cx, cy);
    const pt3 = project3D(t3.x, t3.y, t3.z, cx, cy);
    const pt4 = project3D(t4.x, t4.y, t4.z, cx, cy);

    const lightAngle = Math.sin(rotY * 2 + performance.now() * 0.001);
    const tapeGrad = ctx.createLinearGradient(pt2.x, pt2.y, pt4.x, pt4.y);
    tapeGrad.addColorStop(0, f.foilGradEnd);
    tapeGrad.addColorStop(Math.max(0.1, Math.min(0.9, 0.5 + lightAngle * 0.3)), f.foilGradStart);
    tapeGrad.addColorStop(1, f.foilGradEnd);

    drawQuad(pt1, pt2, pt3, pt4, tapeGrad, 'rgba(0,0,0,0.15)');

    // Logo Mark on Lid Center
    const logoCenter = rotateHinge(0, -bh/2 - lh - 1, 0, lidAngle);
    const plogo = project3D(logoCenter.x, logoCenter.y, logoCenter.z, cx, cy);
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(plogo.x, plogo.y, 12 * plogo.scale, 0, Math.PI * 2);
    ctx.fillStyle = f.foilColor;
    ctx.shadowColor = f.foilGradStart;
    ctx.shadowBlur = 6;
    ctx.fill();

    ctx.fillStyle = f.boxDarkColor;
    ctx.font = `bold ${Math.round(12 * plogo.scale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', plogo.x, plogo.y + 1);
    ctx.restore();

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
