import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

const INTERACTIVE = 'a, button, [role="radio"], [role="switch"]';

/**
 * Desktop-only cursor follower: a dot that tracks the pointer exactly and a
 * ring that eases behind it, growing over interactive elements. Runs outside
 * change detection (plain listeners + rAF) and idles when the ring settles.
 */
@Component({
  selector: 'app-cursor',
  template: `<span class="ring"></span><span class="dot"></span>`,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    :host(.visible) {
      opacity: 1;
    }

    span {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      will-change: transform;
    }

    .dot {
      width: 6px;
      height: 6px;
      margin: -3px 0 0 -3px;
      background: var(--accent-a);
    }

    .ring {
      width: 36px;
      height: 36px;
      margin: -18px 0 0 -18px;
      border: 1.5px solid color-mix(in oklab, var(--accent-a) 60%, transparent);
    }

    .ring::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--accent-soft);
      transform: scale(0);
      transition: transform 0.35s var(--ease-spring);
    }

    :host(.hover) .ring::after {
      transform: scale(1.6);
    }

    :host(.down) .ring::after {
      transform: scale(1.1);
    }
  `,
})
export class Cursor {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof matchMedia === 'undefined') return;
      if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const dot = host.querySelector<HTMLElement>('.dot')!;
      const ring = host.querySelector<HTMLElement>('.ring')!;
      let mx = -100, my = -100, rx = -100, ry = -100;
      let frame = 0;

      const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        frame = Math.abs(mx - rx) + Math.abs(my - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        host.classList.add('visible');
        host.classList.toggle('hover', !!(e.target as Element | null)?.closest?.(INTERACTIVE));
        if (!frame) frame = requestAnimationFrame(tick);
      };
      const onLeave = () => host.classList.remove('visible');
      const onDown = () => host.classList.add('down');
      const onUp = () => host.classList.remove('down');

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.documentElement.addEventListener('mouseleave', onLeave);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      });
    });
  }
}
