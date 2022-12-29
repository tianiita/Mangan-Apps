import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
import FavoriteRestoSearchView from '../src/scripts/views/pages/like-resto/favorite-resto-search-view';
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/like-resto/favorite-resto-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteResto = spyOnAllFunctions(FavoriteRestoIdb);

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });

      expect(favoriteResto.getAllResto).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.restaurant-list_not_found').length).toEqual(1);
        done();
      });

      const favoriteResto = spyOnAllFunctions(FavoriteRestoIdb);
      favoriteResto.getAllResto.and.returnValues([]);

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.restaurant-list').length).toEqual(2);
        done();
      });

      const favoriteResto = spyOnAllFunctions(FavoriteRestoIdb, false);
      favoriteResto.getAllResto.and.returnValues([
        { 
          id: 11,
          name: 'resto a',
          rating: 4,
          description: 'Restoran a di tempat A',
        },
        {
          id: 22,
          name: 'resto b',
          rating: 5,
          description: 'Restoran b di tempat B',
        },
      ]);

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
});
