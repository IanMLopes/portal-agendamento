<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
            Agendamento de exame
        </h4>
        <p v-if="!pacienteSelecionado" class="category">
            Informe para quem será este exame
        </p>
        <p
          v-if="pacienteSelecionado && professionals.length <= 0"
          class="category"
        >
          Informe os dados do seu convênio para prosseguir com o exame:
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
      :loader="typeLoader"
      color='#32a976'
      background-color='#c4c4c4'
      :width = 150
      :height = 70
      :is-full-page="true"></loading>
    </div>
    <!-- FIM LOADING -->
    <md-card-actions  style="border-top:none; m-0" md-alignment="space-between">
        <b-button
        @click="btnVoltar" 
        variant="outline-success"
        style="border:none"
          ><i :class="!pacienteSelecionado ? '' : 'fas fa-arrow-left'"></i> {{!pacienteSelecionado ? 'Início' : 'Voltar'}}
        </b-button>
    </md-card-actions>
    <!------------------------- Selecionar pacientes ----------------------->
      <div
        class="md-layout"
        v-if="
          !pacienteSelecionado && showResultado == false
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
        
        <!---------------------------------------------- Card com os dados do paciente selecionado--------------------------------------------->
        <div class="row">
          <div class="md-layout justify-content-center md-size-100 h-100">
            <div class="md-layout justify-content-center">
              <md-card
                class="md-primary mw-75"
                md-theme="purple-card"
                style="box-shadow:none; margin-top:83px; width:320px"
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
                      <div class="md-layout-item md-small-size-100">
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
                              >{{ data.descricao }}</md-option
                            >
                          </md-select>
                          </md-field>
                        </div>

                        <!-- Barra de progresso -->
                        <md-progress-bar
                          v-if="loadEspecialidade"
                          md-mode="indeterminate"
                        ></md-progress-bar>
                        <!----------------------------- -->


                        <div class="form-group mt-2">
                          <label for="especialidadeSelect">Escolha um Exame:</label>
                          <md-field>
                          <md-select
                            class="select-convenio"
                            v-bind:class="[erros.exameprincipal ? 'is-invalid' : '']"
                            :disabled="blockEspecialidade"
                            id="especialidadeSelect"
                            v-model="specialtySelected"
                          > 
                            <md-option
                              class="option-convenio"
                              v-for="(data, i) in specialty"
                              :value="data.id"
                              :key="i+10"
                              >{{ data.descricao }}</md-option
                            >
                          </md-select>
                          </md-field>
                        </div>

                        <div class="form-group mt-2">
                          <label for="especialidadeSelect"
                            >Exame Adicional (Opcional):</label
                          >
                          <md-field>
                          <md-select
                            class="select-convenio"
                            :disabled="blockEspecialidade"
                            id="especialidadeSelect"
                            v-model="specialtySelectedAdicional"
                          >
                            <md-option value="0">Nenhum Adicional</md-option>
                            <md-option
                           
                              class="option-convenio"
                              v-for="(data, i) in specialty"
                              :v-if="data.id != specialtySelected"
                              :value="data.id"
                              :key="i+10"
                              >{{ data.descricao }}</md-option
                            >
                          </md-select>
                          </md-field>
                        </div>

                      </div>
                    </div>
                  </md-card-content>
                  
                  <md-card-actions
                    class="d-flex justify-content-center mt-1"
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
          <cardsProfessionalsExame
            v-if="showProfessionals"
            :v-if="professionals.length > 0"
            :professionals="professionals"
            :propSpecialty="objSpecialtySelected"
          ></cardsProfessionalsExame>
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
          <!-- <cards-horarios-exame 
            :v-if="horarios.length > 0"
            v-if="showHorarios"
            :horarios="horarios"
            :profissional="professionalSelected"
            :especialidade="objSpecialtySelected"
          ></cards-horarios-exame> -->

          <calendar-horarios-exame
            :v-if="horarios.length > 0"
            v-if="showHorarios"
            :horarios="horarios"
            :profissional="professionalSelected"
            :especialidade="objSpecialtySelected"
            ></calendar-horarios-exame>

        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { bus } from "../main";
import cardsPacients from "./Cards/CardsPacients";
import cardsProfessionalsExame from "./Cards/CardsProfessionalsExame";
// import cardsHorariosExame from "../Cards/CardsHorariosExame";

import calendarHorariosExame from "./Cards/CalendarHorariosExame"


import Loading from "vue-loading-overlay";

import { loader } from '../globalVaribles'

import "vue-loading-overlay/dist/vue-loading.css";

import Swal from 'sweetalert2'

import jwt from "jsonwebtoken";


