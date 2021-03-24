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
    validateQuery(value: string) {
      if (value === "") {
        return "This field is required";
      }
      if (!/^[a-zA-Z ]+$/i.test(value)) {
        return "This field must be a valid email";
      }
      return true;
    },
  },
});
