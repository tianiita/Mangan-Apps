import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import RestaurantData from '../../data/restaurant-data';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createRestaurantDetailTemplate, createRestaurantReviewTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div id="detailResto"></div>
    <div id="reviewResto"></div>
    <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantData.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detailResto');
    const restaurantReviewContainer = document.querySelector('#reviewResto');

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    restaurantReviewContainer.innerHTML = createRestaurantReviewTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: FavoriteRestoIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });

    const submitButton = document.querySelector('#submitButton');

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      const userName = document.querySelector('#userName').value;
      const userReview = document.querySelector('#userReview').value;
      const customerReview = document.createElement('div');
      const containerReview = document.querySelector('.restaurant-reviews');
  
      fetch(CONFIG.BASE_URL_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: restaurant.id,
          name: userName,
          review: userReview,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        customerReview.classList.add('customer-review');
        customerReview.innerHTML += `
          <b>${userName}</b>
          <p>${new Date().toDateString()}</p>
          <p>${userReview}</p>
        `;
        containerReview.appendChild(customerReview);
      })
      .catch((error) => {
        console.error(error);
      });
    });

    this._hideHeroContent();
  },

  _hideHeroContent() {
    const heroContent = document.querySelector('hero-content');
    heroContent.style.display = 'none';
  },
};

export default Detail;
