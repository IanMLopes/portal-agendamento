<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <user-card :titular="titular"> </user-card>
      </div>


      <div class="md-layout-item md-medium-size-100 md-size-70">
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title" v-show="tipoDispositivo == 0">
              <h4 class="title" >Consultas/Exames agendados(as)</h4>
            </span>
          
            
            <md-tabs class="md-success" md-alignment="right">

              <md-tab id="tab-home" md-label="Consultas" md-icon="library_books" class="overflow-auto" @click="tipo = 0; getHistorySchedules()">

                <table class="table table-hover">
                  <tr>
                    <th scope="col" class="topoTable">Data</th>
                    <th scope="col" class="topoTable">Paciente</th>
                    <th scope="col" class="topoTable">Médico</th>
                    <th scope="col" class="topoTable">Especialidade</th>
                    <th scope="col" class="topoTable">Unidade</th>
                    <th scope="col" class="topoTable">Ações</th>
                  </tr>
                  <tbody>
                    <tr v-for="data in datas" :key="data.id" v-show="!data.cancelado && realizados(data.dataAgenda)">
                      <td class="tdCol">{{data.dataAgenda2}}</td>
                      <td class="tdCol">{{data.nomeCliente}}</td>
                      <td class="tdCol">{{data.nomeProfissional}}</td>
                      <td class="tdCol">{{data.tipoAgendamento==0 ? (data.descricaoEspecialidade) : '' }}</td>
                      <td class="tdCol">{{data.nomeUnidade}}</td>
                      <td style="padding: -10px;">
                        <md-button 
                            class="md-just-icon md-simple md-danger btnActions"
                            @click="Msg('Aviso!', 'Você está prestes a cancelar a sua consulta, deseja continuar?', 'warning', '', true, 'Sim', true, 'Não', data)">
                          <md-icon>close</md-icon>
                          <md-tooltip md-direction="left">Cancelar Consulta</md-tooltip>
                        </md-button>
                      </td>
                    </tr>
                
                  </tbody>
                </table>
                <!--  -->
              </md-tab>

              <md-tab id="tab-pages" md-label="Exames" md-icon="receipt"  class="overflow-auto" @click="tipo = 1; getHistorySchedules()">
                <table class="table table-hover">
                    <tr>
                      <th scope="col" class="topoTable">Data</th>
                      <th scope="col" class="topoTable">Paciente</th>
                      <th scope="col" class="topoTable">Médico</th>
                      <th scope="col" class="topoTable">Exame</th>
                      <th scope="col" class="topoTable">Unidade</th>
                      <th scope="col" class="topoTable">Ações</th>
                    </tr>
                  <tbody>
                    <tr v-for="data in datas" :key="data.id" v-show="!data.cancelado && realizados(data.dataAgenda)">
                      <td class="tdColExa">{{data.dataAgenda2}}</td>
                      <td class="tdColExa">{{data.nomeCliente}}</td>
                      <td class="tdColExa">{{data.nomeProfissional}}</td>
                      <td class="tdColExa">{{data.tipoAgendamento==1 ? (data.procedimentos.length == 2 ? data.procedimentos[0].descricao+", "+data.procedimentos[1].descricao : data.procedimentos[0].descricao) : ''}}</td>
                      <td class="tdColExa">{{data.nomeUnidade}}</td>
                      <td style="padding: -10px;">
                        <md-button 
                            class="md-just-icon md-simple md-danger btnActions"
                            @click="Msg('Aviso!', 'Você está prestes a cancelar a um exame, deseja continuar?', 'warning', '', true, 'Sim', true, 'Não', data)">
                          <md-icon>close</md-icon>
                          <md-tooltip md-direction="left">Cancelar Exame</md-tooltip>
                        </md-button>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
              
                <!-- <div class="d-flex justify-content-center" style="margin-top: 13px;">
                  <p>Você não possui Exame(s) agendado(s)</p>
                </div> -->
              </md-tab>
            </md-tabs>

        
          </template>
        </nav-tabs-card>
      </div>
    </div>

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
    <!-- FIM LOADING -->
  </div>
</template>

<script>

import UserCard from "../components/Cards/UserCard";

import jwt from 'jsonwebtoken'
import { keyJwt, loader } from '../globalVaribles'

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

const Swal = require("sweetalert2");

import moment from 'moment'


import {
  NavTabsCard,
} from "@/components";

