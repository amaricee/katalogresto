Feature('End-to-End Test');

Scenario('User can like and unlike a restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-card', 5000);
  I.click('.restaurant-detail-button');
  I.waitForElement('#add-to-favorite-button', 5000);
  I.click('#add-to-favorite-button');
  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-card', 5000);
  I.click('.restaurant-detail-button');
  I.waitForElement('#add-to-favorite-button', 5000);
  I.click('#add-to-favorite-button');
  I.amOnPage('/#/favorites');
  I.wait(2);
  I.see('No favorite restaurants found.', '.restaurant-list');
});