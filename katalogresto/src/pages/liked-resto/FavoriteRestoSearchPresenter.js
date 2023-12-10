class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this.view = view;
    this.listenToSearchRequestByUser();
    this.favoriteRestaurant = favoriteRestaurant;
  }

  listenToSearchRequestByUser() {
    this.view.runWhenUserIsSearching(async (latestQuery) => {
      try {
        this.latestQuery = latestQuery.trim();

        const foundRestaurants = await this.favoriteRestaurant.searchResto(this.latestQuery);
        this.showFoundRestaurants(foundRestaurants);
      } catch (error) {
        this.showError(error);
      }
    });
  }

  showFoundRestaurants(restaurants) {
    this.view.showRestaurants(restaurants);
  }

  showError(message) {
    console.error(message);
    this.view.showErrorMessage(`Error: ${message}`);
  }
}

export default FavoriteRestoSearchPresenter;
