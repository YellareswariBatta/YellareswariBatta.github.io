import { Component, DestroyRef, ElementRef, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { BuddyService } from './buddy.service';
import { ThemeService } from '../theme.service';
import { PROFILE } from '../../data/portfolio.data';

type Pose = 'wave' | 'idle' | 'hold' | 'laptop' | 'juggle';
type Prop = 'none' | 'pen' | 'chart' | 'laptop' | 'magnifier' | 'phone' | 'mug' | 'robot' | 'hearts' | 'orbit';

interface Stop {
  id: string;
  pose: Pose;
  prop: Prop;
  say: string;
}

/** What she does, holds and says in each section, in page order. */
const STOPS: Stop[] = [
  { id: 'top', pose: 'wave', prop: 'none', say: 'Hi, I’m Yellareswari 👋 Scroll down — I’ll show you around!' },
  { id: 'about', pose: 'hold', prop: 'pen', say: 'I sketch it in Figma, then I build it ✏️' },
  { id: 'stack', pose: 'juggle', prop: 'orbit', say: 'Angular or React? I juggle both 🤹‍♀️' },
  { id: 'impact', pose: 'hold', prop: 'chart', say: 'Numbers I’m proud of 📈' },
  { id: 'featured', pose: 'laptop', prop: 'laptop', say: 'I built this one in React — try the live demo!' },
  { id: 'work', pose: 'laptop', prop: 'laptop', say: 'Real products, real users ✨' },
  { id: 'process', pose: 'hold', prop: 'magnifier', say: 'Every detail gets a closer look 🔍' },
  { id: 'sandbox', pose: 'hold', prop: 'phone', say: 'Go on, drag something into the phone 📱' },
  { id: 'experience', pose: 'hold', prop: 'mug', say: '5+ years — and plenty of coffee ☕' },
  { id: 'skills', pose: 'idle', prop: 'robot', say: 'Meet my AI pair programmer 🤖' },
  { id: 'contact', pose: 'wave', prop: 'hearts', say: 'Let’s build something great together 💌' },
];

interface Question {
  label: string;
  answer?: string;
  target?: string;
  href?: string;
  surprise?: boolean;
}

/** Quick replies in the "Ask me" menu: she answers and takes the visitor there. */
const QUESTIONS: Question[] = [
  { label: '⚛️ Your React work', target: 'featured', answer: 'Here’s my React app — it’s live, go and play! 🚀' },
  { label: '🅰️ Angular experience', target: 'experience', answer: '5+ years of Angular — v14 all the way to v20 with Signals.' },
  { label: '🎨 UX & Figma', target: 'about', answer: 'I design flows and Figma prototypes, then build them myself ✏️' },
  { label: '🔀 Angular vs React', target: 'stack', answer: 'Flip the switch — same component, both frameworks.' },
  { label: '📄 Resume', href: PROFILE.resume, answer: 'Opened my resume in a new tab 📄' },
  { label: '💬 Contact', target: 'contact', answer: 'Yay! Here’s how to reach me 💌' },
  { label: '🎲 Surprise me', surprise: true },
];

const FUN = [
  'Psst… you can drag me around!',
  'The chips in the hero are draggable too.',
  'Try the accent swatches — my blazer changes colour 🎨',
  'Scroll really fast… I dare you 🛹',
  'Built with Angular 21 and Signals 💪',
];

const EDGE = 16;
const SKATE_SPEED = 1.6; // px per ms of scroll before she grabs the skateboard
const GRAVITY = 0.9;

/**
 * Illustrated guide who walks along the bottom of the viewport as the page
 * scrolls — crossing once per section — with a prop and line for each section.
 * Fast scrolling → skateboard; tap opens an "Ask me" menu; she can be dragged
 * and dropped (with gravity); her eyes follow the cursor. Motion runs in rAF
 * outside change detection; only discrete state goes through signals.
 */
@Component({
  selector: 'app-scroll-buddy',
  templateUrl: './scroll-buddy.html',
  styleUrl: './scroll-buddy.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
    '(document:pointerdown)': 'onDocumentPointer($event)',
  },
})
export class ScrollBuddy {
  protected readonly buddy = inject(BuddyService);
  private readonly theme = inject(ThemeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly questions = QUESTIONS;

  protected readonly walking = signal(false);
  protected readonly skating = signal(false);
  protected readonly dragging = signal(false);
  protected readonly landing = signal(false);
  protected readonly hopping = signal(false);
  protected readonly flipping = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly poof = signal(false);
  protected readonly facing = signal<'left' | 'right'>('right');
  protected readonly side = signal<'left' | 'right'>('left');
  protected readonly stop = signal<Stop>(STOPS[0]);
  protected readonly override = signal<string | null>(null);
  protected readonly typed = signal('');

  protected readonly message = computed(() => this.override() ?? this.stop().say);
  protected readonly moving = computed(() => this.walking() || this.skating() || this.dragging());
  protected readonly mode = computed(() =>
    this.dragging() ? 'dangle' : this.skating() ? 'skate' : this.walking() ? 'walk' : 'still',
  );
  protected readonly pose = computed<Pose>(() => (this.moving() ? 'idle' : this.stop().pose));
  protected readonly prop = computed<Prop>(() => (this.moving() ? 'none' : this.stop().prop));

  private funIndex = 0;
  private pending: string | null = null;
  private overrideTimer?: ReturnType<typeof setTimeout>;
  private reduceMotion = false;
  /** Set once the page is wired up; drag handlers kick the animation loop through it. */
  private kick: () => void = () => {};
  private pointer = { id: -1, startX: 0, startY: 0, offsetX: 0, offsetY: 0, moved: false };
  private pos = { x: EDGE, y: 0, vy: 0 };

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Typewriter bubble: reveal the current message a few characters at a time.
    effect((onCleanup) => {
      const text = this.message();
      if (this.reduceMotion) {
        this.typed.set(text);
        return;
      }
      let i = 0;
      this.typed.set('');
      const timer = setInterval(() => {
        i += 2;
        this.typed.set(text.slice(0, i));
        if (i >= text.length) clearInterval(timer);
      }, 22);
      onCleanup(() => clearInterval(timer));
    });

    // React to the visitor playing with the theme toggle or accent swatches.
    let last = { theme: this.theme.theme(), accent: this.theme.accent() };
    effect(() => {
      const now = { theme: this.theme.theme(), accent: this.theme.accent() };
      if (now.theme === last.theme && now.accent === last.accent) return;
      if (now.accent !== last.accent) this.say('Ooh, new blazer colour! 🎨');
      else this.say(now.theme === 'dark' ? 'Lights off! 🌙' : 'Good morning! ☀️');
      last = now;
      this.hop();
    });

    afterNextRender(() => {
      if (typeof requestAnimationFrame === 'undefined') return;
      this.reduceMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

      const figure = () => this.host.querySelector<HTMLElement>('.figure');
      const width = () => figure()?.offsetWidth ?? 120;
      let target = EDGE;
      let frame = 0;
      let walkTimer: ReturnType<typeof setTimeout> | undefined;
      let skateTimer: ReturnType<typeof setTimeout> | undefined;
      let idleTimer: ReturnType<typeof setTimeout> | undefined;
      let lastY = window.scrollY;
      let lastT = performance.now();

      const sections = () =>
        STOPS.map((s) => ({ stop: s, el: document.getElementById(s.id) })).filter(
          (s): s is { stop: Stop; el: HTMLElement } => !!s.el,
        );

      // Scroll position → target x: she crosses the screen once per section, alternating direction.
      const computeTarget = () => {
        const probe = window.innerHeight * 0.6;
        const list = sections();
        let index = 0;
        let progress = 0;
        for (let i = 0; i < list.length; i++) {
          const rect = list[i].el.getBoundingClientRect();
          if (rect.top <= probe) {
            index = i;
            progress = Math.min(Math.max((probe - rect.top) / Math.max(rect.height, 1), 0), 1);
          }
        }
        // Linger at each side for a moment before crossing.
        const eased = progress < 0.15 ? 0 : progress > 0.85 ? 1 : (progress - 0.15) / 0.7;
        const t = index % 2 === 0 ? eased : 1 - eased;
        target = EDGE + Math.max(window.innerWidth - width() - EDGE * 2, 0) * t;

        const next = list[index]?.stop;
        if (next && next.id !== this.stop().id) {
          this.stop.set(next);
          // If she was asked to bring the visitor here, deliver the answer on arrival.
          if (this.pending) {
            this.say(this.pending, 5000);
            this.pending = null;
          } else if (!this.menuOpen()) {
            this.override.set(null);
          }
          this.burst();
          this.hop();
        }
      };

      const render = () => {
        this.host.style.setProperty('--x', `${this.pos.x.toFixed(1)}px`);
        this.host.style.setProperty('--y', `${(-this.pos.y).toFixed(1)}px`);
      };

      const tick = () => {
        let active = false;

        if (this.dragging()) {
          active = true;
        } else if (this.pos.y > 0) {
          // Falling after a drop.
          this.pos.vy += GRAVITY;
          this.pos.y = Math.max(this.pos.y - this.pos.vy, 0);
          active = true;
          if (this.pos.y === 0) {
            this.pos.vy = 0;
            this.landing.set(true);
            setTimeout(() => this.landing.set(false), 450);
            this.say('Thanks for the lift! 😄');
          }
        } else {
          const delta = target - this.pos.x;
          this.pos.x += delta * (this.skating() ? 0.2 : 0.1);
          if (Math.abs(delta) > 1) {
            active = true;
            clearTimeout(walkTimer);
            walkTimer = undefined;
            this.walking.set(true);
            this.facing.set(delta > 0 ? 'right' : 'left');
          } else if (this.walking() && !walkTimer) {
            walkTimer = setTimeout(() => {
              this.walking.set(false);
              walkTimer = undefined;
            }, 220);
          }
        }

        const onLeft = this.pos.x + width() / 2 < window.innerWidth / 2;
        this.side.set(onLeft ? 'left' : 'right');
        if (!this.walking() && !this.dragging()) this.facing.set(onLeft ? 'right' : 'left');

        render();
        frame = active ? requestAnimationFrame(tick) : 0;
      };
      this.kick = () => {
        if (!frame) frame = requestAnimationFrame(tick);
      };

      const armIdle = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (this.stop().id !== 'contact') this.say('Still there? 👀 The best bits are further down!', 4000);
        }, 15000);
      };

