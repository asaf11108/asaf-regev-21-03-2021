import { Forecast } from './../../interfaces/forecast';
import { defineComponent, Prop, PropType, ref } from "vue";

export default defineComponent({
  name: "Forecast",
  props: {
    forecast: Object as PropType<Forecast>
  },
  // setup(prop) {
  //   console.log(prop.forecast)

  //   const buildIconUrl = (icon: string): string => {
  //     if (!icon) {
  //       return '';
  //     }
  //     return `../../assets/weather-icons/${icon}.png`;
  //   }

  //   // forecast.value = { ...forecast.value, icon: buildIconUrl(forecast.value.icon) }

  // }
});
