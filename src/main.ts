import { App } from './App';
import { initializeCounter } from './Counter';

const appDiv = document.getElementById('app');
if (appDiv) {
  appDiv.innerHTML = App();
  initializeCounter();
}
