<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
          {{ $route.name }}
        </h4>
        <p class="category">
            {{returnTitle()}} </p>
      </md-card-header>
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
          ><i :class="!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && !this.showMenu && !this.menuSelecioando ? '' : 'fas fa-arrow-left'"></i> {{!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && !this.showMenu && !this.menuSelecioando ? 'Início' : 'Voltar'}}
        </b-button>
      </md-card-actions>
       <!----------------------------------------------Seleção de pacientes ---------------------------------------->
      <div class="md-layout" v-if="!pacienteSelecionado">
        <div
          class="pricing-header px-3 py-3 pt-md-4 pb-md-4 mx-auto text-center"
        >
          <cardsPacients :pacients="pacientes"></cardsPacients>
        </div>
      </div>

    <div v-if='showMenu'> 
        <div
        v-if="menuSelecioando == 0"
        class="md-layout"
        style="display: flex; justify-content: center;"
        >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="listarAvaliacoes()"
        >
          <md-card>
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
              <div class="md-card-avatar divCard">
                <img
                  class="img imgCard"
                  src="../../static/media/star.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Avaliar Profissional</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="showListaAvaliacao = false; showModalFalarConosco = true; menuSelecioando = 2"
        >
          <md-card>
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
              <div class="md-card-avatar divCard">
                <img
                  class="img imgCard"
                  src="../../static/media/megaphone.svg" 
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Falar Conosco</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="showListaAvaliacao = false; menuSelecioando = 3; listarHorarios()"
        >
          <md-card>
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
              <div class="md-card-avatar divCard">
                <img
                  class="img imgCard"
                  src="../../static/media/medicalhistory.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Verificar Prescrição</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
      </div>      

      <div class="d-flex w-100 justify-content-center">
        <div class="w-100">
          <!-- <div class="col-md-12 col-lg-6 mb-2">
            <div class="card" style="height:100%">
                <img  :src=" [ pacienteSelecionado.sexo == 'F' ? '../../static/media/woman.svg' : '../../static/media/man.svg' ] " class="m-2 img-fluid rounded card-img-top" style="height: 100px;">                    

                <div class="card-body">
                  <h5 class="card-title">{{pacienteSelecionado.nome}}</h5>
                  <p class="card-text"><b>CPF: </b>{{pacienteSelecionado.cpf}}</p>
                  <p class="card-text"><b>Data de Nascimento: </b>{{pacienteSelecionado.nascimento2}}</p>
                  <p class="card-text"><b>Código da Carteirinha: </b>{{pacienteSelecionado.codCarteirinha ? pacienteSelecionado.codCarteirinha : 'Não possui'}}</p>
                  <button @click="mudarPaciente()" type="button" class="btn btn-danger mt-4">Mudar Paciente</button>
                </div>
            </div>

          </div> -->

          <div class="w-100 d-flex justify-content-center">
            <!-- <div v-if="menuSelecioando == 1" class="card" style="height:100%">
                <div class="card-body"> 
                    <div class="row justify-content-around m-0 p-0 text-center">
                            <div class="col-md-12 mt-1 col-lg-6 card menus-card" @click="listarAvaliacoes()">
                                <img  src="../../static/media/star.svg" class="m-2 img-fluid" style="height: 40px;">
                                <p>Avaliar Profissional</p>
                               
                            </div>
                            <div class="col-md-12 mt-1 col-lg-6 card menus-card" @click="showListaAvaliacao = false; showModalFalarConosco = true">                               
                                <img  src="../../static/media/megaphone.svg" class="m-2 img-fluid" style="height: 40px;">
                                <p>Falar Conosco</p>                               
                            </div>
                            <div class="col-md-12 mt-1 col-lg-6 card menus-card" @click="showListaAvaliacao = false; menuSelecioando = 2; listarHorarios()">
                                <img  src="../../static/media/medicalhistory.svg" class="m-2 img-fluid" style="height: 40px;">
                                <p>Verificar Prescrição</p>    
                            </div>

                            <div class="col-md-12 mt-1 col-lg-6">
                            </div>
                    </div>

                </div>
            </div> -->


            <!------------------- Prescriçoes -------------------------------------------->
            <div v-if="menuSelecioando == 3" class="w-100 text-center" style="height:100%">
                <div class="mt-4"> 
                    <p class="">Escolha um horário para visualizar a sua prescrição:</p>
                    <div id="divBadge" class=" d-flex justify-content-center">
                      <b-badge @click="selectBadge('horarioSelect'+data.dsHorario.replace(':', ''), data.dsHorario)" class="badge-horarios" v-for=" ( data, i ) in horarios" :key="i" v-model="horarioSelecionado" :id="'horarioSelect'+data.dsHorario.replace(':', '')" :disabled="blockHorario" variant="warning">{{data.dsHorario}}</b-badge>
                    </div>
                      
                     
          
                      <!-- <div class="md-layout-item">
                        <md-field>
                          <label for="font">Font</label>
                          <md-select v-bind:class="[erros.horarioSelecionado ? 'is-invalid' : '']" id="horarioSelect" :disabled="blockHorario" v-model="horarioSelecionado" md-dense>
                            <md-option v-for=" ( data, i ) in horarios" :key="i">{{data.dsHorario}}</md-option>
                          </md-select>
                        </md-field>
                      </div> -->
                    <!-- <div class="form-group">
                      <select class="form-control" v-bind:class="[erros.horarioSelecionado ? 'is-invalid' : '']" id="horarioSelect" :disabled="blockHorario" v-model="horarioSelecionado">
                          <option v-for=" ( data, i ) in horarios" :key="i">{{data.dsHorario}}</option>
                      </select>
                    </div>  -->
                    <!-- <div class="progress" v-if="blockHorario">
                        <div class="progress-bar bg-success indeterminate" role="progressbar"></div>
                    </div>

                    <div class="row m-0 p-0 mt-3" > 
                        <div class="row  m-0 p-0 justify-content-center  col-12 ">
                          <button type="button" class="btn btn-success mr-2 mb-2 bg-bt-pesquisar" @click="listarPrescricao()">Procurar</button>
                          <button type="button" class="btn btn-danger mr-2 mb-2" @click="sairMenuPrescricao()">Cancelar</button>                        
                        </div>
                    </div>                     -->

                </div>
            </div>

          </div>

          <div class="m-0 p-0 mt-4" style="width: 100%; height: 100%;"> 
            <cardsProfessionalsAvaliacao v-if="showListaAvaliacao && menuSelecioando == 1 && avaliacoes.length > 0"
              :professionals="avaliacoes" 
            ></cardsProfessionalsAvaliacao>

            <cardsPrescricoes v-if="showListaPrescricao && menuSelecioando == 3 && precricoes.length > 0"
              :prescricoes="precricoes" 
            ></cardsPrescricoes>

            <p v-if="avaliacoes.length == 0 && showListaAvaliacao && menuSelecioando == 1">Não há itens para avaliacão.</p>
            <p v-if="precricoes.length == 0 && showListaPrescricao && menuSelecioando == 3 ">Não há prescriçoes para este paciente.</p>
          </div>          
                  
        </div>
      </div>
    </div>
