import RestaurantData from '../../data/restaurant-data';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
      <h1 class="caption">Explore Restaurant</h1>
      <div id="restaurants" class="restaurants">
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantData.homePage();
    const restaurantContainer = document.querySelector('#restaurants');

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantListTemplate(restaurant);
    });

    this._showHeroContent();
  },

  _showHeroContent() {
    const heroContent = document.querySelector('hero-content');
    heroContent.style.display = 'block';
  },
};

export default Home;
