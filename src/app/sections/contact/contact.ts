import { Component, signal } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, MagneticDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);

  async copyEmail() {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }
}
