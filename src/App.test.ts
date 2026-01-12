import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders Counter app', () => {
    expect(App()).toContain('Counter');
  });
});
