<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-70">
        <meus-dados-form data-background-color="green" :titular="titular">
        </meus-dados-form>
      </div>
    </div>
    <!-- INICIO LOADING -->
    <div class="vld-parent">
      <!-- spinner or dots or bars -->
      <loading
      :active.sync="isLoading" 
      :can-cancel="false"
      :loader='typeLoader'
      color='#32a976'
      background-color='#c4c4c4'
      :width=150
      :height=70
      :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
import MeusDadosForm from "../components/Forms/MeusDadosForm";
import UserCard from "../components/Cards/UserCard";
import jwt from "jsonwebtoken";
import { keyJwt, loader } from "../globalVaribles";
import Loading from "vue-loading-overlay";

export default {
  name: "MeusDados",
  props: {},
  components: {
    MeusDadosForm,
    UserCard,
    Loading
  },
  mixins: [],
  directives: {},
  data() {
    return {
      typeLoader: loader,
      titular: {},
      token: "",
      isLoading: false
    };
  },
  mounted() {
    this.carregarDados();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    carregarDados() {
      this.isLoading = true
      return new Promise(async (resolve) => {
        let that = this;

        await jwt.verify(this.$session.get("user"), keyJwt, function(
          err,
          decoded
        ) {
          that.token = decoded.chave;
        });

        await jwt.verify(this.$session.get("titular"), keyJwt, function(
          err,
          decoded
        ) {
          that.titular = decoded.titular;
        });

        this.isLoading = false

        resolve(true);
      });
    },
  }
};
</script>
