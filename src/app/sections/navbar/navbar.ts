import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { ThemeService } from '../../shared/theme.service';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-navbar',
  imports: [MagneticDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  protected readonly links = NAV_LINKS;
  protected readonly profile = PROFILE;

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.onScroll();
      if (typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const id of ['top', ...this.links.map((l) => l.id), 'contact']) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onScroll() {
    this.scrolled.set(window.scrollY > 24);
  }

  protected go(event: Event, id: string) {
    event.preventDefault();
    this.menuOpen.set(false);
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
    if (id === 'main') target?.focus({ preventScroll: true });
  }
}
