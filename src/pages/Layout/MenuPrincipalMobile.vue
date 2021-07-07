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
            class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25 divJustifyContent"
          >
            <md-card class="divBorder" md-with-hover>
              <div @click="irParaPagina('/agendar/consulta')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/Caminho 8101@3x (1).png"
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
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25 divJustifyContent"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/agendar/exame')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img"
                        src="../../assets/img/menu_icons/Caminho 8102@3x (1).png"
                        style="width: 25px; height: 30px; margin-top: -12px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Marcar</strong>
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Exame</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class=" divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/meu-prontuario')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut" >
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/docs (2)@3x.png"
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
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/telemedicina')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/tele (1)@3x.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="margin-top:-12px !important;">
                      <strong>Realizar check-in Telemedicina</strong>
                    </div>
                    
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <!-- ------------------------------------ -->

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/ver-cancelar-consulta-exame')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/Ativo 26@3x.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Ver/Cancelar Consultas</strong>
                    </div>
                  </md-card-content>
                </md-ripple>
              </div>
            </md-card>
          </div>

          <div
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/resultado-de-exames')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/ic_resultado_exames.png"
                        style="width: 60px; height: 60px;"
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
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="irParaPagina('/minha-internacao')">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/menu_icons/ic_minhaInternacao.png"
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
            class="divJustifyContent md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-25"
          >
            <md-card md-with-hover class="divBorder">
              <div @click="abrirChatbot()">
                <md-ripple
                  ><!--efeito top-->
                  <md-card-content class="divOut">
                    <div class="md-card-avatar divCard">
                      <img
                        class="img imgCard"
                        src="../../assets/img/incons-card/Chat Bot.png"
                        style="width: 60px; height: 60px;"
                      />
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Chatbot</strong>
                    </div>
                    <div class="titleCard" style="text-align: center;">
                      <strong>Samel</strong>
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
import ChartCard from "../../components/Cards/ChartCard";
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
  margin-top: -12px;
  width: 30px !important;
  height: 30px !important;
}

.divOut{
  height: 100px;
   border-radius: 8px !important;
}

.titleCard{
  margin-top: 0px !important;
  margin-right: 1px !important;
  text-align: start !important;
}

.md-card .md-card-content {
    padding: 20px 3px;
    border-radius: 8px;
}

.divBorder{
  border-radius: 8px;
  max-width: 100px;
  margin: 7px 0;
}


.divJustifyContent{
  display: flex;
  justify-content: center;
  padding-right: 0px;
  padding-left: 0px;
  min-width: 25% !important;
  max-width: 33% !important;
}




</style>
