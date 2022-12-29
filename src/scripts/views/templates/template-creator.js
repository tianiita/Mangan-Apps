import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h1 class="restaurant-name" tabindex="0">${restaurant.name}</h1>
  <picture>
    <img class="restaurant-picture" 
      src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}" 
      srcset="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId} 480w, ${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId} 1080w"
      sizes="80vw" alt="${restaurant.name}" />
  </picture>
    <div class="detail_restaurant">
      <h2>Information</h2>
      <div class="restaurant-info">
        <h3>Alamat</h3>
        <p>${restaurant.address}</p>
        <h3>Kota</h3>
        <p>${restaurant.city}</p>
        <h3>Kategori</h3>
        <p>${restaurant.categories.map((category) => `${category.name}`).join(' ')}</p>
      </div>
      <h2>Menu Restaurant</h2> 
      <div class="restaurant-menu">
        <h3>Menu Makanan</h3>
        <p>${restaurant.menus.foods.map((food) => `${food.name}`).join(' - ')}</p>
        <br>
        <h3>Menu Minuman</h3>
        <p>${restaurant.menus.drinks.map((drink) => `${drink.name}`).join(' - ')}</p>
      </div> 
      <h2>Description</h2>
      <div class="restaurant-description">
        <p>${restaurant.description}</p>
      </div>
    </div>
`;

const createRestaurantReviewTemplate = (restaurant) => `
  <h2>Customer Reviews</h2>
  <div class="review-container">
    <div class="user-review">
      <form>
        <label for="name-review" class="caption-review">Name</label><br>
        <input type="text" id="userName" placeholder="  Your name"><br><br>
        <label for="input-review" class="caption-review">Review</label><br>
        <input type="text" id="userReview" placeholder="  Your review"><br><br>
        <button id="submitButton">Submit</button>
      </form>
    </div>
  </div>
  <br>
  <div class="restaurant-reviews">
    ${restaurant.customerReviews.map((review) => `
      <div class="customer-review">
        <b>${review.name}</b>
        <p>${review.date}</p>
        <p>${review.review}</p>
      </div>
    `).join('')}
  </div>
`;

const createRestaurantListTemplate = (restaurants) => `
  <div class="restaurant-list">
    <div class="restaurant-list_header">
      <picture>
        <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + restaurants.pictureId}" type="image/jpeg">
        <img class="restaurant-list_header_picture lazyload" alt="${restaurants.name || '-'}"
          data-src="${restaurants.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      </picture>
      <div class="restaurant-list_header_rating">
      <p>✭ <span class="restaurant-list_header_rating_score">${restaurants.rating || '-'}</span></p>
      </div>
    </div> 
    <div class="restaurant-list_description">
      <h2 class="restaurant_name"><a href="/#/detail/${restaurants.id}">${restaurants.name || '-'}</a></h2>
      <p>${restaurants.description || '-'}</p>
    </div>  
  </div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantListTemplate,
  createRestaurantReviewTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
