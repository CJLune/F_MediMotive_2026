document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-menu-button]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const expertiseNav = initMobileExpertiseNav(drawer);

  const setDrawerOpen = (open) => {
    if (!btn || !drawer) return;
    drawer.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (open) {
      expertiseNav?.onDrawerOpen();
    } else {
      expertiseNav?.onDrawerClose();
    }
  };

  const closeDrawer = () => setDrawerOpen(false);

  if (btn && drawer) {
    btn.addEventListener('click', () => {
      setDrawerOpen(!drawer.classList.contains('open'));
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDrawer();
    });
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'medimotive_click',
        event_label: el.dataset.track,
      });
    });
  });

  initVisualSections();
  initCertImageAlts();
  initCertLightbox();
  initScrollReveal();
  initStagesEvolution();
  initCredentialsSection();
  initHomeChapterNav();
  initJourneyChapterNav();
  initExpertiseNavSpy();
  initExpertiseTrace();
  initPatternShowcase();
  initFounderFluidWaves();
  initHomeHeroFluidMesh();
  initAboutHeroFluidMesh();
  initServicesHeroFluidMesh();
  initApproachHeroFluidMesh();
  initApproachHeroConstellation();
  initContactHeroReactiveWaves();
  initExpertiseHeroGeometry();
  initCaseStudiesHeroNetwork();
  initOrganicMethodGeo();
  initScrollToTop();
});

/* Dropdown: close on Escape or outside click */
(function () {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach((d) => {
        const trigger = d.querySelector('.nav-dropdown__trigger');
        if (trigger) trigger.blur();
      });
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    dropdowns.forEach((d) => {
      if (d.contains(target)) return;
      const trigger = d.querySelector('.nav-dropdown__trigger');
      if (trigger) trigger.blur();
    });
  });
})();

/**
 * Mobile drawer: wrap Expertise + sub-links in a collapsible accordion.
 * Sub-links stay hidden until the chevron toggle is used (auto-open on expertise detail pages).
 */
