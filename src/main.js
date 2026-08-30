import { Router } from './router.js?v=2.0';
import { renderHeader } from './components/Header.js?v=2.0';
import { renderFooter } from './components/Footer.js?v=2.0';
import { createAuditModal } from './components/AuditModal.js?v=2.0';
import { createSampleKitDrawer } from './components/SampleKitDrawer.js?v=2.0';
import { createArticleModal } from './components/ArticleModal.js?v=2.0';
import { tactileAudio } from './utils/audio.js?v=2.0';

// Page Controllers
import { renderHomePage } from './pages/HomePage.js?v=2.0';
import { renderCaseStudiesPage } from './pages/CaseStudiesPage.js?v=2.0';
import { renderHowWeWorkPage } from './pages/HowWeWorkPage.js?v=2.0';
import { renderMaterialLibraryPage } from './pages/MaterialLibraryPage.js?v=2.0';
import { renderCostEstimatorPage } from './pages/CostEstimatorPage.js?v=2.0';
import { renderStudioJournalPage } from './pages/StudioJournalPage.js?v=2.0';
import { renderProductDetailPage } from './pages/ProductDetailPage.js?v=2.0';

// Application State
const appState = {
  sampleKit: [
    {
      id: 'obsidian-soft-touch',
      name: 'Obsidian Velvet Board',
      category: 'Paperboard',
      weight: '450 GSM',
      textureImage: 'assets/images/swatch_obsidian.jpg'
    },
    {
      id: 'copper-hot-foil-tape',
      name: 'Brushed Copper Foil Tape',
      category: 'Hot Foils & Tape',
      weight: '65 Micron Heavy-Duty',
      textureImage: 'assets/images/macro_tape.jpg'
    }
  ]
};

// Toast notification helper
function showToast(message, icon = '✨') {
  let toastContainer = document.getElementById('global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'global-toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Global Cursor Light Tracking for Foil Accents
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('header-mount');
  const footerMount = document.getElementById('footer-mount');

  // Modals & Drawers
  const auditModal = createAuditModal();
  const articleModal = createArticleModal();
  const sampleKitDrawer = createSampleKitDrawer(appState, () => {
    updateSampleBadge();
  });

  function updateSampleBadge() {
    const badge = document.getElementById('sample-badge-count');
    if (badge) {
      badge.textContent = appState.sampleKit.length;
    }
  }

  function handleAddToSampleKit(swatch) {
    if (appState.sampleKit.some(item => item.id === swatch.id)) {
      showToast(`${swatch.name} is already in your sample box!`, 'ℹ️');
      return;
    }
    if (appState.sampleKit.length >= 5) {
      showToast('Maximum 5 swatches per complimentary sample box.', '⚠️');
      sampleKitDrawer.open();
      return;
    }

    appState.sampleKit.push(swatch);
    updateSampleBadge();
    showToast(`Added ${swatch.name} (${swatch.weight}) to Sample Box`, '📦');
  }

  // Render Persistent Header & Footer
  renderHeader(headerMount, appState);
  renderFooter(footerMount, () => auditModal.open());

  // Define Page Routes
  const routes = {
    '/': (container) => renderHomePage(container, appState, () => auditModal.open()),
    '/case-studies': (container) => renderCaseStudiesPage(container, () => auditModal.open()),
    '/how-we-work': (container) => renderHowWeWorkPage(container, () => auditModal.open()),
    '/material-library': (container) => renderMaterialLibraryPage(container, appState, handleAddToSampleKit),
    '/cost-estimator': (container) => renderCostEstimatorPage(container, (quoteConfig) => {
      showToast(`Specifications locked! Requesting physical proof...`, '✨');
      auditModal.open();
    }),
    '/studio-journal': (container) => renderStudioJournalPage(container, (article) => {
      articleModal.open(article);
    }),
    
    // Dedicated Packaging SKU Pages
    '/sku/:slug': (container, params) => renderProductDetailPage(
      container,
      params ? params.slug : 'rigid-magnetic-boxes',
      appState,
      handleAddToSampleKit,
      () => auditModal.open()
    ),
    '/sku/rigid-magnetic-boxes': (container) => renderProductDetailPage(container, 'rigid-magnetic-boxes', appState, handleAddToSampleKit, () => auditModal.open()),
    '/sku/corrugated-mailers': (container) => renderProductDetailPage(container, 'corrugated-mailers', appState, handleAddToSampleKit, () => auditModal.open()),
    '/sku/precision-slide-drawers': (container) => renderProductDetailPage(container, 'precision-slide-drawers', appState, handleAddToSampleKit, () => auditModal.open()),
    '/sku/molded-cellulose-trays': (container) => renderProductDetailPage(container, 'molded-cellulose-trays', appState, handleAddToSampleKit, () => auditModal.open()),
    '/sku/custom-foil-tape': (container) => renderProductDetailPage(container, 'custom-foil-tape', appState, handleAddToSampleKit, () => auditModal.open())
  };

  // Initialize Router
  const router = new Router(routes, 'main-content');

  // Attach global button triggers
  const headerAuditBtn = document.getElementById('header-audit-btn');
  if (headerAuditBtn) {
    headerAuditBtn.addEventListener('click', () => {
      tactileAudio.playCardSelect();
      auditModal.open();
    });
  }

  const openSampleDrawerBtn = document.getElementById('open-sample-drawer-btn');
  if (openSampleDrawerBtn) {
    openSampleDrawerBtn.addEventListener('click', () => {
      sampleKitDrawer.open();
    });
  }
});
