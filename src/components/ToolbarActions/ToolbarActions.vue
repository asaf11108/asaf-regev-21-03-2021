<template lang="html">
  <router-link :to="{ name: 'Home' }" v-slot="{ isActive }">
    <button type="button" class="btn" :class="[isActive && 'btn-primary']">
      Home
    </button>
  </router-link>
  <router-link :to="{ name: 'Favorites' }" v-slot="{ isActive }">
    <button type="button" class="btn" :class="[isActive && 'btn-primary']">
      Favorites
    </button>
  </router-link>
</template>
