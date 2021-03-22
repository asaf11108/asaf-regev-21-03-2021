import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Field, Form, ErrorMessage } from 'vee-validate';

export default defineComponent({
  name: "Home",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    isRequired(value: string) {
      if (value && value.trim()) {
        return true;
      }

      return 'This is required';
    },
  },
});
