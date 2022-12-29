import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.css';
import './views/customs/hero';
import App from './views/app';
import swRegister from './utils/swRegister';

const app = new App({
  button: document.querySelector('#buttonMenu'),
  drawer: document.querySelector('#drawer'),
  hero: document.querySelector('hero-content'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
