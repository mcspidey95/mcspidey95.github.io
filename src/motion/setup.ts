import { gsap } from 'gsap';
import { onPage, onScroll, setLoaderFormat, setTransition, ease, isTouch, prefersReducedMotion, scrollToTarget } from '../engine';
import { site } from '../data/site';

let alterListenerWired = false;
let paletteWired = false;

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

  if (!alterListenerWired) {
    alterListenerWired = true;
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        toggleAlterEgo();
      }
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

    document.querySelectorAll<HTMLElement>('[data-alter-toggle]').forEach((btn) => {
      const click = () => toggleAlterEgo();
      btn.addEventListener('click', click);
      off.push(() => btn.removeEventListener('click', click));
    });

    // Role ticker (subtle live pulse at rest)
    const roleEl = document.querySelector<HTMLElement>('[data-role-cycle]');
    if (roleEl && !prefersReducedMotion()) {
      let idx = 0;
      const timer = setInterval(() => {
        const isSpidey = document.documentElement.getAttribute('data-alter') === 'spidey';
        const list = isSpidey ? site.alterAliases : site.roles;
        idx = (idx + 1) % list.length;
        roleEl.textContent = list[idx];
      }, 2800);
      off.push(() => clearInterval(timer));
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
