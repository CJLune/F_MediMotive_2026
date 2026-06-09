# MediMotive — Wave Animation Brief
## #how-areas-connect Section · services.html

---

## WHAT THIS DOES

The `#how-areas-connect` section currently shows prose on the left and a numbered flow diagram on the right. The diagram is being removed. The right side becomes empty space.

The fix: a Three.js WebGL animated wave is added as an **absolute background layer** directly inside the section element — not inside a box, not inside a card, not inside any div with a border or background. It bleeds across the full section width and is masked so it fades to invisible behind the left-side text and becomes fully visible on the right.

The left column keeps 100% of its existing text and CTAs, unchanged.

---

## HARD RULES — READ BEFORE TOUCHING ANYTHING

1. **Do not wrap the canvas in a box.** No border, no background colour, no padding around the canvas. It is a raw `<canvas>` element, a direct child of the section.
2. **Do not load Three.js on every page.** Add the script tag only in `services.html`, just before the closing `</body>`.
3. **Do not change any existing text content** in the section — not a single word.
4. **Do not remove the `.expertise-connect__content` div** or any of its children.
5. **Do not touch the expertise cards section** (`#expertise-areas`) above this section.
6. **Do not use inline `<script>` tags.** The wave init function goes in `assets/app.js` and is called from the existing `DOMContentLoaded` block.

---

## STEP 1 — services.html: HTML Changes

### 1a. Remove the diagram figure

Find and **delete** this entire element (lines ~350–397):
```html
<figure class="expertise-connect__diagram" aria-labelledby="expertise-connect-diagram-caption">
  ...everything inside...
</figure>
```

### 1b. Add the wave canvas

Inside the `<section class="section expertise-loop" id="how-areas-connect">`, as the **first child** — before the `<div class="container ...">` — add one line:

```html
<canvas class="expertise-connect__wave-canvas" aria-hidden="true"></canvas>
```

The section should now look like this:

```html
<section class="section expertise-loop" id="how-areas-connect">
  <canvas class="expertise-connect__wave-canvas" aria-hidden="true"></canvas>
  <div class="container expertise-connect__layout">
    <div class="expertise-connect__content">
      <!-- existing prose and CTAs — do not change -->
    </div>
  </div>
</section>
```

### 1c. Self-host Three.js

**Do NOT load Three.js from a CDN.** An external CDN script would be blocked by the site's Content-Security-Policy (`script-src 'self'`).

Instead:
1. Download `three.min.js` from `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` and save it to `assets/three.min.js`
2. In `services.html` only, add this **immediately before** `<script src="assets/app.js" defer></script>`:

```html
<script src="assets/three.min.js"></script>
```

This keeps the CSP clean, eliminates the external dependency, and works offline.

---

## STEP 2 — assets/styles.css: CSS Changes

Find the block starting at `/* --- How the areas connect --- */` and apply these exact changes.

### 2a. Make the section a positioning context

```css
.services-page .expertise-loop {
  border-top: 1px solid var(--line);
  background: #fff;
  position: relative;   /* ADD */
  overflow: hidden;     /* ADD */
}
```

### 2b. Make the layout two-column on desktop

```css
.services-page .expertise-connect__layout {
  display: grid;                                    /* was: block */
  grid-template-columns: 1fr 1fr;                  /* ADD */
  gap: clamp(40px, 6vw, 80px);                     /* ADD */
  align-items: center;                             /* ADD */
}

@media (max-width: 768px) {
  .services-page .expertise-connect__layout {
    grid-template-columns: 1fr;
  }
}
```

### 2c. Lift the text content above the canvas

```css
.services-page .expertise-connect__content {
  min-width: 0;
  max-width: 38rem;
  position: relative;   /* ADD */
  z-index: 1;           /* ADD */
}
```

### 2d. Add the canvas positioning rule

Add this new rule block after the `.expertise-connect__content` rule:

```css
.services-page .expertise-connect__wave-canvas {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: block;
  /* Fade: invisible on the left edge, fully visible on the right */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 25%,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 1) 75%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 25%,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 1) 75%,
    transparent 100%
  );
}

@media (max-width: 768px) {
  .services-page .expertise-connect__wave-canvas {
    width: 100%;
    opacity: 0.35;
  }
}
```

### 2e. Delete all diagram CSS rules

Delete every CSS rule that begins with `.services-page .expertise-connect__diagram`, `.services-page .expertise-connect__flow`, `.services-page .expertise-connect__step`, `.services-page .expertise-connect__gap`, `.services-page .expertise-connect__parallel`, `.services-page .expertise-connect__step-num`, `.services-page .expertise-connect__step-body`, `.services-page .expertise-connect__step--`, `.services-page .expertise-connect__zone-label`, `.services-page .expertise-connect__diagram-kicker`, `.services-page .expertise-connect__diagram-caption`, `.services-page .expertise-connect__interface-note`, `.services-page .expertise-connect__parallel-num`.

These rules are now dead code. Remove them entirely.

---

## STEP 3 — assets/app.js: Wave Function

### 3a. Add the init function

Add this complete function anywhere in `app.js` **before** the `DOMContentLoaded` listener:

