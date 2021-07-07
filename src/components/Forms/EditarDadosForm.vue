<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ $route.name }}</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>

      <md-card-actions  style="border-top:none; m-0" md-alignment="space-between">
        <b-button
        @click="btnVoltar" 
        variant="outline-success"
        style="border:none"
          ><i class="fas fa-arrow-left"></i> Voltar
        </b-button>
      </md-card-actions>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nome</label>
              <md-input v-model="usuarioEdit.nome" type="text" disabled>{{
                usuarioEdit.nome
              }}</md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>DDD</label>
              <md-input  type="number" v-bind:class="[erros.ddd ? 'is-invalid' : '']"
                        v-model="usuarioEdit.dddTelefone"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Celular</label>
              <md-input type="number" v-bind:class="[erros.cel ? 'is-invalid' : '']"
                        v-model="usuarioEdit.numeroTelefone"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="movie">Gênero</label>
              <md-select name="movie" id="movie"  v-bind:class="[erros.genero ? 'is-invalid' : '']"
                      v-model="usuarioEdit.sexo">>
                <md-option value="M">Masculino</md-option>
                <md-option value="F">Femenino</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="movie">Estado Civil</label>
              <md-select
                v-model="usuarioEdit.estadoCivil"
                name="movie"
                id="movie"
              >
                <md-option value="1">Solteiro</md-option>
                <md-option value="2">Casado</md-option>
                <md-option value="3">Divorciado</md-option>
                <md-option value="4">Desquitado</md-option>
                <md-option value="5">Viúvo</md-option>
                <md-option value="6">Separado</md-option>
                <md-option value="7">Concubinato/União Estável</md-option>
                <md-option value="9">Outros</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Data de Nascimento</label>
              <md-input
                v-model="usuarioEdit.dataNascimento"
                type="text"
                disabled
              ></md-input>
            </md-field>
          </div>

          <!-- Endereço -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Endereço</label>
              <md-input
                v-model="usuarioEdit.logradouroResidencial"
                type="text"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Número</label>
              <md-input
                v-model="usuarioEdit.numeroResidencial"
                type="number"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Complemento</label>
              <md-input
                v-model="usuarioEdit.complementoResidencial"
                type="text"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Cep</label>
              <md-input
                v-mask="'#####-###'"
                v-model="usuarioEdit.cepResidencial"
                type="text"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Bairro</label>
              <md-input v-model="usuarioEdit.bairro" type="text"></md-input>
            </md-field>
          </div>

          <div v-if="usuarioEdit.estado" class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Estado</label>
              <md-input disabled v-model="usuarioEdit.estado" type="text"></md-input>
            </md-field>
          </div>

          <div   v-if="usuarioEdit.cidade" class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Cidade</label>
              <md-input disabled v-model="usuarioEdit.cidade" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="saveUser()"
              >Salvar</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
    <!-- INICIO LOADING -->
    <div class="vld-parent">
      <!-- spinner or dots or bars -->
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :loader="typeLoader"
        color="#32a976"
        background-color="#c4c4c4"
        :is-full-page="true"
        width= '150'
        height= '70'
      ></loading>
    </div>
    <!-- FIM LOADING -->
  </form>