function initMobileExpertiseNav(drawer) {
  if (!drawer || drawer.dataset.mobileNavEnhanced === 'true') return null;

  const subLinks = drawer.querySelector('.nav-sub-links');
  if (!subLinks) return null;

  const expertiseLink = subLinks.previousElementSibling;
  if (!(expertiseLink instanceof HTMLAnchorElement)) return null;

  const href = expertiseLink.getAttribute('href') || '';
  const hrefPath = (href.split('#')[0].split('?')[0] || '').replace(/\/$/, '');
  if (!/\/services(?:\.html)?$/.test(hrefPath)) return null;

  drawer.dataset.mobileNavEnhanced = 'true';

  const pageSlug = () => {
    const segment = window.location.pathname.split('/').filter(Boolean).pop() || '';
    if (!segment) return 'index';
    return segment.replace(/\.html$/i, '');
  };
  const currentSlug = pageSlug();
  subLinks.querySelectorAll('a[href]').forEach((link) => {
    const raw = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
    const linkPath = raw.split('/').pop()?.replace(/\.html$/i, '');
    if (linkPath && linkPath === currentSlug) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const group = document.createElement('div');
  group.className = 'mobile-drawer__group';
  group.dataset.mobileNavGroup = '';

  const row = document.createElement('div');
  row.className = 'mobile-drawer__row';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'mobile-drawer__toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'mobile-expertise-sub');
  toggle.setAttribute('aria-label', 'Show expertise areas');
  const chevron = document.createElement('span');
  chevron.className = 'mobile-drawer__chevron';
  chevron.setAttribute('aria-hidden', 'true');
  toggle.appendChild(chevron);

  subLinks.id = 'mobile-expertise-sub';
  expertiseLink.classList.add('mobile-drawer__link');

  drawer.insertBefore(group, expertiseLink);
  row.appendChild(expertiseLink);
  row.appendChild(toggle);
  group.appendChild(row);
  group.appendChild(subLinks);

  const autoExpand = document.body.classList.contains('expertise-detail-page');

  const setExpanded = (open) => {
    group.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Hide expertise areas' : 'Show expertise areas');
    subLinks.hidden = !open;
  };

  setExpanded(false);

  toggle.addEventListener('click', () => {
    setExpanded(!group.classList.contains('is-open'));
  });

  return {
    onDrawerOpen() {
      if (autoExpand) setExpanded(true);
    },
    onDrawerClose() {
      setExpanded(false);
    },
  };
}

function initContactHeroReactiveWaves() {
  const canvas = document.querySelector('.contact-hero__wave-canvas');
  const section = document.querySelector('.contact-page .page-hero.contact-hero');
  if (!canvas || !section) return;

  canvas.style.pointerEvents = 'none';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const mouseReactive = !narrowViewport && !reducedMotion;

  let width = 0;
  let height = 0;
  let time = 0;
  let currentSpeed = 0.28;
  let targetSpeed = 0.28;
  let running = false;
  let rafId = 0;
  let gustTimer = null;

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseVelocity = 0;

  const colorPrimary = 'rgba(2, 115, 67, ';
  const colorSlate = 'rgba(72, 105, 102, ';
  const colorDark = 'rgba(28, 46, 74, ';
  const colorCool = 'rgba(58, 88, 108, ';
  const colorLight = 'rgba(248, 250, 252, ';

  const waveConfigs = [
    { color: colorCool, opacity: 0.12, offset: 0, ampY: 95, baseFreq: 0.0015, chaosFreq: 0.005, depth: 0.1 },
    { color: colorSlate, opacity: 0.1, offset: 2, ampY: 82, baseFreq: 0.0022, chaosFreq: 0.007, depth: 0.2 },
    { color: colorDark, opacity: 0.04, offset: 5, ampY: 105, baseFreq: 0.001, chaosFreq: 0.004, depth: 0.05 },
    { color: colorPrimary, opacity: 0.065, offset: 1, ampY: 68, baseFreq: 0.0028, chaosFreq: 0.008, depth: 0.35 },
    { color: colorCool, opacity: 0.072, offset: 4, ampY: 62, baseFreq: 0.0035, chaosFreq: 0.01, depth: 0.5 },
  ];

  const waveAnchor = 0.64;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!mouseReactive) {
      mouseX = width / 2;
      mouseY = height / 2;
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    }
  }

  function setMouseFromEvent(event) {
    const rect = section.getBoundingClientRect();
    targetMouseX = event.clientX - rect.left;
    targetMouseY = event.clientY - rect.top;
  }

  function resetMouse() {
    targetMouseX = width / 2;
    targetMouseY = height / 2;
  }

  function randomizeMomentum() {
    if (reducedMotion) return;
    targetSpeed = 0.14 + Math.random() * 0.14;
    gustTimer = window.setTimeout(randomizeMomentum, 7000 + Math.random() * 6000);
  }

  function drawReactiveWaves() {
    ctx.clearRect(0, 0, width, height);

    const dx = targetMouseX - mouseX;
    const dy = targetMouseY - mouseY;
    if (mouseReactive) {
      mouseX += dx * 0.028;
      mouseY += dy * 0.028;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      mouseVelocity += (instantVelocity - mouseVelocity) * 0.06;
    } else {
      mouseX = width / 2;
      mouseY = height / 2;
      mouseVelocity *= 0.9;
    }

    const tension = mouseReactive ? Math.min(mouseVelocity * 0.0012, 0.35) : 0;
    const windDrift = Math.sin(time * 0.11) * width * 0.035;

    if (!reducedMotion) {
      currentSpeed += (targetSpeed - currentSpeed) * 0.008;
      time += 0.003 * currentSpeed + 0.002 * tension;
    }

    const bgGrad = ctx.createLinearGradient(windDrift, 0, width + windDrift, height);
    bgGrad.addColorStop(0, `${colorLight}1)`);
    bgGrad.addColorStop(0.55, `${colorCool}0.012)`);
    bgGrad.addColorStop(1, `${colorDark}0.016)`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'soft-light';

    const mouseXNorm = width > 0 ? mouseX / width - 0.5 : 0;
    const mouseYNorm = height > 0 ? mouseY / height - 0.5 : 0;

    for (let i = 0; i < waveConfigs.length; i += 1) {
      const config = waveConfigs[i];
      const tensionAmp = config.ampY + tension * 22 - mouseYNorm * 40 * config.depth;
      const parallaxShift = windDrift * 0.35 + mouseXNorm * 95 * config.depth;
      const verticalBreathing = Math.sin(time * 0.38 + config.offset) * 22;
      const waveColor = `${config.color}${config.opacity})`;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = -80; x <= width + 80; x += 15) {
        const y = height * waveAnchor
          + verticalBreathing
          + Math.sin((x - parallaxShift) * config.baseFreq + time + config.offset) * tensionAmp
          + Math.cos((x - parallaxShift) * config.chaosFreq - time * 1.35 + config.offset) * (tensionAmp * 0.32);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width + 80, height);
      ctx.lineTo(-80, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, height * 0.15, 0, height);
      gradient.addColorStop(0, `${config.color}0)`);
      gradient.addColorStop(0.5, waveColor);
      gradient.addColorStop(1, `${config.color}${config.opacity * 2})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function frame() {
    if (!running) return;
    drawReactiveWaves();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resizeCanvas();
  resetMouse();
  mouseX = targetMouseX;
  mouseY = targetMouseY;
  drawReactiveWaves();

  if (reducedMotion) return;

  randomizeMomentum();

  if (mouseReactive) {
    section.addEventListener('mousemove', setMouseFromEvent);
    section.addEventListener('mouseleave', resetMouse);
  }

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
    });
  };

  window.addEventListener('resize', scheduleResize);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(section);
  }

  running = true;
  requestAnimationFrame(frame);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!running) {
            running = true;
            requestAnimationFrame(frame);
          }
        } else {
          stop();
        }
      },
      { rootMargin: '80px 0px', threshold: 0.01 },
    );
    observer.observe(section);
  }

  window.addEventListener(
    'pagehide',
    () => {
      if (gustTimer) window.clearTimeout(gustTimer);
      stop();
    },
    { once: true },
  );
}

/**
 * Expertise detail hero: reactive geometric canvas (Geometry_Advanced), scoped to .ed-hero only.
 */
function initExpertiseHeroGeometry() {
  const section = document.querySelector('.expertise-detail-page .ed-hero');
  const canvas = section?.querySelector('.ed-hero__geo-canvas');
  if (!canvas || !section) return;

  canvas.style.pointerEvents = 'none';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const mouseReactive = !narrowViewport && !reducedMotion;

  /* Slower drift — one pace factor on time; shape paths stay at original frequencies */
  const motionPace = 0.58;

  let width = 0;
  let height = 0;
  let time = 0;
  let currentSpeed = 0.24;
  let targetSpeed = 0.24;
  let running = false;
  let rafId = 0;
  let gustTimer = null;

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseVelocity = 0;

  const colorPrimary = 'rgba(2, 115, 67, ';
  const colorSlate = 'rgba(72, 105, 102, ';
  const colorDark = 'rgba(28, 46, 74, ';
  const colorLight = 'rgba(240, 253, 244, ';

  const shapes = [
    {
      type: 'triangle',
      color: colorPrimary,
      opacity: 0.12,
      baseSize: 0.6,
      rotSpeed: 0.4,
      depth: 0.2,
      xFn: (t) => Math.sin(t * 0.4) * 0.4,
      yFn: (t) => Math.cos(t * 0.3) * 0.4,
    },
    {
      type: 'diamond',
      color: colorSlate,
      opacity: 0.08,
      baseSize: 0.7,
      rotSpeed: -0.3,
      depth: 0.4,
      xFn: (t) => Math.cos(t * 0.3 + 1) * 0.4,
      yFn: (t) => Math.sin(t * 0.5 + 2) * 0.3,
    },
    {
      type: 'square',
      color: colorDark,
      opacity: 0.04,
      baseSize: 0.9,
      rotSpeed: 0.15,
      depth: 0.1,
      xFn: (t) => Math.sin(t * 0.6 - 2) * 0.3,
      yFn: (t) => Math.cos(t * 0.7 + 1) * 0.4,
    },
    {
      type: 'rectangle',
      color: colorPrimary,
      opacity: 0.08,
      baseSize: 0.5,
      rotSpeed: -0.5,
      depth: 0.6,
      xFn: (t) => Math.cos(t * 0.8) * 0.45,
      yFn: (t) => Math.sin(t * 0.6 - 1) * 0.3,
    },
    {
      type: 'triangle',
      color: colorSlate,
      opacity: 0.06,
      baseSize: 0.85,
      rotSpeed: 0.25,
      depth: 0.3,
      xFn: (t) => Math.sin(t * 0.5 + 3) * 0.4,
      yFn: (t) => Math.cos(t * 0.4 + 2) * 0.4,
    },
  ];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!mouseReactive) {
      mouseX = width / 2;
      mouseY = height / 2;
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    }
  }

  function setMouseFromEvent(event) {
    const rect = section.getBoundingClientRect();
    targetMouseX = event.clientX - rect.left;
    targetMouseY = event.clientY - rect.top;
  }

  function resetMouse() {
    targetMouseX = width / 2;
    targetMouseY = height / 2;
  }

  function randomizeMomentum() {
    if (reducedMotion) return;
    const isGust = Math.random() > 0.9;
    if (isGust) {
      targetSpeed = 0.48 + Math.random() * 0.28;
      gustTimer = window.setTimeout(randomizeMomentum, 2800 + Math.random() * 2200);
    } else {
      targetSpeed = 0.18 + Math.random() * 0.12;
      gustTimer = window.setTimeout(randomizeMomentum, 7500 + Math.random() * 5000);
    }
  }

  function drawShapePath(shape, radius) {
    ctx.beginPath();
    if (shape.type === 'square' || shape.type === 'diamond') {
      const offsetAngle = shape.type === 'diamond' ? Math.PI / 4 : 0;
      for (let j = 0; j < 4; j += 1) {
        const angle = (j * Math.PI) / 2 + offsetAngle;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    } else if (shape.type === 'triangle') {
      for (let j = 0; j < 3; j += 1) {
        const angle = (j * (Math.PI * 2)) / 3 - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    } else if (shape.type === 'rectangle') {
      const rectW = radius * 1.5;
      const rectH = radius * 0.6;
      ctx.rect(-rectW / 2, -rectH / 2, rectW, rectH);
    }
    ctx.closePath();
  }

  function drawGeometricBackground() {
    const dx = targetMouseX - mouseX;
    const dy = targetMouseY - mouseY;
    if (mouseReactive) {
      mouseX += dx * 0.062;
      mouseY += dy * 0.062;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      mouseVelocity += (instantVelocity - mouseVelocity) * 0.14;
    } else {
      mouseX = width / 2;
      mouseY = height / 2;
      mouseVelocity *= 0.9;
    }

    const tension = mouseReactive ? Math.min(mouseVelocity * 0.002, 1) : 0;

    if (!reducedMotion) {
      currentSpeed += (targetSpeed - currentSpeed) * 0.024;
      time += (0.0036 * currentSpeed + 0.0055 * tension) * motionPace;
    }

    ctx.clearRect(0, 0, width, height);
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, `${colorLight}1)`);
    bgGrad.addColorStop(1, `${colorSlate}0.05)`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'multiply';

    const mouseXNorm = width > 0 ? mouseX / width - 0.5 : 0;
    const mouseYNorm = height > 0 ? mouseY / height - 0.5 : 0;
    const maxDim = Math.max(width, height);
    const parallaxBase = Math.min(400, maxDim * 0.38);

    for (let i = 0; i < shapes.length; i += 1) {
      const shape = shapes[i];
      const parallaxX = mouseXNorm * parallaxBase * shape.depth;
      const parallaxY = mouseYNorm * parallaxBase * shape.depth;
      const cx = width / 2 + shape.xFn(time) * width - parallaxX;
      const cy = height / 2 + shape.yFn(time) * height - parallaxY;
      const radius = maxDim * shape.baseSize * 0.5 + tension * 80 + Math.sin(time * 1.7 + i) * 18;
      const rotation = time * shape.rotSpeed + tension * shape.rotSpeed * 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      drawShapePath(shape, radius);

      ctx.lineWidth = 4 + tension * 6;
      ctx.strokeStyle = shape.color + shape.opacity * 2.5 + ')';
      ctx.shadowBlur = 30 + tension * 40;
      ctx.shadowColor = shape.color + shape.opacity * 4 + ')';
      ctx.lineJoin = 'round';
      ctx.stroke();

      const fillGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      fillGrad.addColorStop(0, shape.color + shape.opacity + ')');
      fillGrad.addColorStop(1, shape.color + '0)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      ctx.restore();
    }

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame() {
    if (!running) return;
    drawGeometricBackground();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resizeCanvas();
  resetMouse();
  mouseX = targetMouseX;
  mouseY = targetMouseY;
  drawGeometricBackground();

  if (reducedMotion) return;

  randomizeMomentum();

  if (mouseReactive) {
    section.addEventListener('mousemove', setMouseFromEvent);
    section.addEventListener('mouseleave', resetMouse);
  }

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
    });
  };

  window.addEventListener('resize', scheduleResize);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(section);
  }

  running = true;
  requestAnimationFrame(frame);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!running) {
            running = true;
            requestAnimationFrame(frame);
          }
        } else {
          stop();
        }
      },
      { rootMargin: '80px 0px', threshold: 0.01 },
    );
    observer.observe(section);
  }

  window.addEventListener(
    'pagehide',
    () => {
      if (gustTimer) window.clearTimeout(gustTimer);
      stop();
    },
    { once: true },
  );
}

/**
 * Hero-scoped fluid mesh (minimal_mesh.html), with production safeguards.
 */
function initHeroFluidMesh(sectionSelector, canvasSelector, options = {}) {
  const section = document.querySelector(sectionSelector);
  const canvas = section?.querySelector(canvasSelector);
  if (!canvas || !section) return;

  canvas.style.pointerEvents = 'none';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;

  const colorPrimary = 'rgba(2, 115, 67, ';
  const colorSlate = 'rgba(72, 105, 102, ';
  const colorDark = 'rgba(28, 46, 74, ';
  const colorLight = 'rgba(240, 253, 244, ';

  const orbs = [
    {
      color: colorPrimary,
      opacity: 0.15,
      sizeMult: 0.85,
      xFn: (t) => Math.sin(t * 0.4) * 0.4 + Math.sin(t * 0.15) * 0.1,
      yFn: (t) => Math.cos(t * 0.3) * 0.4 + Math.cos(t * 0.1) * 0.15,
    },
    {
      color: colorSlate,
      opacity: 0.12,
      sizeMult: 0.95,
      xFn: (t) => Math.cos(t * 0.3 + 1) * 0.45 + Math.sin(t * 0.2) * 0.1,
      yFn: (t) => Math.sin(t * 0.5 + 2) * 0.35 + Math.cos(t * 0.12) * 0.1,
    },
    {
      color: colorDark,
      opacity: 0.05,
      sizeMult: 0.75,
      xFn: (t) => Math.sin(t * 0.6 - 2) * 0.3 - Math.cos(t * 0.25) * 0.15,
      yFn: (t) => Math.cos(t * 0.7 + 1) * 0.4 + Math.sin(t * 0.18) * 0.1,
    },
    {
      color: colorPrimary,
      opacity: 0.12,
      sizeMult: 0.65,
      xFn: (t) => Math.cos(t * 0.8) * 0.45 + Math.sin(t * 0.22) * 0.15,
      yFn: (t) => Math.sin(t * 0.6 - 1) * 0.3 - Math.cos(t * 0.1) * 0.2,
    },
    {
      color: colorSlate,
      opacity: 0.08,
      sizeMult: 0.8,
      xFn: (t) => Math.sin(t * 0.5 + 3) * 0.4 - Math.sin(t * 0.3) * 0.2,
      yFn: (t) => Math.cos(t * 0.4 + 2) * 0.4 + Math.cos(t * 0.2) * 0.15,
    },
  ];

  const meshSpeed = typeof options.meshSpeed === 'number' ? options.meshSpeed : 0.7;
  const orbOpacityScale = typeof options.opacityScale === 'number' ? options.opacityScale : 1;
  const resizeRoot =
    options.resizeRoot && section.querySelector(options.resizeRoot)
      ? section.querySelector(options.resizeRoot)
      : section;
  let width = 0;
  let height = 0;
  let time = 0;
  let running = false;
  let rafId = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = resizeRoot.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawMesh() {
    ctx.clearRect(0, 0, width, height);

    if (!reducedMotion) {
      time += 0.004 * meshSpeed;
    }

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, `${colorLight}1)`);
    bgGrad.addColorStop(1, `${colorSlate}0.05)`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const opacityScale = narrowViewport ? 0.85 : 1;
    const maxDim = Math.max(width, height);

    ctx.globalCompositeOperation = 'multiply';

    orbs.forEach((orb) => {
      const cx = width / 2 + orb.xFn(time) * width;
      const cy = height / 2 + orb.yFn(time) * height;
      const baseRadius = maxDim * orb.sizeMult;
      const r = baseRadius + Math.sin(time * 1.2 + orb.opacity) * (baseRadius * 0.08);
      const alpha = orb.opacity * opacityScale * orbOpacityScale;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, `${orb.color}${alpha})`);
      gradient.addColorStop(0.5, `${orb.color}${alpha * 0.5})`);
      gradient.addColorStop(1, `${orb.color}0)`);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
  }

  function frame() {
    if (!running) return;
    drawMesh();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reducedMotion) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resizeCanvas();
  drawMesh();

  if (!reducedMotion) {
    start();
  }

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
      drawMesh();
    });
  };

  window.addEventListener('resize', scheduleResize);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(resizeRoot);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { rootMargin: '80px 0px', threshold: 0 },
    );
    observer.observe(section);
  } else if (!reducedMotion) {
    start();
  }

  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) stop();
      else if (!reducedMotion) start();
    },
    { passive: true },
  );

  window.addEventListener('pagehide', stop, { once: true });
}

function initHomeHeroFluidMesh() {
  initHeroFluidMesh('.home-main .hero.home-hero--editorial', '.home-hero__mesh-canvas');
}

function initAboutHeroFluidMesh() {
  if (!document.body.classList.contains('about-page')) return;
  initHeroFluidMesh('.about-page .about-hero.about-hero--editorial', '.about-hero__mesh-canvas');
}

function initServicesHeroFluidMesh() {
  if (!document.body.classList.contains('services-page')) return;
  initHeroFluidMesh(
    '.services-page .page-hero--expertise-hub',
    '.expertise-hero-hub__mesh-canvas',
    { meshSpeed: 0.55 },
  );
}

function initApproachHeroFluidMesh() {
  if (!document.body.classList.contains('our-approach-page')) return;
  initHeroFluidMesh(
    '.our-approach-page .page-hero--approach-editorial',
    '.approach-hero__mesh-canvas',
    { meshSpeed: 0.45 },
  );
}

function sortApproachOctsByStoryStep(octs) {
  return [...octs].sort((a, b) => Number(a.dataset.storyStep) - Number(b.dataset.storyStep));
}

function initApproachHeroConstellation() {
  if (!document.body.classList.contains('our-approach-page')) return;

  const instrument = document.querySelector('[data-approach-instrument]');
  const constellation = document.querySelector('.approach-hero__constellation');
  const hero = document.querySelector('.page-hero--approach-editorial');
  const failureMap = document.getElementById('failure-path-map');
  const octs = document.querySelectorAll('.approach-hero__oct[data-story-step]');
  const gridTrace = constellation?.querySelector('.approach-hero__map-grid-trace');
  if (!instrument || !constellation) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktopLayout = window.matchMedia('(min-width: 921px)').matches;
  const gridLayoutQuery = window.matchMedia('(max-width: 0px)');
  const idlePauseMs = 16000;
  const svgNs = 'http://www.w3.org/2000/svg';
  let gridTraceRaf = 0;
  let startApproachStoryLoop = () => {};
  let pauseApproachStoryLoop = () => {};
  const octGrid = constellation.querySelector('.approach-hero__oct-grid');

  const layoutApproachGridTrace = () => {
    if (!gridTrace || !octGrid || !gridLayoutQuery.matches) {
      if (gridTrace) gridTrace.replaceChildren();
      return;
    }

    const constellationRect = constellation.getBoundingClientRect();
    const containerRect = octGrid.getBoundingClientRect();
    const width = Math.round(containerRect.width);
    const height = Math.round(containerRect.height);
    if (width < 1 || height < 1) return;

    const offsetX = containerRect.left - constellationRect.left;
    const offsetY = containerRect.top - constellationRect.top;

    gridTrace.style.left = `${offsetX}px`;
    gridTrace.style.top = `${offsetY}px`;
    gridTrace.style.width = `${width}px`;
    gridTrace.style.height = `${height}px`;

    const seatOcts = [...octGrid.querySelectorAll('.approach-hero__oct[data-seat]')].sort(
      (a, b) => Number(a.dataset.seat) - Number(b.dataset.seat),
    );

    const points = seatOcts.map((oct) => {
      const figure = oct.querySelector('.approach-hero__oct-figure');
      if (!figure) return null;
      const rect = figure.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    }).filter(Boolean);

    if (points.length !== 6) return;

    const hub = {
      x: width / 2,
      y: height / 2,
    };

    gridTrace.setAttribute('viewBox', `0 0 ${width} ${height}`);
    gridTrace.setAttribute('width', String(width));
    gridTrace.setAttribute('height', String(height));
    gridTrace.replaceChildren();

    const ringGroup = document.createElementNS(svgNs, 'g');
    ringGroup.setAttribute('class', 'approach-hero__map-grid-rings');

    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length];
      const line = document.createElementNS(svgNs, 'line');
      line.setAttribute('class', 'approach-hero__map-grid-ring-seg');
      line.setAttribute('x1', String(point.x));
      line.setAttribute('y1', String(point.y));
      line.setAttribute('x2', String(next.x));
      line.setAttribute('y2', String(next.y));
      line.style.setProperty('--ring-i', String(index));
      if (!reducedMotion) {
        line.style.setProperty('--grid-ring-offset', '180');
      }
      ringGroup.appendChild(line);
    });

    const spokeGroup = document.createElementNS(svgNs, 'g');
    spokeGroup.setAttribute('class', 'approach-hero__map-grid-spokes');

    points.forEach((point, index) => {
      const line = document.createElementNS(svgNs, 'line');
      line.setAttribute('class', 'approach-hero__map-grid-spoke');
      line.setAttribute('x1', String(hub.x));
      line.setAttribute('y1', String(hub.y));
      line.setAttribute('x2', String(point.x));
      line.setAttribute('y2', String(point.y));
      line.style.setProperty('--spoke-i', String(index));
      if (!reducedMotion) {
        line.style.setProperty('--grid-spoke-offset', '160');
      }
      spokeGroup.appendChild(line);
    });

    const hubGroup = document.createElementNS(svgNs, 'g');
    hubGroup.setAttribute('class', 'approach-hero__map-grid-hub');
    hubGroup.setAttribute('transform', `translate(${hub.x} ${hub.y})`);

    const hubRing = document.createElementNS(svgNs, 'circle');
    hubRing.setAttribute('class', 'approach-hero__map-hub-ring');
    hubRing.setAttribute('r', '10');

    const hubCore = document.createElementNS(svgNs, 'circle');
    hubCore.setAttribute('class', 'approach-hero__map-hub-core');
    hubCore.setAttribute('r', '3.5');

    const hubLabel = document.createElementNS(svgNs, 'text');
    hubLabel.setAttribute('class', 'approach-hero__map-hub-label');
    hubLabel.setAttribute('text-anchor', 'middle');
    hubLabel.setAttribute('dominant-baseline', 'middle');
    hubLabel.setAttribute('y', '0.5');
    hubLabel.textContent = 'IF';

    hubGroup.append(hubRing, hubCore, hubLabel);
    gridTrace.append(ringGroup, spokeGroup, hubGroup);
  };

  const scheduleApproachGridTraceLayout = () => {
    if (gridTraceRaf) window.cancelAnimationFrame(gridTraceRaf);
    gridTraceRaf = window.requestAnimationFrame(() => {
      gridTraceRaf = window.requestAnimationFrame(() => {
        gridTraceRaf = 0;
        layoutApproachGridTrace();
      });
    });
  };

  if (gridTrace && octGrid && typeof ResizeObserver !== 'undefined') {
    const gridTraceObserver = new ResizeObserver(scheduleApproachGridTraceLayout);
    gridTraceObserver.observe(octGrid);
  }

  gridLayoutQuery.addEventListener('change', scheduleApproachGridTraceLayout);
  window.addEventListener('resize', scheduleApproachGridTraceLayout, { passive: true });
  window.addEventListener('load', scheduleApproachGridTraceLayout, { passive: true });
  octGrid?.querySelectorAll('.approach-hero__oct-figure img').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', scheduleApproachGridTraceLayout, { once: true });
  });

  octGrid?.querySelectorAll('.approach-hero__oct').forEach((oct) => {
    oct.addEventListener('animationend', (event) => {
      if (event.animationName !== 'approach-oct-enter-grid') return;
      scheduleApproachGridTraceLayout();
    });
  });

  if (!reducedMotion) {
    const STORY_PHASES = [
      'story-phase-1',
      'story-phase-2',
      'story-phase-3a',
      'story-phase-3b',
      'story-phase-4',
    ];
    const RING_SEGMENT_SELECTORS = [
      '.approach-hero__map-ring-seg--12',
      '.approach-hero__map-ring-seg--23',
      '.approach-hero__map-ring-seg--34',
      '.approach-hero__map-ring-seg--45',
      '.approach-hero__map-ring-seg--56',
      '.approach-hero__map-ring-seg--61',
    ];
    const STORY_TIMING = {
      startDelayMs: 2600,
      phase1NodeMs: 1500,
      phase2RingMs: 1500,
      phase3aSpokeMs: 550,
      phase3bMs: 3200,
      phase4Ms: 10200,
      phaseGapMs: 350,
      resumeDelayMs: 1000,
      pollMs: 320,
    };

    const sortedOcts = sortApproachOctsByStoryStep(octs);
    const spokes = instrument.querySelectorAll('.approach-hero__map-spoke');
    const ringSegs = instrument.querySelectorAll('.approach-hero__map-ring-seg');
    const hubRing = instrument.querySelector('.approach-hero__map-hub-ring');
    const hubHalo = instrument.querySelector('.approach-hero__map-hub-halo');
    let storyTimer = 0;
    let storyStartTimer = 0;
    let storyIndex = 0;
    let phase2Index = 0;
    let phase3Index = 0;

    const clearPhaseClasses = () => {
      STORY_PHASES.forEach((phaseClass) => instrument.classList.remove(phaseClass));
    };

    const clearPhase1Markers = () => {
      sortedOcts.forEach((oct) => {
        oct.classList.remove('is-story-node-active', 'is-story-node-seen');
      });
      spokes.forEach((spoke) => spoke.classList.remove('is-story-spoke-active'));
    };

    const clearPhase2Markers = () => {
      ringSegs.forEach((segment) => {
        segment.classList.remove('is-story-ring-active', 'is-story-ring-current');
      });
    };

    const clearConvergenceMarkers = () => {
      spokes.forEach((spoke) => {
        spoke.classList.remove(
          'is-story-spoke-lit',
          'is-story-spoke-converging',
          'is-story-spoke-converged',
        );
      });
      ringSegs.forEach((segment) => segment.classList.remove('is-story-ring-lit'));
    };

    const clearActiveMarkers = () => {
      clearPhase1Markers();
      clearPhase2Markers();
      clearConvergenceMarkers();
    };

    const resetStoryVisuals = () => {
      clearPhaseClasses();
      clearActiveMarkers();
      instrument.classList.remove('is-story-loop');
    };

    const canRunStory = () => (
      instrument.classList.contains('is-active')
      && !instrument.classList.contains('is-idle-paused')
      && !instrument.classList.contains('is-tab-hidden')
      && !instrument.classList.contains('is-story-paused')
    );

    const shouldDeferStory = () => instrument.classList.contains('is-tab-hidden');

    const runStoryStep = (fn) => {
      if (!canRunStory()) {
        if (shouldDeferStory()) scheduleStory(STORY_TIMING.pollMs, () => runStoryStep(fn));
        return;
      }
      fn();
    };

    const scheduleStory = (delayMs, fn) => {
      window.clearTimeout(storyTimer);
      storyTimer = window.setTimeout(fn, delayMs);
    };

    const restartHubGlow = () => {
      [hubRing, hubHalo].forEach((element) => {
        if (!element) return;
        element.style.animation = 'none';
        element.getBoundingClientRect();
        element.style.animation = '';
      });
    };

    pauseApproachStoryLoop = () => {
      window.clearTimeout(storyTimer);
      window.clearTimeout(storyStartTimer);
      storyStartTimer = 0;
      storyIndex = 0;
      phase2Index = 0;
      phase3Index = 0;
      resetStoryVisuals();
    };

    const beginPhase2 = () => {
      runStoryStep(() => {
        clearPhase1Markers();
        clearPhase2Markers();
        clearPhaseClasses();
        instrument.classList.add('is-story-loop', 'story-phase-2');
        phase2Index = 0;
        runPhase2Step();
      });
    };

    const beginPhase3b = () => {
      runStoryStep(() => {
        clearPhaseClasses();
        instrument.classList.add('is-story-loop', 'story-phase-3b');
        spokes.forEach((spoke) => {
          spoke.classList.remove('is-story-spoke-converging');
          spoke.classList.add('is-story-spoke-lit', 'is-story-spoke-converged');
        });
        ringSegs.forEach((segment) => segment.classList.add('is-story-ring-lit'));
        restartHubGlow();
        scheduleStory(STORY_TIMING.phase3bMs, beginPhase4);
      });
    };

    function runPhase3aStep() {
      runStoryStep(() => {
        if (phase3Index >= spokes.length) {
          phase3Index = 0;
          scheduleStory(STORY_TIMING.phaseGapMs, beginPhase3b);
          return;
        }

        spokes.forEach((spoke) => spoke.classList.remove('is-story-spoke-converging'));
        for (let i = 0; i < phase3Index; i += 1) {
          instrument.querySelector(`.approach-hero__map-spoke--${i + 1}`)?.classList.add('is-story-spoke-converged');
        }

        instrument.querySelector(`.approach-hero__map-spoke--${phase3Index + 1}`)?.classList.add('is-story-spoke-converging');
        phase3Index += 1;
        scheduleStory(STORY_TIMING.phase3aSpokeMs, runPhase3aStep);
      });
    }

    const beginPhase3 = () => {
      runStoryStep(() => {
        clearPhase2Markers();
        clearConvergenceMarkers();
        clearPhaseClasses();
        instrument.classList.add('is-story-loop', 'story-phase-3a');
        ringSegs.forEach((segment) => segment.classList.add('is-story-ring-lit'));
        phase3Index = 0;
        runPhase3aStep();
      });
    };

    const beginPhase4 = () => {
      runStoryStep(() => {
        clearPhaseClasses();
        instrument.classList.add('is-story-loop', 'story-phase-4');
        scheduleStory(STORY_TIMING.phase4Ms, () => {
          scheduleStory(STORY_TIMING.phaseGapMs, beginPhase1);
        });
      });
    };

    function runPhase2Step() {
      runStoryStep(() => {
        if (phase2Index >= RING_SEGMENT_SELECTORS.length) {
          phase2Index = 0;
          scheduleStory(STORY_TIMING.phaseGapMs, beginPhase3);
          return;
        }

        ringSegs.forEach((segment) => segment.classList.remove('is-story-ring-current'));
        const segment = instrument.querySelector(RING_SEGMENT_SELECTORS[phase2Index]);
        segment?.classList.add('is-story-ring-active', 'is-story-ring-current');
        phase2Index += 1;
        scheduleStory(STORY_TIMING.phase2RingMs, runPhase2Step);
      });
    }

    function runPhase1Step() {
      runStoryStep(() => {
        if (storyIndex >= sortedOcts.length) {
          storyIndex = 0;
          scheduleStory(STORY_TIMING.phaseGapMs, beginPhase2);
          return;
        }

        sortedOcts.forEach((oct) => oct.classList.remove('is-story-node-active'));
        spokes.forEach((spoke) => spoke.classList.remove('is-story-spoke-active'));

        const oct = sortedOcts[storyIndex];
        const spoke = instrument.querySelector(`.approach-hero__map-spoke--${oct.dataset.seat}`);
        oct.classList.add('is-story-node-seen', 'is-story-node-active');
        spoke?.classList.add('is-story-spoke-active');
        storyIndex += 1;
        scheduleStory(STORY_TIMING.phase1NodeMs, runPhase1Step);
      });
    }

    function beginPhase1() {
      runStoryStep(() => {
        clearActiveMarkers();
        clearPhaseClasses();
        instrument.classList.add('is-story-loop', 'story-phase-1');
        storyIndex = 0;
        runPhase1Step();
      });
    }

    startApproachStoryLoop = (delayMs = STORY_TIMING.startDelayMs) => {
      window.clearTimeout(storyStartTimer);
      if (reducedMotion || !instrument.classList.contains('is-active')) return;
      storyStartTimer = window.setTimeout(() => {
        storyStartTimer = 0;
        if (!canRunStory()) return;
        beginPhase1();
      }, delayMs);
    };

    const pauseStoryForOctInteraction = () => {
      if (instrument.classList.contains('is-story-paused')) return;
      instrument.classList.add('is-story-paused');
      pauseApproachStoryLoop();
    };

    const resumeStoryAfterOctInteraction = () => {
      instrument.classList.remove('is-story-paused');
      if (!canRunStory()) return;
      startApproachStoryLoop(STORY_TIMING.resumeDelayMs);
    };

    const storyOctGrid = constellation.querySelector('.approach-hero__oct-grid');
    if (storyOctGrid) {
      storyOctGrid.addEventListener('mouseover', (event) => {
        if (!event.target.closest('.approach-hero__oct')) return;
        pauseStoryForOctInteraction();
      });

      storyOctGrid.addEventListener('mouseout', (event) => {
        const fromOct = event.target.closest('.approach-hero__oct');
        if (!fromOct) return;
        const related = event.relatedTarget;
        if (related && storyOctGrid.contains(related) && related.closest('.approach-hero__oct')) return;
        resumeStoryAfterOctInteraction();
      });

      storyOctGrid.addEventListener('focusin', (event) => {
        if (!event.target.closest('.approach-hero__oct')) return;
        pauseStoryForOctInteraction();
      });

      storyOctGrid.addEventListener('focusout', (event) => {
        const related = event.relatedTarget;
        if (related && storyOctGrid.contains(related)) return;
        resumeStoryAfterOctInteraction();
      });
    }
  }

  const activateInstrument = () => {
    instrument.classList.add('is-active');
    scheduleApproachGridTraceLayout();
    window.setTimeout(scheduleApproachGridTraceLayout, 520);
    startApproachStoryLoop();
  };

  const isInViewport = () => {
    const rect = instrument.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  };

  if (reducedMotion || isInViewport()) {
    activateInstrument();
  } else {
    const enterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activateInstrument();
        enterObserver.disconnect();
      });
    }, { threshold: 0.12 });
    enterObserver.observe(instrument);

    window.setTimeout(() => {
      if (!instrument.classList.contains('is-active') && isInViewport()) {
        activateInstrument();
      }
    }, 120);
  }

  if (failureMap && hero) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        hero.classList.toggle('approach-hero--map-inview', entry.isIntersecting);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    mapObserver.observe(failureMap);
  }

  if (!reducedMotion) {
    let idleTimer = window.setTimeout(() => {
      instrument.classList.add('is-idle-paused');
      pauseApproachStoryLoop();
    }, idlePauseMs);

    const resumeIdle = () => {
      instrument.classList.remove('is-idle-paused');
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        instrument.classList.add('is-idle-paused');
        pauseApproachStoryLoop();
      }, idlePauseMs);
    };

    instrument.addEventListener('mouseenter', resumeIdle);
    instrument.addEventListener('focusin', resumeIdle);
    document.addEventListener('visibilitychange', () => {
      instrument.classList.toggle('is-tab-hidden', document.hidden);
      if (document.hidden) {
        pauseApproachStoryLoop();
      } else {
        resumeIdle();
        startApproachStoryLoop(1200);
      }
    });
  }

  octs.forEach((oct) => {
    const storyStep = oct.getAttribute('data-story-step');
    if (!storyStep) return;

    const activate = () => {
      if (!failureMap) return;
      failureMap.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      highlightDiagnosticStep(storyStep);
    };

    oct.addEventListener('click', activate);
    oct.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    });
  });

  if (finePointer && !reducedMotion && desktopLayout && hero) {
    const ambient = hero.querySelector('.approach-hero__ambient');
    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const applyParallax = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (ambient) {
        ambient.style.transform = `translate3d(${currentX * -8}px, ${currentY * -6}px, 0)`;
      }
      instrument.style.setProperty('--instr-px', `${currentX * 4}px`);
      instrument.style.setProperty('--instr-py', `${currentY * 3}px`);

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        rafId = window.requestAnimationFrame(applyParallax);
      } else {
        rafId = 0;
      }
    };

    const queueParallax = (x, y) => {
      targetX = x;
      targetY = y;
      if (!rafId) rafId = window.requestAnimationFrame(applyParallax);
    };

    hero.addEventListener('mousemove', (event) => {
      if (!instrument.classList.contains('is-active')) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      queueParallax(x, y);
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = window.requestAnimationFrame(applyParallax);
    });
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleApproachGridTraceLayout).catch(() => {});
  }
  scheduleApproachGridTraceLayout();
}

function highlightDiagnosticStep(step) {
  const traceStage = document.querySelector(`.trace-stage[data-step="${step}"]`);
  const diagnosticStep = document.querySelector(`.diagnostic-step[data-step="${step}"]`);
  [traceStage, diagnosticStep].forEach((element) => {
    if (!element) return;
    element.classList.add('diagnostic-step--hero-highlight');
    window.setTimeout(() => {
      element.classList.remove('diagnostic-step--hero-highlight');
    }, 2400);
  });
}

function initFounderFluidWaves() {
  const canvas = document.querySelector('.about-founder__wave-canvas');
  const section = document.querySelector('.about-founder');
  if (!canvas || !section || !document.body.classList.contains('about-page')) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;

  let width = 0;
  let height = 0;
  let time = 0;
  let currentSpeed = 0.3;
  let targetSpeed = 0.3;
  let running = false;
  let gustTimer = null;

  const colorPrimary = 'rgba(2, 115, 67, ';
  const colorSlate = 'rgba(72, 105, 102, ';
  const colorDark = 'rgba(28, 46, 74, ';
  const colorLight = 'rgba(240, 253, 244, ';

  const waveConfigs = [
    { color: colorPrimary, opacity: 0.14, offset: 0, ampY: 120, baseFreq: 0.0015, complexFreq: 0.0031, chaosFreq: 0.006, speedMult: 0.8 },
    { color: colorSlate, opacity: 0.11, offset: 2, ampY: 95, baseFreq: 0.0022, complexFreq: 0.0045, chaosFreq: 0.008, speedMult: 1.1 },
    { color: colorDark, opacity: 0.05, offset: 5, ampY: 130, baseFreq: 0.001, complexFreq: 0.0025, chaosFreq: 0.005, speedMult: 0.6 },
    { color: colorPrimary, opacity: 0.09, offset: 1, ampY: 85, baseFreq: 0.0028, complexFreq: 0.0052, chaosFreq: 0.009, speedMult: 1.3 },
    { color: colorSlate, opacity: 0.07, offset: 4, ampY: 72, baseFreq: 0.0035, complexFreq: 0.006, chaosFreq: 0.012, speedMult: 1.5 },
  ];

  const waveAnchor = 0.72;
  const breathingAmp = narrowViewport ? 22 : 32;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function randomizeMomentum() {
    if (reducedMotion) return;

    const isGust = !narrowViewport && Math.random() > 0.8;

    if (isGust) {
      targetSpeed = 1.0 + Math.random() * 0.9;
      gustTimer = window.setTimeout(randomizeMomentum, 2000 + Math.random() * 2500);
    } else {
      targetSpeed = 0.1 + Math.random() * 0.55;
      gustTimer = window.setTimeout(randomizeMomentum, 5000 + Math.random() * 7000);
    }
  }

  function drawFluidBackground() {
    ctx.clearRect(0, 0, width, height);

    if (!reducedMotion) {
      currentSpeed += (targetSpeed - currentSpeed) * 0.012;
      time += 0.005 * currentSpeed;
    }

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, `${colorLight}1)`);
    bgGrad.addColorStop(1, `${colorSlate}0.05)`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'multiply';

    for (let i = 0; i < waveConfigs.length; i += 1) {
      const config = waveConfigs[i];
      const waveColor = `${config.color}${config.opacity})`;
      const verticalBreathing = Math.sin(time * 0.5 + config.offset) * breathingAmp;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 15) {
        const y = height * waveAnchor
          + verticalBreathing
          + Math.sin(x * config.baseFreq + time * config.speedMult + config.offset) * config.ampY
          + Math.cos(x * config.complexFreq - time * (config.speedMult * 1.2) + config.offset) * (config.ampY * 0.45)
          + Math.sin(x * config.chaosFreq + time * 2.5 + config.offset) * (config.ampY * 0.15);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, height * 0.2, 0, height);
      gradient.addColorStop(0, `${config.color}0)`);
      gradient.addColorStop(0.5, waveColor);
      gradient.addColorStop(1, `${config.color}${config.opacity * 2.2})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function frame() {
    if (!running) return;
    drawFluidBackground();
    requestAnimationFrame(frame);
  }

  resizeCanvas();
  drawFluidBackground();

  if (reducedMotion) return;

  randomizeMomentum();

  window.addEventListener('resize', resizeCanvas);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(section);
  }

  if ('IntersectionObserver' in window) {
    let wasRunning = false;
    const observer = new IntersectionObserver(
      (entries) => {
        running = Boolean(entries[0]?.isIntersecting);
        if (running && !wasRunning) requestAnimationFrame(frame);
        wasRunning = running;
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
  } else {
    running = true;
    requestAnimationFrame(frame);
  }

  window.addEventListener(
    'pagehide',
    () => {
      if (gustTimer) window.clearTimeout(gustTimer);
    },
    { once: true },
  );
}

function initCertImageAlts() {
  document.querySelectorAll('.cert-card__media img[alt=""]').forEach((img) => {
    const card = img.closest('.cert-card');
    const trigger = card?.querySelector('[data-cert-alt]');
    if (trigger?.dataset.certAlt) img.alt = trigger.dataset.certAlt;
  });
}

function initCredentialsSection() {
  const section = document.getElementById('home-credentials');
  if (!section) return;

  const revealCopy = () => {
    section
      .querySelectorAll('.home-cred-split__copy .reveal, .home-cred-split__copy .reveal-stagger')
      .forEach((el) => el.classList.add('is-visible'));
  };

  revealCopy();

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) revealCopy();
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -10% 0px' },
  );

  observer.observe(section);
}

