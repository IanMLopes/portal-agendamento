<template>
  <div class="content">
    <div class="pricing-header px-3 py-3 pb-md-4 mx-auto text-center">
      <img
        src="../..//src/assets/img/health_tech.png"
        class="rounded float-center"
        style="width:150px; cursor: pointer;"
        @click="$router.push('/login')"
      />
      <div v-if="countStap == 0" class="mt-5">
        <h5>Informe seu CPF e Data de Nascimento para iniciarmos</h5>
        <h6>
          Lembre-se que este serviço é exclusivo para pacientes Samel. Entre em
          contato com o suporte caso você ainda não seja
        </h6>
      </div>

      <!--div  v-if="countStap == 1">
        <h5>Encontramos seu CPF</h5>
        <h6>Responda mais algumas perguntas para finalizarmos o seu cadastro</h6>
      </div-->

      <div v-if="countStap == 2">
        <h5>Estamos acabando seu cadastro.</h5>
      </div>

      <div v-if="countStap == 3">
        <h5>Dados atualizados com sucesso</h5>
      </div>
    </div>

    <div class="md-layout justify-content-center">
        <div>
        <form class="md-layout justify-content-center" v-if="countStap == 0">
            <md-card md-with-hover class="mt-0 md-layout-item md-size-50 md-small-size-100" style="min-width:350px">
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item  md-small-size-100">
                                <md-field>
                                    <label for="md-input-cpf">CPF: </label>
                                    <md-input
                                    v-mask = "'###.###.###-##'"
                                    :disabled="block_cpf"
                                    @blur.native="checkCPF()"
                                    v-model="cpf"
                                    value=""
                                    type="text"
                                    id="md-input-cpf"
                                    ></md-input>
                                </md-field >
                                <md-field >
                                    <label for="md-input-data">Data de Nascimento: </label>
                                    <md-input
                                    v-mask="'##/##/####'"
                                    :disabled="block_birth"
                                    v-model="birth_date"
                                    @blur.native="checkDate()"
                                    :value="birth_date"
                                    type="text"
                                    id="md-input-data"
                                    ></md-input>
                                </md-field>
                                <div class="d-flex justify-content-center">
                                    <md-button id="btnSend" @click="getAnswers()" class="md-success">Enviar</md-button>
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
        </form>
      </div>

      <div v-if="countStap == 2" class="w-100">
        <form novalidate class="md-layout justify-content-center">
            <md-card class="md-layout-item md-size-85 md-small-size-100 mt-0">
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100 md-size-60">
                            <md-field>
                                <label for="confirm_fullName"> Nome Completo: </label>
                                <md-input
                                id="confirm_fullName"
                                type="text"
                                v-model="userGetAPI.fullName"
                                aria-describedby=""
                                disabled
                                />
                            </md-field>
                        </div>
                        
                        <div class="md-layout-item md-small-size-100 md-size-20">
                            <md-field>
                                <label for="examplemd-inputEmail1">Gênero: </label>
                                <md-select
                                v-bind:class="[erros.genero ? 'is-invalid' : '']"
                                v-model="userGetAPI.gender"
                                >
                                    <md-option disabled value="">Selecione</md-option>
                                    <md-option value="F">Feminino</md-option>
                                    <md-option value="M">Masculino</md-option>
                                </md-select>
                            </md-field>
                        </div>
                      
                        <div class="md-layout-item md-small-size-100 md-size-20">
                            <md-field>
                                <label for="confirm_maritalStatus">Estado Civil:</label>
                                <md-select
                                  id="confirm_maritalStatus"
                                  v-bind:class="[erros.estadoCivil ? 'is-invalid' : '']"
                                  v-model="userGetAPI.maritalStatus"
                                >
                                  <md-option disabled value="">Selecione</md-option>
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
                        
                        <div class="md-layout-item md-small-size-100 md-size-10">
                            <md-field>
                                <label for="confirm_dddNumber">DDD: </label>
                                <md-input
                                  v-mask="'(##)'"
                                  id="confirm_dddNumber"
                                  v-bind:class="[erros.ddd ? 'is-invalid' : '']"
                                  v-model="userGetAPI.ddd"
                                />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-25">
                            <md-field>
                                <label for="confirm_celNumber"> Número do Celular: </label>
                                <md-input
                                  v-mask="'#####-####'"
                                  id="confirm_celNumber"
                                  v-bind:class="[erros.cel ? 'is-invalid' : '']"
                                  v-model="userGetAPI.nrCel"
                                />
                            </md-field>
                        </div>
                        
                        <div class="md-layout-item md-small-size-100 md-size-15">
                            <md-field>
                                <label for="confirm_cep"> CEP: </label>
                                <md-input
                                  v-mask="'#####-###'"
                                  v-model="userGetAPI.zipCode"
                                  v-bind:class="[erros.cep ? 'is-invalid' : '']"
                                  value=""
                                  type="text"
                                ></md-input>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label for="confirm_endereco"> Endereço: </label>
                                <md-input
                                  id="confirm_endereco"
                                  type="text"
                                  v-bind:class="[erros.endereco ? 'is-invalid' : '']"
                                  v-model="userGetAPI.street"
                                  aria-describedby=""
                                />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-30">
                            <md-field>
                                <label for="confirm_bairro"> Bairro: </label>
                                <md-input
                                  id="confirm_bairro"
                                  type="text"
                                  v-bind:class="[erros.bairro ? 'is-invalid' : '']"
                                  v-model="userGetAPI.neighborhood"
                                  aria-describedby=""
                                />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-10">
                            <md-field>
                                <label for="confirm_numero"> Número: </label>
                                <md-input
                                  id="confirm_numero"
                                  type="text"
                                  v-bind:class="[erros.numero ? 'is-invalid' : '']"
                                  v-model="userGetAPI.nrHouse"
                                  aria-describedby=""
                                />
                            </md-field>
                        </div>
              
                        <div class="md-layout-item md-small-size-100 md-size-60">
                            <md-field>
                                <label for="confirm_complemento"> Complemento: </label>
                                <md-input
                                id="confirm_complemento"
                                type="text"
                                v-model="userGetAPI.compAdrress"
                                aria-describedby=""
                                />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="email_address">E-mail:</label>
                                <md-input
                                type="email"
                                id="email_address"
                                v-bind:class="[erros.email ? 'is-invalid' : '']"
                                v-model="email_address"
                                aria-describedby=""
                                />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100">
                            <div class="invalid-feedback" v-if="erros.confirm_email">
                                E-mail e confirmação de e-mail não conferem.
                            </div>
                            <md-field>
                                <label for="confirm_email_address ">Confirme seu E-mail:</label>
                                <md-input
                                type="email"
                                id="confirm_email_address"
                                v-bind:class="[erros.email2 ? 'is-invalid' : '']"
                                v-model="confirm_email_address"
                                aria-describedby=""
                                />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <div class="invalid-feedback" v-if="erros.confirm_email">
                              E-mail e confirmação de e-mail não conferem.
                            </div>
                            <md-field>
                                <label for="pass">Senha:</label>
                                <md-input
                                type="password"
                                id="pass"
                                v-bind:class="[erros.senha ? 'is-invalid' : '']"
                                v-model="pass"
                                />
                            </md-field>
                        </div>
                            

                        <div class="md-layout-item md-small-size-100">
                            <div class="invalid-feedback" v-if="erros.confirm_senha">
                                Confirmação da senha está diferente da senha.
                            </div>
                            <md-field>
                                <label for="confirm_pass">Confirme sua Senha:</label>
                                <md-input
                                type="password"
                                id="confirm_pass"
                                v-bind:class="[erros.senha2 ? 'is-invalid' : '']"
                                v-model="confirm_pass"
                                />
                            </md-field>
                        </div>
                    </div>
                    <div class="justify-content-center d-flex mt-4">
                      <md-button
                            @click="saveUser()"
                            class="md-success"
                            >
                            Enviar
                      </md-button>
                    </div>
                </md-card-content>
            </md-card>
        </form>
    </div>

      <div class="card-deck mb-3 text-center" v-if="countStap == 3">
        <div class="card mb-4 shadow-sm">
          <div class="card-body text-center">
            <div class="form-group">
              Verifique o e-mail na sua caixa de entrada para confirmarmos sua
              identidade. Caso não esteja aparecendo verifique sua caixa de SPAM
            </div>
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
        :is-full-page="fullPage"
        :width=150
        :height=70
      >
      </loading>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";

