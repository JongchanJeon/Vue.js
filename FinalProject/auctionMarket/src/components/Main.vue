<template>
<div id = "default">
  <my-header :cartItemCount="cartItemCount"></my-header>
  <main>
    <h2>■ 현재시간 : <span id="nowTimes"></span></h2>
    <div v-for="product in sortedProducts">
      <div class="row">
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image">
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-0 description">
          <!-- <h1 v-text="product.title"></h1> -->
          <router-link tag="h1"
              :to="{name: 'Id', params: {id: product.id}}">
            {{product.title}}
          </router-link>
          <p v-html="product.description"></p>
          <p class="price">
            현재 입찰가 :{{product.price | formatPrice}}
          </p>
          <p class = "limit">
            경매 종료 : {{product.limitDate | formatDate}} {{product.limitTime | formatTime}}
          </p>
          <p>
            남은 시간 : {{leftTimer(product.limitTime)}}
          </p>
          <button class="btn btn-primary btn-lg"
            v-on:click="addToCart(product)"
            v-if="canAddToCart(product)">입찰하기</button>
          <button disabled="true" class="btn btn-primary btn-lg"
            v-else>입찰하기</button>
          <span class="inventory-message"
                v-if="product.availableInventory - cartCount(product.id) === 0">
              품절!
          </span>
          <span class="inventory-message"
                v-else-if="product.availableInventory - cartCount(product.id) < 5">
              {{product.availableInventory - cartCount(product.id)}} 남았습니다!
          </span>
          <span class="inventory-message"
                v-else>지금 구매하세요!
          </span>
          <div class="rating">
            <span v-bind:class="{'rating-active': checkRating(n, product)}"
                v-for="n in 5">☆
            </span>
          </div>
        </div>
      </div><!-- end of row -->
      <hr />
    </div><!-- end of v-for -->
  </main>
</div>
</template>

<script>

import MyHeader from './Header.vue';
export default {
  name: 'imain',
  data() {
    return {
      products: [],
      cart: [],
      
    }
  },

  components: { MyHeader },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
    leftTimer(limitTime){
      
      var nowDate = new Date();
      var hour = nowDate.getHours();
      var min = nowDate.getMinutes();
      var sec = nowDate.getSeconds();
      
      return hour + min + sec;
    },
    
  },
  computed: {
    cartItemCount() {
      return this.cart.length || '';
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
    },
    realTimer() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month= nowDate.getMonth() + 1;
      var date = nowDate.getDate();
      var hour = nowDate.getHours();
      var min = nowDate.getMinutes();
      var sec = nowDate.getSeconds();
      document.getElementById("nowTimes").innerHTML = 
        year + "-" + addzero(month) + "-" + addzero(date) + "&nbsp;" + hour + ":" + addzero(min) + ":" + addzero(sec);
      return month;
  },
  addzero(num) {
      if(num < 10) { num = "0" + num; }
       return num;
  },
  
  },
  filters: {
    formatPrice(price) {
      if (!parseInt(price)) {
        return '';
      }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index+3, 0, ',');
          index += 4;
        }
        return '$' + priceArray.reverse().join('');
      } else {
        return '$' + (price / 100).toFixed(2);
      }
    },
    formatDate(limitDate){
      var date = "";
      var strLimitDate = limitDate;
      date += strLimitDate.substr(0,4) + "-";
      date += strLimitDate.substr(4,2) + "-";
      date += strLimitDate.substr(6,2);
      return date;
    },
    formatTime(limitTime) {
      var time = "";
      var strLimitTime = limitTime;
      time += strLimitTime.substr(0,2) + ":";
      time += strLimitTime.substr(2,2) + ":";
      time += strLimitTime.substr(4,2);
      return time;
    }
  },
  created: function() {
    axios.get('/static/products.json').then(response => {
      this.products = response.data.products;
      console.log(this.products);
    });
  }
}
</script>
<style>
body {
  background-color: #ffffff;
}
#default {
  background-color: #ffffff;
  color : black;
}
</style>