function initScrollReveal() {
  const targets = [...document.querySelectorAll('.reveal, .reveal-stagger')].filter(
    (el) =>
      !el.closest('.home-hero--editorial') &&
      !el.closest('.home-cred-split__visual') &&
      !el.closest('#home-credentials') &&
      !el.closest('.work-journey-page') &&
      !el.closest('.services-page'),
  );
  if (!targets.length) return;

  const show = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  targets.forEach((el) => {
    observer.observe(el);
    if (el.classList.contains('reveal-stagger')) {
      [...el.children].forEach((child, i) => {
        child.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
      });
    }
  });
}

function initStagesEvolution() {
  const root = document.querySelector('[data-stages-evolution]');
  if (!root) return;

  const section = root.closest('#home-stages');
  const frame = root.querySelector('.home-stages-evolution__frame');
  const page = root.querySelector('.home-stages-evolution__page');
  const cards = section ? [...section.querySelectorAll('[data-evolution-stage]')] : [];
  if (!frame || !cards.length) return;

  const STAGE_PEEL = { 1: 0, 2: 0.5, 3: 1 };
  const DEFAULT_STAGE = 2;
  const PEEL_ANCHOR_INSET = 0.25;
  const BOTTOM_ZONE = 0.25;
  const PEEL_EASE = 1.3;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let interaction = 'idle';
  let isDragging = false;
  let peelAnimTimer = null;

  const isInBottomZone = (clientY, rect) => {
    const relY = (clientY - rect.top) / rect.height;
    return relY >= 1 - BOTTOM_ZONE;
  };

  const peelToStage = (peel) => {
    if (peel < 0.34) return '1';
    if (peel < 0.67) return '2';
    return '3';
  };

  const syncCards = (stage) => {
    const value = String(stage);
    frame.dataset.evolutionState = value;
    cards.forEach((card) => {
      const active = card.dataset.evolutionStage === value;
      card.classList.toggle('is-active', active);
      if (active) {
        card.setAttribute('aria-current', 'true');
      } else {
        card.removeAttribute('aria-current');
      }
    });
  };

  const setPeelAnimating = (animate) => {
    if (reducedMotion) return;
    frame.classList.toggle('is-peel-animating', animate);
    if (peelAnimTimer) {
      window.clearTimeout(peelAnimTimer);
      peelAnimTimer = null;
    }
    if (animate) {
      peelAnimTimer = window.setTimeout(() => {
        frame.classList.remove('is-peel-animating');
        peelAnimTimer = null;
      }, 680);
    }
  };

  const applyPeel = (peel, { animate = false } = {}) => {
    const clamped = Math.max(0, Math.min(1, peel));
    setPeelAnimating(animate);
    frame.style.setProperty('--peel-progress', String(clamped));
    frame.classList.toggle('is-peel-open', clamped >= 0.99);
    frame.classList.toggle('is-peel-closed', clamped <= 0.02);
    if (page) {
      page.setAttribute('aria-hidden', clamped >= 0.99 ? 'true' : 'false');
    }
    syncCards(peelToStage(clamped));
  };

  const peelFromPointer = (clientX, clientY) => {
    const rect = frame.getBoundingClientRect();
    const anchorY = rect.bottom - rect.height * PEEL_ANCHOR_INSET;
    const dx = Math.max(0, rect.right - clientX);
    const dy = Math.max(0, anchorY - clientY);
    const spanY = rect.height * (1 - PEEL_ANCHOR_INSET);
    const raw = (dx / rect.width + dy / spanY) / 2;
    const peel = raw <= 0 ? 0 : Math.pow(Math.min(1, raw), PEEL_EASE);
    applyPeel(peel, { animate: false });
  };

  const updatePeelZoneCursor = (clientY) => {
    if (isDragging || interaction === 'card') {
      frame.classList.remove('is-peel-zone');
      return;
    }
    const rect = frame.getBoundingClientRect();
    frame.classList.toggle(
      'is-peel-zone',
      !frame.classList.contains('is-peel-open') && isInBottomZone(clientY, rect),
    );
  };

  applyPeel(STAGE_PEEL[DEFAULT_STAGE]);

  if (!reducedMotion) {
    frame.addEventListener('pointermove', (event) => {
      updatePeelZoneCursor(event.clientY);
      if (interaction === 'card' || !isDragging) return;
      peelFromPointer(event.clientX, event.clientY);
    });

    frame.addEventListener('pointerdown', (event) => {
      const rect = frame.getBoundingClientRect();
      const inZone = isInBottomZone(event.clientY, rect);
      if (!inZone) return;

      isDragging = true;
      interaction = 'cursor';
      frame.classList.add('is-peel-interactive', 'is-peel-dragging');
      frame.classList.remove('is-peel-zone');
      peelFromPointer(event.clientX, event.clientY);

      if (event.pointerType !== 'mouse' || !hoverCapable) {
        frame.setPointerCapture(event.pointerId);
      }
    });

    frame.addEventListener('pointerup', (event) => {
      if (frame.hasPointerCapture(event.pointerId)) {
        frame.releasePointerCapture(event.pointerId);
      }
      isDragging = false;
      frame.classList.remove('is-peel-dragging', 'is-peel-interactive');
    });

    frame.addEventListener('pointercancel', () => {
      isDragging = false;
      frame.classList.remove('is-peel-dragging', 'is-peel-interactive', 'is-peel-zone');
    });

    frame.addEventListener('pointerleave', () => {
      frame.classList.remove('is-peel-zone');
      if (!isDragging) {
        interaction = interaction === 'cursor' ? 'idle' : interaction;
        frame.classList.remove('is-peel-interactive');
      }
    });
  }

  cards.forEach((card) => {
    const stage = card.dataset.evolutionStage;
    if (!stage) return;

    const activateCard = () => {
      interaction = 'card';
      applyPeel(STAGE_PEEL[stage] ?? 0, { animate: !reducedMotion });
    };

    card.addEventListener('focus', activateCard);

    if (hoverCapable) {
      card.addEventListener('mouseenter', activateCard);
      card.addEventListener('mouseleave', (event) => {
        if (interaction !== 'card') return;
        const related = event.relatedTarget;
        const staysOnFrame = related instanceof Element
          && related.closest('.home-stages-evolution__frame');
        if (!staysOnFrame) {
          interaction = 'idle';
        }
      });
    }

    card.addEventListener('click', activateCard);
  });

  if (section) {
    section.addEventListener('mouseleave', () => {
      const focused = section.querySelector('[data-evolution-stage]:focus');
      if (focused) return;
      interaction = 'idle';
      isDragging = false;
      applyPeel(STAGE_PEEL[DEFAULT_STAGE], { animate: !reducedMotion });
      frame.classList.remove('is-peel-interactive', 'is-peel-dragging', 'is-peel-zone');
    });
  }

  if (!('IntersectionObserver' in window)) {
    frame.classList.add('is-entered');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      frame.classList.add('is-entered');
      observer.disconnect();
    },
    { threshold: 0.25 },
  );

  observer.observe(frame);
}

