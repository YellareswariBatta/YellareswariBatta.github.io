import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { RevealDirective } from '../../shared/reveal.directive';

type BlockType = 'header' | 'search' | 'tabs' | 'stats' | 'appointment' | 'chart' | 'toggle' | 'button';

interface Block {
  type: BlockType;
  label: string;
  icon: string;
}

interface CanvasItem {
  uid: number;
  type: BlockType;
}

const MAX_ITEMS = 7;
const STARTER: BlockType[] = ['header', 'stats'];

@Component({
  selector: 'app-sandbox',
  imports: [CdkDropList, CdkDrag, CdkDragPreview, CdkDragPlaceholder, NgTemplateOutlet, RevealDirective],
  templateUrl: './sandbox.html',
  styleUrl: './sandbox.scss',
})
export class Sandbox {
  protected readonly palette: Block[] = [
    { type: 'header', label: 'App header', icon: 'fa-solid fa-heading' },
    { type: 'search', label: 'Search field', icon: 'fa-solid fa-magnifying-glass' },
    { type: 'tabs', label: 'Segmented tabs', icon: 'fa-solid fa-table-columns' },
    { type: 'stats', label: 'Stat cards', icon: 'fa-solid fa-chart-simple' },
    { type: 'appointment', label: 'Appointment card', icon: 'fa-regular fa-calendar-check' },
    { type: 'chart', label: 'Activity chart', icon: 'fa-solid fa-chart-column' },
    { type: 'toggle', label: 'Settings toggle', icon: 'fa-solid fa-toggle-on' },
    { type: 'button', label: 'Primary button', icon: 'fa-solid fa-hand-pointer' },
  ];

  protected readonly max = MAX_ITEMS;
  /** Long-press on touch so swiping over the sandbox still scrolls the page. */
  protected readonly touchDelay = { touch: 220, mouse: 0 };
  protected readonly bars = [40, 65, 48, 80, 58, 92, 70];

  private nextUid = 0;
  protected readonly canvas = signal<CanvasItem[]>(STARTER.map((type) => this.create(type)));
  protected readonly full = computed(() => this.canvas().length >= MAX_ITEMS);
  protected readonly announcement = signal('');

  /** Only accept new blocks while there is room; reordering is always allowed. */
  protected readonly canEnter = () => !this.full();

  protected labelOf(type: BlockType) {
    return this.palette.find((b) => b.type === type)!.label;
  }

  /** Dropped on the phone: reorder, or insert a copy from the palette. */
  protected dropOnCanvas(event: CdkDragDrop<CanvasItem[], unknown, CanvasItem | BlockType>) {
    const items = [...this.canvas()];
    if (event.previousContainer === event.container) {
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      this.canvas.set(items);
      this.announce(`Moved ${this.labelOf((event.item.data as CanvasItem).type)} to position ${event.currentIndex + 1}`);
      return;
    }
    const type = event.item.data as BlockType;
    items.splice(event.currentIndex, 0, this.create(type));
    this.canvas.set(items);
    this.announce(`Added ${this.labelOf(type)}`);
  }

  /** Dragged from the phone back to the palette: remove it. */
  protected dropOnPalette(event: CdkDragDrop<Block[], unknown, CanvasItem | BlockType>) {
    if (event.previousContainer === event.container) return;
    this.remove(event.item.data as CanvasItem);
  }

  protected add(type: BlockType) {
    if (this.full()) return;
    this.canvas.update((items) => [...items, this.create(type)]);
    this.announce(`Added ${this.labelOf(type)}`);
  }

  protected remove(item: CanvasItem) {
    this.canvas.update((items) => items.filter((i) => i.uid !== item.uid));
    this.announce(`Removed ${this.labelOf(item.type)}`);
  }

  protected reset() {
    this.canvas.set(STARTER.map((type) => this.create(type)));
    this.announce('Screen reset');
  }

  protected clear() {
    this.canvas.set([]);
    this.announce('Screen cleared');
  }

  protected goContact(event: Event) {
    event.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  private create(type: BlockType): CanvasItem {
    return { uid: this.nextUid++, type };
  }

  private announce(message: string) {
    this.announcement.set(message);
  }
}
