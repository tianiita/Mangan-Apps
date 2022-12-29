import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import RestaurantData from '../../data/restaurant-data';
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

    this._reviewForm();

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

    this._hideHeroContent();
  },

  _hideHeroContent() {
    const heroContent = document.querySelector('hero-content');
    heroContent.style.display = 'none';
  },

  _reviewForm() {
    const submitButton = document.querySelector('#submitButton');

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._submitReview();
    });
  },

  _submitReview() {
    const customerReview = document.createElement('div');
    const userName = document.querySelector('#userName').value;
    const userReview = document.querySelector('#userReview').value;
    const reviewResto = document.querySelector('#reviewResto');

    console.log('Temporary: berhasil menambahkan review');

    customerReview.classList.add('review-custom');
    customerReview.innerHTML += `
      <div class="customer-review">
        <b>${userName}</b>
        <p>${userReview}</p>
      </div>
    `;
    reviewResto.appendChild(customerReview);
  },
};

export default Detail;
