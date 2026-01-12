import { Counter } from './Counter';
import { GithubLink } from './GithubLink';

export const App = (): string => {
  return `
    <header>
      <h1>Counter</h1>
    </header>
    <main>
      ${Counter()}
    </main>
    <footer>
      ${GithubLink()}
    </footer>
    `;
};