function initHomeChapterNav() {
  const nav = document.querySelector('[data-home-chapter-nav]');
  if (!nav) return;

  const links = [...nav.querySelectorAll('[data-chapter-link]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActive(target.id);
    });
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.2, 0.4, 0.6] },
  );

  sections.forEach((section) => observer.observe(section));
}

function initJourneyChapterNav() {
  const nav = document.querySelector('[data-journey-chapter-nav]');
  if (!nav) return;

  const links = [...nav.querySelectorAll('[data-chapter-link]')];
  const traceTiles = [...document.querySelectorAll('.work-journey-page .journey-trace-tile')];
  const observeTargets = traceTiles.length
    ? traceTiles
    : links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  if (!observeTargets.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setActiveByChapter = (chapter) => {
    if (!chapter) return;

    links.forEach((link) => {
      const active = link.dataset.journeyChapter === chapter;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    traceTiles.forEach((tile) => {
      tile.classList.toggle('journey-trace-tile--active', tile.dataset.journeyChapter === chapter);
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActiveByChapter(link.dataset.journeyChapter);
    });
  });

  if (!('IntersectionObserver' in window)) return;

  const visibility = new Map();

  const pickActiveChapter = () => {
    let bestChapter = null;
    let bestRatio = 0;

    observeTargets.forEach((target) => {
      const ratio = visibility.get(target) ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestChapter = target.dataset.journeyChapter;
      }
    });

    if (bestChapter && bestRatio > 0) setActiveByChapter(bestChapter);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      pickActiveChapter();
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  observeTargets.forEach((target) => observer.observe(target));

  const hash = window.location.hash;
  if (hash.length > 1) {
    const hashTarget = document.querySelector(hash);
    if (hashTarget?.dataset.journeyChapter) {
      setActiveByChapter(hashTarget.dataset.journeyChapter);
    }
  }
}

function hasRealImage(container) {
  return [...container.querySelectorAll('img')].some((img) => {
    const src = img.getAttribute('src')?.trim();
    return src && src !== '#' && !src.startsWith('data:,');
  });
}

function initVisualSections() {
  document.querySelectorAll('.media-panel, .cert-grid, .work-gallery, .intro-portrait').forEach((section) => {
    if (hasRealImage(section)) {
      section.classList.remove('is-empty');
    } else {
      section.classList.add('is-empty');
    }
  });

  document.querySelectorAll('.journey-image').forEach((figure) => {
    if (hasRealImage(figure)) {
      figure.classList.remove('is-empty');
    } else {
      figure.classList.add('is-empty');
    }
  });
}

function initPatternShowcase() {
  const root = document.querySelector('[data-pattern-showcase]');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[data-pattern-tab]')];
  const panes = [...root.querySelectorAll('[data-pattern-pane]')];
  const copies = [...root.querySelectorAll('[data-pattern-copy]')];
  if (!tabs.length || tabs.length !== panes.length || tabs.length !== copies.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const activate = (index) => {
    if (!reducedMotion) {
      root.classList.add('is-switching');
      window.clearTimeout(root.patternSwitchTimer);
      root.patternSwitchTimer = window.setTimeout(() => {
        root.classList.remove('is-switching');
      }, 360);
    }

    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panes.forEach((pane, i) => {
      const active = i === index;
      pane.classList.toggle('is-active', active);
      if (active) {
        pane.removeAttribute('hidden');
      } else {
        pane.setAttribute('hidden', '');
      }
    });

    copies.forEach((copy, i) => {
      const active = i === index;
      copy.classList.toggle('is-active', active);
      if (active) {
        copy.removeAttribute('hidden');
      } else {
        copy.setAttribute('hidden', '');
      }
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        next = (index + 1) % tabs.length;
        event.preventDefault();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        next = (index - 1 + tabs.length) % tabs.length;
        event.preventDefault();
      } else if (event.key === 'Home') {
        next = 0;
        event.preventDefault();
      } else if (event.key === 'End') {
        next = tabs.length - 1;
        event.preventDefault();
      } else {
        return;
      }
      tabs[next].focus();
      activate(next);
    });
  });

  activate(0);
  if (reducedMotion) {
    root.querySelectorAll('.home-pattern-pane, .home-pattern-copy').forEach((el) => {
      el.style.transition = 'none';
    });
  }
}

function setExpertiseTraceCardActive(id) {
  document.querySelectorAll('.expertise-trace-card').forEach((card) => {
    const cardId = card.dataset.expertiseId || card.id;
    card.classList.toggle('expertise-trace-card--active', cardId === id);
  });
}

function initExpertiseNavSpy() {
  const nav = document.querySelector('[data-expertise-nav]');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[data-expertise-target]')];
  const sections = links
    .map((link) => document.getElementById(link.dataset.expertiseTarget))
    .filter(Boolean);

  if (!sections.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.expertiseTarget === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    setExpertiseTraceCardActive(id);
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.dataset.expertiseTarget);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActive(target.id);
    });
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  sections.forEach((section) => observer.observe(section));

  const hashId = window.location.hash.replace('#', '');
  if (hashId && sections.some((section) => section.id === hashId)) {
    setActive(hashId);
  }
}

