<template>
  <div class="content ">
    <div id="headerLogin" v-if="!dispositivo"><HeaderLogin></HeaderLogin></div>
    <!-- class="md-layout-item md-size-25 md-medium-size-50 md-small-size-70 md-xsmall-size-100" -->
    <div
      class="md-layout text-center d-flex justify-content-center"
      style="height: 77vh; display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top:0.5%;"
    >
      <div style="position: relative; width:415px; ">
        <md-card style="background: #42b983; margin-bottom:0px">
          <md-card-header style="background: #fff !important">
            <!-- <h4 class="title">{{ $route.name }}</h4> -->
            <h1 class="title" style="color: #32a976 !important; font-size:18px ">Portal do Paciente</h1>

            <div
              class="social-line  d-flex justify-content-evenly"
              style="margin: 20px 0px 20px 0px;"
            >
              <a href="#facebook">
                <img
                  class="img-fluid"
                  src="../assets/img/logo_plano.png"
                  alt=""
                  style="max-width: 80px;"
                />
              </a>

              <a href="#facebook">
                <img
                  class="img-fluid"
                  src="../assets/img/health_tech2.png"
                  alt=""
                  style="max-width: 110px;"
                />
              </a>
            </div>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content>
            <form v-on:submit.prevent="logar()">
              <div class="md-card-content" style="padding-bottom: 0px;">
                <p class="description" style="color: #fff !important; font-weight:">Login</p>

                <md-field >
                  <!-- <i class="md-icon md-icon-font md-theme-default">email</i> -->
                   
                  <label for="md-input-16idhkxl" style="color: #ffffff !important">E-mail</label>
                  <md-input 
                   style="text-transform:lowercase"
                    v-model="email"
                    id="md-input-log"
                    type="text"
                    value=''
                   
                    
                    
                  ></md-input>
                </md-field>

                <md-field>
                  <!-- <i class="md-icon md-icon-font md-theme-default">lock_outline</i> -->
                  <label for="md-input-16idhkxl"  style="color: #fff !important">Senha</label>
                  <md-input
                    
                    v-model="password"
                    id="md-input-pass"
                    type="password"
                    value=''
                  ></md-input>
                </md-field>
              </div>

              <div class="" style="margin-top: 0px;">
                <md-button type="submit" class="md-success;" style="background: #ffffff !important; color: #32a976 !important; ">Entrar</md-button>
              </div>
            </form>
          </md-card-content>
        </md-card>
        <small
          class="form-text text-muted"
          style=" bottom: 0px;"
        >
          <a
            @click="showDialog = true"
            style="text-decoration: underline; color: #32a976; cursor:pointer;"
            >Clique aqui</a>

          para <strong>recuperar</strong> senha ou para
          <strong>cadastrar</strong> usuário
          </small>
      </div>
    </div>


     <!-- MODAL PASSO PERMITIR PASSO -->
    <div class="modal" tabindex="-1" role="dialog" v-if="modalPermitir" style="display:block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="mt-5 text-center">
            <img src="../assets/img/permission_allow.gif" alt="permission_allow">
          </div>
          <div class="modal-body">
            <p>O navegador está pedindo permissão para 'Mostrar notificações', click em 'Permitir' para usar todas as funcionalidades do sistema!</p>
          </div>
          <div class="modal-footer" style="justify-content:flex-center; border-top:none">
            <button type="button" class="btn btn-primary" @click="modalPermitir=false, gatilho=true">Ok</button>
          </div>
        </div>
      </div>
    </div>

    <!-- INICIO MODAL CADASTRAR E RECUPERAR SENHA -->
    <md-dialog :md-active.sync="showDialog" style="min-width: 30%; border-radius: 3px;">
      <md-dialog-title>Selecione</md-dialog-title>

      <md-card-content>
        <div class="content">
          <div class="md-layout">
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
            >
              <md-card md-with-hover>
                <div @click="irParaPagina(2)">
                  <md-ripple
                    ><!--efeito top-->
                    <md-card-content
                      style="padding: 30px 20px 30px 20px;"
                      class="cardItem"
                    >
                      <div class="md-card-avatar divCard">
                        <img
                          class="img imgCard"
                          src="../assets/img/Cadastrar_usuario.png"
                          style="width: 60px; height: 60px;"
                        />
                      </div>
                      <div style="text-align: center;">
                        <strong>Cadastrar Usuário</strong>
                      </div>
                    </md-card-content>
                  </md-ripple>
                </div>
              </md-card>
            </div>

            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
            >
              <md-card md-with-hover>
                <div @click="irParaPagina(1)">
                  <md-ripple>
                    <md-card-content
                      style="padding: 30px 20px 30px 20px;"
                      class="cardItem"
                    >
                      <div class="md-card-avatar divCard">
                        <img
                          class="img imgCard"
                          src="../assets/img/Recuperar_Senha.png"
                          style="width: 60px; height: 60px;"
                        />
                      </div>
                      <div style="text-align: center;">
                        <strong>Recuperar Senha</strong>
                      </div>
                    </md-card-content>
                  </md-ripple>
                </div>
              </md-card>
            </div>
          </div>
        </div>
      </md-card-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Fechar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <!-- FIM MODAL -->

    <!-- INICIO LOADING -->
    <div class="vld-parent">
      <!-- spinner or dots or bars -->
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :loader="typeLoader"
        color="#32a976"
        background-color="#c4c4c4"
        :width=150
        :height=70 
        :is-full-page="true"
      ></loading>
    </div>
    <!-- FIM LOADING -->
  </div>
