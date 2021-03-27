<template>
  <Toolbar />
  <div class="app__content-wrapper">
    <div class="app__content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toolbar from "./components/Toolbar/index.vue";
import apiMockService from "./services/api.mock.service";
import apiService from "./services/api.service";

export default defineComponent({
  name: "App",
  components: { Toolbar },
  provide: {
    apiService: JSON.parse(process.env.VUE_APP_PRODUCTION) ? new apiService() : new apiMockService()
  }
});
</script>

<style lang="scss">
@use './styles/main';
@use './styles/vendors/vendors';
$toolbar-height: 54px;
$toolbar-height-mobile: 54px;

.app {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    @include vendors.media(">xs") {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }

  &__toolbar-title {
    display: inline-flex;
    gap: 10px;
    align-items: baseline;
    a {
      font-size: 0.7em;
    }
  }

  &__content {
    @include vendors.spread(margin, 10px 0, 50px 0);
    @include vendors.spread(width, 90vw, 50vw);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__content-wrapper {
    background-image: url("./assets/weather.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    min-height: calc(100vh - #{$toolbar-height});
    @include vendors.media("<=xs") {
      min-height: calc(100vh - #{$toolbar-height-mobile});
    }
    display: flex;
    justify-content: center;
  }

  &__toolbar-actions {
    @include vendors.media("<=xs") {
      display: none;
    }

    &--mobile {
      @include vendors.media(">xs") {
        display: none;
      }
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
  }
}
</style>
