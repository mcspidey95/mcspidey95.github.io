import { gsap } from 'gsap';
import { onPage, onScroll, setLoaderFormat, setTransition, ease, isTouch, prefersReducedMotion, scrollToTarget } from '../engine';
import { site } from '../data/site';

let alterListenerWired = false;
let paletteWired = false;


let dumdumWired = false;
const HAND_SVG = `<svg viewBox="0 0 64 64" width="72" height="72" aria-hidden="true">
  <path fill="#f5d0a9" stroke="#1e293b" stroke-width="2.5" stroke-linejoin="round"
    d="M22 30V12a3 3 0 0 1 6 0v14m0-16a3 3 0 0 1 6 0v16m0-14a3 3 0 0 1 6 0v16m0-11a3 3 0 0 1 6 0v20c0 10-7 17-16 17h-3c-8 0-14-6-16-14l-3-11a3 3 0 0 1 5.6-2l3.4 7V30z"/>
</svg>`;

function slapStickyNote(host: HTMLElement, note: HTMLElement, hand: HTMLElement, idx: number) {
  if (host.dataset.slapped === '1' || host.dataset.peeled === '1') return;
  host.dataset.slapped = '1';
  const tilt = (idx % 2 === 0 ? -1.4 : 1.3);

  note.hidden = false;
  note.style.display = 'flex';

  if (prefersReducedMotion()) {
    host.classList.add('is-slapped');
    gsap.set(note, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, rotate: tilt });
    return;
  }

  hand.hidden = false;
  hand.style.display = 'block';

  gsap.killTweensOf([note, hand, host]);
  gsap.timeline()
    .set(note, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1.18, rotate: tilt * 2 })
    .fromTo(hand,
      { opacity: 0, x: 56, y: -56, scale: 1.55, rotate: 22 },
      { opacity: 1, x: 0, y: 0, scale: 1, rotate: -6, duration: 0.2, ease: 'power3.in' }
    )
    .add(() => { host.classList.add('is-slapped'); })
    .to(note, { opacity: 1, scale: 1, rotate: tilt, duration: 0.22, ease: 'back.out(1.7)' }, '<')
    .fromTo(host, { rotate: tilt * 0.8 }, { rotate: 0, duration: 0.35, ease: 'elastic.out(1, 0.4)' }, '<')
    .to(hand, {
      opacity: 0, x: 36, y: -36, scale: 1.15, duration: 0.22, ease: 'power2.out',
      onComplete: () => { hand.hidden = true; hand.style.display = 'none'; }
    }, '+=0.06');
}

function unslapStickyNote(host: HTMLElement, note: HTMLElement, hand: HTMLElement) {
  gsap.killTweensOf([note, hand]);
  if (host.dataset.slapped === '1') {
    gsap.set(host, { clearProps: 'rotate' });
  }
  host.dataset.slapped = '0';
  host.dataset.peeled = '0';
  host.classList.remove('is-slapped');
  hand.hidden = true;
  hand.style.display = 'none';
  note.hidden = true;
  note.style.display = 'none';
}

let dumdumObserver: IntersectionObserver | null = null;

