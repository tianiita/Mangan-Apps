import { createRestaurantListTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
    <div class="content">
      <input id="query" type="text" placeholder="ketik untuk mencari restoran favoritmu di sini :)">
      <h1 class="caption">Favorite Restaurant</h1>
        <div id="restaurants" class="restaurants">
        </div>
    </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showResto(restaurants) {
    this.showFavoriteResto(restaurants);
  }

  showFavoriteResto(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantListTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('resto:updated'));
  }

  _getEmptyRestoTemplate() {
    return `
    <div class="restaurant-list_not_found">
      Kamu belum menambah restoran favorit nih :c
    </div>
    `;
  }
}

export default FavoriteRestoSearchView;
