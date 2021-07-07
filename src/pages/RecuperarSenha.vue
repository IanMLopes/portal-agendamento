<template>
  <div class="content">
    <div class="container">
      <div class="form-email">
        <div class="col-md-12 col-lg-12 mb-4 text-center">
          <img
            src="../assets/img/health_tech.png"
            class="img-fluid rounded float-center"
             style="width:150px; cursor: pointer;"
              @click="$router.push('/login')"
          />
        </div>

        <div class="col-md-12 col-lg-10">
          <h5 class="text-center">
            Insira seu e-mail cadastrado na Samel para enviarmos uma nova senha
          </h5>
        </div>
        <div class="md-layout justify-content-center">
          <div>
              <form class="md-layout justify-content-center" v-on:submit.prevent="recuperarSenha">
                  <md-card md-with-hover class="mt-0 md-layout-item md-size-50 md-small-size-100" style="min-width:350px">
                      <md-card-content>
                          <div class="md-layout md-gutter">
                              <div class="md-layout-item  md-small-size-100">
                                  <md-field>
                                      <label for="exampleInputEmail1">E-mail</label>
                                      <md-input type="email" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                  </md-field >
                                  <div class="d-flex justify-content-center">
                                      <md-button type="submit" class="md-success">Enviar</md-button>
                                  </div>
                              </div>
                          </div>
                      </md-card-content>
                  </md-card>
              </form>
          </div>
      </div>
      </div>
    </div>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :loader="typeLoader"
        color="#1e7e34"
        :is-full-page="true"
        :width=150
        :height=70
      >
      </loading>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import { loader } from '../globalVaribles'

export default {
  name: "Index",
  data() {
    return {
      email: "",
      isLoading: false,
      typeLoader: loader
    };
  },
  mounted() {},
  components: {
    Loading,
  },
  methods: {
    recuperarSenha() {
      if (!this.email || this.email.length <= 0) {
        this.criarAviso(
          "Aviso",
          "Você precisa inserir seu e-mail cadastrado na Samel",
          2
        );
      } else {
        this.blockActions();
        this.isLoading = true;

        let data = JSON.stringify({
          email: this.email,
        });
        let headers = {
          "Content-Type": "application/json",
        };
        this.axios
          .post("/Login/EnviarEmailRecuperarSenha", data, { headers: headers })
          .then((response) => {
            let res = response.data;
            this.isLoading = false;

            if (res.sucesso) {
              this.mensagemMaisPushLogin("Sucesso", res.mensagem, 1);
            } else {
              this.unlock(res.dados);
              this.criarAviso("Erro", res.mensagem, 2);
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.unlock();
            this.criarAviso(
              "Erro na Operação",
              "Verifique se o seu e-mail está correto ou entre em contato com o suporte",
              2
            );
          });
      }
    },
    blockActions() {
      this.msg = "";
      this.$el.querySelector("button").disabled = true
    },
    unlock(msg) {
      this.msg = msg;
      this.$el.querySelector("button").disabled = false
    },

     mensagemMaisPushLogin(title, msg, tipo) {
      let type = "";

      switch (tipo) {
        case 1:
          type = "success";
          break;
        case 2:
          type = "warning";
          break;
      }

      this.$alert(msg, title, type).then(() => { setTimeout(()=>{ this.$router.push("/login") })  });
    },

    criarAviso(title, msg, tipo) {
      let type = "";

      switch (tipo) {
        case 1:
          type = "success";
          break;
        case 2:
          type = "warning";
          break;
      }

      this.$alert(msg, title, type).then(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-bt-entrar {
  background: rgb(50, 169, 118);
  color: #ffffff;
}
.col-lg-10{
  width: 100%;
  justify-content: center !important;
  text-align: center !important;
}
.text-center {
  width: 80%;
  margin: 0  auto 10px ;
}

.bg-bt-entrar:hover {
  background: rgb(28, 92, 65);
}

.centralizar {
  margin: 0 auto;
}

.card-funcao {
  width: 150px;
  height: 150px;
  background: #fff;
  margin: 5px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
}

.card-funcao:hover {
  background: #28a745;
  color: #fff;
}

.card-funcao p {
  width: 100%;
  height: 40px;
}

.card-funcao img {
  width: 80px;
  height: 80px;
}

/**CSS DO MODAL */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.close::after {
  content: "x";
  position: absolute;
  color: #000;
  margin-top: -30px;
  margin-left: 10px;
  cursor: pointer;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  border: none;
  height: 20px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


.content {
    background-image: linear-gradient( #86ecadd5, #eeeeee) !important;
}
.content{
  /* background: red !important;  */
  height: 100% !important;
  justify-content: center !important;
  min-height: calc(84vh - 123px) !important;
  
}
.container {
  /* background: blue; */
  height: 100% !important;
  justify-content: center !important;
  margin: 0px auto !important;

}
</style>
