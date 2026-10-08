import { Component } from '@angular/core';
import { PROCESS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-process',
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  protected readonly steps = PROCESS;
}
