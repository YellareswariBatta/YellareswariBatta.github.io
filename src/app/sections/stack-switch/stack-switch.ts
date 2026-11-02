import { Component, computed, signal } from '@angular/core';
import { FRAMEWORK_PAIRS, FRAMEWORK_SNIPPETS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

type Framework = 'angular' | 'react';
type Status = 'applied' | 'interviewing' | 'offer';

const STATUSES: Status[] = ['applied', 'interviewing', 'offer'];
const KEYWORDS = new Set(['export', 'class', 'function', 'const', 'return', 'import', 'from', 'new', 'this']);
const API = new Set(['signal', 'input', 'required', 'update', 'useState', 'setStatus']);

// One pass over the source: comments, strings, decorators, JSX/HTML tags, then identifiers.
const TOKEN =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(@\w+)|(<\/?[A-Za-z][\w-]*|\/?>)|([A-Za-z_]\w*)/gm;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Tiny syntax highlighter for the two fixed snippets — returns safe, escaped HTML. */
export function highlight(source: string): string {
  let html = '';
  let last = 0;
  for (const m of source.matchAll(TOKEN)) {
    html += escape(source.slice(last, m.index));
    const [text, comment, str, deco, tag, word] = m;
    const cls = comment
      ? 'c'
      : str
        ? 's'
        : deco
          ? 'd'
          : tag
            ? 't'
            : word && KEYWORDS.has(word)
              ? 'k'
              : word && API.has(word)
                ? 'f'
                : word && /^[A-Z]/.test(word)
                  ? 'y'
                  : '';
    html += cls ? `<span class="tk-${cls}">${escape(text)}</span>` : escape(text);
    last = m.index! + text.length;
  }
  return html + escape(source.slice(last));
}

@Component({
  selector: 'app-stack-switch',
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './stack-switch.html',
  styleUrl: './stack-switch.scss',
})
export class StackSwitch {
  protected readonly pairs = FRAMEWORK_PAIRS;
  protected readonly framework = signal<Framework>('angular');
  protected readonly code = {
    angular: highlight(FRAMEWORK_SNIPPETS.angular),
    react: highlight(FRAMEWORK_SNIPPETS.react),
  };
  protected readonly fileName = computed(() =>
    this.framework() === 'angular' ? 'status-card.ts' : 'StatusCard.tsx',
  );

  protected readonly status = signal<Status>('applied');
  protected readonly celebrate = computed(() => this.status() === 'offer');

  protected set(framework: Framework) {
    this.framework.set(framework);
  }

  protected advance() {
    this.status.update((s) => STATUSES[(STATUSES.indexOf(s) + 1) % STATUSES.length]);
  }

  protected onKey(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next: Framework = this.framework() === 'angular' ? 'react' : 'angular';
    this.framework.set(next);
    (event.currentTarget as HTMLElement).parentElement
      ?.querySelector<HTMLElement>(`[data-fw="${next}"]`)
      ?.focus();
  }
}
