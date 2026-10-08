import { Component } from '@angular/core';
import { METRICS } from '../../data/portfolio.data';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-impact',
  imports: [CountUpDirective, RevealDirective],
  templateUrl: './impact.html',
  styleUrl: './impact.scss',
})
export class Impact {
  protected readonly metrics = METRICS;
}
