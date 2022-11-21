<template>
    <main>
        <div id="wrap">
            <div class="center">
                <div>
                    <h1>경매 시스템 v0.1</h1>
                </div>
                <div>
                    <h3>Auction Market</h3>
                </div>
                <br/>
                <h4>■ 현재시간 : <span id="nowTimes"></span></h4>
                    <select id ="login">
                        <option value="user">사용자</option>
                        <option value="admin">관리자</option>
                    </select>
                    <button id = "login" type="submit" class="btn btn-light" @click = "tryLogin">로그인</button>
            </div>
            
        </div> 
    </main>

        

</template>
    
<script>
document.addEventListener("DOMContentLoaded", function () {
    realTimer();
    setInterval(realTimer, 500);
});
function realTimer() {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const date = nowDate.getDate();
    const hour = nowDate.getHours();
    const min = nowDate.getMinutes();
    const sec = nowDate.getSeconds();
    document.getElementById("nowTimes").innerHTML =
        year + "-" + addzero(month) + "-" + addzero(date) + "&nbsp;" + hour + ":" + addzero(min) + ":" + addzero(sec);
}
function addzero(num) {
    if (num < 10) { num = "0" + num; }
    return num;
}
import MyHeader from './Header.vue';
export default {
    name: 'login',
    data() {
        return {
            loginstate: false,
            loginType: "",
        }
    },
    components: { MyHeader },
    methods: {
        tryLogin() {
            var who = document.getElementById("login")
            var value =(who.options[who.selectedIndex].value);
            if(value == "user"){
                alert("사용자로 로그인 되었습니다.");
                this.loginstate = true;
                this.loginType = "user";
                this.$router.push({ path: 'Main' })
            } else if(value =="admin") {
                alert("관리자로 로그인 되었습니다.(비활성화)");
                this.logintstate = true;
                this.loginType = "admin";
            } else {
                this.loginstate = false;
                this.loginType = "changed";
            }
        },
    },
    computed: {
        
    },
    filters: {

    },
    created: function () {

    }
}
</script>
<style>
body {
    background-color: #2c3e50;
}
#wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #2c3e50;
    color : #ffffff;
}
#title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
    color : #ffffff;
}
#login {
    color : #000000;
}
</style>
    