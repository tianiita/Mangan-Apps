import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteResto = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteResto.find((restaurant) => restaurant.id == id);
  },

  getAllResto() {
    return favoriteResto;
  },

  putResto(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    favoriteResto.push(restaurant);
  },

  deleteResto(id) {
    favoriteResto = favoriteResto.filter((restaurant) => restaurant.id != id);
  },

  async searchResto(query) {
    return (await this.getAllResto()).filter((restaurant) => {
      const loweredCaseRestoName = (restaurant.name || '-').toLowerCase();
      const jammedRestoName = loweredCaseRestoName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestoName.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => favoriteResto = []);

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
