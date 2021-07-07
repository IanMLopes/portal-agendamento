<template>
  <form>
   
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Senha Atual</label>
              <md-input
                id="senha_antiga"
                type="password"
                v-model="senha.antiga"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Senha Nova</label>
              <md-input
                id="senha_nova"
                type="password"
                :class="classSenhaPequena"
                v-model="senhanova"
              ></md-input>
            </md-field>
            <div id="validationServer03Feedback" :class="classMsgSenhaPequena">
              {{ msgSenhaPequena }}
            </div>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Repetir Senha Nova</label>
              <md-input
                v-model="senhanova2"
                type="password"
                :class="classRepetirSenha"
                id="validationServer03"
              ></md-input>
            </md-field>
            <div id="validationServer02Feedback" :class="classMsgRepetirSenha">
              {{ msgRepetirSenha }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button @click="atualizarSenha()" class="md-raised md-success"
              >Salvar</md-button
            >
          </div>
        </div>
  </form>
</template>
<script>
import jwt from "jsonwebtoken";

export default {
  name: "MeusDados",
  data() {
    return {
      dataBackgroundColor: "green",
      msgSenhaPequena: "",
      classMsgSenhaPequena: "",
      classSenhaPequena: "",
      classSenha: "",
      btmAtualizarSenha: true,
      classRepetirSenha: "",
      msgRepetirSenha: "",
      classMsgRepetirSenha: "",
      senhanova: "",
      senhanova2: "",
      card: 1,
      senha: {
        antiga: "",
        nova: "",
        nova2: "",
      },
      erros: {
        senhaNova: false,
        senhaAntiga: false,
        senhaIgual: false,
      },
      isLoading: false,
      token: "",
    };
  },
  mounted() {
    let that = this;

    jwt.verify(this.$session.get("user"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.token = decoded.chave;
    });
  },
  methods: {
    unlock() {
      this.$el.querySelector("button").disabled = false;
    },
    blockActions() {
      this.$el.querySelector("button").disabled = true;
    },
    atualizarSenha() {
      if (this.senha.nova != this.senha.nova2) {
        return alert("Senhas incompatíveis");
      } else {
        if (this.validarSenha()) {
          let data = JSON.stringify({
            senhaAntiga: this.senha.antiga,
            senhaNova: this.senha.nova,
          });
          let headers = {
            "Content-Type": "application/json",
            "identificador-dispositivo": "request-android",
            "chave-autenticacao": this.token,
          };
          this.blockActions();
          this.isLoading = true;
          this.axios
            .post("/Login/AlterarSenha", data, { headers: headers })
            .then((response) => {
              this.isLoading = false;
              this.unlock();
              if (response.data.codigo == 404) {
                this.limparSessao();
                this.criarAviso("Erro", response.data.mensagem, 2);
              } else if (response.data.sucesso) {
                this.criarAviso("Sucesso", response.data.mensagem, 1);
                this.$router.push("/");
              } else {
                this.criarAviso("Erro", response.data.mensagem, 2);
              }
            })
            .catch((error) => {
              this.criarAviso(
                "Erro",
                "Não conseguimos conectar ao servidor",
                2
              );
              this.unlock();
              this.isLoading = false;
              return;
            });
        } else {
          if (this.erros.senhaIgual) {
            this.criarAviso(
              "Atenção",
              "Você precisa fornecer uma senha diferente da Atual",
              2
            );
          } else {
            this.criarAviso(
              "Atenção",
              "Você precisa fornecer todos os dados necessários",
              2
            );
          }
        }
      }
    },

    validarSenha() {
      let status = true;
      if (!this.senha.nova || this.senha.nova.length <= 0) {
        this.erros.senhaNova = true;
        status = false;
      } else if (!this.senha.antiga || this.senha.nova.antiga <= 0) {
        this.erros.senhaAntiga = true;
        status = false;
      } else if (this.senha.antiga == this.senha.nova) {
        this.erros.senhaIgual = true;
        status = false;
      }

      return status;
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

      this.$alert(msg, title, type).then(() => console.log("Closed"));
    },
    limparSenhas() {
      this.senha.antiga = "";
      this.senha.nova = "";
      this.erros.senhaNova = false;
      this.erros.senhaAntiga = false;
      this.erros.senhaIgual = false;
    },
  },

  watch: {
    senhanova() {
      this.senha.nova = this.senhanova;
      let pass = this.senhanova.trim().length;
      if (pass != "") {
        if (pass < 4) {
          this.$el.querySelector("#validationServer03Feedback").style.display =
            "block";
          this.classSenhaPequena = "is-invalid";
          this.classMsgSenhaPequena = "invalid-feedback";
          this.msgSenhaPequena =
            "Sua senha deve conter, no mínimo, 4 caracteres!";
        } else {
          this.$el.querySelector("#validationServer03Feedback").style.display =
            "block";
          this.classSenhaPequena = "is-valid";
          this.classMsgSenhaPequena = "valid-feedback";
          this.msgSenhaPequena = "";
        }
      } else {
        this.$el.querySelector("#validationServer03Feedback").style.display =
          "none";
      }

      if (this.senhanova2 != "") {
        if (this.senha.nova != this.senhanova2) {
          this.$el.querySelector("#validationServer03Feedback").style.display =
            "block";
          this.classRepetirSenha = "is-invalid d-block";
          (this.msgRepetirSenha = "Senha diferente da senha digitada acima!"),
            (this.classMsgRepetirSenha = "invalid-feedback");
          this.btmAtualizarSenha = true;
          this.classSenha = "";
        } else {
          this.$el.querySelector("#validationServer03Feedback").style.display =
            "block";
          this.classRepetirSenha = "is-valid";
          this.msgRepetirSenha = "Senhas compatíveis!";
          this.classMsgRepetirSenha = "valid-feedback";
          this.btmAtualizarSenha = false;
          this.classSenha = "is-valid";
        }
      }
    },

    senhanova2() {
      this.senha.nova2 = this.senhanova2;
      if (this.senhanova2 != "") {
        if (this.senha.nova != this.senhanova2) {
          this.$el.querySelector("#validationServer02Feedback").style.display =
            "block";
          this.classRepetirSenha = "is-invalid";
          (this.msgRepetirSenha =
            "Senha diferente da senha digitada anteriormente!"),
            (this.classMsgRepetirSenha = "invalid-feedback");
          this.btmAtualizarSenha = true;
          this.classSenha = "";
        } else {
          this.$el.querySelector("#validationServer02Feedback").style.display =
            "block";
          this.classRepetirSenha = "is-valid";
          this.msgRepetirSenha = "Senhas compatíveis!";
          this.classMsgRepetirSenha = "valid-feedback";
          this.btmAtualizarSenha = false;
          this.classSenha = "is-valid";
        }
      } else {
        this.$el.querySelector("#validationServer02Feedback").style.display =
          "none";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
