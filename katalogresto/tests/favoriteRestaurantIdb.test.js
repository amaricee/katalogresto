import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
import FavoriteRestaurantIdb from '../src/data/favorite-resto-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);
});
