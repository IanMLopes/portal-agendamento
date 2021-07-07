<template>
  <md-card>
    <md-card-header :data-background-color="dataBackgroundColor">
      <h4 class="title">{{ $route.name }}</h4>
      <!-- <p class="category">Complete your profile</p> -->
    </md-card-header>

    <md-card-content>
      <div class="content">
        <div class="md-layout">
          <div
            class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 divJustifyContent"
          >
            <md-card class="divBorder" md-with-hover>
              <div @click="irParaPagina('/agendar/consulta')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/menu_icons/Caminho 8101@3x (1).png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Marcar Consulta</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 divJustifyContent"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/agendar/exame')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img"
                        src="../assets/img/menu_icons/Caminho 8102@3x (1).png"
                        style="width: 45px; height: 50px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Marcar Exame</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class=" divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/meu-prontuario')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut" >
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/menu_icons/docs (2)@3x.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Meu Prontuário</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/telemedicina')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/menu_icons/tele (1)@3x.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Realizar check-in Telemedicina</strong>
                    </div>
                    
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <!-- ------------------------------------ -->

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/ver-cancelar-consulta-exame')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/menu_icons/Ativo 26@3x.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Consultas/Exames agendados(as)</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/resultado-de-exames')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img"
                        src="../assets/img/menu_icons/ic_resultado_exames.png"
                        style="width: 40px; height: 55px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Resultado de Exames</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/minha-internacao')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/menu_icons/ic_minhaInternacao.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Minha Internação</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="abrirChatbot()">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../assets/img/incons-card/Chat Bot.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Chatbot Samel</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
/* eslint-disable */
import ChartCard from "../components/Cards/ChartCard";
export default {
  name: "menu-principal",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
    components: {
      ChartCard,
    },
  },
  data() {
    return {
      username: null,
      disabled: null,
      emailadress: null,
      lastname: null,
      firstname: null,
      address: null,
      city: null,
      country: null,
      code: null,
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
    };
  },
  computed: {},
  filters: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    abrirChatbot() {
      window.open("https://chatbot.samel.com.br/", "_blank");
    },

    irParaPagina(route) {
      setTimeout(() => {
        this.$router.push(route);
      }, 150);
    },
  },
  watch: {},
};
</script>
<style scoped>

.divCard {
  display: flex !important;
  justify-content:flex-end !important;
  margin-bottom: 10px !important;
}

.imgCard{
  margin-bottom: 0px !important;
  width: 55px !important;
  height: 55px !important;
}

.divOut{
  height: 160px;
   border-radius: 8px !important;
}

.titleCard{
  margin-top: 40px !important;
  margin-right: 1px !important;
  text-align: start !important;
}

.md-card .md-card-content {
    padding: 10px 10px;
    border-radius: 8px;
}

.divBorder{
  border-radius: 8px;
  max-width: 200px;
}


.divJustifyContent{
  display: flex;
  justify-content: center;
}



</style>