<!------------------------------------------------------------------Fale Conosco------------------------------>
    <div v-if="showModalFalarConosco" name="modal">
      <div>
        <div>
          <div>
            <div class="row justify-content-md-center pb-3 w-100" >
              <div class="col-md-12 mt-1 col-lg-10 row justify-content-md-center p-0 m-0">
                <div class="col-md-12 col-lg-12 text-center">
                    <img src="../../static/media/megaphone.svg" class="img-fluid rounded float-center" style="width:60px" />
                    <p class="p-0 m-0 mt-1">Tem algo que você gostaria de nos contar que tornaria a sua internação melhor?</p>
                    <div>
                      <md-field>
                        <label>Deixe seu comentário aqui...</label>
                        <md-textarea 
                          id="valorDsReclamacao" 
                          v-model="cadastroReclamacao.dsReclamacao"
                          class="border"
                          :maxlength="max"
                          ></md-textarea>
                        </md-field>
                      </div>
                      <!-- <textarea class="form-control" :class="cadastroReclamacao.erroDsReclamacao ? 'is-invalid' : ''" v-model="cadastroReclamacao.dsReclamacao" id="valorDsReclamacao" rows="3"></textarea> -->
                        <div v-if="cadastroReclamacao.erroDsReclamacao" class="invalid-feedback">
                          Você precisa preencher este campo
                        </div>
                        <div class="w-100 d-flex justify-content-center">
                          <b-button class="mt-2" variant="success" @click="cadastrarReclamacao()">Enviar</b-button>
                        </div>

                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </md-card-content>  

   
    
  </md-card>
</template>

