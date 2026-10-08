import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();

  toTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
