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

export const key: InjectionKey<Store<State>> = Symbol()

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}

export default createStore<State>({
  state: {
    entities: {} as { [key: string]: FavoriteLocation },
    ids: [] as string[],
    loading: false,
    error: null as string | null,
    active: null as string | null
  },
  mutations: {
    setLoading(state, loading) {
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
    setLoading({ commit }) {
      commit('setLoading')
    },
    addEntity({ commit }) {
      commit('addEntity')
    },
    removeEntity({ commit }) {
      commit('removeEntity')
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
  strict: true
});
