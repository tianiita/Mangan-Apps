import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import FavoriteRestoSearchView from './like-resto/favorite-resto-search-view';
import FavoriteRestoShowPresenter from './like-resto/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './like-resto/favorite-resto-search-presenter';

const view = new FavoriteRestoSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteResto: FavoriteRestoIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteResto: FavoriteRestoIdb });

    this._hideHeroContent();
  },

  _hideHeroContent() {
    const heroContent = document.querySelector('hero-content');
    heroContent.style.display = 'none';
  },
};

export default Favorite;
