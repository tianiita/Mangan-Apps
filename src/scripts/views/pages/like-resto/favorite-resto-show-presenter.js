class FavoriteRestoShowPresenter {
  constructor({ view, favoriteResto }) {
    this._view = view;
    this._favoriteResto = favoriteResto;
    
    this._showFavoriteResto();
  }

  async _showFavoriteResto() {
    const restaurants = await this._favoriteResto.getAllResto();
    this._displayResto(restaurants);
  }

  _displayResto(restaurants) {
    this._view.showFavoriteResto(restaurants);
  }
}

export default FavoriteRestoShowPresenter;
