import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;

    this.initializeAppShell();
  }

  initializeAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      content: this.content,
    });
    this.initMenu();
  }

  initMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navDrawer = document.getElementById('nav-drawer');
    const navMenu = document.getElementById('nav-menu');

    menuIcon.addEventListener('click', () => {
      navDrawer.classList.toggle('active');
      navMenu.classList.toggle('active');

      if (navMenu.classList.contains('active')) {
        navMenu.querySelector('a').focus();
      } else {
        this.button.focus(); // Menggunakan `this` untuk mengakses properti kelas
      }
    });

    const skipToContentLink = document.querySelector('.skip-link');
    skipToContentLink.addEventListener('click', (event) => {
      event.preventDefault();
      const url = UrlParser.parseActiveUrlWithCombiner();
      let targetId = null;

      if (url === '/') {
        targetId = 'main-content';
      } else if (url.includes('/restaurant/')) {
        targetId = 'restaurant-detail';
      } else if (url === '/favorites') {
        targetId = 'favorite-restaurants';
      }

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.tabIndex = -1;
          targetElement.focus();
        }
      }
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
