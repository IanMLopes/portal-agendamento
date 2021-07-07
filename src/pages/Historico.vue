<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>


      <div class="md-layout-item md-medium-size-100 md-size-66">
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">
              <h4 class="title" >{{ $route.name }}</h4>
            </span>
              <md-tabs class="md-success" md-alignment="right">

                <md-tab id="tab-home" md-label="Consultas" md-icon="library_books" class="overflow-auto" @click="tipo = 0; getHistorySchedules()" >

                  <div class="d-flex justify-content-evenly" style="margin: 10px 0px 20px 0px;">
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnSuccess" disabled></button>
                      CONSULTAS REALIZADAS
                    </div>
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnWarning" disabled></button>
                      CONSULTAS CANCELADAS
                    </div>
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnDanger" disabled></button>
                      CONSULTAS NÃO REALIZADAS
                    </div>
                  </div>

                  <table class="table table-hover">
                      <tr>
                        <th scope="col" class="topoTable">Data</th>
                        <th scope="col" class="topoTable">Paciente</th>
                        <th scope="col" class="topoTable">Médico</th>
                        <th scope="col" class="topoTable">Especialidade</th>
                        <th scope="col" class="topoTable">Unidade</th>
                      </tr>
                    <tbody>
                      <tr v-for="data in datas" :key="data.id" :class="tr(data)" v-show="realizados(data)">
                      <!-- <tr v-for="data in datas" :key="data.id" :class="[data.cancelado ? 'trSuccess':'trDanger']" v-show="!data.cancelado && realizados(data.dataAgenda)"> -->
                        <td class="tdCol">{{data.dataAgenda2}}</td>
                        <td class="tdCol">{{data.nomeCliente}}</td>
                        <td class="tdCol">{{data.nomeProfissional}}</td>
                        <td class="tdCol">{{data.tipoAgendamento==0 ? (data.descricaoEspecialidade) : '' }}</td>
                        <td class="tdCol">{{data.nomeUnidade}}</td>
                      </tr>
                 
                    </tbody>
                  </table>
                </md-tab>

                <md-tab id="tab-pages" md-label="Exames" md-icon="receipt"  class="overflow-auto" @click="tipo = 1; getHistorySchedules()">
                  
                  <div class="d-flex justify-content-evenly" style="margin: 10px 0px 20px 0px;">
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnSuccess" disabled></button>
                      EXAMES REALIZADOS
                    </div>
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnWarning" disabled></button>
                      EXAMES CANCELADOS
                    </div>
                    <div>
                      <button type="button" class="btn btn-lg btn-primary btnDanger" disabled></button>
                      EXAMES NÃO REALIZADOS
                    </div>
                  </div>


                  <table class="table table-hover">
                      <tr>
                        <th scope="col" class="topoTable">Data</th>
                        <th scope="col" class="topoTable">Paciente</th>
                        <th scope="col" class="topoTable">Médico</th>
                        <th scope="col" class="topoTable">Exame</th>
                        <th scope="col" class="topoTable">Unidade</th>
                      </tr>
                    <tbody>
                      <tr v-for="data in datas" :key="data.id" :class="tr(data)" v-show="realizados(data)">
                        <td class="tdColExa">{{data.dataAgenda2}}</td>
                        <td class="tdColExa">{{data.nomeCliente}}</td>
                        <td class="tdColExa">{{data.nomeProfissional}}</td>
                        <td class="tdColExa">{{data.tipoAgendamento==1 ? (data.procedimentos.length == 2 ? data.procedimentos[0].descricao+", "+data.procedimentos[1].descricao : data.procedimentos[0].descricao) : ''}}</td>
                        <td class="tdColExa">{{data.nomeUnidade}}</td>
                      </tr>
                    </tbody>
                  </table>
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
  NavTabsCard
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
      datas: [],
      isLoading: true,
      typeLoader: loader,
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
  },
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},
  methods:{

    Msg(title, msg, icon, time, btnConfirmar, titleBtnConfirmar, btnCancelar, titleBtnCancelar) {
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
          // alert("Voce confirmou")
        }else{
          // alert("Voce cancelou")
        }
      })

    },


    carregarDados(){
      return new Promise(async resolve=>{
        let that = this

        await jwt.verify(this.$session.get('user'), keyJwt, function(err, decoded) {
          that.token = decoded.chave
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


    realizados(data){
      if(data.cancelado){
          return true
        }else{
          if(moment() > moment(data.dataAgenda,'YYYY/MM/DD HH:mm:ss')){
            return true
          }else{
            return false
          }
        }
    },


    getHistorySchedules() {
      this.datas = []
      this.isLoading = true

      let headers = {
        'chave-autenticacao': this.token,
        'identificador-dispositivo': 'request-android'
      }

      //passa um array com os ids dos pacientes para listarem todos
      //this.pacientes = JSON.parse(this.$cookie.get('listToSchedule'))
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
            this.Msg("Error", response.data.mensagem, "error", "3000", false, 'Confirmar', false, 'Cancelar')
          }else{
            this.datas = response.data.dados
            console.log("-fsd=fs-df-=sd-fsd=-f=s-d"+ datas)
          }
          
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      },


      tr(data){
      if(data.cancelado && !data.realizado){
        return "trWarning"
      }else if(moment() > moment(data.dataAgenda,'YYYY/MM/DD HH:mm:ss') && !data.cancelado && data.realizado){
          return "trSuccess"
        }else if(!data.cancelado && !data.realizado && moment() > moment(data.dataAgenda,'YYYY/MM/DD HH:mm:ss')){
          return "trDanger"
        } else {
          return ""
        }
      }

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
  padding-top: 10px;
  padding-bottom: 10px;
}

.btnActions{
  margin: 0px;
  padding: 0px;
}

.trSuccess{
  background: rgb(205, 233, 206, 0.5);
}

.trWarning{
  background: rgb(255, 249, 200, 0.5);
}

.trDanger{
  background: rgb(252, 202, 199, 0.5);
}

.btnSuccess{
  background: #b4e8b6 !important;
  border: none;
}

.btnWarning{
  background: #fef293 !important;
  border: none;
}

.btnDanger{
  background: #faaba7 !important;
  border: none;
}
</style>
