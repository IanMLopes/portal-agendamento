<template>

<div class="body">

<div class="password-page">

<div class="password">
                <img
                  class="img-redefinir"
                  src="../assets/img/logo_redefinir.jpeg"
                />
    <div class="form">
      <span >Redefinir Senha</span>
        <form class="login-form" >
          <md-field>
            <md-input  type="password"  placeholder="Nova Senha" v-model="senha.nova"/>
          </md-field>
          <md-field>
            <md-input  type="password"   placeholder="Confirmar Senha" v-model="senha.nova2" />
          </md-field>
            <button  class="enviar"  @click.prevent="atualizarSenha()" >salvar</button>
        </form>

    </div>
</div>
</div>
</div>
</template>
<script>
export default {

  data(){
    return {
      senha: {
        nova:'',
        nova2:'',
        receberhash:this.$route.params.hash,
      },
      senhaNova:'',
      confirmaSenha:'',
      hash:'',
      token:'',
      erros: {
        senhaNova: false,
        confirmaSenha: false,
      },
      
    }
  },

  mounted() {
console.log("HASH:",this.senha.receberhash)
  },
    
    methods:{

      unlock() {
      this.$el.querySelector("button").disabled = false;
    },
    blockActions() {
      this.$el.querySelector("button").disabled = true;
    },

      atualizarSenha() {
        console.log("nova", this.senha.nova)
        console.log("nova2", this.senha.nova2)
      if (this.senha.nova != this.senha.nova2) {
        return alert("Senhas incompatíveis");
      } else {
        if (this.validarSenha()) {
          let data = JSON.stringify({
            senhaNova: this.senha.nova,
            confirmaSenha: this.senha.nova2,
            hash: this.senha.receberhash,
            
          });
          console.log("dados:", data)
          let headers = {
            "Content-Type": "application/json",
            "identificador-dispositivo": "request-android",
            "chave-autenticacao": this.token,
          };
          this.blockActions();
          this.isLoading = true;
          this.axios
            .post("/Login/RedefinirSenha", data,  { headers: headers })
            .then((response) => {
              console.log(response.data);
              this.isLoading = false;
              this.unlock();
              if (response.data.codigo == 404) {
                this.limparSessao();
                this.criarAviso("Erro", response.data.mensagem, 2);
              } else if (response.data.sucesso) {
                this.mensagemMaisPushLogin("Sucesso", response.data.mensagem, 1);
              } else {
                this.criarAviso("Erro", response.data.mensagem, 2);
              }
            })
            .catch((error) => {
              this.criarAviso(
                "Erro",
                "Token redefinição de senha já expirado!",
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
      }
        else  if (!this.senha.nova2 || this.senha.nova2.length <= 0) {
        this.erros.confirmaSenha = true;
        status = false;
      }

      return status;
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

      this.$alert(msg, title, type)
    },

    }

}
</script>

<style scoped>

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  /* background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115)); */
  background: linear-gradient(to left, rgb(66, 153, 115), rgb(97, 97, 97));
  /* background: linear-gradient(to left, #76b852, #8dc26f); */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
  position: absolute;
}
.password-page {
  margin-top: 0px;
}

.password {
  width: 360px;
  padding: 2% 0 0;
  margin: auto;
}
.login-form{
  margin-top: 100px
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  height:450px;
  margin: 0 auto 0;
  padding: 45px;
  border-radius: 2px 2px 8px 8px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
span {
  top: 75px;
  padding: 10px;
  display: block;
  position: relative;
}
.form .enviar {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #32a976;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form .enviar:hover,
.form .enviar:active,
.form .enviar:focus {
  background: #378f69;
}
.img-redefinir {
  margin-bottom: -160px;
  position: relative;
  z-index: 2;
  width: 97%;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  
}

</style>