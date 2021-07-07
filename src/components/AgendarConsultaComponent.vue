<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        
        <h4 class="title">
          {{
            !pacienteSelecionado && showResultado == false && showTipoConsulta
              ? $route.name
              : "Agendamento de consulta " + textConsulta
          }}
        </h4>
        <p v-if="!pacienteSelecionado" class="category">
          {{
            !pacienteSelecionado && showResultado == false && showTipoConsulta
              ? "Informe como você quer ser consultado"
              : "Informe para quem será este agendamento"
          }}
        </p>
        <p
          v-if="pacienteSelecionado && professionals.length <= 0"
          class="category"
        >
          Informe os dados do seu convênio para prosseguir com o agendamento:
        </p>
        <p
          class="category"
          v-if="
            professionals.length > 0 &&
              pacienteSelecionado &&
              !professionalSelected
          "
        >
          Selecione o profissional que você deseja:
        </p>
        <p
          class="category"
          v-if="
            professionals.length > 0 &&
              pacienteSelecionado &&
              professionalSelected
          "
        >
          Selecione um horário para sua consulta:
        </p>
      </md-card-header>

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
    <md-card-actions  style="border-top:none; m-0" md-alignment="space-between">
        <b-button
        @click="btnVoltar" 
        variant="outline-success"
        style="border:none"
          ><i :class="showTipoConsulta ? '' : 'fas fa-arrow-left'"></i> {{showTipoConsulta ? 'Início' : 'Voltar'}}
        </b-button>
      </md-card-actions>

    <!-------------------------------------- Seleção do tipo de cosulta --------------------------------------------------------->
      <div
        class="md-layout"
        style="display: flex; justify-content: center;"
        v-if="
          !pacienteSelecionado && showResultado == false && showTipoConsulta
        "
      >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoConsulta(1)"
        >
          <md-card class="border-radius">
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
                <div class="md-card-avatar divCard">
                  <img
                    class="img imgCard"
                    src="../assets/img/incons-card/presencial.png"
                    style="width: 60px; height: 60px;"
                  />
                </div>
                <div style="text-align: center;">
                  <strong>Presencial</strong>
                </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>

        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoConsulta(2)"
        >
          <md-card style="border-radius: 8px;">
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
                <div class="md-card-avatar divCard">
                  <img
                    class="img imgCard"
                    src="../assets/img/incons-card/telemedicina.png"
                    style="width: 60px; height: 60px;"
                  />
                </div>
                <div style="text-align: center;">
                  <strong>Telemedicina</strong>
                </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
      </div>


      <!-------------------------------------- Seleção do paciente --------------------------------------------------------->

      <div
        class="md-layout"
        v-if="
          !pacienteSelecionado && showResultado == false && !showTipoConsulta
        "
      >
        <div
          class="pricing-header px-3 py-3 pt-md-4 pb-md-4 mx-auto text-center"
        >
          <cardsPacients :pacients="pacientes"></cardsPacients>
        </div>
      </div>


      <div
        v-if="
          pacienteSelecionado &&
            showResultado == false &&
            !showProfessionals &&
            !showHorarios
        "
      >
        <!---------------------------------------------- Texto de notificação--------------------------------------------->
        <div class="row">
          <div class="mt-2" v-for="data in agendaEspecial" :key="data.idAgenda">
            <p class="font-weight-normal text-center text-warning">
              Você possui horário especial na especialide:
              <b>{{ data.dsEspecialidade }}</b> com o profissional:
              <b>{{ data.medico }}</b
              >.
            </p>
          </div>




          <!---------------------------------------------- Card com os dados do paciente selecionado--------------------------------------------->
          <div class="md-layout justify-content-center md-size-100 h-100">
            <div class="md-layout justify-content-center">
              <md-card
                class="md-primary mw-75"
                md-theme="purple-card"
                style="box-shadow:none; margin-top:83px; width:320px; border-radius: 8px;"
              >
                <md-card-header class="borderCard" style="background:#FFFFFF !important;">
                  <md-card-header-text>
                    <div class="md-title">{{ pacienteSelecionado.nome }}</div>
                    <div class="md-subhead">
                      <b>CPF: </b>{{ pacienteSelecionado.cpf }}
                    </div>
                    <div class="md-subhead">
                      <b>Data de Nascimento: </b
                      >{{ pacienteSelecionado.nascimento2 }}
                    </div>
                    <div class="md-subhead">
                      <b>Código da Carteirinha: </b
                      >{{
                        pacienteSelecionado.codCarteirinha
                          ? pacienteSelecionado.codCarteirinha
                          : "Não possui"
                      }}
                    </div>
                  </md-card-header-text>

                  <md-card-media>
                    <img
                      v-if="pacienteSelecionado.sexo == 'F'"
                      src="../../static/media/woman.svg"
                      class="m-2 img-fluid rounded card-img-top"
                      style="height: 100px;"
                    />
                    <img
                      v-if="pacienteSelecionado.sexo == 'M'"
                      src="../../static/media/man.svg"
                      class="m-2 img-fluid rounded card-img-top"
                      style="height: 100px;"
                    />
                  </md-card-media>
                </md-card-header>
                <md-card-actions style="justify-content: center !important;">
                  <md-button
                    @click="(pacienteSelecionado = null), (agendaEspecial = [])"
                    type="button"
                    class="md-danger mt-4"
                    ><i class="fas fa-exchange-alt" style="margin-right:10px;"></i>Mudar Paciente</md-button
                  >
                </md-card-actions>
              </md-card>
            </div>

            <!---------------------------------------------- Form para inserir os dados do convenio--------------------------------------------->
            <div class="md-layout">
              <form novalidate class="md-layout justify-content-center">
                <md-card
                  class="md-layout-item md-small-size-100"
                  style="box-shadow: none;"
                >
                  <md-card-content>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item ">
                        
                        <div class="form-group mt-4">
                          <label for="convenioSelect"
                            >Escolha um Convênio:</label
                          >
                          <md-field>
                          <md-select
                            class="select-convenio"
                            v-bind:class="[erros.convenio ? 'is-invalid' : '']"
                            id="convenioSelect"
                            :disabled="blockConvenio"
                            v-model="insuranceSelected"
                            v-on:change="getSpecialty"
                            >
                            <md-option
                              class="option-convenio"
                              v-for="(data, i) in insurances"
                              :value="data.id"
                              :key="i+10"
                              >{{ data.descricao }}</md-option>
                          </md-select>
                          </md-field>
                        </div>
                        

                        <!-- Barra de progresso -->
                        <md-progress-bar
                          v-if="loadEspecialidade"
                          md-mode="indeterminate"
                        ></md-progress-bar>
                        <!----------------------------- -->


                        <div class="form-group mt-4">
                          <label for="especialidadeSelect"
                            >Escolha uma Especialidade:</label
                          >
                           <md-field>
                            <md-select
                              class="select-convenio"
                              v-bind:class="[erros.exameprincipal ? 'is-invalid' : '']" 
                              :disabled="blockEspecialidade" 
                              id="especialidadeSelect" 
                              v-on:change="showProfessionals = false; showHorarios = false;" 
                              v-model="specialtySelected"
                              >
                              <md-option
                                class="option-convenio"
                                v-for="(data, i) in specialty"
                                :value="data.descricao"
                                :key="i+10"
                                >{{ data.descricao }}</md-option>
                            </md-select>
                          </md-field>
                           <!-- <select 
                           class="form-control select-convenio" 
                           v-bind:class="[erros.exameprincipal ? 'is-invalid' : '']" 
                           :disabled="blockEspecialidade" id="especialidadeSelect" 
                           v-on:change="showProfessionals = false; showHorarios = false;" 
                           v-model="specialtySelected"
                           >
                            <option class="option-convenio" v-for=" ( data, i ) in specialty" :key="i" >{{data.descricao}}</option>
                           </select> -->
                        </div>
                      </div>
                    </div>
                  </md-card-content>

                  <md-card-actions
                    class="d-flex justify-content-center"
                    style="border:none"
                  >
                    <md-button
                      @click="getProfessional"
                      :disabled="loadMedico == true"
                      type="button"
                      class="md-success mt-3"
                      ><i class="fas fa-search" style="margin-right:10px;"></i
                      >Buscar Profissionais</md-button
                    >
                  </md-card-actions>
                </md-card>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout justify-content-center">
        <!--------------------------------------------------------- Seção dos cards dos profisionais ----------------------------------------------->
        <div
          class="mt-4 justify-content-center md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-80"
          style=" height: 100%;"
        >
          <cardsProfessionalsConsulta
            v-if="showProfessionals"
            :v-if="professionals.length > 0"
            :professionals="professionals"
            :propSpecialty="objSpecialtySelected"
          ></cardsProfessionalsConsulta>
          <div
            class="text-center"
            v-if="professionals.length == 0 && showProfessionals"
          >
            <p class="lead">
              <b
                >Ainda não existem profissionais disponíveis para essa
                especialidade
              </b>
            </p>
          </div>
        </div>
      </div>
      
    <!--------------------------------------------------------- Seção dos cards dos profisionais ----------------------------------------------->
      <div class="md-layout justify-content-center">
        <div
          class="mt-4 justify-content-center md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
          style=" height: 100%;"
        >
          <!-- <cards-horarios-consulta 
            :v-if="horarios.length > 0"
            v-if="showHorarios"
            :horarios="horarios"
            :profissional="professionalSelected"
            :especialidade="objSpecialtySelected"
          ></cards-horarios-consulta> -->
          <calendar-horarios-consulta
            :v-if="horarios.length > 0"
            v-if="showHorarios"
            :horarios="horarios"
            :profissional="professionalSelected"
            :especialidade="objSpecialtySelected"
          ></calendar-horarios-consulta>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { bus } from "../main";
