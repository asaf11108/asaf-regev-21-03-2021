import { Location } from './../../interfaces/location';
import { IApiService } from './../../services/api,interface';
import { defineComponent, inject, PropType } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { debounce } from "lodash-es";

export default defineComponent({
  name: "Autocomplete",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  props: {
    selectedOptionProp: {
      type: Object as PropType<Location>,
      required: true,
      default: {
        key: '215854',
        localizedName: 'Tel Aviv'
      }
    }
  },
  data() {
    return {
      locations: [] as Location[],
      selectedOption: this.selectedOptionProp,
      showOptions: false,
      query: this.selectedOptionProp.localizedName,
    }
  },
  mounted () {
    const apiService = inject('apiService') as IApiService;
    const getLocations = (query: string) => {
      apiService.getLocations(query)
          .then(res => res.map(location => ({ key: location.Key, localizedName: location.LocalizedName })))
          .then(res => this.locations = res);
    };

    getLocations(this.query);
    this.$watch('query', debounce((newVal: string, oldVal: string) => {
      if (newVal !== oldVal && this.validateQuery(newVal) === true) {
        getLocations(newVal);
      }
    }, 1000));
  },
  methods: {
    validateQuery(value: string) {
      if (value === "") {
        return "This field is required";
      }
      if (!/^[a-zA-Z ]+$/i.test(value)) {
        return "This field must be a valid email";
      }
      return true;
    },
    handleFocus() {
      this.showOptions = true;
    },
    handleBlur() {
      this.showOptions = false;
    },
    handleSelect(location: Location) {
      this.showOptions = false;
      this.query = location.localizedName;
      this.selectedOption = location;
      this.$emit('select', location);
    }
  },
});
