import { openDB } from 'idb';

const DB_NAME = 'restaurant-db';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'restaurants';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) return null;
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putRestaurant(restaurant) {
    if (!Object.prototype.hasOwnProperty.call(restaurant, 'id')) return null;
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    if (!id) return null;
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  async searchResto() {
    // Implementasi pencarian sesuai kebutuhan
  },
};

export default FavoriteRestaurantIdb;
