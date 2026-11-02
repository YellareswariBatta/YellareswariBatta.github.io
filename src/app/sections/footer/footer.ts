import { Component, inject } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { BuddyService } from '../../shared/scroll-buddy/buddy.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly buddy = inject(BuddyService);
  protected readonly year = new Date().getFullYear();

  toTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