function initExpertiseTrace() {
  initExpertiseTraceNavigation();
  initExpertiseArrivalLock();
}

function initExpertiseTraceNavigation() {
  document.body.addEventListener(
    'click',
    (event) => {
      const link = event.target.closest('a[data-expertise-transition]');
      if (!link || link.target === '_blank') return;
      const id = link.dataset.expertiseTransition;
      if (!id) return;
      try {
        sessionStorage.setItem('expertise-trace-active', id);
      } catch (_) {
        /* ignore */
      }
    },
    true,
  );
}

function initExpertiseArrivalLock() {
  const hero = document.querySelector('.expertise-detail-page .ed-hero');
  if (!hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fromHub = false;

  try {
    fromHub = Boolean(sessionStorage.getItem('expertise-trace-active'));
    if (fromHub) sessionStorage.removeItem('expertise-trace-active');
  } catch (_) {
    /* ignore */
  }

  if (reducedMotion) {
    hero.classList.add('is-arrival-lock-static');
    return;
  }

  const runArrival = () => {
    hero.classList.add('is-arrival-lock');
    window.setTimeout(() => hero.classList.remove('is-arrival-lock'), 1200);
  };

  if (fromHub) {
    runArrival();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    runArrival();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      obs.disconnect();
      runArrival();
    },
    { threshold: 0.35 },
  );

  observer.observe(hero);
}

