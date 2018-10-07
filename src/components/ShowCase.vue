<template>
    <header class="showcase">
      <div class="content">
        <img src="../assets/logo.svg" alt="" class="logo">
        <div class="title">Lorem, ipsum. {{hora}}</div>
        <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, praesentium?</div>
        <a @click.prevent.stop="change" class="btn btn-outline-primary">{{labelBotao}}</a>
      </div>
    </header>
</template>

<script>
export default {
  data() {
    return {
      hora: new Date(Date.now()).toLocaleTimeString(),
      interval: Function,
      started: false,
      labelBotao: "Começar"
    };
  },
  methods: {
    getDate() {
      return new Date(Date.now()).toLocaleTimeString();
    },
    start() {
      this.interval = setInterval(() => (this.hora = this.getDate()), 1000);
      this.started = true;
      this.labelBotao = "Parar";
    },
    stop() {
      clearInterval(this.interval);
      this.started = false;
      this.labelBotao = "Começar";
    },
    change() {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    }
  }
};
</script>


<style>
.showcase::after {
  content: "";
  height: 100vh;
  width: 100%;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: block;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  transition: all 1000ms;
}
.showcase {
  margin-bottom: 1rem;
}
.showcase:hover::after {
  filter: blur (0px);
  -webkit-filter: blur(0px);
}
.showcase .content a {
  color: aliceblue;
  border-color: aliceblue;
  margin-top: 1rem;
  background-color: transparent;
}
.content {
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 50%;
  margin-top: 0px;
  margin-left: -150px;
  width: 300px;
  height: 350px;
  color: azure;
  text-align: center;
  transition: all 1000ms;
}
.content .logo {
  height: 180px;
  width: 180px;
}
#container {
  transition: all 1000ms;
}
.content .title {
  font-size: 2.2rem;
  margin-top: 1rem;
}
.content .text {
  line-height: 2rem;
  margin-top: 1rem;
}
body {
  margin: 0px;
}
html {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