      const onScroll = () => {
        const now = performance.now();
        const speed = Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 1);
        lastY = window.scrollY;
        lastT = now;
        if (speed > SKATE_SPEED && !this.reduceMotion) {
          this.skating.set(true);
          clearTimeout(skateTimer);
          skateTimer = setTimeout(() => this.skating.set(false), 700);
        }
        computeTarget();
        armIdle();
        this.kick();
      };

      // Eyes follow the mouse.
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const rect = figure()?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height * 0.3);
        const len = Math.hypot(dx, dy) || 1;
        const dir = this.facing() === 'left' ? -1 : 1;
        this.host.style.setProperty('--ex', `${((dx / len) * 1.5 * dir).toFixed(2)}px`);
        this.host.style.setProperty('--ey', `${((dy / len) * 1.1).toFixed(2)}px`);
      };

      computeTarget();
      this.pos.x = target;
      render();
      armIdle();
      this.kick();

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('pointermove', onPointer, { passive: true });
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        [walkTimer, skateTimer, idleTimer, this.overrideTimer].forEach((t) => clearTimeout(t));
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('pointermove', onPointer);
      });
    });
  }

  /* ---------- Drag & drop her ---------- */

  protected onPointerDown(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.setPointerCapture(event.pointerId);
    this.pointer = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: rect.bottom - event.clientY,
      moved: false,
    };
  }

  protected onPointerMove(event: PointerEvent) {
    if (event.pointerId !== this.pointer.id) return;
    const p = this.pointer;
    if (!p.moved && Math.hypot(event.clientX - p.startX, event.clientY - p.startY) < 5) return;
    if (!p.moved) {
      p.moved = true;
      this.closeMenu();
      this.dragging.set(true);
      this.say('Whoa! 😮', 60000);
    }
    this.pos.x = Math.min(Math.max(event.clientX - p.offsetX, 0), window.innerWidth - 40);
    this.pos.y = Math.min(Math.max(window.innerHeight - event.clientY - p.offsetY - 4, 0), window.innerHeight - 200);
    if (event.movementX) this.facing.set(event.movementX < 0 ? 'left' : 'right');
    this.kick();
  }

  protected onPointerUp(event: PointerEvent) {
    if (event.pointerId !== this.pointer.id) return;
    this.pointer.id = -1;
    if (this.pointer.moved) {
      this.dragging.set(false);
      this.override.set(null);
      this.pos.vy = 0;
      this.kick();
    } else {
      this.toggleMenu();
    }
  }

  /* ---------- "Ask me" menu ---------- */

  protected toggleMenu(event?: Event) {
    if (this.menuOpen()) {
      this.closeMenu();
      return;
    }
    this.menuOpen.set(true);
    this.hop();
    this.say('What would you like to know? 🤔', 600000);
    // Keyboard users land on the first answer.
    if (event instanceof KeyboardEvent) {
      setTimeout(() => this.host.querySelector<HTMLElement>('.chip')?.focus(), 50);
    }
  }

  /** Clicking anywhere outside her closes the menu. */
  protected onDocumentPointer(event: PointerEvent) {
    if (this.menuOpen() && !this.host.contains(event.target as Node)) this.closeMenu();
  }

  protected closeMenu() {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.override.set(null);
  }

  protected ask(q: Question) {
    this.menuOpen.set(false);
    if (q.surprise) {
      this.flipping.set(true);
      this.say(FUN[this.funIndex++ % FUN.length], 4000);
      return;
    }
    if (q.href) window.open(q.href, '_blank', 'noopener');
    const target = q.target ? document.getElementById(q.target) : null;
    if (target && q.target !== this.stop().id) {
      this.pending = q.answer ?? null;
      this.override.set(null);
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.say(q.answer ?? '', 5000);
    }
  }

  /** Remove then re-add the sparkle burst so its animation replays. */
  private burst() {
    this.poof.set(false);
    requestAnimationFrame(() => this.poof.set(true));
  }

  private hop() {
    this.hopping.set(false);
    requestAnimationFrame(() => this.hopping.set(true));
  }

  private say(text: string, ms = 3200) {
    this.override.set(text);
    clearTimeout(this.overrideTimer);
    this.overrideTimer = setTimeout(() => this.override.set(null), ms);
  }
}