import { loader } from '../globalVaribles'

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Index",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      typeLoader: loader,
      cpf: "",
      msg: "",
      birth_date: "",
      genre: "",
      nr_identify: "",
      verificationKey: "",
      email_address: "",
      confirm_email_address: "",
      pass: "",
      confirm_pass: "",
      countStap: 0,
      cpfAlready: false,
      userGetAPI: {
        fullName: "",
        dt_birth: new Date(),
        age: "",
        ddd: "",
        nrCpf: "",
        maritalStatus: "",
        nrRg: "",
        gender: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        zipCode: "",
        idUserT: "",
        nrHouse: "",
        nrCel: "",
        compAdrress: "",
        user: "",
      },
      erros: {
        genero: false,
        estadoCivil: false,
        rg: false,
        cel: false,
        ddd: false,
        cep: false,
        endereco: false,
        bairro: false,
        numero: false,
        email: false,
        email2: false,
        senha: false,
        senha2: false,
        cidade: false,
        estado: false,
        confirm_email: false,
        confirm_senha: false,
      },
      block_cpf: false,
      block_birth: true,
      confirm_cpf: false,
    };
  },
  mounted() {},
  components: {
    Loading,
  },
  methods: {
    checkDate() {
      let dateSplit = this.birth_date.replace(
        /(\d{2})(\d{2})(\d{4})/,
        "$1/$2/$3"
      );

      if (moment(dateSplit, "DD/MM/YYYY", true).isValid() === false) {
        this.criarAviso("Erro", "Informe uma data válida", 3);
      }
    },
    async checkCPF(redirect = true) {
      let result = false;
      if (this.tratarMascara(this.cpf).length == 11) {
        this.blockActions();
        let headers = {
          "Content-Type": "application/json",
          "identificador-dispositivo": "request-android",
        };
        let params = {
          cpf: this.tratarMascara(this.cpf),
        };
        this.isLoading = true;
        await this.axios
          .get("/Cliente/ValidarCPF", {
            headers: headers,
            params: params,
          })
          .then((response) => {
            this.isLoading = false;
            if (response.data.dados) {
              switch (response.data.dados) {
                case 1: {
                  this.criarAviso(
                    "Atenção",
                    "Você tem um cadastro ativo. click em 'Recuperar Senha' para resgatar suas credenciais de acesso",
                    2
                  );
                  this.cpfAlready = true;
                  this.confirm_cpf = false;
                  result = false;
                  break;
                }
                case 2: {
                  result = true;
                  this.block_cpf = true;
                  this.unlock("");
                  this.block_birth = false;
                  this.confirm_cpf = true;
                  break;
                }
                case 3: {
                  this.criarAviso(
                    "Atenção",
                    "Você foi bloqueado temporariamente, espere uma hora para tentar novamente",
                    2
                  );
                  this.confirm_cpf = false;
                  result = false;
                  break;
                }
                default: {
                  this.confirm_cpf = false;
                  this.criarAviso(
                    "Atenção",
                    "Não encontramos este CPF em nossa base de dados. Por favor entre em contato com o suporte",
                    2
                  );
                  result = false;
                  break;
                }
              }
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.criarAviso(
              "Atenção",
              "Não conseguimos conectar ao servidor. Se o erro persistir favor entrar por outro canal.",
              2
            );
            this.unlock("");
            this.confirm_cpf = false;
            result = false;
          });
      } else {
        this.unlock("");
        this.criarAviso("Erro", "CPF inválido. Por favor informe um CPF", 3);
        this.confirm_cpf = true;
        result = false;
      }

      return result;
    },
    checkTel() {
      if (this.tratarMascara(this.userGetAPI.nrCel).length  == 9) {
        return true;
      } else {
        return false;
      }
    },
    checkEmail() {
      if (this.email_address == "") {
        //this.criarAviso("Atenção", "Informe seu e-mail.", 2)
        return false;
      }

      if (this.email_address != this.confirm_email_address) {
        //this.criarAviso("Erro", "E-mail e confirmação de e-mail não conferem.", 2)
        this.erros.confirm_email = true;
        return false;
      }

      return true;
    },
    checkPass() {
      if (this.pass == "") {
        //this.criarAviso("Atenção", "Informe uma senha.", 2)
        return false;
      } else if (this.pass != this.confirm_pass) {
        //this.criarAviso("Erro", "Confirmação da senha está diferente da senha.", 2)
        this.erros.confirm_senha = true;
        return false;
      } else {
        return true;
      }
    },
    checkZipCode() {
      if (this.userGetAPI.zipCode == "") {
        this.criarAviso("Atenção", "Informe o cep da sua casa.", 2);
        return false;
      } else {
        return true;
      }
    },
    getAnswers() {
      //se esta bloqueado o campo é porque
      if (this.confirm_cpf) {
      const date = this.birth_date.replace(
        /(\d{2})(\d{2})(\d{4})/,
        "$1/$2/$3"
      );

      
      this.blockActions();
      let data = JSON.stringify({
        respostaPergunta1: date,
        respostaPergunta2: this.tratarMascara(this.cpf),
      });
      let headers = {
        "Content-Type": "application/json",
        "identificador-dispositivo": "request-android",
      };
      this.isLoading = true;
      this.axios
        .post("/Cliente/ValidarIdentificacaoPositiva", data, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.dados.identificacaoValida) {
            //a verificação foi realizada com sucesso
            this.verificationKey = response.data.dados.chaveValidacao;
            //vai para o form de atualizar cadastro
            this.countStap = 2;
            this.getUserInformation();
          } else {
            //verifica se foi bloqueado
            if (response.data.dados.bloqueioTemporario == true) {
              this.criarAviso(
                "Erro",
                "Você fez algumas tentativas inválidas. Seu acesso foi temporariamente bloqueado. Por favor tente daqui a 1 hora",
                2
              );
            } else {
              //avisa que nao foi com sucesso
              this.criarAviso(
                "Erro",
                "Ocorreu um erro e não conseguimos validar suas informações. Verifique se as infomações estão corretas",
                2
              );
            }
          }

          this.unlock("");
        })
        .finally(() => {
          this.isLoading = false;
        })
        .catch((error) => {
          this.criarAviso(
            "Erro",
            "Não conseguimos conectar ao servidor. Se o erro persistir favor entrar por outro canal.",
            2
          );
          this.unlock("");
          return;
        });
    } else {
      this.criarAviso(
        "Atenção",
        "Seu CPF não passou na validação, informe e tente novamente",
        3
      );
    }
    },
    getUserInformation() {
      const params = {
        cpf: this.tratarMascara(this.cpf),
      };
      const headers = {
        "chave-validacao-identificacao-positiva": this.verificationKey,
        "Content-Type": "application/json",
        "identificador-dispositivo": "request-android",
      };

      this.isLoading = true;
      this.axios
        .get("/Cliente/Obter/", { params: params, headers: headers })
        .then((result) => {
          this.isLoading = false;

          if (Object.keys(result.data.dados).length > 0) {
            const a = new Date(result.data.dados.dataNascimento);
            this.userGetAPI.fullName = result.data.dados.nome;
            // Formate date
            let sw = new Date(result.data.dados.dataNascimento);
            this.userGetAPI.dt_birth =
              ("0" + sw.getDate()).slice(-2) +
              "/" +
              ("0" + sw.getMonth()).slice(-2) +
              "/" +
              sw.getFullYear();

            this.userGetAPI.age = result.data.dados.idade;
            this.userGetAPI.nrCpf = this.tratarMascara(this.cpf);
            this.userGetAPI.maritalStatus = result.data.dados.estadoCivil;
            this.userGetAPI.nrRg = result.data.dados.rg;
            this.userGetAPI.gender = result.data.dados.sexo;
            this.userGetAPI.state = result.data.dados.uf;
            this.userGetAPI.city = result.data.dados.municipio;
            this.userGetAPI.neighborhood = result.data.dados.bairro;
            this.userGetAPI.street = result.data.dados.logradouroResidencial;
            this.userGetAPI.zipCode = result.data.dados.cepResidencial;
            this.userGetAPI.nrHouse = result.data.dados.numeroResidencial;
            this.userGetAPI.compAdrress =
              result.data.dados.complementoResidencial;
            this.userGetAPI.idUserT = result.data.dados.id;
            this.userGetAPI.nrCel = result.data.dados.numeroTelefone;
            this.userGetAPI.ddd = result.data.dados.dddTelefone;

            return true;
          }
        })
        .then((result) => {
          if (result) {
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    async saveUser() {
      let result = false;
      let dataTOReg = "";
      let headers = "";
      //limpa as variaveis de erros para nao acumular lixo
      this.limparValidacao();

      if (this.checkAll()) {
        dataTOReg = JSON.stringify({
          dataNascimento:
            this.userGetAPI.dt_birth.split("/")[2] +
            "/" +
            this.userGetAPI.dt_birth.split("/")[1] +
            "/" +
            this.userGetAPI.dt_birth.split("/")[0],
          cpf: this.userGetAPI.nrCpf,
          sexo: this.userGetAPI.gender,
          id: this.userGetAPI.idUserT,
          estadoCivil: this.userGetAPI.maritalStatus,
          nome: this.userGetAPI.fullName,
          numeroTelefone: this.tratarMascara(this.userGetAPI.nrCel),
          dddTelefone: this.tratarDDD(this.userGetAPI.ddd),
          rg: this.userGetAPI.nrRg,
          usuario: {
            email: this.email_address,
            senha: this.pass,
          },
          complementoResidencial: this.userGetAPI.compAdrress,
          cepResidencial: this.userGetAPI.zipCode,
          logradouroResidencial: this.userGetAPI.street,
          numeroResidencial: this.userGetAPI.nrHouse,
          bairro: this.userGetAPI.neighborhood,
          municipio: this.userGetAPI.city,
          uf: this.userGetAPI.state,
        });

        headers = {
          "Content-Type": "application/json",
          "identificador-dispositivo": "request-android",
        };

        //cria o loading
        this.isLoading = true;

        await this.axios
          .post("/Cliente/Cadastrar", dataTOReg, { headers: headers })
          .then((response) => {
            this.isLoading = false;
            if (response.data.sucesso) {
              //vai para a ultima tela de sucesso
              this.countStap = 3;
              result = true;
            } else {
              this.criarAviso("Erro", response.data.mensagem, 2);
            }
          })
          .catch((err) => {
            this.isLoading = false;
            this.criarAviso(
              "Erro",
              "Não conseguimos conectar ao servidor. Se o erro persistir favor entrar por outro canal.",
              2
            );
            this.unlock("");
            result = false;
          });
      } else {
        result = false;
        this.criarAviso(
          "Atenção",
          "Informe corretamente os dados necessários",
          2
        );
      }

      return result;
    },
    blockActions(e) {
        this.msg = "";
        this.$el.querySelector('#btnSend').disabled = true
    //   $("button").attr("disabled", true);
    },
    unlock(msg) {
        this.msg = msg;
        msg = "";
        this.$el.querySelector('#btnSend').disabled = false
    //   $("button").attr("disabled", false);
    },
    getAddressFromZipCode(zipCode) {
      this.isLoading = true;
      return this.axios
        .get(`https://viacep.com.br/ws/${zipCode}/json`)
        .then((result) => {
          if (Object.keys(result.data).length > 0) {
            this.userGetAPI.street = result.data.logradouro;
            this.userGetAPI.neighborhood = result.data.bairro;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
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
        case 3:
          type = "error";
          break;
      }

      this.$alert(msg, title, type).then(() => console.log("Closed"));
    },
    checkAll() {
      let result = true;
        console.log('CkeckAll')
      if (this.checkEmail() == false) {
        console.log('email')
        this.erros.email = true;
        this.erros.email2 = true;
        result = false;
      }
      if (this.checkPass() == false) {
        this.erros.senha = true;
        this.erros.senha2 = true;
        console.log('senha')
        result = false;

      }
      if (this.checkTel() == false) {
        console.log('tel')
        this.erros.cel = true;
        true;
        result = false;
      }

      if (!this.userGetAPI.gender || this.userGetAPI.gender == "") {
        console.log('gender')
        this.erros.genero = true;
        result = false;
      }
      if (
        !this.userGetAPI.maritalStatus ||
        this.userGetAPI.maritalStatus == ""
      ) {
        console.log('Marital')
        this.erros.estadoCivil = true;
        result = false;
      }
      // if(!this.userGetAPI.nrRg || this.userGetAPI.nrRg == ''){this.erros.rg = true; result = false}
      if (!this.userGetAPI.zipCode || this.userGetAPI.zipCode == "") {
        console.log('CEP')
        this.erros.cep = true;
        result = false;
      }
      if (!this.userGetAPI.street || this.userGetAPI.street == "") {
        console.log('Rua')
        this.erros.endereco = true;
        result = false;
      }
      if (!this.userGetAPI.neighborhood || this.userGetAPI.neighborhood == "") {
        console.log('bairro')
        this.erros.bairro = true;
        result = false;
      }
      if (!this.userGetAPI.nrHouse || this.userGetAPI.nrHouse == "") {
        console.log('numero')
        this.erros.numero = true;
        result = false;
      }
      if (
        !this.tratarDDD(this.userGetAPI.ddd)||
        this.tratarDDD(this.userGetAPI.ddd) == "" ||
        this.tratarDDD(this.userGetAPI.ddd).length != 2
      ) {
        console.log('ddd')
        console.log(this.tratarDDD(this.userGetAPI.ddd))
        console.log(this.tratarDDD(this.userGetAPI.ddd).length)
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
      this.erros.email = false;
      this.erros.email2 = false;
      this.erros.senha = false;
      this.erros.senha2 = false;
      this.erros.cidade = false;
      this.erros.estado = false;
      this.erros.confirm_email = false;
      this.erros.confirm_senha = false;
      this.erros.ddd = false;
    },

    tratarMascara(mask){
      let tratado = mask.replaceAll('.', '').replaceAll('-', '')
      console.log(tratado)
      return tratado
    },

    tratarDDD(ddd){
      let tratado = ddd.toString().replace("(","").replace(")","")
      return tratado
    }
  },

  watch: {
    nr_identify: function() {
      const sw = this.nr_identify
        .split("")
        .filter((a) => {
          if (/^\d+$/.test(a)) {
            return a;
          }
        })
        .join("");
      this.nr_identify =
        sw.length > 1 ? sw.slice(0, -1) + "-" + sw.slice(-1) : sw;
    },
    "userGetAPI.zipCode": function(newVal, oldVal) {
      if (newVal.length == 8) {
        this.getAddressFromZipCode(newVal);
      }
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

.bg-bt-entrar:hover {
  background: rgb(28, 92, 65);
}
.centralizar {
  margin: 0 auto;
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
</style>
