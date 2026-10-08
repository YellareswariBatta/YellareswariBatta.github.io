import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sandbox } from './sandbox';

describe('Sandbox', () => {
  let component: Sandbox;
  let fixture: ComponentFixture<Sandbox>;

  // Protected members are exercised through index access in tests.
  const api = () => component as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sandbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Sandbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create with the starter screen', () => {
    expect(component).toBeTruthy();
    expect(api().canvas().map((i: { type: string }) => i.type)).toEqual(['header', 'stats']);
  });

  it('adds and removes blocks', () => {
    api().add('button');
    const items = api().canvas();
    expect(items.at(-1).type).toBe('button');

    api().remove(items.at(-1));
    expect(api().canvas().length).toBe(2);
  });

  it('stops accepting blocks when the phone is full', () => {
    for (let i = 0; i < 10; i++) api().add('search');
    expect(api().canvas().length).toBe(api().max);
    expect(api().full()).toBe(true);
    expect(api().canEnter()).toBe(false);
  });

  it('reset restores the starter screen and clear empties it', () => {
    api().clear();
    expect(api().canvas().length).toBe(0);
    api().reset();
    expect(api().canvas().length).toBe(2);
  });
});