export default {
  name: 'Historico',
  props: {
  },
  components:{
    UserCard,
    NavTabsCard,
    Loading
  },
  mixins:[],
  directives:{},
  data(){
    return {
      tipoDispositivo: 0,
      datas: [],
      isLoading: false,
      typeLoader: loader,
      titular:{},
      token: '',
      dependentes:[],
      pacientes: [],
      tipo: 0,
    }
  },
  computed:{},
  filters:{},
  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){
    this.carregarDados();
    
    if (screen.width < 400 || screen.height < 480) {
        this.tipoDispositivo = 1 //Celular
    } 
  },
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},
  methods:{

    Msg(title, msg, icon, time, btnConfirmar, titleBtnConfirmar, btnCancelar, titleBtnCancelar, dadosUser) {
      Swal.fire({
        position: "center",
        icon: icon, //success, warning, error
        title: title,
        text: msg,

        showConfirmButton: btnConfirmar,
        confirmButtonText: titleBtnConfirmar,
        confirmButtonColor: '#32a976',

        showCancelButton: btnCancelar,
        cancelButtonColor: '#cd4949',
        cancelButtonText: titleBtnCancelar,

        timer: time
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.cancelarConsulta(dadosUser)
          // 
        }else{
          // 
        }
      })

    },


    carregarDados(){
      return new Promise(async resolve=>{
        let that = this

        await jwt.verify(this.$session.get('user'), keyJwt, function(err, decoded) {
          that.token = decoded.chave
        });

        await jwt.verify(this.$session.get('titular'), keyJwt, function(err, decoded) {
          that.titular = decoded.titular
        });
        
        jwt.verify(this.$session.get('listToSchedule'), keyJwt, function(err, decoded) {       
        let dados = decoded.listAllPacient
        that.pacientes = dados

        for(let item of dados){
          if(item.tipo != "Titular")
          that.dependentes.push(item.nome)
        }

        that.dependentes = that.dependentes.map((item, index) => `${item}`).join(", ")

        that.getHistorySchedules()
        });

      })
    },


    getHistorySchedules() {
      this.datas = []
      this.isLoading = true

      let headers = {
        'chave-autenticacao': this.token,
        'identificador-dispositivo': 'request-android'
      }

      //passa um array com os ids dos pacientes para listarem todos
      let ids = []
      this.pacientes.map((item, index) => ids.push(Number(item.cdPessoaFisica)))

      let json ={
        "pacientes": ids,
        "tipo": this.tipo
      }

      this.axios.post('/Agenda/ListarAgendamentos2', json,
        {
          "headers": headers,
          "params": {}
        })
        .then((response) => {
          this.isLoading = false

          if(response.data.codigo == 404){
            this.Msg("Error", response.data.mensagem, "error", "3000", false, 'Confirmar', false, 'Cancelar', '')
          }else{
            this.datas = response.data.dados
          }
          
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      },


    realizados(dataAgenda){
      let result = false
      if(moment() > moment(dataAgenda,'YYYY/MM/DD HH:mm:ss')){
        result = false
      }else{
        result = true
      }
      return result
    },


    cancelarConsulta(data) {
      this.isLoading = true
      let headers = {
        'Content-Type': 'application/json',
        'chave-autenticacao': this.token,
        'identificador-dispositivo': 'request-android'
      }

      let params = {
        'idHorarioAgenda': data.id,
        'tipoAgendamento': data.tipoAgendamento
      }
      
      this.axios.post('/Agenda/CancelarAgendamento', params, { headers: headers })
      .then((response) => {
        
        this.isLoading = false

        if(response.data.codigo ==404){
          // this.limparSessao()
          // this.criarAviso("Erro", response.data.mensagem, 2)
          this.Msg("Error", response.data.mensagem, "error", "3000", false, 'Confirmar', false, 'Cancelar', '')
        }else{
          if(response.data.sucesso){
            //this.criarAviso("Sucesso", "Sua consulta foi cancelada", 1)
            if(data.tipoAgendamento == 0){
              this.Msg("Sucesso!", "Sua consulta foi cancelada!", "success", "3000", false, 'Confirmar', false, 'Cancelar', '')
            }else{
              this.Msg("Sucesso!", "Seu exame foi cancelado!", "success", "3000", false, 'Confirmar', false, 'Cancelar', '')
            }  
            setTimeout(() => {
              this.getHistorySchedules()  
            }, 3000);          
          }else{
            this.Msg("Error", response.data.mensagem, "error", "3000", false, 'Confirmar', false, 'Cancelar', '')
          }
        }

      })
      .catch((error) => {
        console.log(error)
        this.isLoading = false
      })
    },

  },
  watch:{},
}
</script>
<style scoped>
.topoTable{
  padding-left: 10px;
}

.tdCol{
  padding-top: 20px;
}

.tdColExa{
  padding-top: 15px;
  padding-bottom: 10px;
}

.btnActions{
  margin: -5px 0px -4px 0px;
  padding: 0px;
}


</style>
