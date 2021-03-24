import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "Autocomplete",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  // props: [],
  // data () {
  //   return {

  //   }
  // },
  // computed: {

  // },
  // mounted () {

  // },
  methods: {
    isRequired(value: string) {
      if (value && value.trim()) {
        return true;
      }

      return "This is required";
    },
  },
});
