import LikeButtonPresenter from '../../src/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../src/data/favorite-resto-idb';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};
export { createLikeButtonPresenterWithResto };
