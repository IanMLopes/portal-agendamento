<template>
  <div>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    style="height:50px;"
    v-if="$route.name == 'Login' || $route.name == 'Registrar' || $route.name == 'recuperarSenha' ? false : true"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <img
          src="../../assets/img/logo_plano.png"
          alt=""
          style="max-width: 60px;"
        />
        
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item href="/inicio">
              <i class="material-icons" style="margin-right: 5px;">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              Início
            </md-list-item>

            <md-list-item href="/meusdados">
              <i class="material-icons" style="margin-right: 5px;">person</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              Meus dados
            </md-list-item>

            <md-list-item href="/historico">
              <i class="material-icons" style="margin-right: 5px;">book</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              Histórico
            </md-list-item>

            <md-list-item href="https://www.samel.com.br/fale-conosco/">
              <i class="material-icons" style="margin-right: 5px;">email</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              Fale conosco
            </md-list-item>

            <div id="removePointer" style="cursor:default !important;">
            <md-list-item href="#" style="position: relative; cursor:default !important; ">
              <i class="material-icons" style="position: absolute; left: -65px; cursor:default !important;"
                >cellphone</i
              >
              <p class="hidden-lg hidden-md">Dashboard</p>
              <p style="margin-left: 25px; padding: 0px; margin-top: 5px; cursor:default !important;">
                (92) 2129-2200
              </p>
            </md-list-item>
            </div>
    <!-- INICIO NOTIFICAÇÕES -->
    
         <li class="md-list-item">
          <drop-down  >
              <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                      @click="obterNotificacoesCliente()"
                    >
                      <md-icon>notifications</md-icon> 
                      <span v-show="this.countBadge > 0" class="notification">{{ countBadge  }}</span> 
                      <p class="hidden-lg hidden-md" style="margin-right: 5px;"> Notifications </p> 
              </md-button>
              <div id="drop" class="dropdown-menu dropdown-menu-right overflow-auto" aria-labelledby="dropdownMenuButton" style="border-radius: 3%; max-height: 500px">
                   <span class="dropdown-header text-body">{{ titulo }}</span>
                  <li style="cursor: pointer;" class="overflow-hidden fundo" v-for="notificacao in listaNotificacoes" :key="notificacao.index" >
                  <a class="dropdown-item d-flex flex-row bd-highlight p-2 " style="white-space: normal; width: 380px;=" v-on:click="notificacaoVisualizada(notificacao.NR_SEQUENCIA)">
                    <div  class="d-inline-flex justify-content-center" >
                      <img class="mr-2 img-circle" alt="50x50" src="../../assets/img/logo.jpg"  style="width: 30px; height: 25px; border-radius: 100%; border: 1px solid	#DCDCDC">
                    </div>
                    <div  class="d-inline-flex bd-highlight mr-2 p-0 container hovercor " style="display: flex; flex-direction: column;">
                        <div style=" display: flex;  justify-content: space-between;" >
                          <strong class="hovercor " >{{ notificacao.DS_TITULO }} </strong>
                          <span class="text-muted" style="font-size: 14px; min-width: 90px; ">{{ notificacao.DATA }} - {{ notificacao.HORA }}</span>
                        </div>
                        <div  style="line-height: 1.2; text-align: justify;">
                          <span>{{ notificacao.DESCRICAO }}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center" style="width: 30px;">
                      <div v-if="!notificacao.DT_VISUALIZADO" style="background-color: #32A976; width: 12px; height: 12px; border-radius: 100%;"></div>
                    </div>
                  </a>
              </li>
              </div>
          </drop-down>
        </li>
    <!-- FIM NOTIFICAÇÕES  -->

            <md-list-item
              
              @click="
                Msg(
                  'Atenção!',
                  'Você deseja realmente encerrar a sessão?',
                  'warning',
                  '',
                  true,
                  'Sim',
                  true,
                  'Não'
                )
              "
            >
              <i class="material-icons" style="margin-right: 5px;">logout</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              Sair
            </md-list-item>

            <!-- <md-list-item href="#/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item> -->
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
  <chattelemedicina></chattelemedicina> 
  </div>
</template>

<script>
/* eslint-disable */
import {bus} from '../../main'
import jwt from "jsonwebtoken";
import { keyJwt } from "../../globalVaribles";
import chattelemedicina from '../../components/chatTelemedicina.vue'



