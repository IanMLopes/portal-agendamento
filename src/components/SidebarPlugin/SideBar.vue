<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
    style="width: 264px"
  >
    

    <div class="logo" style="background: #fff;">
      <div class="simple-text logo-normal" style="padding-left: 20px; color: black !important; width:100%">
        <span>  OLÁ, {{nome}}</span>
       
      </div>
    </div>
    <div class="sidebar-wrapper" style="background: #fff; width:100%">
       
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";
import jwt from "jsonwebtoken";
import { bus } from '../../main'

export default {
  data(){
    return {
      nome:'',
      titular:{},
       token: '',
    }
  },

  components: {
    SidebarLink
  },
  props: {
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg")
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/faces/marc.png")
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
beforeUpdate(){
      this.carregarDados()
  },

  created() {
      bus.$on('reloadDataClient', (result) => {
        if (result) {
          this.carregarDados()
        }
      })
  },  
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    }
  },

  methods:{
     carregarDados(){
        return new Promise(async resolve=>{
          let that = this

          await jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) { 
            try {
              that.token = decoded.chave
            } catch (error) {
              //pass
            } 
          });

          await jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            try {
              that.nome = decoded.titular.nome
            } catch (error) {
              //pass
            }
          });

          resolve(true)
        })
      },
  },
  
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

</style>