</template>
<script>
import jwt from "jsonwebtoken";
import {loader } from "../../globalVaribles";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "MeusDados",
  data() {
    return {
      typeLoader: loader,
      dataBackgroundColor: 'green',
      msgSenhaPequena: "",
      classMsgSenhaPequena: "",
      classSenhaPequena: "form-control",
      classSenha: "form-control",
      btmAtualizarSenha: true,
      classRepetirSenha: "form-control",
      msgRepetirSenha: "",
      classMsgRepetirSenha: "",
      // senhanova: "",
      // senhanova2: "",
      titular: {},
      card: 1,
      // senha: {
      //   antiga: "",
      //   nova: "",
      //   nova2: "",
      // },
      erros: {
        senhaNova: false,
        senhaAntiga: false,
        senhaIgual: false,
        sexo: false,
        estadoCivil: false,
        rg: false,
        cel: false,
        ddd: false,
        cep: false,
        endereco: false,
        bairro: false,
        numero: false,
        cidade: false,
        estado: false,
      },
      isLoading: false,
      usuarioEdit: {
        nome: "",
        dataNascimento: "",
        dddTelefone: "",
        cpf: "",
        estadoCivil: "",
        rg: "",
        sexo: "",
        estado: "",
        cidade: "",
        bairro: "",
        logradouroResidencial: "",
        cepResidencial: "",
        id: "",
        numeroResidencial: "",
        numeroTelefone: "",
        complementoResidencial: "",
      },
      token: "",
    };
  },
  components: {
    Loading
  },
  mounted() {
    let that = this;

    jwt.verify(this.$session.get("user"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.token = decoded.chave;
    });

    jwt.verify(this.$session.get("titular"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.titular = decoded.titular;
      that.preencherObjEdit(that.titular);
    });
  },
  methods: {
    btnVoltar(){
      this.$router.push('/meusdados')
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
    // validarSenha() {
    //   let status = true;
    //   if (!this.senha.nova || this.senha.nova.length <= 0) {
    //     this.erros.senhaNova = true;
    //     status = false;
    //   } else if (!this.senha.antiga || this.senha.nova.antiga <= 0) {
    //     this.erros.senhaAntiga = true;
    //     status = false;
    //   } else if (this.senha.antiga == this.senha.nova) {
    //     this.erros.senhaIgual = true;
    //     status = false;
    //   }

    //   return status;
    // },
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

    unlock() {
      this.$el.querySelector('button').disabled = false
    },
    blockActions() {
      this.$el.querySelector('button').disabled = true
    },
    preencherObjEdit(usuario) {
      this.usuarioEdit.nome = usuario.nome;
      this.usuarioEdit.dataNascimento = usuario.nascimento2;
      this.usuarioEdit.dddTelefone = usuario.ddd;
      this.usuarioEdit.cpf = usuario.cpf;
      this.usuarioEdit.estadoCivil = usuario.estadoCivil;
      this.usuarioEdit.rg = usuario.rg;
      this.usuarioEdit.sexo = usuario.sexo;
      this.usuarioEdit.estado = usuario.uf;
      this.usuarioEdit.cidade = usuario.municipio;
      this.usuarioEdit.bairro = usuario.bairro;
      this.usuarioEdit.logradouroResidencial = usuario.endereco;
      this.usuarioEdit.cepResidencial = usuario.cep;
      this.usuarioEdit.id = usuario.cdPessoaFisica;
      this.usuarioEdit.numeroResidencial = usuario.numero;
      this.usuarioEdit.numeroTelefone = usuario.celular;
      this.usuarioEdit.complementoResidencial = usuario.complemento;
    },
    async saveUser() {
      if (this.checkAll()) {
        let headers = {
          "Content-Type": "application/json",
          "identificador-dispositivo": "request-android",
          "chave-autenticacao": this.token,
        };

        //cria o loading
        this.isLoading = true;

        await this.axios
          .put("/Cliente/Atualizar", this.usuarioEdit, { headers: headers })
          .then((response) => {
            this.isLoading = false;
            if (response.data.codigo == 404) {
              this.limparSessao();
              this.criarAviso("Erro", response.data.mensagem, 2);
            } else if (response.data.sucesso) {
              this.atualizarDadosLocais();
              this.criarAviso("Sucesso", response.data.mensagem, 1);
            } else {
              this.criarAviso("Erro", response.data.mensagem, 2);
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
            this.criarAviso(
              "Erro",
              "Não conseguimos conectar ao servidor. Se o erro persistir favor entrar por outro canal.",
              2
            );
            this.unlock("");
          });
      } else {
        this.criarAviso(
          "Atenção",
          "Informe corretamente os dados necessários",
          2
        );
      }
    },
    checkAll() {
      let result = true;
      this.limparValidacao();

      if (!this.usuarioEdit.sexo || this.usuarioEdit.sexo == "") {
        this.erros.genero = true;
        result = false;
      }
      if (!this.usuarioEdit.estadoCivil || this.usuarioEdit.estadoCivil == "") {
        this.erros.estadoCivil = true;
        result = false;
      }
      if (!this.usuarioEdit.rg || this.usuarioEdit.rg == "") {
        this.erros.rg = true;
        result = false;
      }
      if (
        !this.usuarioEdit.cepResidencial ||
        this.usuarioEdit.cepResidencial == ""
      ) {
        this.erros.cep = true;
        result = false;
      }
      if (
        !this.usuarioEdit.logradouroResidencial ||
        this.usuarioEdit.logradouroResidencial == ""
      ) {
        this.erros.endereco = true;
        result = false;
      }
      if (!this.usuarioEdit.bairro || this.usuarioEdit.bairro == "") {
        this.erros.bairro = true;
        result = false;
      }
      if (
        !this.usuarioEdit.numeroResidencial ||
        this.usuarioEdit.numeroResidencial == ""
      ) {
        this.erros.numero = true;
        result = false;
      }
      if (
        !this.usuarioEdit.numeroTelefone ||
        this.usuarioEdit.numeroTelefone == "" ||
        this.usuarioEdit.numeroTelefone.length != 9
      ) {
        this.erros.cel = true;
        result = false;
      }
      if (
        !this.usuarioEdit.dddTelefone ||
        this.usuarioEdit.dddTelefone == "" ||
        this.usuarioEdit.dddTelefone.length != 2
      ) {
        this.erros.ddd = true;
        result = false;
      }

      return result;
    },
    limparValidacao() {
      this.erros.genero = false;
      this.erros.estadoCivil = false;
      this.erros.rg = false;
      this.erros.cel = false;
      this.erros.cep = false;
      this.erros.endereco = false;
      this.erros.bairro = false;
      this.erros.numero = false;
      this.erros.cidade = false;
      this.erros.estado = false;
      this.erros.ddd = false;
    },
    async atualizarDadosLocais() {
      let that = this;

      //nao atualizo no local o email por exemplo, apenas os campos do form mesmo
      this.titular.bairro = this.usuarioEdit.bairro;
      this.titular.celular = this.usuarioEdit.numeroTelefone;
      this.titular.cep = this.usuarioEdit.cepResidencial;
      this.titular.complemento = this.usuarioEdit.complementoResidencial;
      this.titular.ddd = this.usuarioEdit.dddTelefone;
      this.titular.endereco = this.usuarioEdit.logradouroResidencial;
      this.titular.estadoCivil = this.usuarioEdit.estadoCivil;
      this.titular.municipio = this.usuarioEdit.cidade;
      this.titular.numero = this.usuarioEdit.numeroResidencial;
      this.titular.sexo = this.usuarioEdit.sexo;
      this.titular.uf = this.usuarioEdit.estado;

      let titular = this.titular;

      await jwt.sign(
        { titular },
        "9j7d8k20f##",
        { expiresIn: "100d" },
        function(err, dados) {
          that.$session.set("titular", dados);
        }
      );

      //this.$cookie.set('titular', JSON.stringify(this.titular))

      let pacientes = [];
      let dependentes = [];

      await jwt.verify(
        this.$session.get("listToSchedule"),
        "9j7d8k20f##",
        function(err, decoded) {
          pacientes = decoded.listAllPacient;
          //trata os dependetes
          pacientes.map((item) => {
            if (item.cdPessoaFisica != that.titular.cdPessoaFisica) {
              dependentes.push(item);
            }
            return true;
          });

          //por fim add o titular e salva a lista de pacientes no cookie
          dependentes.push(that.titular);
        }
      );

      //pacientes = JSON.parse(this.$cookie.get('listToSchedule'))

      //this.$cookie.set('listToSchedule', JSON.stringify(dependentes))
      await jwt.sign(
        { dependentes },
        "9j7d8k20f##",
        { expiresIn: "100d" },
        function(err, dados) {
          that.$session.set("listToSchedule", dados);
        }
      );
    },
    limparSessao() {
      this.$session.destroy();
      this.$router.push("/login");
    },
    
    tratarMascara(mask){
      let tratado = mask.replaceAll('.', '').replaceAll('-', '')
      return tratado
    },

    tratarDDD(ddd){
      let tratado = ddd.toString().replace("(","").replace(")","")
      return tratado
    }
  },

  watch: {
    senhanova() {
      this.senha.nova = this.senhanova;

      if (this.senhanova.trim().length < 4) {
        this.classSenhaPequena = "form-control is-invalid";
        this.classMsgSenhaPequena = "invalid-feedback";
        this.msgSenhaPequena =
          "Sua senha deve conter, no mínimo, 4 caracteres!";
      } else {
        this.classSenhaPequena = "form-control is-valid";
        this.classMsgSenhaPequena = "valid-feedback";
        this.msgSenhaPequena = "";
      }

      if (this.senhanova2 != "") {
        if (this.senha.nova != this.senhanova2) {
          this.classRepetirSenha = "form-control is-invalid";
          (this.msgRepetirSenha = "Senha diferente da senha digitada acima!"),
            (this.classMsgRepetirSenha = "invalid-feedback");
          this.btmAtualizarSenha = true;
          this.classSenha = "form-control";
        } else {
          this.classRepetirSenha = "form-control is-valid";
          this.msgRepetirSenha = "Senhas compatíveis!";
          this.classMsgRepetirSenha = "valid-feedback";
          this.btmAtualizarSenha = false;
          this.classSenha = "form-control is-valid";
        }
      }
    },

    senhanova2() {
      this.senha.nova2 = this.senhanova2;
      if (this.senhanova2 != "") {
        if (this.senha.nova != this.senhanova2) {
          this.classRepetirSenha = "form-control is-invalid";
          (this.msgRepetirSenha = "Senha diferente da senha digitada acima!"),
            (this.classMsgRepetirSenha = "invalid-feedback");
          this.btmAtualizarSenha = true;
          this.classSenha = "form-control";
        } else {
          this.classRepetirSenha = "form-control is-valid";
          this.msgRepetirSenha = "Senhas compatíveis!";
          this.classMsgRepetirSenha = "valid-feedback";
          this.btmAtualizarSenha = false;
          this.classSenha = "form-control is-valid";
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
