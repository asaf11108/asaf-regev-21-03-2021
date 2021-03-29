import { FavoriteLocation } from './favorite-location.interface';
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  entities: { [key: string]: FavoriteLocation };
    ids: string[];
    loading: boolean;
    error: string | null;
    active: string | null;
}

export default createStore<State>({
  state: {
    entities: {},
    ids: [],
    loading: false,
    error: null,
    active: null
  },
  mutations: {
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    addEntity(state, favoriteLocation: FavoriteLocation) {
      state.entities[favoriteLocation.id] = favoriteLocation;
      state.ids.push(favoriteLocation.id);
    },
    removeEntity(state, id: string) {
      delete state.entities[id];
      state.ids = state.ids.filter(stateId => stateId !== id);
    }
  },
  actions: {
    setLoading({ commit }, loading: boolean) {
      commit('setLoading', loading)
    },
    addEntity({ commit }, favoriteLocation: FavoriteLocation) {
      commit('addEntity', favoriteLocation)
    },
    removeEntity({ commit }, id: string) {
      commit('removeEntity', id)
    }
  },
  modules: {},
  getters: {
    selectLoading: state => state.loading,
    selectEntities: state => state.ids.map(id => state.entities[id]),
    selectEntityById: (state) => (id: string) => {
      return state.entities[id];
    }
  },
  strict: true,
  devtools: !JSON.parse(process.env.VUE_APP_PRODUCTION)
});
