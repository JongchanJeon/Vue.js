<template>
<div id = "default">
  <my-header :cartItemCount="cartItemCount"></my-header>
  <main>
    <h2>■ 현재시간 : <span id="nowTimes"></span></h2>
   
    <div v-for="product in sortedProducts" :key="product.id">
      <div class="row">
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image" width="250" height="250">
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-0 description">
          <!-- <h1 v-text="product.title"></h1> -->
          <!-- <router-link tag="h1"
              :to="{name: 'Id', params: {id: product.id}}"> -->
            <h3><b>{{product.title}}</b></h3>
          <!-- </router-link> -->
          <p v-html="product.description"></p>
          <p class="price">
            현재 입찰가 :{{product.price | formatPrice}}
          </p>
          <p class = "limit">
            경매 종료 : {{product.limitDate | formatDate}} {{product.limitTime | formatTime}}
          </p>
          <p>
            남은 시간 : {{product.remaindTime}}
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
      remaindTimerId: null,
      
    }
  },

  components: { MyHeader},
  methods: {
    //실시간 남은 시간을 product에 remaindTime에 값을 입력 함
    reloadRemaindTime(productDate, productTime){      
      this.remaindTimerId = setTimeout(()=>{
        const now = new Date();
          var year = now.getFullYear();
          var month= now.getMonth() + 1;
          if(month < 10) {
            month = "0" + month;
          }
          var day = now.getDate();
          if(day < 10) {
            day = "0" + day;
          }
          var hour = now.getHours();
          if(hour < 10) {
            hour = "0" + hour;
          }
          var min = now.getMinutes();
          if(min < 10) {
            min = "0" + min;
          }
          var sec = now.getSeconds();
          if(sec < 10) {
            sec = "0" + sec;
          }
          var realtime = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
          // 마지막 프로퍼티는 undefined로 됨 ...
          productDate = productDate.substr(0,4) + "-" + productDate.substr(4,2) + "-" + productDate.substr(6,2);
          console.log(productDate);
          productTime = productTime.substr(0,2) + ":" + productTime.substr(2,2) + ":" + productTime.substr(4,2);

          console.log(productTime);
          const startTime = new Date(realtime);
          const endTime = new Date('2022-12-05 15:00:00');
          var diffTime = (endTime.getTime() - startTime.getTime()) / (1000);
        for(let i=0; i<this.products.length; i++) {
        
          const p = this.products[i];
          p.remaindTime = `${diffTime}초 남음`;
        }
        clearTimeout(this.remaindTimerId);
        this.reloadRemaindTime();
      }, 1000);
    },
    
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
      for(let i = 0; i < this.products.length; i++){
      this.reloadRemaindTime(this.products[i].limitDate, this.products[i].limitTime);
      }
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

