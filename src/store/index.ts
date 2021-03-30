import { FavoriteLocation } from "./favorite-location.interface";
import { createStore } from "vuex";

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
    active: null,
  },
  mutations: {
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setActive(state, active: string) {
      state.active = active;
    },
    addEntity(state, favoriteLocation: FavoriteLocation) {
      state.entities[favoriteLocation.id] = {
        ...state.entities[favoriteLocation.id],
        ...favoriteLocation,
      };
      if (!state.ids.includes(favoriteLocation.id)) {
        state.ids.push(favoriteLocation.id);
      }
    },
    updateEntity(
      state,
      { id, isFavorite }: { id: string; isFavorite: boolean }
    ) {
      state.entities[id].isFavorite = isFavorite;
    },
  },
  actions: {
    setLoading({ commit }, loading: boolean) {
      commit("setLoading", loading);
    },
    setActive({ commit }, active: string) {
      commit("setActive", active);
    },
    addEntity({ commit }, favoriteLocation: FavoriteLocation) {
      commit("addEntity", favoriteLocation);
    },
    updateEntity({ commit }, payload: { id: string; isFavorite: boolean }) {
      commit("updateEntity", payload);
    },
  },
  modules: {},
  getters: {
    selectLoading: (state) => state.loading,
    selectActive: (state) => state.active,
    selectEntities: (state) => state.ids.map((id) => state.entities[id]),
    selectEntityById: (state) => (id: string) => {
      return state.entities[id];
    },
    selectActiveEntity: (state) => {
      if (!state.active) {
        return {};
      }
      return state.entities[state.active];
    },
  },
  strict: true,
  devtools: !JSON.parse(process.env.VUE_APP_PRODUCTION),
});
