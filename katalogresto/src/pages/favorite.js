import { openDB } from 'idb';
import { createFavRestoTemplate } from '../utils/template-creator';
import CONFIG from '../globals/config';

const DB_NAME = CONFIG.DATABASE_NAME;
const { OBJECT_STORE_NAME, DATABASE_VERSION } = CONFIG;

const Favorite = {
  async render() {
    return `
      <div id="main-content">
        <h1 class="app-title">Favorite Restaurants</h1>
        <div id="favorite-restaurants" class="restaurant-list">
          <!-- Content will be filled in afterRender -->
        </div>
      </div>
    `;
  },

  async afterRender() {
    let favoriteRestaurantsContainer;

    try {
      const db = await openDB(DB_NAME, DATABASE_VERSION);
      const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
      const store = tx.objectStore(OBJECT_STORE_NAME);

      const favoriteRestaurants = await store.getAll();
      await tx.done;

      favoriteRestaurantsContainer = document.getElementById('favorite-restaurants');

      if (favoriteRestaurants.length > 0) {
        favoriteRestaurantsContainer.innerHTML = createFavRestoTemplate(favoriteRestaurants);

        const restaurantDetailButtons = document.querySelectorAll('.restaurant-detail-button');
        restaurantDetailButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const restaurantId = button.getAttribute('data-restaurant-id');
            window.location.href = `#/restaurant/${restaurantId}`;
          });
        });
      } else {
        favoriteRestaurantsContainer.innerHTML = '<p>No favorite restaurants found.</p>';
      }
    } catch (error) {
      console.error('Error rendering favorite restaurant list:', error);

      const errorMessage = 'Failed to render favorite restaurant list. Please try again later.';
      favoriteRestaurantsContainer.innerHTML = `<p>${errorMessage}</p>`;
    }
  },
};

export default Favorite;
