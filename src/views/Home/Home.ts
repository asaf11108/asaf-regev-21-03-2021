import { Forecast as IForecast } from "./../../interfaces/forecast";
import { IApiService } from "./../../services/api,interface";
import { defineComponent, inject, reactive, ref } from "vue";
import Autocomplete from "../../components/Autocomplete/index.vue";
import Forecast from "../../components/Forecast/index.vue";
import { Location } from "../../interfaces/location";
import { format } from "date-fns";

export default defineComponent({
  name: "Home",
  components: {
    Autocomplete,
    Forecast,
  },
  setup() {
    const selectedOption: Location = reactive({
      key: "215854",
      localizedName: "Tel Aviv",
    });
    const favoriteLocation = ref({}); //interface
    const apiService = inject("apiService") as IApiService;
    const getFavoriteData = (selectedOption: Location) => {
      Promise.all([
        apiService.getCurrentConditions(selectedOption.key),
        apiService.getForecasts(selectedOption.key),
      ]).then((res) => {
        const currentConditions = res[0][0];
        const forecasts: IForecast[] = res[1].map((forecast) => ({
          title: format(new Date(forecast.Date), "EEE"),
          temperature: forecast.Temperature.Minimum.Value,
        }));

        favoriteLocation.value = {
          id: selectedOption.key,
          locationName: selectedOption.localizedName,
          temperature: currentConditions.Temperature.Metric.Value,
          weatherText: currentConditions.WeatherText,
          icon: currentConditions.WeatherIcon.toString(),
          forecasts,
          isFavorite: false,
        };
      });
    };

    getFavoriteData(selectedOption);

    const handleSelect = (selectedOption: Location) => {
      getFavoriteData(selectedOption);
    };

    return { selectedOption, favoriteLocation, handleSelect };
  },
});
