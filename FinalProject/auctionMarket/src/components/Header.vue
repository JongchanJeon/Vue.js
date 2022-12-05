
<template>
  
<header>
  <div class="navbar navbar-default">
    <div class="navbar-center">
      <h1>{{ sitename }}<!--<router-link :to="{name: 'iMain'}"></router-link>--></h1>
    </div>
    <div class="nav navbar-nav navbar-right cart">
      <!-- <button type="button" class="btn btn-default btn-lg" v-on:click="showCheckout">
        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}</span> 체크아웃
      </button> -->
      <!-- <router-link
          active-class="active"
          tag="button" class="btn btn-default btn-lg" :to="{name: 'Form'}">
        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}</span> My Page

      </router-link> -->
      <router-link
          active-class="active"
          tag="button" class="btn btn-default btn-lg" :to="{path: '/'}">

        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}</span> Sign Out
      </router-link>
    </div>
  </div>
</header>
</template>

<script>
export default {
  name: 'my-header',
  data() {
    return {
      sitename: "Auction Market with Vus.js"
    }
  },
  props: ['cartItemCount'],
  methods: {
    // showCheckout() {
    //   this.$router.push({name: 'Form'});
    // }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.router-link-exact-active {
  /* color: blue; */
  color: black;
}
</style>