export default {
    name: 'AgendarExame',
    data() {
      return {
        dataBackgroundColor: 'green',
        typeLoader:loader,
        msg: '',
        insurances: [],
        insuranceSelected: 0,
        specialty: [],
        specialtySelected: 0,
        specialtySelectedAdicional:0,
        objSpecialtySelected: {}, //usado para guardar o objeto completo do id specialtySelected
        objSpecialtySelectedAdicional:{},
        procedimentos:[],
        professionals: [],
        professionalSelected: 0,
        idHorarioCancelar: 0,
        pacienteSelecionado: null,
        pacientes: [],
        loadEspecialidade: null,
        loadMedico: false,
        blockEspecialidade: true,
        blockMedico: true,
        blockConvenio: false, //comeca habilitado
        showProfessionals: false,
        showHorarios: false,
        horarios: [],
        isLoading: false,
        horarioSelecionado: 0,
        showResultado: false,
        feedbackExame: {
          sucesso: false,
          medico: '',
          unidade: '',
          exame: '',
          msgErro: ''          
        }, //obj que guarda o resultado da requisicao do usuario e mostra no card sendo sucesso ou nao  
        erros:{
          exameprincipal: false,
          convenio: false
        },
        token: ""      
      }
    },
    components: {
      cardsPacients,
      cardsProfessionalsExame,
      // cardsHorariosExame,
      calendarHorariosExame,
      Loading
    },
    created() {

      let that = this,
        CalendarHorariosConsultahis

      jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {  
        that.token = decoded.chave
      });

      jwt.verify(this.$session.get('listToSchedule'), '9j7d8k20f##', function(err, decoded) {       
        that.pacientes = decoded.listAllPacient
      });

      //ESCUTA OS EMMITS DOS COMPONENTES

      bus.$on('pacienteSelecionado', (result) => {
        this.pacienteSelecionado = result
        //isso sera usado lá no agendaConsultaHorarios

        if (this.pacienteSelecionado.codCarteirinha && this.pacienteSelecionado.codCarteirinha.length > 1) {
          this.insuranceSelected = 19  
        }else{
          this.insuranceSelected = 0
        }

        this.getInsurance()

        //quando ele troca de paciente entao dele deve obrigar a carregar tudo novamente de acordo com os dados do paciente selecionado
        this.blockMedico = true
        this.blockEspecialidade = true
        this.professionals = []
        this.specialty = []
        
        this.showProfessionals = false
        this.showHorarios = false
        this.blockConvenio = false
        this.showResultado  =false
     
      })

      bus.$on('profissionalSelecionado', (result) => {
        this.professionalSelected = result
        //retira a lista de medicos
        this.showProfessionals = false
        this.showHorarios = false
        this.showResultado  =false

        this.getHorarios()     
      })

      bus.$on('horarioSelecionado', (result) => {
        this.horarioSelecionado = result
        //retira a lista de medicos
        this.showProfessionals = false
        this.showHorarios = false
        this.showResultado  =false

        this.marcarExame()

      })

      //this.pacientes = JSON.parse(this.$cookie.get('listToSchedule'))  

    },
    mounted() {
      
    },
    methods: {
      getInsurance() {
        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }
        //bloqueia cards e tabela
        this.showProfessionals = false
        this.showHorarios = false
        this.showResultado  =false

        this.axios.get('/Convenio/ListarConvenios', { headers: headers })
          .then((response) => {
              //tratando convenios quando o paciente nao é cliente samel
              if(this.insuranceSelected != 0){
                this.insurances = response.data.dados
              }else{
                let dados = []
                  dados = response.data.dados
                  dados.map((item)=>{                  
                    if(item.id != 19){
                      this.insurances.push(item)
                    }
                })
              }

              this.getSpecialty()
          })
          .catch((error) => {
            console.log(error)
            this.criarAviso("Erro", "Erro ao carregar Convênio", 2)
          })
      },
      getSpecialty() {
        let headers = {
           'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }
        let params = {
          'idConvenio': this.insuranceSelected,
          'idadeCliente': 99,
          'descricaoEspecialidade': ''
        }

        this.loadEspecialidade = true
        //limpa a lista
        this.specialty = []
        this.specialtySelected = 0

        this.blockEspecialidade = true
        this.blockMedico = true
        this.blockConvenio = true

        //bloqueia cards e tabela
        this.showProfessionals = false
        this.showHorarios = false
        this.showResultado  =false

        this.axios.get('Agenda/Procedimento/ListarProcedimentosComAgendaDisponivel',
            {
              headers: headers,
              params: params
            })
          .then((response) => {

            if(response.data.codigo ==404){
              this.limparSessao()
              this.criarAviso("Erro", response.data.mensagem, 2)
            }else{
              this.loadEspecialidade = false
              this.blockEspecialidade = false
              this.blockConvenio = false
              this.specialty = response.data.dados
            }
           
          })
          .catch((error) => {
            console.log(error)
            this.loadEspecialidade = false
            this.blockEspecialidade = true
            this.blockMedico = true
            this.blockConvenio = false
            this.criarAviso("Erro", "Erro ao carregar Especialidade", 2)
          })
      },
      getProfessional() {

        if(this.validarCampos() == false){

          this.criarAviso("Atenção", "Você precisa informar todos os dados", 2)
        }else{

            let headers = {
              'Content-Type': 'application/json',
              'chave-autenticacao': this.token,
              'identificador-dispositivo': 'request-android'
            }

            let params = {}

            if(this.specialtySelectedAdicional == 0 ){
                params = {
                  'idConvenio': this.insuranceSelected,
                  'idadeCliente': this.pacienteSelecionado.idade,
                  'idProcedimentoPrincipal': this.specialtySelected,
                  'nomeProfissional': ''
                }
            }else{
                params = {
                  'idConvenio': this.insuranceSelected,
                  'idadeCliente': this.pacienteSelecionado.idade,
                  'idProcedimentoPrincipal': this.specialtySelected,
                  'nomeProfissional': '',
                  'idProcedimentoAdicional': this.specialtySelectedAdicional
                }
            }

            this.isLoading = true
            this.loadMedico = true
            //limpa a lista e o medico selecionado
            this.professionals = []
            this.professionalSelected = 0
            this.blockMedico = true
            this.blockConvenio = true
            this.blockEspecialidade = true
            //habilita o card de medicos e desabilita o de horarios de estiver ativo
            this.showProfessionals = false
            this.showHorarios = false
            this.showResultado  =false

            this.axios.get('/Agenda/Procedimento/ListarProfissionaisComAgendaDisponivelParaProcedimentos',
              { headers: headers,
              params: params 
              })
              .then((response) => {

                this.isLoading = false

                if(response.data.codigo ==404){
                  this.limparSessao()
                  this.criarAviso("Erro", response.data.mensagem, 2)
                }else{

                  this.loadMedico = false
                  this.blockMedico = false
                  this.blockConvenio = false
                  this.blockEspecialidade = false

                  if(response.data.codigo == 2){
                    this.criarAviso("Atenção", response.data.mensagem, 2)
                  }else{
                    this.professionals = response.data.dados                    
                    this.showProfessionals = true
                  }
                  
                }               
                
              })
              .catch((error) => {
                console.log(error)
                this.loadMedico = false
                this.blockMedico = true
                this.blockConvenio = false
                this.blockEspecialidade = false

                this.showProfessionals = false
                this.isLoading = false
                this.criarAviso("Erro", "Não foi possível carregar profissionais", 2)
              })
      }
      },
      getHorarios() {
        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }

        let params = {
            'idAgenda': this.professionalSelected.idAgenda
          }      

        this.loadMedico = false
        this.loadEspecialidade = false
        //limpa a lista e o medico selecionado
        this.blockMedico = true
        this.blockEspecialidade = true
        this.blockConvenio = true

        this.isLoading = true
        this.horarios = []

        this.axios.get('/Agenda/Procedimento/ListarHorariosDisponiveisParaProcedimentos2',
          { headers: headers,
           params: params 
          })
          .then((response) => {

            this.isLoading = false

            if(response.data.codigo ==404){
              this.limparSessao()
              this.criarAviso("Erro", response.data.mensagem, 2)
            }else{
              this.horarios = response.data.dados
              this.blockMedico = false
              this.blockEspecialidade = false
              this.blockConvenio = false
              this.showHorarios = true
            }            
            
          })
          .catch((error) => {
            console.log(error)

            this.blockMedico = false
            this.blockEspecialidade = false
            this.blockConvenio = false
            //deu erro entao habilita os cards dos profissionais
            this.showProfessionals = true
            this.isLoading = false
            this.criarAviso("Erro", "Não foi possível carregar horarios de exame", 2)
          })
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
      cancelarConsulta() {
       this.isLoading = true
        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }

        let params = {
          'idHorarioAgenda': this.idHorarioCancelar,
          'tipoAgendamento': '1'
        }
       
       this.axios.post('/Agenda/CancelarAgendamento', params, { headers: headers })
          .then((response) => {
            
            this.isLoading = false

            if(response.data.codigo ==404){
              this.limparSessao()
              this.criarAviso("Erro", response.data.mensagem, 2)
            }else
            if (response.data.sucesso) {
              this.criarAviso("Sucesso", "Sua consulta foi cancelada", 1)              
              this.tentarNovamente()
            } else {
              this.criarAviso("Erro", "Não foi possível cancelar sua consulta, tente novamente", 2)
            }

            
          })
          .catch((error) => {
            console.log(error)
            this.isLoading = false
            this.criarAviso("Erro", "Não foi possível cancelar sua consulta, tente novamente", 2)
          })
      },
      marcarExame() {

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }

        let procedimentos = []

        procedimentos.push(this.objSpecialtySelected)

        if(this.specialtySelectedAdicional != 0){
          procedimentos.push(this.objSpecialtySelectedAdicional)
        }

        let params = {          
          'idCliente': this.pacienteSelecionado.cdPessoaFisica,
          'idConvenio': this.insuranceSelected,
          'codigoCarteirinha': this.pacienteSelecionado.codCarteirinha,
          'idAgenda': this.horarioSelecionado.idAgenda,
          'dataAgenda': this.horarioSelecionado.data,
          'idEmpresa': this.pacienteSelecionado.idEmpresa,
          'idMedico': this.professionalSelected.id,
          'procedimentos': procedimentos //mandar em formato de array
        }

        //bloqueia os inputs
        this.blockMedico = true
        this.blockEspecialidade = true
        this.blockConvenio = true

        this.isLoading = true

        this.axios.post('/Agenda/Procedimento/ConfirmarAgendamento', params, 
          { headers: headers
          })
          .then((response) => {

            this.blockMedico = false
            this.blockEspecialidade = false
            this.blockConvenio = false

            this.showHorarios = false
            this.showProfessionals = false

            this.isLoading = false

            if(response.data.codigo ==404){
              this.limparSessao()
              this.criarAviso("Erro", response.data.mensagem, 2)
            }else
            if(response.data.sucesso){
              this.feedbackExame.sucesso = true
              this.feedbackExame.medico = this.professionalSelected.nome
              this.feedbackExame.unidade = this.professionalSelected.unidade.descricao
              this.feedbackExame.exame =  this.objSpecialtySelected.descricao
              this.idHorarioCancelar = response.data.dados.idhorario
            }else{
               this.feedbackExame.sucesso = false
               this.feedbackExame.msgErro = response.data.dados.mensagensErro
            }
            //Mostrar resultado em um modal
            this.mostrarResultado()         
            
          })
          .catch((error) => {
            console.log(error)

            this.feedbackExame.sucesso = false
            this.feedbackExame.msgErro = "Não foi possível agendar Exame"

            this.blockMedico = false
            this.blockEspecialidade = false
            this.blockConvenio = false

            this.showProfessionals = false
            this.showHorarios = false
            this.isLoading = false
            this.showResultado = false    
          })
      },
      tentarNovamente(){
        this.feedbackExame = {}
        this.showResultado = false
        this.professionalSelected = 0
        this.specialtySelected = 0
        this.insuranceSelected = 0
        this.pacienteSelecionado = null
      },
      validarCampos(){
        let result = true
        if(this.specialtySelected != null && this.specialtySelected != undefined && this.specialtySelected != '' && this.specialtySelected != 0){
          this.erros.exameprincipal = false
        }else{
          this.erros.exameprincipal = true
          result = false
        }

        if(this.insuranceSelected != null && this.insuranceSelected != undefined && this.insuranceSelected != '' && this.insuranceSelected != 0){
          this.erros.convenio = false
        }else{
          this.erros.convenio = true
          result = false
        }

        return result
      },
      limparSessao(){
        this.$session.destroy()     
        this.$router.push('/login') 
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
          title: "Seu exame foi agendado!",
          showCancelButton: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancelar exame',
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

      if(this.pacienteSelecionado && !this.showProfessionals && !this.showHorarios){//Selecionar convenio voltar pra selecionar paciente
        this.pacienteSelecionado = null
        this.agendaEspecial = []
        return
      }

      if(this.pacienteSelecionado && this.showProfessionals && !this.showHorarios){//Selecionar profissional voltar pra selecionar convenio
        this.showProfessionals = false
        this.showHorarios = false
        return
      }

      if(this.pacienteSelecionado && !this.showProfessionals && this.showHorarios){//Selecionar horario voltar pra selecionar profissional
        this.showHorarios = false
        this.showProfessionals = true
        this.showResultado = false
        return 
      }

      if(!this.pacienteSelecionado){
        this.$router.push('/inicio')
        return
      }
    }
    },
    watch: {
      specialtySelected(newValue, oldValue){

        if(newValue != oldValue){
          let result = this.specialty.find( item => item.id == newValue );
          this.objSpecialtySelected = result
        }
        
      },
      specialtySelectedAdicional(newValue, oldValue){

        if(newValue != oldValue){
          let result = this.specialty.find( item => item.id == newValue );
          this.objSpecialtySelectedAdicional = result
        }
        
      }
    },
  
    beforeDestroy() {
      bus.$off()
  }
}


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
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none; 
  /* padding: 2px 30px 2px 2px;  */
  border: none;
  background: #fff;
}
</style>
