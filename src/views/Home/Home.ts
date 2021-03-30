import { FavoriteLocation } from './../../store/favorite-location.interface';
import { Forecast as IForecast } from "./../../interfaces/forecast";
import { IApiService } from "./../../services/api,interface";
import { computed, defineComponent, inject, ref } from "vue";
import Autocomplete from "../../components/Autocomplete/index.vue";
import Forecast from "../../components/Forecast/index.vue";
import { Location } from "../../interfaces/location";
import { format } from "date-fns";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    Autocomplete,
    Forecast,
  },
  setup() {
    const selectedOption = {
      key: "215854",
      localizedName: "Tel Aviv",
    };
    const apiService = inject<IApiService>("apiService")!;
    
    const store = useStore();
    const selectLoading = computed<boolean>(() => store.getters.selectLoading);
    let favoriteLocation = computed<FavoriteLocation>(() => store.getters.selectEntityById(selectedOption.key));
    
    const getFavoriteData = (selectedOption: Location): Promise<void> => {
      store.dispatch('setLoading', true);
      return Promise.all([
        apiService.getCurrentConditions(selectedOption.key),
        apiService.getForecasts(selectedOption.key),
      ]).then((res) => {
        const currentConditions = res[0][0];
        const forecasts: IForecast[] = res[1].map((forecast) => ({
          title: format(new Date(forecast.Date), "EEE"),
          temperature: forecast.Temperature.Minimum.Value,
        }));
        
        store.commit('addEntity', {
          id: selectedOption.key,
          locationName: selectedOption.localizedName,
          temperature: currentConditions.Temperature.Metric.Value,
          weatherText: currentConditions.WeatherText,
          icon: currentConditions.WeatherIcon.toString(),
          forecasts,
        });
        store.dispatch('setLoading', false);
      });
    };

    getFavoriteData(selectedOption);

    const handleSelect = (selectedOption: Location) => {
      getFavoriteData(selectedOption).then(() => {
        favoriteLocation = computed<FavoriteLocation>(() => store.getters.selectEntityById(selectedOption.key));
      });
    };

    const handleFavorite = (id:string, isFavorite: boolean) => {
      store.dispatch('updateEntity', {id, callback: (entitiy: FavoriteLocation) => ({ ...entitiy, isFavorite })})
    }

    return { selectedOption, favoriteLocation, handleSelect, handleFavorite, selectLoading };
  },
});
