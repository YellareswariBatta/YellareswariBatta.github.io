import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Animates a number from 0 to `appCountUp` when it first becomes visible. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  readonly appCountUp = input.required<number>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      const target = this.appCountUp();
      const reduceMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
        this.el.textContent = String(target);
        return;
      }

      this.el.textContent = '0';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            this.el.textContent = String(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      observer.observe(this.el);
    });
  }
}