import cardsPacients from "./Cards/CardsPacients";
import cardsProfessionalsConsulta from "./Cards/CardsProfessionalsConsulta";
import cardsHorariosConsulta from "./Cards/CardsHorariosConsulta";


import Loading from "vue-loading-overlay";

import { loader } from '../globalVaribles'

import "vue-loading-overlay/dist/vue-loading.css";

import Swal from 'sweetalert2'

import jwt from "jsonwebtoken";


import calendarHorariosConsulta from './Cards/CalendarHorariosConsulta.vue'



export default {
  name: "AgendarConsulta",
  data() {
    return {
      dataBackgroundColor: 'green',
      scroll: false,
      titular: {},
      insurances: [],
      insuranceSelected: 0,
      specialty: [],
      specialtySelected: 0,
      objSpecialtySelected: {}, //usado para guardar o objeto completo do id specialtySelected
      professionals: [],
      professionalSelected: 0,
      pacienteSelecionado: null,
      pacientes: [],
      idHorarioCancelar: 0,
      loadEspecialidade: null,
      loadMedico: false,
      blockEspecialidade: true,
      blockMedico: true,
      blockConvenio: false, //comeca habilitado
      showTipoConsulta: true,
      showProfessionals: false,
      showHorarios: false,
      tipoConsulta: 1, //1-normal, 2- telemedicina
      horarios: [],
      isLoading: false,
      typeLoader: loader,
      horarioSelecionado: 0,
      showResultado: false,
      feedbackExame: {
        sucesso: false,
        medico: "",
        unidade: "",
        especialidade: "",
        msgErro: "",
      }, //obj que guarda o resultado da requisicao do usuario e mostra no card sendo sucesso ou nao
      erros: {
        exameprincipal: false,
        convenio: false,
      },
      token: "",
      agendaEspecial: [],
    };
  },
  components: {
    cardsPacients,
    cardsProfessionalsConsulta,
    Loading,
    // cardsHorariosConsulta,
    calendarHorariosConsulta
  },
  created() {
    let that = this,
    CardsHorariosConsultas;

    jwt.verify(this.$session.get("user"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.token = decoded.chave;
    });

    jwt.verify(this.$session.get("listToSchedule"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.pacientes = decoded.listAllPacient;
    });

    jwt.verify(this.$session.get("titular"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.titular = decoded.titular;
    });

    //ESCUTA OS EMMITS DOS COMPONENTES
    bus.$on("pacienteSelecionado", (result) => {
      this.pacienteSelecionado = result;
      //isso sera usado lá no agendaConsultaHorarios

      if (
        this.pacienteSelecionado.codCarteirinha &&
        this.pacienteSelecionado.codCarteirinha.length > 1
      ) {
        this.insuranceSelected = 19;
      } else {
        this.insuranceSelected = 0;
      }

      //verifica se o paciente selecionado possui agenda especial para informá-lo
      this.verificarAgendaEspecial(this.pacienteSelecionado.cdPessoaFisica);

      this.getInsurance();

      //quando ele troca de paciente entao dele deve obrigar a carregar tudo novamente de acordo com os dados do paciente selecionado
      this.blockMedico = true;
      this.blockEspecialidade = true;
      this.professionals = [];
      this.specialty = [];

      this.showProfessionals = false;
      this.showHorarios = false;
      this.blockConvenio = false;
      this.showResultado = false;
    });

    bus.$on("profissionalSelecionado", (result) => {
      this.professionalSelected = result;
      //retira a lista de medicos
      this.showProfessionals = false;
      this.showHorarios = false;
      this.showResultado = false;

      this.getHorarios();
    });

    bus.$on("horarioSelecionado", (result) => {
      this.horarioSelecionado = result;
      //retira a lista de medicos
      this.showProfessionals = false;
      this.showHorarios = false;
      this.showResultado = false;

      this.marcarConsulta();
    });

    //this.pacientes = JSON.parse(this.$cookie.get('listToSchedule'))
  },
  watch: {
    specialtySelected(newValue, oldValue) {
      if (newValue != oldValue) {
        let result = this.specialty.find((item) => item.descricao == newValue);
        this.objSpecialtySelected = result;
      }
    },
  },
  mounted() {},
  methods: {
    selecionarTipoConsulta(tipo) {
      this.tipoConsulta = tipo;
      switch (tipo) {
        case 1:
          //usuario clicou no card entao some
          this.showTipoConsulta = false;
          this.textConsulta = "presencial";
          break;

        case 2:
          this.showTipoConsulta = false;
          this.textConsulta = "telemedicina";
          break;
      }
    },
    verificarAgendaEspecial(idCliente) {
      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idCliente: idCliente,
        tipo: this.tipoConsulta,
      };

      this.axios
        .post("/Agenda/VerificarAgendaEspecial", params, { headers: headers })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            this.agendaEspecial = response.data.dados;
          } else {
            this.agendaEspecial = [];
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.agendaEspecial = [];
          //this.criarAviso("Erro", "Não foi possível confirmar seu agendamento", 2)
        });
    },
    getInsurance() {
      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };
      //bloqueia cards e tabela
      this.showProfessionals = false;
      this.showHorarios = false;
      this.showResultado = false;

      this.axios
        .get("/Convenio/ListarConvenios", { headers: headers })
        .then((response) => {
          //tratando convenios quando o paciente nao é cliente samel
          if (this.insuranceSelected != 0) {
            this.insurances = response.data.dados;
          } else {
            let dados = [];
            dados = response.data.dados;
            dados.map((item) => {
              if (item.id != 19) {
                this.insurances.push(item);
              }
            });
          }

          this.getSpecialty();
        })
        .catch((error) => {
          console.log(error);
          this.criarAviso("Erro", "Erro ao carregar Convênio", 2);
        });
    },
    getSpecialty() {
      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idConvenio: this.insuranceSelected,
        idadeCliente: this.pacienteSelecionado.idade,
        cdPessoaFisica: this.titular.cdPessoaFisica,
        sexo: this.pacienteSelecionado.sexo,
        descricaoEspecialidade: "",
        cdDependente: this.pacienteSelecionado.cdPessoaFisica,
      };

      this.loadEspecialidade = true;
      //limpa a lista
      this.specialty = [];
      this.specialtySelected = 0;

      this.blockEspecialidade = true;
      this.blockMedico = true;
      this.blockConvenio = true;

      //bloqueia cards e tabela
      this.showProfessionals = false;
      this.showHorarios = false;
      this.showResultado = false;

      /****FLAG DE TIPO DE CONSULTA****/

      let url = "";

      if (this.tipoConsulta == 1) {
        //abre a presencial
        url = "Agenda/Consulta/ListarEspecialidadesComAgendaDisponivel2";
      } else if (this.tipoConsulta == 2) {
        //abre a telemedicina
        url = "Agenda/Consulta/ListarEspecialidadesComAgendaDisponivelTele";
      } else {
        //abre a presencial
        url = "Agenda/Consulta/ListarEspecialidadesComAgendaDisponivel2";
      }

      this.axios
        .get(url, {
          headers: headers,
          params: params,
        })
        .then((response) => {
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else {
            this.loadEspecialidade = false;
            this.blockEspecialidade = false;
            this.blockConvenio = false;
            this.specialty = response.data.dados;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadEspecialidade = false;
          this.blockEspecialidade = true;
          this.blockMedico = true;
          this.blockConvenio = false;
          this.criarAviso("Erro", "Erro ao carregar Especialidade", 2);
        });
    },
    getProfessional() {
      console.log(this.specialtySelected)
      if (this.validarCampos() == false) {
        this.criarAviso("Atenção", "Você precisa informar todos os dados", 2);
      } else {
        let headers = {
          "Content-Type": "application/json",
          "chave-autenticacao": this.token,
          "identificador-dispositivo": "request-android",
        };

        let params = {
          idConvenio: this.insuranceSelected,
          idadeCliente: this.pacienteSelecionado.idade,
          idEspecialidade: this.objSpecialtySelected.id, //this.specialtySelected,
          nomeProfissional: "",
          idCliente: this.pacienteSelecionado.cdPessoaFisica,
        };

        this.isLoading = true;

        this.loadMedico = true;
        //limpa a lista e o medico selecionado
        this.professionals = [];
        this.professionalSelected = 0;
        this.blockMedico = true;
        this.blockConvenio = true;
        this.blockEspecialidade = true;
        //habilita o card de medicos e desabilita o de horarios de estiver ativo
        this.showProfessionals = false;
        this.showHorarios = false;
        this.showResultado = false;

        let url = "";

        if (this.tipoConsulta == 1) {
          //abre a presencial
          url = "/Agenda/Consulta/ListarProfissionaisComAgendaDisponivel3";
        } else if (this.tipoConsulta == 2) {
          //abre a telemedicina
          url = "/Agenda/Consulta/ListarProfissionaisComAgendaDisponivelTele2";
        } else {
          //abre a presencial
          url = "/Agenda/Consulta/ListarProfissionaisComAgendaDisponivel3";
        }

        this.axios
          .get(url, { headers: headers, params: params })
          .then((response) => {
            this.isLoading = false;

            if (response.data.codigo == 404) {
              this.limparSessao();
              this.criarAviso("Erro", response.data.mensagem, 2);
              setTimeout(()=>{
                this.loadMedico=false
                this.blockConvenio = false;
                this.blockEspecialidade = false;
                }, 1500)
            } else {
              if (response.data.codigo == 2) {
                this.criarAviso("Atenção", response.data.mensagem, 2);
                setTimeout(()=>{
                  this.loadMedico=false
                  this.blockConvenio = false;
                  this.blockEspecialidade = false;
                  }, 1500)
              } else {
                this.professionals = response.data.dados;
                this.loadMedico = false;
                this.blockMedico = false;
                this.blockConvenio = false;
                this.blockEspecialidade = false;
                this.showProfessionals = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            this.loadMedico = false;
            this.blockMedico = true;
            this.blockConvenio = false;
            this.blockEspecialidade = false;
            this.showProfessionals = false;
            this.criarAviso(
              "Erro",
              "Não foi possível carregar profissionais",
              2
            );
          });
      }
    },
    getHorarios() {
      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };
      let params = {
        idConvenio: this.insuranceSelected,
        idEspecialidade: this.objSpecialtySelected.id, //this.specialtySelected,
        idProfissional: this.professionalSelected.id,
        idadeCliente: this.pacienteSelecionado.idade,
        idCliente: this.pacienteSelecionado.cdPessoaFisica,
      };

      this.isLoading = true;
      this.loadMedico = false;
      this.loadEspecialidade = false;
      //limpa a lista e o medico selecionado
      this.blockMedico = true;
      this.blockEspecialidade = true;
      this.blockConvenio = true;

      this.horarios = [];

      let url = "";


      if (this.tipoConsulta == 1) {
        //abre a presencial
        url = "Agenda/Consulta/ListarHorariosDisponiveis2";
      } else if (this.tipoConsulta == 2) {
        //abre a telemedicina
        url = "Agenda/Consulta/ListarHorariosDisponiveisTele";
      } else {
        //abre a presencial
        url = "Agenda/Consulta/ListarHorariosDisponiveis2";
      }

      this.axios
        .get(url, { headers: headers, params: params })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else {
            this.horarios = response.data.dados;
            this.blockMedico = false;
            this.blockEspecialidade = false;
            this.blockConvenio = false;
            this.showHorarios = true;
          }
        })
        .catch((error) => {
          console.log(error);

          this.blockMedico = false;
          this.blockEspecialidade = false;
          this.blockConvenio = false;
          //deu erro entao habilita os cards dos profissionais
          this.showProfessionals = true;
          this.isLoading = false;
          this.criarAviso(
            "Erro",
            "Não foi possível carregar horarios de Consultas",
            2
          );
        });
    },
    marcarConsulta() {
      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {};

      if (this.horarioSelecionado.horaEspecial == "S") {
        params = {
          idCliente: this.titular.cdPessoaFisica, // cd Pessoa fisica. dado esta no cookie gravado após o login
          idConvenio: this.insuranceSelected, // Id convenio
          codigoCarteirinha: this.pacienteSelecionado.codCarteirinha, // codCarteirinha benner
          idAgenda: this.horarioSelecionado.idAgenda, // cd_agenda Agenda do medico
          dataAgenda: this.horarioSelecionado.data, // dataHorarioAgenda . formato : YYYY/MM/DD HH24:MI
          idEmpresa: this.pacienteSelecionado.idEmpresa, //pega o id empresa, sempre tem q ter um valor aqui pq a procedure espera um valor
          procedimentos: [],
          tipo: 2,
          horarioAgenda: this.horarioSelecionado.data,
          nomeCliente: this.pacienteSelecionado.nome,
          idMedico: this.horarioSelecionado.idMedico,
          idDependente: this.pacienteSelecionado.cdPessoaFisica,
        };
      } else {
        params = {
          idCliente: this.titular.cdPessoaFisica, // cd Pessoa fisica. dado esta no cookie gravado após o login
          idConvenio: this.insuranceSelected, // Id convenio
          codigoCarteirinha: this.pacienteSelecionado.codCarteirinha, // codCarteirinha benner
          idAgenda: this.horarioSelecionado.idAgenda, // cd_agenda Agenda do medico
          dataAgenda: this.horarioSelecionado.data, // dataHorarioAgenda . formato : YYYY/MM/DD HH24:MI
          idEmpresa: this.pacienteSelecionado.idEmpresa, //pega o id empresa, sempre tem q ter um valor aqui pq a procedure espera um valor
          procedimentos: [],
          tipo: 1,
          idDependente: this.pacienteSelecionado.cdPessoaFisica,
        };
      }

      //bloqueia os inputs
      this.blockMedico = true;
      this.blockEspecialidade = true;
      this.blockConvenio = true;

      this.isLoading = true;

      this.axios
        .post("/Agenda/Consulta/ConfirmarAgendamento2", params, {
          headers: headers,
        })
        .then((response) => {
          this.blockMedico = false;
          this.blockEspecialidade = false;
          this.blockConvenio = false;

          this.showHorarios = false;
          this.showProfessionals = false;

          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            this.feedbackExame.sucesso = true;
            this.feedbackExame.medico = this.professionalSelected.nome;
            this.feedbackExame.unidade = this.professionalSelected.unidade.descricao;
            this.feedbackExame.especialidade = this.objSpecialtySelected.descricao;
            this.idHorarioCancelar = response.data.dados.idhorario;
          } else {
            this.feedbackExame.sucesso = false;
            this.feedbackExame.msgErro = response.data.dados.mensagensErro;
          }

          // this.showResultado = true;
          this.mostrarResultado()
        })
        .catch((error) => {
          console.log(error);

          this.feedbackExame.sucesso = false;
          this.feedbackExame.msgErro = "Não foi possível agendar Consulta";

          this.blockMedico = false;
          this.blockEspecialidade = false;
          this.blockConvenio = false;

          this.showProfessionals = false;
          this.showHorarios = false;
          this.isLoading = false;
          this.showResultado = false;
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
      }

      this.$alert(msg, title, type).then(() => console.log("Closed"));
    },
    tentarNovamente() {
      this.feedbackExame = {};
      this.showResultado = false;
      this.professionalSelected = 0;
      this.specialtySelected = 0;
      this.insuranceSelected = 0;
      this.pacienteSelecionado = null;
    },
    validarCampos() {
      let result = true;
      if (
        this.specialtySelected != null &&
        this.specialtySelected != undefined &&
        this.specialtySelected != "" &&
        this.specialtySelected != 0
      ) {
        this.erros.exameprincipal = false;
      } else {
        this.erros.exameprincipal = true;
        result = false;
      }

      if (
        this.insuranceSelected != null &&
        this.insuranceSelected != undefined &&
        this.insuranceSelected != "" &&
        this.insuranceSelected != 0
      ) {
        this.erros.convenio = false;
      } else {
        this.erros.convenio = true;
        result = false;
      }

      return result;
    },
    cancelarConsulta() {
      this.isLoading = true;
      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idHorarioAgenda: this.idHorarioCancelar,
        tipoAgendamento: "0",
      };

      this.axios
        .post("/Agenda/CancelarAgendamento", params, { headers: headers })
        .then((response) => {
          this.isLoading = false;
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            this.criarAviso("Sucesso", "Sua consulta foi cancelada", 1);
            this.showHorarios = false
            this.tentarNovamente();
          } else {
            this.criarAviso(
              "Erro",
              "Não foi possível cancelar sua consulta, tente novamente",
              2
            );
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.criarAviso(
            "Erro",
            "Não foi possível cancelar sua consulta, tente novamente",
            2
          );
        });
    },
    limparSessao() {
      this.$session.destroy();
      this.$router.push("/login");
    },

    mostrarResultado() {// Mostra o Alerta com o html customizado para resultado do agendamento 
      if (this.feedbackExame.sucesso) {
        this.$fire({
          type: "success",
          html:
            '<p class="text-center">' +
            `<b>Médico:</b> ${this.feedbackExame.medico}<br/>` +
            `<b>Unidade: </b>${this.feedbackExame.unidade}<br/>` +
            `<b>Especialidade:</b> ${this.objSpecialtySelected.descricao}` +
            "</p>" +
            "<hr />" +
            '<p class="mb-0">' +
            "Ou se preferir," +
            " clique em cancelar" +
            "</p>",
          title: "Sua consulta foi agendada.",
          showCancelButton: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancelar consulta',
          cancelButtonColor: '#d33',
          reverseButtons: true,
          timer: false,
        }).then((result) => {
            if (result.isConfirmed) {
              //caso confirmado não faz nada
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.cancelarConsulta() 
            }
          })
      } else {
        this.$fire({
          type: "error",
          html:
            '<p class="text-center" style="color: darkgoldenrod;">' +
            `<b>Motivo:</b> ${this.feedbackExame.msgErro}<br />` +
            "<br />" +
            "<br />" +
            "</p>" +
            "<hr />" +
            '<p class="mb-0">' +
            " <b><a" +
            ' class="text-primary"' +
            '>Clique em "Ok" para tentar novamente</a' +
            "></b>" +
            "</p>",
          title: "Erro ao agendar Exame.",
          showConfirmButton: true,
          timer: false,
        }).then((result) => {
          if (result) {
            this.tentarNovamente();
          }
        });
      }
    },

    btnVoltar(){
      if(!this.showTipoConsulta && !this.pacienteSelecionado && !this.showProfessionals && !this.showHorarios){//Selecionar paciente voltar pra selecionar tipo consulta
        this.showTipoConsulta = true
        return
      }

      if(!this.showTipoConsulta && this.pacienteSelecionado && !this.showProfessionals && !this.showHorarios){//Selecionar convenio voltar pra selecionar paciente
        this.pacienteSelecionado = null
        this.agendaEspecial = []
        return
      }

      if(!this.showTipoConsulta && this.pacienteSelecionado && this.showProfessionals && !this.showHorarios){//Selecionar profissional voltar pra selecionar convenio
        this.showTipoConsulta = false
        this.showProfessionals = false
        this.showHorarios = false
        return
      }

      if(!this.showTipoConsulta && this.pacienteSelecionado && !this.showProfessionals && this.showHorarios){//Selecionar horario voltar pra selecionar profissional
        this.showHorarios = false
        this.showProfessionals = true
        this.showResultado = false
        return 
      }

      if(this.showTipoConsulta){
        this.$router.push('/inicio')
        return
      }
    }
  },
  beforeDestroy() {
    bus.$off();
  },
};
</script>
<style>
.divCard {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.borderCard{
  -webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%) !important;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%) !important;
}

.cardItem {
  cursor: pointer;
}
.cardItem:hover {
  cursor: pointer;
  padding: 30px 0px 40px 0px;
  -webkit-box-shadow: 0px 0px 18px 2px rgba(117, 117, 117, 0.2);
  -moz-box-shadow: 0px 0px 18px 2px rgba(117, 117, 117, 0.2);
  box-shadow: 0px 0px 18px 2px rgba(117, 117, 117, 0.2);
  border-radius: 8px !important;
}


.border-radius {
  border-radius: 8px !important;
}
.border-radius:hover {
  border-radius: 8px !important;
}
.select-convenio {
  width: 350px !important;
 -webkit-appearance: none;
 -moz-appearance: none;
  appearance: none;
  /* padding: 2px 30px 2px 2px; */
  border: none;
 
}
.option-convenio{
  width:350px !important;
  -webkit-appearance: none !important; 
  -moz-appearance: none !important; 
  appearance: none !important; 
  /* padding: 2px 30px 2px 2px;  */
  border: none;
  background: #fff;
}
</style>
