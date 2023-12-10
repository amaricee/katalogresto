import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './styles/main.css';
import App from './views/app';
import swRegister from './sw-register';

const app = new App({
  button: document.querySelector('#menu-icon'),
  drawer: document.querySelector('#nav-drawer'),
  content: document.querySelector('#main-content'),
});

const renderApp = async () => {
  await app.renderPage();
  document.dispatchEvent(new Event('lazyloaded'));
};

window.addEventListener('hashchange', renderApp);
window.addEventListener('load', () => {
  renderApp();
  swRegister();
});
