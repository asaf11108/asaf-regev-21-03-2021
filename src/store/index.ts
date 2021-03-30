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
      state = {...state, loading };
    },
    addEntity(state, favoriteLocation: FavoriteLocation) {
      state.entities = {...state.entities, [favoriteLocation.id]: favoriteLocation};
      if (!state.ids.includes(favoriteLocation.id)) {
        state.ids.push(favoriteLocation.id);
      }
    },
    updateEntity(state, {id, callback}: {id: string, callback: (entity: FavoriteLocation) => FavoriteLocation}) {
      state.entities[id] = callback(state.entities[id]);

    }
  },
  actions: {
    setLoading({ commit }, loading: boolean) {
      commit('setLoading', loading)
    },
    addEntity({ commit }, favoriteLocation: FavoriteLocation) {
      commit('addEntity', favoriteLocation)
    },
    updateEntity({ commit }, payload: {id: string, callback: (entity: FavoriteLocation) => FavoriteLocation}) {
      commit('updateEntity', payload)
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