function syncDumdumOnPage(active: boolean) {
  if (!active) {
    const pop = document.getElementById('dumdum-popover');
    if (pop) { pop.hidden = true; pop.style.display = 'none'; }
  }
  document.querySelectorAll<HTMLElement>('[data-dumdum-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(active));
  });

  dumdumObserver?.disconnect();
  dumdumObserver = null;

  const hosts = [...document.querySelectorAll<HTMLElement>('main [data-dumdum]')];
  hosts.forEach((host, idx) => {
    if (!host.classList.contains('dumdum-host')) {
      host.classList.add('dumdum-host');
    }
    let note = host.querySelector<HTMLElement>(':scope > .sticky-note');
    let hand = host.querySelector<HTMLElement>(':scope > .slap-hand');
    if (!note) {
      note = document.createElement('button');
      note.type = 'button';
      note.className = 'sticky-note';
      note.hidden = true;
      note.style.display = 'none';
      note.title = 'Click to peel off and read the real text';
      note.innerHTML = `<span class="sticky-note__head"><span class="sticky-note__tag">DUMDUM TRANSLATION</span><span class="sticky-note__peel">click to peel ×</span></span><span class="sticky-note__body"></span>`;
      note.querySelector('.sticky-note__body')!.textContent = host.dataset.dumdum || '';
      note.addEventListener('click', (e) => {
        e.stopPropagation();
        host.dataset.peeled = '1';
        host.dataset.slapped = '0';
        host.classList.remove('is-slapped');
        if (prefersReducedMotion()) {
          note!.hidden = true;
          note!.style.display = 'none';
        } else {
          gsap.to(note!, {
            opacity: 0, y: -16, scale: 0.9, duration: 0.2, ease: 'power2.in',
            onComplete: () => {
              note!.hidden = true;
              note!.style.display = 'none';
              gsap.set(note!, { y: 0 });
            }
          });
        }
      });
      host.appendChild(note);
    }
    if (!hand) {
      hand = document.createElement('div');
      hand.className = 'slap-hand';
      hand.hidden = true;
      hand.style.display = 'none';
      hand.innerHTML = HAND_SVG;
      host.appendChild(hand);
    }
    if (!active) {
      unslapStickyNote(host, note, hand);
    } else {
      host.dataset.peeled = '0';
      host.dataset.dumdumIdx = String(idx);
    }
  });

  if (active && hosts.length > 0) {
    dumdumObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const host = entry.target as HTMLElement;
        const note = host.querySelector<HTMLElement>(':scope > .sticky-note');
        const hand = host.querySelector<HTMLElement>(':scope > .slap-hand');
        const idx = parseInt(host.dataset.dumdumIdx || '0', 10);
        if (note && hand) slapStickyNote(host, note, hand, idx);
        dumdumObserver?.unobserve(host);
      });
    }, { threshold: 0.15 });
    hosts.forEach((h) => dumdumObserver!.observe(h));
  }
}

let dumdumPopTimer: ReturnType<typeof setTimeout> | undefined;

function flashDumdumPopover() {
  const pop = document.getElementById('dumdum-popover');
  if (!pop) return;
  clearTimeout(dumdumPopTimer);
  pop.hidden = false;
  pop.style.display = 'flex';
  const hide = () => { pop.hidden = true; pop.style.display = 'none'; };
  pop.onclick = hide;
  dumdumPopTimer = setTimeout(hide, 3800);
}

export function toggleDumdumMode(force?: boolean) {
  const html = document.documentElement;
  const current = html.getAttribute('data-dumdum-mode') === 'on';
  const next = force ?? !current;
  if (next) html.setAttribute('data-dumdum-mode', 'on');
  else html.removeAttribute('data-dumdum-mode');
  sessionStorage.setItem('valaris-dumdum', next ? 'on' : '');
  syncDumdumOnPage(next);
  if (next && !current) flashDumdumPopover();
}

export function toggleAlterEgo(force?: 'base' | 'spidey') {
  const html = document.documentElement;
  const next = force ?? (html.getAttribute('data-alter') === 'spidey' ? 'base' : 'spidey');
  if (next === 'spidey') html.setAttribute('data-alter', 'spidey');
  else html.removeAttribute('data-alter');
  sessionStorage.setItem('valaris-alter', next === 'spidey' ? 'spidey' : '');

  document.querySelectorAll<HTMLElement>('[data-alter-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(next === 'spidey'));
  });
  const roleEl = document.querySelector<HTMLElement>('[data-role-cycle]');
  if (roleEl) {
    roleEl.textContent = next === 'spidey' ? site.alterAliases[0] : site.roles[0];
  }
  const captionEl = document.querySelector<HTMLElement>('[data-alter-caption]');
  if (captionEl) {
    captionEl.textContent = next === 'spidey' ? 'MODE // SPIDER-SENSE' : 'MODE // POLARIS';
  }
}

