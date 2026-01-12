import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Counter, initializeCounter } from './Counter';

describe('Counter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Counter component', () => {
    it('renders counter container with buttons and display', () => {
      const html = Counter();
      expect(html).toContain('counter-container');
      expect(html).toContain('counter-button decrease');
      expect(html).toContain('counter-button increase');
      expect(html).toContain('counter-display');
    });

    it('displays initial count as 0 when localStorage is empty', () => {
      const html = Counter();
      expect(html).toContain('>0<');
    });

    it('displays stored count from localStorage', () => {
      localStorage.setItem('counter_value', '42');
      const html = Counter();
      expect(html).toContain('>42<');
    });

    it('handles stored count as string and converts to number', () => {
      localStorage.setItem('counter_value', '100');
      const html = Counter();
      expect(html).toContain('>100<');
    });

    it('returns empty string if localStorage value is invalid', () => {
      localStorage.setItem('counter_value', 'invalid');
      const html = Counter();
      expect(html).toBeDefined();
    });
  });

  describe('initializeCounter', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = Counter();
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('initializes event listeners for increase button', () => {
      initializeCounter();
      const increaseBtn = document.querySelector('.counter-button.increase') as HTMLButtonElement;
      const display = document.getElementById('counter-display') as HTMLDivElement;

      expect(display.textContent).toBe('0');

      increaseBtn.click();
      expect(display.textContent).toBe('1');
      expect(localStorage.getItem('counter_value')).toBe('1');
    });

    it('initializes event listeners for decrease button', () => {
      initializeCounter();
      const decreaseBtn = document.querySelector('.counter-button.decrease') as HTMLButtonElement;
      const display = document.getElementById('counter-display') as HTMLDivElement;

      expect(display.textContent).toBe('0');

      decreaseBtn.click();
      expect(display.textContent).toBe('-1');
      expect(localStorage.getItem('counter_value')).toBe('-1');
    });

    it('persists count changes to localStorage on increase', () => {
      initializeCounter();
      const increaseBtn = document.querySelector('.counter-button.increase') as HTMLButtonElement;

      increaseBtn.click();
      increaseBtn.click();
      increaseBtn.click();

      expect(localStorage.getItem('counter_value')).toBe('3');
    });

    it('persists count changes to localStorage on decrease', () => {
      initializeCounter();
      const decreaseBtn = document.querySelector('.counter-button.decrease') as HTMLButtonElement;

      decreaseBtn.click();
      decreaseBtn.click();

      expect(localStorage.getItem('counter_value')).toBe('-2');
    });

    it('restores count from localStorage on initialization', () => {
      localStorage.setItem('counter_value', '5');
      container.innerHTML = Counter();
      initializeCounter();

      const increaseBtn = document.querySelector('.counter-button.increase') as HTMLButtonElement;
      const display = document.getElementById('counter-display') as HTMLDivElement;

      expect(display.textContent).toBe('5');

      increaseBtn.click();
      expect(display.textContent).toBe('6');
      expect(localStorage.getItem('counter_value')).toBe('6');
    });

    it('handles multiple clicks correctly', () => {
      initializeCounter();
      const increaseBtn = document.querySelector('.counter-button.increase') as HTMLButtonElement;
      const decreaseBtn = document.querySelector('.counter-button.decrease') as HTMLButtonElement;
      const display = document.getElementById('counter-display') as HTMLDivElement;

      increaseBtn.click();
      increaseBtn.click();
      decreaseBtn.click();
      increaseBtn.click();

      expect(display.textContent).toBe('2');
      expect(localStorage.getItem('counter_value')).toBe('2');
    });

    it('does nothing if DOM elements are missing', () => {
      container.innerHTML = '';
      expect(() => {
        initializeCounter();
      }).not.toThrow();
    });
  });
});
