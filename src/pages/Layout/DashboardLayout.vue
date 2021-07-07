<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }" style="width:100%;">
    <notifications></notifications>

    <side-bar
      v-if="$route.name != 'Login' && $route.name != 'recuperarSenha' && $route.name != 'Registrar'"
      v-show="tipoDispositivo == 1 || tipoDispositivo == 2" 
    >

      <mobile-menu v-if="tipoDispositivo == 1" slot="content"></mobile-menu>
     

    </side-bar>

    <div class="main-panel" style="width: 100%;">
      <top-navbar v-if="$route.name != 'Login' && $route.name != 'recuperarSenha' && $route.name != 'Registrar'"></top-navbar>


      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter & !(tipoDispositivo == 1 || tipoDispositivo == 2)" ></content-footer>

      <footer-mobile
      v-show="tipoDispositivo == 1 || tipoDispositivo == 2"  
    >
    </footer-mobile>

    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import FooterMobile from "./ContentFooterMobile.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FooterMobile
  },
  data() {
    return {
      tipoDispositivo: 0,
    };
  },
  mounted(){
    this.$route.name === "Inicio" ? document.querySelector('body').style.overflow = 'hidden' : document.querySelector('body').style.overflow = ''

    if (screen.width < 640 || screen.height < 480) {
        this.tipoDispositivo = 1 //Celular
    } else if (screen.width < 1024 || screen.height < 768) {
        // talvez seja uma boa usar versão pra tablet
        this.tipoDispositivo = 2 // Tablet
    } else {
        // sirva a versão normal
        this.tipoDispositivo = 3 // PC
    }
  }
};
</script>

<style scoped>
.content {
    min-height: calc(100vh - 355px) !important;
    height: 100%!important;
    margin: 0;
    /* margin-bottom: 4px; */
    
  
}

</style>