<script>
/* eslint-disable */
  import {bus} from "../main"

  import cardsPacients from  './Cards/CardsPacients.vue'  
  import cardsProfessionalsAvaliacao from  './Cards/CardsProfessionalsAvaliacao.vue'  
  import cardsPrescricoes from  './Cards/CardsPrescricoes.vue'    

  import Loading from 'vue-loading-overlay';

  import { loader } from '../globalVaribles';

  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';

  import jwt from 'jsonwebtoken'

  export default {
    name: 'MinhaInternacao',
    data() {
      return {
        max:1000,
        selected: false,
        dataBackgroundColor: 'green',
        typeLoader: loader,
        menuSelecioando: 0, //1-Avaliar Proffisional, 2-Falar conosco 3-Verificar Prescrição  
        showListaPrescricao: false,
        showModalFalarConosco: false,
        showListaAvaliacao: false,  
        showMenu: false,     
        blockHorario: true, 
        pacienteSelecionado: null,
        horarioSelecionado: null,
        dadosInternacao: {
            id: 0,
            idAtendimento: 0,
            cpf: "",
            dataEntrada: "",
            nome: "",
            setorAtendimento: ""
        },
        pacientes: [],
        avaliacoes: [],   
        horarios: [],  
        precricoes: [],  
        isLoading: false,
        cadastroReclamacao:{
            dsReclamacao: "", 
            erroDsReclamacao: false
        },
        erros:{
            horarioSelecionado: false
        },
        token: "" 
      }
    },
    components: {
      cardsPacients,
      cardsProfessionalsAvaliacao,
      cardsPrescricoes,
      Loading
    },
    created() {
      let that = this
      
      jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {  
        that.token = decoded.chave
      });

      jwt.verify(this.$session.get('listToSchedule'), '9j7d8k20f##', function(err, decoded) {       
        that.pacientes = decoded.listAllPacient
      });

       //ESCUTA OS EMMITS DOS COMPONENTES
      bus.$on('pacienteSelecionado', (result) => {
        this.pacienteSelecionado = result
        this.showListaAvaliacao = false
        this.efetuarLoginInternacao(this.pacienteSelecionado.cdPessoaFisica)
      })

      bus.$on('atualizarAvaliacoes', (result) => {
        if(result){
          this.listarAvaliacoes()
        }
      })

    },
    watch: {
    },
    mounted() {  
    },
    methods: {
      returnTitle(){
        if(!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && !this.showMenu && !this.menuSelecioando){
          return 'Informe quem está internado.'
        }

        if(!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && !this.menuSelecioando && this.pacienteSelecionado){
          return 'Menu Minha Internação.'
        }

        if(!this.showListaPrescricao && !this.showModalFalarConosco && this.showListaAvaliacao && this.showMenu && this.menuSelecioando == 1){
          return 'Com este serviço, você pode avaliar os profissionais, dar sugestões e verificar suas prescrições.'
        }

        if(!this.showListaPrescricao && this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && this.menuSelecioando == 2){
          return 'Com este serviço, você pode nos dar um feedback sobre sua internação.'
        }

        if(!this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && this.menuSelecioando == 3){
          return 'Com este serviço, você pode ver suas prescrições durante sua internação.'
        }

      },
      btnVoltar(){
        if(!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && !this.showMenu && !this.menuSelecioando && !this.pacienteSelecionado){
          this.$router.push('/inicio')
          return
        }

        if(!this.showListaPrescricao && !this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && !this.menuSelecioando && this.pacienteSelecionado){
          this.mudarPaciente()
          this.showMenu = false
          return
        }

        if(!this.showListaPrescricao && !this.showModalFalarConosco && this.showListaAvaliacao && this.showMenu && this.pacienteSelecionado &&  this.menuSelecioando == 1){
          this.showListaAvaliacao = false
          this.menuSelecioando = 0
          return
        }

        if(!this.showListaPrescricao && this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && this.pacienteSelecionado && this.menuSelecioando == 2){
          this.showModalFalarConosco = false
          this.menuSelecioando = 0
          return
        }

        if(!this.showModalFalarConosco && !this.showListaAvaliacao && this.showMenu && this.pacienteSelecionado && this.menuSelecioando == 3){
          this.showListaPrescricao = false
          this.menuSelecioando = 0
          return
        }

      },
      efetuarLoginInternacao(idCliente) {
        this.isLoading = true

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.token,
          'identificador-dispositivo': 'request-android'
        }

        let json = {
            id: idCliente
        }

        this.axios.post('/Login/EfetuarLoginInternacao', json, { headers: headers })
          .then((response) => {

              this.isLoading = false

              if(response.data.codigo == 404){
                  this.limparSessao()
              }else{
                  if(response.data.sucesso == true){
                      this.showMenu = true
                      this.dadosInternacao = response.data.dados
                  }else{
                      //reseta ao paciente selecionado para ele escolher de novo
                      this.pacienteSelecionado = null
                      this.criarAviso("Erro", response.data.mensagem, 2)
                  }                    
              }  
          })
          .catch((error) => {
            console.log(error)
            this.criarAviso("Erro", "Erro ao carregar Internacao", 2)
            this.showMenu = false
            this.isLoading = false
          })
      },
      selectBadge(idHoraBadge, horario){
        this.$el.querySelectorAll("#divBadge > span").forEach((el)=>{ el.style = ""})// desselecionar bedge
        this.$el.querySelector('#'+idHoraBadge).style.backgroundColor = '#42b983'// Selecionar badge
        this.$el.querySelector('#'+idHoraBadge).style.marginTop = '-4px'
        this.horarioSelecionado = horario
        this.listarPrescricao() // Listar as prescrições
      },

      listarAvaliacoes(){
        this.isLoading = true
        this.menuSelecioando = 1

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb', */ this.token,
          'identificador-dispositivo': 'request-android'
        }

        let json = {
            idAtendimento:  this.dadosInternacao.idAtendimento
            //idAtendimento:  2425112
        }

        this.axios.post('/Internacao/ObterPerguntasDisponiveis', json, { headers: headers })
          .then((response) => {

              this.isLoading = false

              if(response.data.codigo == 404){
                  this.criarAviso("Erro", response.data.mensagem, 2)
                  this.limparSessao()
              }else{
                  if(response.data.sucesso == true){
                      this.showListaAvaliacao = true
                      this.avaliacoes = response.data.dados
                  }else{
                      this.showListaAvaliacao = true
                      this.avaliacoes = []
                      //this.criarAviso("Erro", response.data.mensagem, 2)
                  }                    
              }  
          })
          .catch((error) => {
            console.log(error)
            this.criarAviso("Erro", "Erro ao carregar Avaliações", 2)
            this.showListaAvaliacao = false
            this.avaliacoes = []
          })
      },
      cadastrarReclamacao(){

        if(this.validarReclamacao()){
          this.isLoading = true

          let headers = {
            'Content-Type': 'application/json',
            'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb',*/ this.token,
            'identificador-dispositivo': 'request-android'
          }

          let json = {
              idAtendimento:  this.dadosInternacao.idAtendimento,
              dsReclamacao: this.cadastroReclamacao.dsReclamacao           
          } 
          
        this.axios.post('/Internacao/CadastrarReclamacao', json, { headers: headers })
            .then((response) => {

                this.isLoading = false

                if(response.data.codigo == 404){
                    this.criarAviso("Erro", response.data.mensagem, 2)
                    this.limparSessao()
                }else{
                  
                    if(response.data.sucesso == true){     
                        //fecha o modal de avaliacao
                        this.showModalFalarConosco = false                   
                        //volta para o valor padrao
                        this.cadastroReclamacao.dsReclamacao = ""
                        this.showListaPrescricao = false
                        this.showListaAvaliacao = false
                        this.menuSelecioando = 0
                        this.showMenu =  true
                        this.criarAviso("Sucesso", response.data.mensagem, 1)
                    }else{

                        this.criarAviso("Erro", response.data.mensagem, 2)
                    }                    
                }  
            })
            .catch((error) => {
              console.log("erro ao cadastrar reclamacao", error)
              this.isLoading = false
              this.criarAviso("Erro", "Não foi possível realizar operação", 2)
            })
        }       
      },
      listarHorarios(){
        this.blockHorario = true
        this.isLoading = true

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb',*/ this.token,
          'identificador-dispositivo': 'request-android'
        }

        let json = {
            idAtendimento:  this.dadosInternacao.idAtendimento
            //idAtendimento:  2425112
        }

        this.axios.post('/Internacao/ObterHorarios', json, { headers: headers })
          .then((response) => {

              this.blockHorario = false

              if(response.data.codigo == 404){
                  this.criarAviso("Erro", response.data.mensagem, 2)
                  this.limparSessao()
              }else{
                  if(response.data.sucesso == true){
                     this.horarios = response.data.dados
                  }else{
                      this.horarios = []
                      this.criarAviso("Erro", response.data.mensagem, 2)
                  }                    
              }
              this.isLoading = false  
          })
          .catch((error) => {
            this.blockHorario = false
            console.log(error)
            this.criarAviso("Erro", "Erro ao carregar Horários", 2)
            this.horarios = []
            this.isLoading = false 
          })
          
      },
      listarPrescricao(){
        if(this.validarPrescricao()){
          this.isLoading = true

          let headers = {
            'Content-Type': 'application/json',
            'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb',*/ this.token,
            'identificador-dispositivo': 'request-android'
          }

          let json = {
              idAtendimento:  this.dadosInternacao.idAtendimento,
              //idAtendimento:  2425112,
              dsHorario: this.horarioSelecionado
          }

          this.axios.post('/Internacao/ObterPrescricao', json, { headers: headers })
              .then((response) => {

                  this.isLoading = false

                  if(response.data.codigo == 404){
                      this.criarAviso("Erro", response.data.mensagem, 2)
                      this.limparSessao()
                  }else{
                      if(response.data.sucesso == true){                        
                        this.precricoes = response.data.dados
                        this.showListaPrescricao = true
                      }else{
                        this.precricoes = []
                        this.criarAviso("Erro", response.data.mensagem, 2)
                      }                    
                  }  
              })
              .catch((error) => {
                this.isLoading = false
                console.log(error)
                this.criarAviso("Erro", "Erro ao carregar Horários", 2)
                this.precricoes = []
              })
        } else{
          this.criarAviso("Atenção", "Você precisa informar um horário", 2)
        }       
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
      limparDadosInternacao(){
        this.dadosInternacao = {
            id: 0,
            idAtendimento: 0,
            cpf: "",
            dataEntrada: "",
            nome: "",
            setorAtendimento: ""
        }
      }, 
      sairMenuPrescricao(){

        this.horarios = []
        this.horarioSelecionado = null
        this.menuSelecioando = 1
        this.showListaPrescricao = false        
      }, 
      limparSessao(){
        this.$session.destroy()     
        this.$router.push('/login') 
      },
      validarReclamacao(){
        //zera parametro erro de validacao antes de validar novamente
        this.cadastroReclamacao.erroDsReclamacao =false;
        
        let result = true
        if(!this.cadastroReclamacao.dsReclamacao || this.cadastroReclamacao.dsReclamacao == '' || this.cadastroReclamacao.dsReclamacao.trim().length <= 0){
          this.cadastroReclamacao.erroDsReclamacao = true; 
          result = false
        }
        return result
      },
      validarPrescricao(){
        //zera parametro erro de validacao antes de validar novamente
        this.erros.horarioSelecionado =false;
        
        let result = true
        if(!this.horarioSelecionado || this.horarioSelecionado == '' || this.horarioSelecionado.trim().length <= 0){
          this.erros.horarioSelecionado = true;
          result = false
        }
        return result
      },
      mudarPaciente(){
        this.pacienteSelecionado = null
        this.showMenu = false
        this.limparDadosInternacao()
        this.showListaPrescricao = null
        this.menuSelecioando = 0
      }
    },
    beforeDestroy() {
    bus.$off()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
.menus-card{
  cursor: pointer;
}

.menus-card:hover{
  background: rgb(50, 169, 118);
  color: #fff;
}

.bg-bt-pesquisar{
  background:  rgb(50, 169, 118);
  color: #ffffff
}

.bg-bt-pesquisar:hover{
  background:  rgb(28, 92, 65);
}

.progress-bar.indeterminate {
  position: relative;
  animation: progress-indeterminate 2s linear infinite;
}

@keyframes progress-indeterminate {
   from { left: -100%; width: 100%; }
   to { left: 100%; width: 95%;}
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

.close::after{
  content: 'x';
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
  width: 80%;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header{
  border:none;
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

/****CSS LOADING SELECT */
.progress-bar.indeterminate {
  position: relative;
  animation: progress-indeterminate 2s linear infinite;
}

.badge-horarios{
  margin-right: 2%;
  font-size:15px;
  background-color:#563D7C;
  cursor:pointer;
}

.badge-horarios:hover{
  background-color: #6f539b;
}

@keyframes progress-indeterminate {
   from { left: -100%; width: 100%; }
   to { left: 100%; width: 95%;}
} 
</style>
