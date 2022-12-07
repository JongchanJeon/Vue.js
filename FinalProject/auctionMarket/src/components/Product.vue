<template>
  
    <div>
      <my-header></my-header>
    <h1>상품id {{$route.params.id}} 입니다.</h1>
    <h3>■ 현재시간 : <span id="nowTimes"></span></h3>
    <div class="row">
      <div class="col-md-5 col-md-offset-0">
        <figure>
          <img class="product" v-bind:src="product.image" width="500" height="500">
        </figure>
      </div>
      <div class="col-md-6 col-md-offset-0 description">
        <h1>{{product.title}}</h1>
        <p v-html="product.description"></p>
        <h2><p class="price">현재 가격 : {{product.price | formatPrice}}</p></h2>
        
        <p>{{product.remaindTime | formatTimeCount}}</p>
        <input type = "number" id = "user_price"><p>뒤 2자리는 센트(cent) 단위입니다 ex) 2000 -> $20.00</p>
        <button class="btn btn-danger" @click=changePrice()>입찰하기</button>
        <!-- 어떻게 바뀐 price 값을 메인화면에도 적용 시킬지 잘 모름 -->
        <router-link tag="h1"
              :to="{name: 'Main', params: {id: product.id, price: product.price, executionCount: 1}}">
              <button class="btn btn-danger">메인화면으로 가기</button>
          </router-link>
      </div>
    </div>
    </div>

</template>
<script>
import MyHeader from './Header.vue'
export default {
  components: { MyHeader },
  data() {
    return {
      product: ''
    }
  },
  methods: {
    changePrice() { // 가격 체인지 알고리즘
      var user_price = document.getElementById('user_price');
      user_price = user_price.value;

      if (this.product.price < user_price){
        this.product.price = user_price;
        alert("정상적으로 입찰 되었습니다.");
      }else {
        alert("가격이 오류가 났습니다.");
      }
    },
    reloadRemaindTime(product){ 
      this.remaindTimerId = setTimeout(()=>{
        const now = new Date();
        const tempProduct = product;
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

          let productDate = product.limitDate.substr(0,4) + "-" + product.limitDate.substr(4,2) + "-" + product.limitDate.substr(6,2);
          let productTime = product.limitTime.substr(0,2) + ":" + product.limitTime.substr(2,2) + ":" + product.limitTime.substr(4,2);

          var productLimitTime = productDate + " " + productTime
          const startTime = new Date(realtime);
          const endTime = new Date(productLimitTime);
          var diffTime = (endTime.getTime() - startTime.getTime()) / (1000);

          const p = product;
          p.remaindTime = `${diffTime}`;         
        
        // (12/05일 수정) clearTimeout을 하게되면 product의 length 의 값이 아닌 번씩 반복이 되서 삭제 함
        //clearTimeout(this.remaindTimerId); 
        this.reloadRemaindTime(tempProduct);
        
      }, 1000);
    },
  },
  computed:{
    currentPrice() {
      var currentPrice = this.$route.params.price;
      
      return currentPrice
    }
  },
  created: function() {
    axios.get('/static/products.json')
    .then((response) => {
      this.product = response.data.products.filter(data => data.id == this.$route.params.id)[0];
      this.product.image = '/' + this.product.image;
      this.product.price = this.$route.params.price;
      this.reloadRemaindTime(this.product);
    });
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
    formatTimeCount(remaindTime){
      var hour = parseInt(remaindTime / 3600);
      var min = parseInt((remaindTime % 3600)/60);
      var sec = remaindTime % 60;
      var result = hour + "시간 " + min + "분 " + sec + "초 남았습니다!";
      return result;
    }
}
}
</script>