```js
function initConnectWave() {
  const canvas = document.querySelector('.expertise-connect__wave-canvas');
  const section = document.querySelector('.services-page .expertise-loop');
  if (!canvas || !section || typeof THREE === 'undefined') return;

  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = reducedMotionMq.matches;
  reducedMotionMq.addEventListener('change', (e) => { reducedMotion = e.matches; });

  /* CRITICAL FIX 0: wrap renderer init in try/catch — WebGL is not available on all devices */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
  } catch (e) {
    return; /* WebGL unavailable — fail silently, page is unaffected */
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 15);

  /* CRITICAL FIX 1: setClearColor must be set before any render */
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const resizeCanvas = () => {
    const w = section.clientWidth;
    const h = section.clientHeight || 480;
    canvas.width = w * Math.min(window.devicePixelRatio, 2);
    canvas.height = h * Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resizeCanvas();

  const geo = new THREE.PlaneGeometry(32, 12, 128, 64);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 15.0 },
      uColorLight: { value: new THREE.Color('#f0fdf4') },
      uColorAccent: { value: new THREE.Color('#027343') },
      uColorDepth: { value: new THREE.Color('#486966') },
      uColorDark: { value: new THREE.Color('#1c2e4a') },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.x * 0.15 + uTime * 0.3) * 2.0;
        float twist = sin(pos.y * 0.4 - uTime * 0.2) * 1.5;
        float fold = sin((pos.x + pos.y) * 0.25 + uTime * 0.4) * 1.2;
        pos.z += wave + twist + fold;
        vElevation = pos.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorLight;
      uniform vec3 uColorAccent;
      uniform vec3 uColorDepth;
      uniform vec3 uColorDark;
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;
      void main() {
        float shimmer = sin(uTime * 0.5 + vUv.x * 10.0) * 0.05;
        float gradientMix = smoothstep(0.0, 1.0, vUv.x + shimmer);
        vec3 color = mix(uColorLight, uColorAccent, gradientMix);
        float depthMix = smoothstep(-1.0, 3.0, vElevation);
        color = mix(uColorDepth, color, depthMix);
        float deepShadowMix = smoothstep(-4.0, -1.5, vElevation);
        color = mix(uColorDark, color, deepShadowMix);
        vec2 grid = fract(vUv * 90.0);
        float lineThickness = 0.08;
        float lineX = smoothstep(1.0 - lineThickness, 1.0, grid.x) + smoothstep(lineThickness, 0.0, grid.x);
        float lineY = smoothstep(1.0 - lineThickness, 1.0, grid.y) + smoothstep(lineThickness, 0.0, grid.y);
        color = mix(color, uColorDepth, max(lineX, lineY) * 0.12);
        float edgeFadeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        float edgeFadeY = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
        gl_FragColor = vec4(color, edgeFadeX * edgeFadeY * 0.95);
      }
    `,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 4;
  mesh.rotation.z = Math.PI / 8;
  mesh.position.set(-2, 2, 0);
  scene.add(mesh);

  let running = false;
  let rafId = 0;
  let startTime = null;

  const draw = () => {
    if (!running) return;
    rafId = requestAnimationFrame(draw);
    if (!reducedMotion) {
      if (startTime === null) startTime = performance.now();
      mat.uniforms.uTime.value = 15.0 + (performance.now() - startTime) * 0.0004;
    }
    renderer.render(scene, camera);
  };

  const start = () => {
    if (running) return;
    running = true;
    /* CRITICAL FIX 2: first frame via rAF, never call draw() directly */
    requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  /* CRITICAL FIX 3: render one static frame immediately so there is no blank canvas flash */
  renderer.render(scene, camera);

  if (!reducedMotion) {
    /* Only animate when section is in viewport */
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) start();
          else stop();
        },
        { rootMargin: '80px 0px', threshold: 0 }
      );
      observer.observe(section);
    } else {
      start();
    }
  }

  /* Pause when tab hidden */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!reducedMotion) start();
  }, { passive: true });

  /* Resize */
  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
      if (!running) renderer.render(scene, camera);
    });
  };
  window.addEventListener('resize', scheduleResize, { passive: true });
  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleResize).observe(section);
  }

  window.addEventListener('pagehide', stop, { once: true });
}
```

### 3b. Call the function from DOMContentLoaded

Inside the existing `document.addEventListener('DOMContentLoaded', () => { ... })` block, add at the end:

```js
initConnectWave();
```

---

## VERIFICATION CHECKLIST

After making all changes, verify each item before finishing:

- [ ] Section has no box, card, or border around the wave — the canvas is raw inside the section
- [ ] Wave bleeds from centre-right of section, invisible behind the left text column
- [ ] Text content (all 5 paragraphs + 2 CTAs) is completely unchanged
- [ ] No black flash or stain on page load — first frame renders clean
- [ ] Animation pauses when section scrolls out of view (check with DevTools Performance tab)
- [ ] Animation pauses when browser tab is hidden
- [ ] `prefers-reduced-motion: reduce` shows a static frame — no animation
- [ ] On mobile (< 768px): wave is visible but subtle (0.35 opacity), single column layout
- [ ] `assets/three.min.js` exists as a local file — NOT loaded from any CDN
- [ ] Three.js is only loaded on `services.html` — confirm it is NOT in the `<head>` of any other page
- [ ] All removed diagram CSS rules are gone — no dead selectors remain
- [ ] Page still passes the existing security headers (no new external script domains introduced)

---

*MediMotive · CURSOR-CONNECT-WAVE brief*
*Option B: wave as full-section background layer, left column prose preserved, no boxed container*