export function setupMotion() {
  setLoaderFormat((p) => `${String(Math.round(p)).padStart(3, '0')}%`);

  let point = { x: innerWidth / 2, y: innerHeight / 2 };
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; }, { passive: true });
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'),
        { clipPath: `circle(0% at ${point.x}px ${point.y}px)` },
        { clipPath: `circle(150% at ${point.x}px ${point.y}px)`, duration: 0.65, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: 'circle(0% at 50% 50%)', duration: 0.7, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  if (!dumdumWired) {
    dumdumWired = true;
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        toggleDumdumMode();
      }
    });
    document.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement)?.closest('[data-dumdum-toggle]');
      if (btn) toggleDumdumMode();
    });
  }

  if (!alterListenerWired) {
    alterListenerWired = true;
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        toggleAlterEgo();
      }
    });
    document.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement)?.closest('[data-alter-toggle]');
      if (btn) toggleAlterEgo();
    });
  }

  if (!paletteWired) {
    paletteWired = true;
    addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('valaris:palette-toggle'));
      }
    });
  }

  onPage(() => {
    const off: (() => void)[] = [];

    // Button pointer-fill
    if (!isTouch() && !prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
        const fill = btn.querySelector<HTMLElement>('.btn__fill');
        if (!fill) return;
        const from = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
        let closed = true;
        const open = (at: string) => {
          if (closed) gsap.set(fill, { clipPath: `circle(0% at ${at})` });
          closed = false;
          btn.classList.add('is-filled');
          gsap.to(fill, { clipPath: `circle(150% at ${at})`, duration: 0.55, ease: ease.soft, overwrite: true });
        };
        const close = (at: string) => {
          btn.classList.remove('is-filled');
          gsap.to(fill, { clipPath: `circle(0% at ${at})`, duration: 0.45, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
        };
        const enter = (e: PointerEvent) => open(from(e));
        const leave = (e: PointerEvent) => close(from(e));
        const focus = () => btn.matches(':focus-visible') && open('50% 50%');
        const blur = () => close('50% 50%');
        btn.addEventListener('pointerenter', enter);
        btn.addEventListener('pointerleave', leave);
        btn.addEventListener('focus', focus);
        btn.addEventListener('blur', blur);
        off.push(() => {
          btn.removeEventListener('pointerenter', enter);
          btn.removeEventListener('pointerleave', leave);
          btn.removeEventListener('focus', focus);
          btn.removeEventListener('blur', blur);
        });
      });
    }

    // Alter-ego portrait hover (fine pointer) + click toggle (all devices)
    const portrait = document.querySelector<HTMLElement>('[data-portrait]');
    if (portrait) {
      const click = () => toggleAlterEgo();
      portrait.addEventListener('click', click);
      off.push(() => portrait.removeEventListener('click', click));
      if (!isTouch()) {
        const enter = () => toggleAlterEgo('spidey');
        const leave = () => toggleAlterEgo('base');
        portrait.addEventListener('pointerenter', enter);
        portrait.addEventListener('pointerleave', leave);
        off.push(() => {
          portrait.removeEventListener('pointerenter', enter);
          portrait.removeEventListener('pointerleave', leave);
        });
      }
    }

    syncDumdumOnPage(document.documentElement.getAttribute('data-dumdum-mode') === 'on');
    const isSpideyNow = document.documentElement.getAttribute('data-alter') === 'spidey';
    document.querySelectorAll<HTMLElement>('[data-alter-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isSpideyNow));
    });

    // Role typewriter (types + backspaces on one clean line)
    const roleEl = document.querySelector<HTMLElement>('[data-role-cycle]');
    if (roleEl && !prefersReducedMotion()) {
      let idx = 0;
      let charIdx = roleEl.textContent?.length ?? 0;
      let deleting = true;
      let lastMode = document.documentElement.getAttribute('data-alter') === 'spidey';
      let pauseUntil = performance.now() + 1400;
      let timer: number;

      const step = () => {
        const isSpidey = document.documentElement.getAttribute('data-alter') === 'spidey';
        const list = isSpidey ? site.alterAliases : site.roles;
        if (isSpidey !== lastMode) {
          lastMode = isSpidey;
          idx = 0;
          deleting = false;
          charIdx = 0;
          pauseUntil = 0;
        }
        const word = list[idx % list.length];
        const now = performance.now();
        if (now < pauseUntil) {
          timer = window.setTimeout(step, 80);
          return;
        }
        if (deleting) {
          charIdx = Math.max(0, charIdx - 1);
          roleEl.textContent = word.slice(0, charIdx);
          if (charIdx === 0) {
            deleting = false;
            idx = (idx + 1) % list.length;
            pauseUntil = now + 220;
          }
          timer = window.setTimeout(step, 32);
        } else {
          charIdx = Math.min(word.length, charIdx + 1);
          roleEl.textContent = word.slice(0, charIdx);
          if (charIdx === word.length) {
            deleting = true;
            pauseUntil = now + 1700;
          }
          timer = window.setTimeout(step, 58);
        }
      };
      timer = window.setTimeout(step, 1400);
      off.push(() => clearTimeout(timer));
    }

    // Index list floating preview
    const list = document.querySelector('[data-index]');
    const box = document.querySelector<HTMLElement>('.preview-box');
    if (list && box && !isTouch() && !prefersReducedMotion()) {
      const img = box.querySelector('img')!;
      const x = gsap.quickTo(box, 'x', { duration: 0.45, ease: 'power3.out' });
      const y = gsap.quickTo(box, 'y', { duration: 0.45, ease: 'power3.out' });
      const rot = gsap.quickTo(box, 'rotate', { duration: 0.65, ease: 'power3.out' });
      let lastX = 0, px = 0, py = 0;
      const move = (e: PointerEvent) => {
        px = e.clientX; py = e.clientY;
        x(px); y(py);
        rot(gsap.utils.clamp(-8, 8, (px - lastX) * 0.4));
        lastX = px;
      };
      const show = (e: Event) => {
        const src = (e.currentTarget as HTMLElement).dataset.preview;
        if (src) img.src = src;
        gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'expo.out' });
      };
      const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'expo.out' });
      list.querySelectorAll<HTMLAnchorElement>('a[data-preview]').forEach((a) => {
        a.addEventListener('pointerenter', show);
        a.addEventListener('focus', show);
      });
      list.addEventListener('pointerleave', hide);
      addEventListener('pointermove', move, { passive: true });
      const offScroll = onScroll(() => {
        if (!list.contains(document.elementFromPoint(px, py))) hide();
      });
      off.push(() => {
        removeEventListener('pointermove', move);
        offScroll();
      });
    }

    // Copy email
    document.querySelectorAll<HTMLElement>('[data-copy-email]').forEach((btn) => {
      const click = async () => {
        await navigator.clipboard?.writeText(site.email).catch(() => {});
        const orig = btn.textContent;
        btn.textContent = 'Copied manishbhat666@gmail.com';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      };
      btn.addEventListener('click', click);
      off.push(() => btn.removeEventListener('click', click));
    });

    // Smooth anchor links
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/#"]').forEach((a) => {
      const click = (e: MouseEvent) => {
        if (location.pathname === '/') {
          e.preventDefault();
          const target = a.getAttribute('href')!.slice(1);
          scrollToTarget(target);
        }
      };
      a.addEventListener('click', click);
      off.push(() => a.removeEventListener('click', click));
    });

    return () => off.forEach((f) => f());
  });
}
