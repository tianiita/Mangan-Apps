const assert = require('assert');

Feature('E2E test for Mangan Apps');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants',  ({ I }) => {

  I.seeElement('#query');
  I.see('Kamu belum menambah restoran favorit nih :c', '.restaurant-list_not_found');
});

Scenario('liking one restaurant', async ({ I }) => {

  I.see('Kamu belum menambah restoran favorit nih :c', '.restaurant-list_not_found');

  I.amOnPage('/');

  I.seeElement('.restaurant_name a');

  const firstResto = locate('.restaurant_name a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('.restaurant-list');
  const likedRestoName = await I.grabTextFrom('.restaurant_name');

  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('unliking a restaurant', ({ I }) => {
  // like restoran dulu
  
  I.see('Kamu belum menambah restoran favorit nih :c', '.restaurant-list_not_found');

  I.amOnPage('/');  

  I.seeElement('.restaurant_name a');
  I.click('.restaurant_name a');  
  
  I.seeElement('#likeButton'); // aria-button="like this restaurant"
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  
  // baru unlike restoran

  I.seeElement('.restaurant_name a');
  I.click('.restaurant_name a');

  I.seeElement('#likeButton'); // aria-button="unlike this restaurant"
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  
  I.see('Kamu belum menambah restoran favorit nih :c', '.restaurant-list_not_found');
});