const Swal = require("sweetalert2");
export default {
  data() {
    return {
      titulo: "Sem Notificações",
      listaNotificacoes: [],
      countBadge: 0,
      cdPessoaFisica: '',
      nome: '',
      dadosConexao: null,
      patient: [],
      isLoading: false,
      selectedEmployee: null,
      titular: {},
      classObject: {
          'tab-pane': true,
          active: false
        },
      show: false,

      showPerfil: true,
      
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      
    }
  },
  components: {
    chattelemedicina
  },
  computed: {},
  filters: {},
  beforeCreate() {
    let urlLen = window.location.href.split('/').length
    let route = window.location.href.split('/')[urlLen-1]
    if (!this.$session.exists()) {
      if(route != 'recuperarSenha' && route != 'registrar'){
        this.$router.push("/login");
      }
    }
  },
  created() {
      // this.receberMsg()
      bus.$on('reloadDataClient', (result) => {
        if (result) {
          this.fireBase()
          this.obterNotificacoesCliente()
          this.carregarDados()
          this.recarregarDadosPaciente()
          bus.$emit('reloadDataClient', false)
        }
      })
  },

  beforeMount() {},
  methods: {
    carregarDados() {
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

        resolve(true);
      });
    },


    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    fireBase() {
      if (!('serviceWorker' in navigator)) {
        console.warn('serviceWorker not working')
        return
      }else{
      }

      if (!('PushManager' in window)) {
        console.warn('PushManager not working')
        return
      }else{
      }
      this.hasServiceWorker = true
      this.askForPermission()
      },

      
     askForPermission () {
        if (!this.hasServiceWorker) {
          return
        }
        this.tokenFirebase = sessionStorage.getItem('tokenFire')
       },

      obterNotificacoesCliente(){
        this.recarregarDadosPaciente()
        let headers = {
          'identificador-dispositivo': 'request-android',
          'chave-autenticacao': this.token
        }
        let data = {
          idCliente: this.cdPessoaFisica
        }

        this.axios.post('/notificacao/ObterNotificacoesCliente', data, { headers: headers })
        .then((response) => {
          this.listaNotificacoes = response.data.dados
          this.titulo = "Notificações"
          if(this.listaNotificacoes.length > 0){
            response.data.dados.map((e) => {
                let dataString = e.DATA_FORMATADA
                let dataVetor = dataString.split(" ");

                e.DATA = dataVetor[0]
                e.HORA = dataVetor[1]
                return e
            });

            let count = this.listaNotificacoes.filter(item => {
              return item.DT_VISUALIZADO == null;
            })

            this.countBadge = count.length
          }else{
            this.titulo = "Sem Notificações"
          }
        })
        .catch((error) => {
          console.log(error);
        })
      },

      notificacaoVisualizada(nrSequencia){
        let headers = {
          'identificador-dispositivo': 'request-android',
          'chave-autenticacao': this.token
        }
        let data = {
          idCliente: this.cdPessoaFisica,
          idNotificacao: nrSequencia
        }

        this.axios.post('/notificacao/NotificacaoVisualizada', data, { headers: headers })
        .then((response) => {
          this.obterNotificacoesCliente()
        })
        .catch((error) => {
          console.log(error);
        })
      },


    Msg(
      title,
      msg,
      icon,
      time,
      btnConfirmar,
      titleBtnConfirmar,
      btnCancelar,
      titleBtnCancelar
    ) {
      Swal.fire({
        position: "center",
        icon: icon, //success, warning, error
        title: title,
        text: msg,

        showConfirmButton: btnConfirmar,
        confirmButtonText: titleBtnConfirmar,
        confirmButtonColor: "#32a976",

        showCancelButton: btnCancelar,
        cancelButtonColor: "#cd4949",
        cancelButtonText: titleBtnCancelar,

        timer: time,
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
          // alert("Voce confirmou")
        } else {
          // alert("Voce cancelou")
        }
      });
    },

    recarregarDadosPaciente(){
        let that = this
        jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {
            that.token = decoded.chave
          });

          jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            that.cdPessoaFisica = decoded.titular.cdPessoaFisica
          });
      },

    logout() {
      this.$session.destroy();
      this.$router.push("/login");
    }
  },
  watch: {},
};
</script>

<style scoped>

.md-toolbar {
  min-height: 52px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  display: none;
  position: absolute;
  right: 50px;
  border-radius: 5px;
}
#drop{
  overflow:scroll;
}
.hovercor strong{
  color: #32A976;
}
#drop .fundo:hover .hovercor{
  color: #fff;
}
#drop:hover::-webkit-scrollbar {
    display: block;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
  display: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #8FBC8F;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #32A976;
  
}


</style>
