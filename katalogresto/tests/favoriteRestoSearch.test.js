import FavoriteRestaurantIdb from '../src/data/favorite-resto-idb.js';
import FavoriteRestoSearchPresenter from '../src/pages/liked-resto/FavoriteRestoSearchPresenter';

describe('Searching Resto', () => {
  describe('When query is not empty', () => {
    it('should show the resto found by Favorite Restaurants', async () => {
      // Set up the query element
      const queryElement = document.createElement('input');
      queryElement.setAttribute('id', 'query');
      document.body.appendChild(queryElement);

      // Mock the view
      const mockView = {
        runWhenUserIsSearching: jest.fn(),
      };

      // Set up the presenter with the query element and mock view
      const presenter = new FavoriteRestoSearchPresenter({
        favoriteRestaurant: FavoriteRestaurantIdb,
        queryElement: queryElement,
        view: mockView, // Pass the mock view
      });

      // Mock the searchResto method
      jest.spyOn(FavoriteRestaurantIdb, 'searchResto').mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 1, title: 'Resto A' },
            // data tambahan sesuai kebutuhan
          ];
        }
        return [];
      });

      // Simulate user input and trigger search
      queryElement.value = 'resto a';
      queryElement.dispatchEvent(new Event('input'));

      // Wait for the search to complete
      await new Promise((resolve) => setTimeout(resolve, 500)); // You may adjust the delay as needed

      // Add your assertion here for checking if the results are displayed on the UI
      // For example: expect(presenter.view.getDisplayedRestaurants()).toHaveLength(1);
    }, 30000); // timeout disetel menjadi 30 detik
  });

  // ... (other test cases)
});
