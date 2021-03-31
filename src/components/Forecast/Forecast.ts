import { ForecastData } from "./forecast.data";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Forecast",
  props: {
    forecastProp: {
      type: Object as PropType<ForecastData>,
      required: true,
    },
  },
  setup(props) {
    const buildIconUrl = (icon?: string): string => {
      if (!icon) {
        return "";
      }
      return require(`../../assets/weather-icons/${icon}.png`);
    };

    const forecast = computed(() => ({
      ...props.forecastProp,
      icon: buildIconUrl(props.forecastProp.icon),
    }));

    return { forecast };
  },
});