function appendCertLightboxContent(overlay) {
  const tmpl = document.getElementById('cert-lightbox-template');
  if (tmpl) {
    overlay.appendChild(tmpl.content.cloneNode(true));
    return;
  }

  const nav = document.createElement('div');
  nav.className = 'cert-lightbox__nav';
  nav.hidden = true;

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'cert-lightbox__prev';
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.textContent = '\u2039';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'cert-lightbox__next';
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.textContent = '\u203A';

  nav.append(prevBtn, nextBtn);

  const dialog = document.createElement('div');
  dialog.className = 'cert-lightbox__dialog';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'cert-lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close image view');
  closeBtn.textContent = '\u00D7';

  const meta = document.createElement('div');
  meta.className = 'cert-lightbox__meta';

  const titleEl = document.createElement('p');
  titleEl.className = 'cert-lightbox__title';
  titleEl.id = 'cert-lightbox-title';

  const contextEl = document.createElement('p');
  contextEl.className = 'cert-lightbox__context';
  contextEl.id = 'cert-lightbox-context';
  contextEl.hidden = true;

  const counterEl = document.createElement('p');
  counterEl.className = 'cert-lightbox__counter';
  counterEl.id = 'cert-lightbox-counter';
  counterEl.hidden = true;

  meta.append(titleEl, contextEl, counterEl);

  const imgEl = document.createElement('img');
  imgEl.className = 'cert-lightbox__img';
  imgEl.id = 'cert-lightbox-img';
  imgEl.alt = '';

  dialog.append(closeBtn, meta, imgEl);
  overlay.append(nav, dialog);
}

