const STORAGE_KEY = 'counter_value';

const getStoredCount = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

const saveCount = (count: number): void => {
  localStorage.setItem(STORAGE_KEY, count.toString());
};

export const Counter = () => {
  const count = getStoredCount();
  return `
    <div class="counter-container">
      <button class="counter-button decrease">−</button>
      <div class="counter-display" id="counter-display">${count}</div>
      <button class="counter-button increase">+</button>
    </div>
  `;
};

export const initializeCounter = (): void => {
  const decreaseBtn = document.querySelector('.counter-button.decrease') as HTMLButtonElement;
  const increaseBtn = document.querySelector('.counter-button.increase') as HTMLButtonElement;
  const display = document.getElementById('counter-display') as HTMLDivElement;

  if (!decreaseBtn || !increaseBtn || !display) return;

  let count = getStoredCount();

  decreaseBtn.addEventListener('click', () => {
    count--;
    display.textContent = count.toString();
    saveCount(count);
  });

  increaseBtn.addEventListener('click', () => {
    count++;
    display.textContent = count.toString();
    saveCount(count);
  });
};