</template>

<script>
/* eslint-disable */
import {bus} from "../main"
import jwt from "jsonwebtoken";
import { loader } from "../globalVaribles";
// Import component
import Loading from "vue-loading-overlay";
import HeaderLogin from "./Layout/headerLogin.vue"
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

const Swal = require("sweetalert2");
import VueRouter from 'vue-router'



export default {
  name: "Login",
  props: {},
  components: {
    Loading,
    HeaderLogin,
  },
  mixins: [],
  directives: {},
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      typeLoader: loader,
      showDialog: false,
      dispositivo: '',
      patient: [],
      isLoading: false,
      tokenFirebase: '',
      modalPermitir: false,
      gatilho: false,
      txt: '',
      showModal: false,
      msg: ''
    };
  },
  computed: {},
  filters: {},
  created() {
    this.fireBase()
  },
  beforeMount() {},
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.dispositivo = this.detectarMobile()
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      }else{
        if (Notification.permission === "granted"){}
        else if(Notification.permission === "default"){}
        else{
          this.criarAviso("Atenção!!!", "Você bloqueou a permissão para 'Mostrar notificações', logo você não poderá usar todas as funcionalidades do sistema!")
        }
      }

      setInterval(() => {
        if(Notification.permission === "default"){
          this.modalPermitir = true
          if(Notification.permission === "default"){
            this.modalPermitir = true
            Notification.requestPermission((permission) => {})
          }
        }
      }, 2000)

      setInterval(() => {
        if (Notification.permission === "granted" && this.gatilho == true){
          location.reload();
        }
      }, 2000)
  },


  methods: {
    checkCurrentRouteAndRedirect(router, path) {
      const {
        currentRoute: { path: curPath }
      } = router;
      if (curPath !== path) router.push({ path });
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
      // console.firebase | project settins | cloud message | web config | Key pair
      

    },

      logout() {

        let data = {}

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.$cookie.get('user'),
          'identificador-dispositivo': 'request-android'
        }
       
        this.axios.post('/Login/EfetuarLogout', data, { headers: headers })
        .then((response) => {
          this.limparSessao() 
        })
        .catch((error) => {
      
        })       

      },


       limparSessao(){
        this.$session.destroy()     
        this.$router.push('/login')  
      },
      criarAviso(title,msg, tipo){
        let type = ''

        switch (tipo) {
          case 1:
            type = 'success';
            break;
          case 2:
            type = 'warning'; 
            break;
        }
        
        this.$alert(
            msg,
            title,
            type
        ).then(() => console.log("Closed"));
      },

    detectarMobile() {
      var check = false; //wrapper no check
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
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
          // alert("Voce confirmou")
        } else {
          // alert("Voce cancelou")
        }
      });
    },

    logar() {
      if (
        !this.email ||
        this.email.length <= 0 ||
        !this.password || this.password.length <= 0
      ) {
        this.Msg(
          "Aviso!",
          "Você precisa inserir suas credenciais de login!",
          "warning",
          "3000",
          false,
          "Confirmar",
          false,
          "Cancelar"
        );
      } else {
        let tok = this.tokenFirebase ? this.tokenFirebase : "postman-device"
        
        this.isLoading = true;
        let data = JSON.stringify({
          email: this.email.trim(),
          senha: this.password,
          chaveNotificacaoDispositivo: tok,
        });
        let headers = {
          "Content-Type": "application/json",
          "identificador-dispositivo": "request-android",
        };
        this.axios
          .post("/Login/ValidarCredenciais", data, { headers: headers })
          .then((response) => {
            let res = response.data;
            this.isLoading = false;

            if (res.sucesso) {
              this.$session.start();
              this.saveSession(res.dados2);
            } else {
              this.Msg(
                "Login Inválido!",
                res.mensagem,
                "error",
                "3000",
                false,
                "Confirmar",
                false,
                "Cancelar"
              );
            }
          })
          .catch((error) => {
            this.isLoading = false;
            console.log(error);
          });
        }
      },

      blockActions() {
        this.msg = ''
        this.$el.querySelector("button").setAttribute("disabled", true)
      },
      unlock(msg) {
        this.msg = msg
        this.$el.querySelector("button").setAttribute("disabled", false)
      },
      async saveSession(dados) {

       let listAllPacient = []
       let dependentes = []
       let titular = {}
       let chave = ""


       await jwt.verify(dados, '9j7d8k20f##', function(err, decoded) {
         
          listAllPacient = []
          dependentes = decoded.dependentes
          chave = decoded.token
          // add paciente principal a lista de pacientes para marcacao de consultas/exames
          titular = {
            "nome":           decoded.nome,
            "cdPessoaFisica": decoded.id,
            "codCarteirinha": decoded.codigoCarteirinha,
            "idade":          decoded.idade,
            "sexo":           decoded.sexo,
            "tipo":           "Titular",
            "idEmpresa":      decoded.idEmpresa,
            "cpf":            decoded.cpf,
            "estadoCivil":    decoded.estadoCivil,
            "rg":             decoded.rg,
            "uf":             decoded.uf,
            "municipio":      decoded.municipio,
            "bairro":         decoded.bairro,
            "endereco":       decoded.logradouroResidencial,
            "cep":            decoded.cepResidencial,
            "numero":         decoded.numeroResidencial,
            "complemento":    decoded.complementoResidencial,
            "celular":        decoded.numeroTelefone,
            "ddd":            decoded.dddTelefone,
            "nascimento":     decoded.dataNascimento,
            "nascimento2":    decoded.dataNascimento2,
            "email":          decoded.usuario.email,
            "idUsuario":      decoded.usuario.id
          }

          listAllPacient.push(titular)
          if(dependentes.length >0){
            dependentes.map(result => {
                listAllPacient.push({
                  "nome":           result.cliente.nome,
                  "cdPessoaFisica": result.cliente.id,
                  "codCarteirinha": result.codigoCarteirinha,
                  "idade":          result.cliente.idade,
                  "sexo":           result.cliente.sexo,
                  "tipo":           "Dependente",
                  "idEmpresa":      result.idEmpresa,
                  "cpf":            result.cliente.cpf,
                  "estadoCivil":    result.cliente.estadoCivil,
                  "rg":             result.cliente.rg,
                  "uf":             result.cliente.uf,
                  "municipio":      result.cliente.municipio,
                  "bairro":         result.cliente.bairro,
                  "endereco":       result.cliente.logradouroResidencial,
                  "cep":            result.cliente.cepResidencial,
                  "numero":         result.cliente.numeroResidencial,
                  "complemento":    result.cliente.complementoResidencial,
                  "celular":        result.cliente.numeroTelefone,
                  "ddd":            dados.dddTelefone,
                  "nascimento":     result.cliente.dataNascimento,
                  "nascimento2":     result.cliente.dataNascimento2,
                  "email":          result.cliente.usuario.email,
                  "idUsuario":      result.cliente.usuario.id
                })
            })
          }

        });

        //criptografando dados

        let that = this
        await jwt.sign({listAllPacient}, '9j7d8k20f##', { expiresIn: '100d'}, function(err, dados) {
          that.$session.set('listToSchedule', dados)
        });

        await jwt.sign({titular}, '9j7d8k20f##', { expiresIn: '100d'}, function(err, dados) {
          that.$session.set('titular', dados)
        });

        await jwt.sign({chave}, '9j7d8k20f##', { expiresIn: '100d'}, function(err, dados) {
          that.$session.set('user', dados)
          bus.$emit('reloadDataClient', true)
        });

        // that.$session.set('reload', 1)

        const { isNavigationFailure, NavigationFailureType } = VueRouter


        this.checkCurrentRouteAndRedirect(this.$router, "/");
      },
      criarAviso(title,msg){
        this.$alert(
            msg,
           title,
          "warning"
        ).then(() => console.log("Closed"));
      },
    irParaPagina(page) {
      setTimeout(() => {
        switch (page) {
          case 1:
            this.$router.push("/recuperarSenha");
            break;
          case 2:
            this.$router.push("/registrar");
            break;
        }
      }, 300);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}

.md-field .md-input {
  -webkit-text-fill-color: white !important;
  -moz-text-fill-color: white !important;
  -o-text-fill-color: white !important;
  -ms-text-fill-color: white !important;
}
.content {
  padding: 0px 0px !important;
}
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #32a976 inset;
    -moz-box-shadow: 0 0 0 30px #32a976 inset;
    -o-box-shadow: 0 0 0 30px #32a976 inset;
    // box-shadow: 0 0 0 30px #32a976;
    -webkit-border-radius:2px;
    // border-radius:2px;

}

/* Cor do texto do autocomplete */
input:-webkit-autofill {
    -webkit-text-fill-color: #ffffff!important;
}

</style>