function initCertLightbox() {
  const triggers = document.querySelectorAll('[data-cert-view]');
  if (!triggers.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'cert-lightbox';
  overlay.id = 'cert-lightbox';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'cert-lightbox-title');
  appendCertLightboxContent(overlay);
  document.body.appendChild(overlay);

  const titleEl = overlay.querySelector('#cert-lightbox-title');
  const contextEl = overlay.querySelector('#cert-lightbox-context');
  const counterEl = overlay.querySelector('#cert-lightbox-counter');
  const imgEl = overlay.querySelector('#cert-lightbox-img');
  const closeBtn = overlay.querySelector('.cert-lightbox__close');
  const navWrap = overlay.querySelector('.cert-lightbox__nav');
  const prevBtn = overlay.querySelector('.cert-lightbox__prev');
  const nextBtn = overlay.querySelector('.cert-lightbox__next');

  if (!titleEl || !contextEl || !counterEl || !imgEl || !closeBtn || !navWrap || !prevBtn || !nextBtn) {
    return;
  }

  const galleryMap = new Map();
  triggers.forEach((trigger) => {
    const key = trigger.dataset.certGallery;
    if (!key) return;
    if (!galleryMap.has(key)) galleryMap.set(key, []);
    galleryMap.get(key).push(trigger);
  });

  let lastFocus = null;
  let activeGallery = null;
  let activeIndex = -1;

  const getGalleryItems = (trigger) => {
    const key = trigger?.dataset.certGallery;
    if (!key) return [];
    return galleryMap.get(key) || [];
  };

  const applyTrigger = (trigger) => {
    const src = trigger.dataset.certSrc;
    if (!src) return;
    titleEl.textContent = trigger.dataset.certTitle || 'Image';
    imgEl.src = src;
    imgEl.alt = trigger.dataset.certAlt || titleEl.textContent;

    const context = trigger.dataset.certContext || '';
    if (context) {
      contextEl.textContent = context;
      contextEl.hidden = false;
    } else {
      contextEl.textContent = '';
      contextEl.hidden = true;
    }

    const items = getGalleryItems(trigger);
    const isGallery = items.length > 1;
    overlay.classList.toggle('cert-lightbox--gallery', isGallery);
    navWrap.hidden = !isGallery;
    counterEl.hidden = !isGallery;

    if (isGallery) {
      const index = items.indexOf(trigger);
      activeGallery = items;
      activeIndex = index;
      counterEl.textContent = `${index + 1} of ${items.length}`;

      const nextItem = items[(index + 1) % items.length];
      if (nextItem?.dataset.certSrc) {
        const preload = new Image();
        preload.src = nextItem.dataset.certSrc;
      }
    } else {
      activeGallery = null;
      activeIndex = -1;
    }
  };

  const close = () => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    activeGallery = null;
    activeIndex = -1;
    if (lastFocus) lastFocus.focus();
  };

  const open = (trigger) => {
    if (!trigger?.dataset.certSrc) return;
    lastFocus = trigger;
    applyTrigger(trigger);
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const step = (direction) => {
    if (!activeGallery?.length || activeGallery.length < 2) return;
    activeIndex = (activeIndex + direction + activeGallery.length) % activeGallery.length;
    applyTrigger(activeGallery[activeIndex]);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });
}

const GEO_COLORS = {
  primary: 'rgba(2, 115, 67, ',
  slate: 'rgba(72, 105, 102, ',
  dark: 'rgba(28, 46, 74, ',
  light: 'rgba(240, 253, 244, ',
  surface: 'rgba(248, 250, 252, ',
};

const GEO_PRESETS = {
  failure: {
    blendMode: 'multiply',
    gustMultiplier: 1.12,
    parallaxScale: 280,
    opacityMultiplier: 1,
    lightBackground: true,
    shapes: [
      {
        type: 'triangle',
        color: GEO_COLORS.slate,
        opacity: 0.18,
        baseSize: 0.58,
        rotSpeed: 0.42,
        depth: 0.28,
        xFn: (t) => Math.sin(t * 0.4) * 0.42,
        yFn: (t) => Math.cos(t * 0.32) * 0.4,
      },
      {
        type: 'diamond',
        color: GEO_COLORS.dark,
        opacity: 0.12,
        baseSize: 0.68,
        rotSpeed: -0.35,
        depth: 0.45,
        xFn: (t) => Math.cos(t * 0.28 + 1) * 0.38,
        yFn: (t) => Math.sin(t * 0.48 + 2) * 0.34,
      },
      {
        type: 'square',
        color: GEO_COLORS.primary,
        opacity: 0.09,
        baseSize: 0.82,
        rotSpeed: 0.18,
        depth: 0.12,
        xFn: (t) => Math.sin(t * 0.55 - 2) * 0.32,
        yFn: (t) => Math.cos(t * 0.62 + 1) * 0.38,
      },
      {
        type: 'rectangle',
        color: GEO_COLORS.slate,
        opacity: 0.14,
        baseSize: 0.48,
        rotSpeed: -0.48,
        depth: 0.58,
        xFn: (t) => Math.cos(t * 0.75) * 0.44,
        yFn: (t) => Math.sin(t * 0.58 - 1) * 0.3,
      },
      {
        type: 'triangle',
        color: GEO_COLORS.dark,
        opacity: 0.1,
        baseSize: 0.78,
        rotSpeed: 0.28,
        depth: 0.35,
        xFn: (t) => Math.sin(t * 0.48 + 3) * 0.4,
        yFn: (t) => Math.cos(t * 0.38 + 2) * 0.36,
      },
    ],
  },
  success: {
    blendMode: 'soft-light',
    gustMultiplier: 0.72,
    parallaxScale: 220,
    opacityMultiplier: 0.85,
    lightBackground: true,
    shapes: [
      {
        type: 'diamond',
        color: GEO_COLORS.primary,
        opacity: 0.16,
        baseSize: 0.52,
        rotSpeed: 0.22,
        depth: 0.3,
        xFn: (t) => Math.sin(t * 0.26) * 0.3,
        yFn: (t) => Math.cos(t * 0.24) * 0.28,
      },
      {
        type: 'triangle',
        color: GEO_COLORS.primary,
        opacity: 0.13,
        baseSize: 0.46,
        rotSpeed: 0.2,
        depth: 0.25,
        xFn: (t) => Math.cos(t * 0.22 + 1) * 0.28,
        yFn: (t) => Math.sin(t * 0.26 + 0.5) * 0.26,
      },
      {
        type: 'square',
        color: GEO_COLORS.slate,
        opacity: 0.05,
        baseSize: 0.58,
        rotSpeed: 0.18,
        depth: 0.2,
        xFn: (t) => Math.sin(t * 0.2 + 2) * 0.26,
        yFn: (t) => Math.cos(t * 0.22 + 1) * 0.24,
      },
    ],
  },
  dark: {
    blendMode: 'soft-light',
    gustMultiplier: 0.45,
    parallaxScale: 0,
    opacityMultiplier: 0.7,
    lightBackground: false,
    mouseReactive: false,
    shapes: [
      {
        type: 'diamond',
        color: GEO_COLORS.light,
        opacity: 0.12,
        baseSize: 0.62,
        rotSpeed: 0.12,
        depth: 0.15,
        xFn: (t) => Math.sin(t * 0.18) * 0.35,
        yFn: (t) => Math.cos(t * 0.16) * 0.32,
      },
      {
        type: 'triangle',
        color: GEO_COLORS.light,
        opacity: 0.09,
        baseSize: 0.5,
        rotSpeed: 0.1,
        depth: 0.1,
        xFn: (t) => Math.cos(t * 0.14 + 1) * 0.3,
        yFn: (t) => Math.sin(t * 0.12) * 0.28,
      },
      {
        type: 'rectangle',
        color: GEO_COLORS.primary,
        opacity: 0.04,
        baseSize: 0.44,
        rotSpeed: 0.08,
        depth: 0.08,
        xFn: (t) => Math.sin(t * 0.1 + 2) * 0.25,
        yFn: (t) => Math.cos(t * 0.11) * 0.22,
      },
    ],
  },
};

