import { ForecastData } from "./../../components/Forecast/forecast.data";
import { FavoriteLocation } from "./../../store/favorite-location.interface";
import Forecast from "./../../components/Forecast/index.vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Favorites",
  components: {
    Forecast,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const favoriteLocations = computed<FavoriteLocation[]>(() =>
      (store.getters.selectEntities as FavoriteLocation[]).filter(
        (favoriteLocation) => favoriteLocation.isFavorite
      )
    );

    const handleForecast = (favoriteLocation: FavoriteLocation): void => {
      store.dispatch("setActive", favoriteLocation.id);
      router.push({ name: "Home" });
    };

    const mapToForecastComponent = (
      favoriteLocation: FavoriteLocation
    ): ForecastData => {
      return {
        title: favoriteLocation.locationName,
        temperature: favoriteLocation.temperature,
        icon: favoriteLocation.icon,
      };
    };

    return { favoriteLocations, handleForecast, mapToForecastComponent };
  },
});
