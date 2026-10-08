import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Fades/slides an element in the first time it scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.el.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(this.el);
    });
  }
}