function drawGeoPolygon(ctx, shape, radius) {
  ctx.beginPath();
  if (shape.type === 'square' || shape.type === 'diamond') {
    const offsetAngle = shape.type === 'diamond' ? Math.PI / 4 : 0;
    for (let j = 0; j < 4; j += 1) {
      const angle = j * (Math.PI / 2) + offsetAngle;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  } else if (shape.type === 'triangle') {
    for (let j = 0; j < 3; j += 1) {
      const angle = j * ((Math.PI * 2) / 3) - Math.PI / 2;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  } else if (shape.type === 'rectangle') {
    const rectW = radius * 1.5;
    const rectH = radius * 0.6;
    ctx.rect(-rectW / 2, -rectH / 2, rectW, rectH);
  }
  ctx.closePath();
}

function initBrandGeoCanvas(section, canvas, presetKey) {
  const preset = GEO_PRESETS[presetKey];
  if (!section || !canvas || !preset) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const mouseReactive = preset.mouseReactive !== false && !narrowViewport && !reducedMotion;

  let width = 0;
  let height = 0;
  let time = 0;
  let currentSpeed = 0.28;
  let targetSpeed = 0.28;
  let running = false;
  let rafId = 0;
  let gustTimer = null;

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseVelocity = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!mouseReactive) {
      mouseX = width / 2;
      mouseY = height / 2;
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    }
  }

  function setMouseFromEvent(event) {
    const rect = section.getBoundingClientRect();
    targetMouseX = event.clientX - rect.left;
    targetMouseY = event.clientY - rect.top;
  }

  function resetMouse() {
    targetMouseX = width / 2;
    targetMouseY = height / 2;
  }

  function randomizeMomentum() {
    if (reducedMotion) return;
    const gustChance = presetKey === 'failure' ? 0.82 : 0.9;
    if (Math.random() > gustChance) {
      targetSpeed = (0.55 + Math.random() * 0.45) * preset.gustMultiplier;
      gustTimer = window.setTimeout(randomizeMomentum, 2200 + Math.random() * 2200);
    } else {
      targetSpeed = (0.14 + Math.random() * 0.22) * preset.gustMultiplier;
      gustTimer = window.setTimeout(randomizeMomentum, 5500 + Math.random() * 5000);
    }
  }

  function drawFrame() {
    const dx = targetMouseX - mouseX;
    const dy = targetMouseY - mouseY;
    if (mouseReactive) {
      mouseX += dx * 0.045;
      mouseY += dy * 0.045;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      mouseVelocity += (instantVelocity - mouseVelocity) * 0.08;
    } else {
      mouseX = width / 2;
      mouseY = height / 2;
      mouseVelocity *= 0.9;
    }

    const tension = mouseReactive ? Math.min(mouseVelocity * 0.0018, 0.85) : 0;

    if (!reducedMotion) {
      currentSpeed += (targetSpeed - currentSpeed) * 0.01;
      time += 0.0035 * currentSpeed + 0.006 * tension;
    }

    ctx.clearRect(0, 0, width, height);

    if (preset.lightBackground) {
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, `${GEO_COLORS.surface}1)`);
      bgGrad.addColorStop(1, `${GEO_COLORS.slate}0.04)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.globalCompositeOperation = preset.blendMode;

    const mouseXNorm = width > 0 ? mouseX / width - 0.5 : 0;
    const mouseYNorm = height > 0 ? mouseY / height - 0.5 : 0;
    const maxDim = Math.max(width, height);

    for (let i = 0; i < preset.shapes.length; i += 1) {
      const shape = preset.shapes[i];
      const opacity = shape.opacity * preset.opacityMultiplier;
      const parallaxX = mouseXNorm * preset.parallaxScale * shape.depth;
      const parallaxY = mouseYNorm * preset.parallaxScale * shape.depth;
      const cx = width / 2 + shape.xFn(time) * width - parallaxX;
      const cy = height / 2 + shape.yFn(time) * height - parallaxY;
      const radius = maxDim * shape.baseSize * 0.5 + tension * 55 + Math.sin(time * 2 + i) * 14;
      const rotation = time * shape.rotSpeed + tension * shape.rotSpeed * 1.8;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      drawGeoPolygon(ctx, shape, radius);

      ctx.lineWidth = 3 + tension * 4;
      ctx.strokeStyle = `${shape.color}${Math.min(opacity * 2.2, 0.35)})`;
      ctx.shadowBlur = 18 + tension * 28;
      ctx.shadowColor = `${shape.color}${Math.min(opacity * 3.5, 0.45)})`;
      ctx.lineJoin = 'round';
      ctx.stroke();

      const fillGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      fillGrad.addColorStop(0, `${shape.color}${opacity})`);
      fillGrad.addColorStop(1, `${shape.color}0)`);
      ctx.fillStyle = fillGrad;
      ctx.fill();
      ctx.restore();
    }

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame() {
    if (!running) return;
    drawFrame();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resizeCanvas();
  resetMouse();
  mouseX = targetMouseX;
  mouseY = targetMouseY;
  drawFrame();

  if (reducedMotion) return;

  randomizeMomentum();

  if (mouseReactive) {
    section.addEventListener('mousemove', setMouseFromEvent);
    section.addEventListener('mouseleave', resetMouse);
  }

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
    });
  };

  window.addEventListener('resize', scheduleResize);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(section);
  }

  start();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { rootMargin: '120px 0px', threshold: 0.05 },
    );
    observer.observe(section);
  } else {
    start();
  }

  window.addEventListener(
    'pagehide',
    () => {
      if (gustTimer) window.clearTimeout(gustTimer);
      stop();
    },
    { once: true },
  );
}

function initOrganicMethodGeo() {
  if (!document.body.classList.contains('organic-method-page')) return;

  const interfacesSection = document.querySelector('.organic-method-interfaces');
  const interfacesCanvas = interfacesSection?.querySelector('.organic-method-interfaces__geo-canvas');
  if (interfacesSection && interfacesCanvas) {
    initBrandGeoCanvas(interfacesSection, interfacesCanvas, 'failure');
  }

  document.querySelectorAll('.organic-case-card--failure').forEach((card) => {
    const canvas = card.querySelector('.organic-case-card__geo-canvas');
    if (canvas) initBrandGeoCanvas(card, canvas, 'failure');
  });

  document.querySelectorAll('.organic-case-card--success').forEach((card) => {
    const canvas = card.querySelector('.organic-case-card__geo-canvas');
    if (canvas) initBrandGeoCanvas(card, canvas, 'success');
  });

  const closeSection = document.querySelector('.organic-method-close');
  const closeCanvas = closeSection?.querySelector('.organic-method-close__geo-canvas');
  if (closeSection && closeCanvas) {
    initBrandGeoCanvas(closeSection, closeCanvas, 'dark');
  }
}

function initCaseStudiesHeroNetwork() {
  const canvas = document.querySelector('.case-hero-network__canvas');
  const section = document.querySelector('.case-studies-page .page-hero--evidence');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const mouseReactive = !narrowViewport && !reducedMotion;

  let width = 0;
  let height = 0;
  let rafId = 0;
  let running = false;
  let particles = [];

  const mouse = {
    x: -1000,
    y: -1000,
    radius: 190,
  };

  const colorPrimary = 'rgba(2, 115, 67, ';
  const colorSlate = 'rgba(72, 105, 102, ';
  const colorDark = 'rgba(28, 46, 74, ';
  const colorLight = 'rgba(240, 253, 244, ';
  const particleCount = reducedMotion ? 48 : narrowViewport ? 58 : 98;
  const connectionDistance = narrowViewport ? 98 : 132;

  function initParticles() {
    particles = Array.from({ length: particleCount }, () => ({
      x: width * 0.36 + Math.random() * width * 0.64,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      size: Math.random() * 1.9 + 0.9,
      color: Math.random() > 0.52 ? colorPrimary : colorSlate,
    }));
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function setMouseFromEvent(event) {
    const rect = section.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }

  function resetMouse() {
    mouse.x = -1000;
    mouse.y = -1000;
  }

  function drawNetworkFrame() {
    ctx.clearRect(0, 0, width, height);

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, `${colorLight}0.98)`);
    bgGrad.addColorStop(0.52, '#f8fafc');
    bgGrad.addColorStop(1, '#e2eaf3');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const rightGlow = ctx.createRadialGradient(width * 0.84, height * 0.46, 0, width * 0.84, height * 0.46, width * 0.58);
    rightGlow.addColorStop(0, `${colorPrimary}0.16)`);
    rightGlow.addColorStop(0.45, `${colorSlate}0.08)`);
    rightGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = rightGlow;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];

      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let j = i + 1; j < particles.length; j += 1) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${colorSlate}${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (mouseReactive) {
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.radius) {
          const opacityMouse = (1 - distanceMouse / mouse.radius) * 0.36;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${colorPrimary}${opacityMouse})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();

          p.x += dxMouse * 0.004;
          p.y += dyMouse * 0.004;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.color === colorPrimary ? 0.56 : 0.46})`;
      ctx.fill();
    }
  }

  function frame() {
    if (!running) return;
    drawNetworkFrame();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reducedMotion) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resizeCanvas();
  drawNetworkFrame();

  if (mouseReactive) {
    section.addEventListener('mousemove', setMouseFromEvent);
    section.addEventListener('mouseleave', resetMouse);
  }

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
      drawNetworkFrame();
    });
  };

  window.addEventListener('resize', scheduleResize, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    },
    { rootMargin: '160px' },
  );

  observer.observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      drawNetworkFrame();
      start();
    }
  });

  window.addEventListener(
    'pagehide',
    () => {
      stop();
      observer.disconnect();
    },
    { once: true },
  );
}

function initScrollToTop() {
  const threshold = 560;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('aria-hidden', 'true');
  btn.tabIndex = -1;
  const svgNs = 'http://www.w3.org/2000/svg';
  const icon = document.createElementNS(svgNs, 'svg');
  icon.setAttribute('class', 'scroll-to-top__icon');
  icon.setAttribute('width', '16');
  icon.setAttribute('height', '16');
  icon.setAttribute('viewBox', '0 0 20 20');
  icon.setAttribute('aria-hidden', 'true');
  icon.setAttribute('focusable', 'false');
  const path = document.createElementNS(svgNs, 'path');
  path.setAttribute('d', 'M10 5.5 4.5 11h11L10 5.5Z');
  path.setAttribute('fill', 'currentColor');
  icon.appendChild(path);
  btn.appendChild(icon);

  document.body.appendChild(btn);

  let ticking = false;

  const updateVisibility = () => {
    const visible = window.scrollY > threshold;
    btn.classList.toggle('is-visible', visible);
    btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
    btn.tabIndex = visible ? 0 : -1;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateVisibility);
    },
    { passive: true },
  );

  updateVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
}
