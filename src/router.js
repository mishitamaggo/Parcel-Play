// Client-Side Router for Parcel Play Multi-Page Application

export class Router {
  constructor(routes, containerId = 'main-content') {
    this.routes = routes;
    this.container = document.getElementById(containerId);
    this.currentRoute = null;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    window.addEventListener('hashchange', () => this.handleRoute());

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      // Only intercept internal links starting with / or #/
      if (href && (href.startsWith('/') || href.startsWith('#/')) && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        e.preventDefault();
        this.navigate(href);
      }
    });

    this.handleRoute();
  }

  normalizePath(path) {
    let clean = path || '/';
    if (clean.startsWith('#/')) clean = clean.substring(1);
    else if (clean.startsWith('#')) clean = '/' + clean.substring(1);
    if (!clean.startsWith('/')) clean = '/' + clean;
    if (clean.endsWith('/index.html') || clean.endsWith('/404.html')) {
      clean = clean.replace(/\/index\.html$|\/404\.html$/, '') || '/';
    }
    if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
    return clean;
  }

  getCurrentPath() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      return this.normalizePath(hash.substring(1));
    }
    const path = window.location.pathname;
    return this.normalizePath(path);
  }

  navigate(path) {
    const targetPath = this.normalizePath(path);
    const hashPath = '#' + targetPath;

    if (window.location.hash !== hashPath && window.location.pathname !== targetPath) {
      window.history.pushState({}, '', hashPath);
    }

    this.handleRoute(targetPath);
  }

  handleRoute(explicitPath = null) {
    const path = explicitPath || this.getCurrentPath();
    
    // Check direct match
    let routeHandler = this.routes[path];
    let routeParams = null;

    // Check if path ends with a known route (handles GitHub Pages repo subdirectories e.g. /Parcel-Play/case-studies)
    if (!routeHandler && path !== '/') {
      for (const routeKey in this.routes) {
        if (routeKey !== '/' && !routeKey.includes(':') && path.endsWith(routeKey)) {
          routeHandler = this.routes[routeKey];
          break;
        }
      }
    }

    // Check dynamic pattern match (e.g., /sku/:slug)
    if (!routeHandler) {
      for (const pattern in this.routes) {
        if (pattern.includes(':')) {
          const patternParts = pattern.split('/');
          const pathParts = path.split('/');

          if (patternParts.length === pathParts.length) {
            let match = true;
            const params = {};

            for (let i = 0; i < patternParts.length; i++) {
              if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].substring(1);
                params[paramName] = pathParts[i];
              } else if (patternParts[i] !== pathParts[i]) {
                match = false;
                break;
              }
            }

            if (match) {
              routeHandler = this.routes[pattern];
              routeParams = params;
              break;
            }
          }
        }
      }
    }

    if (!routeHandler) {
      routeHandler = this.routes['/'];
    }

    this.currentRoute = path;

    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render page into container
    if (this.container && routeHandler) {
      this.container.innerHTML = '';
      routeHandler(this.container, routeParams);
    }

    // Update active nav links across the site
    this.updateActiveNavLinks(path);
  }

  updateActiveNavLinks(currentPath) {
    const links = document.querySelectorAll('.nav-link, .footer-nav-list a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalizedHref = this.normalizePath(href);
      if (normalizedHref === currentPath || (currentPath === '/' && (normalizedHref === '/' || normalizedHref === '/hero'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
