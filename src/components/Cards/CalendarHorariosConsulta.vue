<template>
  <div v-if="horarios.length > 0">
    <p class="lead" v-if="horarios.length > 0">
      <b>Agenda do Profissional:</b> {{ profissional.nome }} <br />
      <b>Especialidade:</b> {{ especialidade.descricao }}
    </p>
    <b-row class="d-flex justify-content-center">
    <div class="d-flex w-100 justify-content-center">
      <p class="txt-dark" style="font-size:18px;">{{horarioSelecionado.length > 0 ? 'Selecione um horário': 'Selecione a data'}}</p>
    </div>
    <div class="w-100 m-0 p-0 justify-content-start">
      <p class="txt-dark" style="font-size:12px;"><img src="../../assets/img/square-solid.svg" style="width:12px;"> Dias disponíveis com horários normais</p>
      <p class="txt-dark" style="font-size:12px;"><img src="../../assets/img/square-solid-red.svg" style="width:12px;"> Dias disponíveis com horários especiais</p>
    </div>
    <b-col md="auto">
      <b-calendar 
      label-help = ''
      v-model="value" 
      nav-button-variant="success" 
      :initial-date="horarios[0].data.replaceAll('/', '-').split(' ')[0]" 
      selected-variant='success'  
      @context="onContext" locale="pt-BR" 
      :date-disabled-fn="dateDisabled"
      hide-header
      ></b-calendar>
    </b-col>
    <b-col class="col-sm-100 mt-4" v-if="horarioSelecionado.length > 0">
      <b-container class="d-flex">
          <div class="row p-0">
            <div v-for="horario in horarioSelecionado"
            @click="selecionarHorario(horario)"
             :key="horario.data2"
             class="col-12 col-sm-12 card-horario d-flex"
             ><span 
             class="p-3 text-light border span-hover">
             <b> {{horario.data2.split(' ')[1]}}</b>
             </span>
             <span 
             class="border p-1"
              style="border-radius:0px 6px 6px 0px; border-left: hidden !important; margin:0 !important;">
              <p style="font-size:12px;"><b>Unidade:</b> {{horario.unidade.nome}}</p>
              <p v-if="horario.horaEspecial === 'S'" style="color:#FD7E14; margin-top:-16%; margin-bottom: -4%; padding:0; font-size:10px;"><b>Horário especial</b></p>
              </span>
            </div>

          </div>
      </b-container>
    </b-col>
  </b-row>
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
  </div>
</template>

<script>


import { bus } from "../../main";

import Loading from "vue-loading-overlay";

import { loader } from '../../globalVaribles'

import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "cardsHorarios",
  props: ["horarios", "profissional", "especialidade"],
  data: () => ({
    typeLoader: loader,
    isLoading: false,
    horarioSelecionado:'',
    value: '',
    context: null,
    perPage: 4,
    currentPage: 1,
    selectMode: 'single',
    dataMin: '',
    dataMax:'',
    count: 0,
    selected: [],
    arrayDeDatas: [],
    dataEspecial:[],
    statusLoader: false
  }),
  components: {
    Loading
  },

  mounted(){

    this.$el.querySelector("button:nth-child(2)").addEventListener('click', ()=>{ // Carregar função destarcar campo nos botões Next e Prev do Calendário
      this.destatacarDatasDisponiveis()
    })
    this.$el.querySelector("button:nth-child(4)").addEventListener('click', ()=>{ // Carregar função destarcar campo nos botões Next e Prev do Calendário
      this.destatacarDatasDisponiveis()
    })
    this.$el.querySelector("button:nth-child(1)").style.display = 'none' // Ocultar botões do calendário
    this.$el.querySelector("button:nth-child(5)").style.display = 'none'
    this.$el.querySelector("button:nth-child(3)").style.display = 'none'

    this.horarios.forEach((data)=>{
        this.arrayDeDatas.push(data.data.replaceAll('/', '-').split(' ')[0])
      })
  },
  methods: {
    destatacarDatasDisponiveis(data){ // destacar datas N = Data normal e S = Dasta special
      this.$el.querySelectorAll("div.b-calendar-grid-body > div > div > span.font-weight-bold").forEach((el)=>{
                 el.parentNode.style.backgroundColor = '#7FFFD4'
            })
            
      let existe = this.verificarSeDataEstaNaLista(data)
      if(existe.length > 0){
        existe.forEach((h)=>{
          if (h.horaEspecial=== 'S'){
            this.dataEspecial.push(h)
          } 
        })
      }

      if(this.dataEspecial.length > 0){
        this.dataEspecial.forEach((h)=>{
          this.$el.querySelectorAll("div.b-calendar-grid-body > div > div > span.font-weight-bold").forEach((el)=>{
              if(el.parentNode.dataset.date === h.data.replaceAll('/', '-').split(' ')[0]){
                el.parentNode.style.backgroundColor = '#FD7E14'
              } else {
                 el.parentNode.style.backgroundColor = '#7FFFD4'
              }
          }) 
        })
      }
    },

    verificarSeDataEstaNaLista(data){
        this.statusLoader = true
        let status = false
        let horarios = []
        this.horarios.forEach((dat)=>{
          let datConsulta = dat.data.replaceAll('/', '-').split(' ')[0]
            if(data === datConsulta){
              horarios.push(dat)
              status = true
            } else {
              if(!status){
                horarios = []
              }
            }
        })
        return horarios
        
    },



    dataExisteEmHorarios(ymdDate){ //verifica se a data está disponivel e retorna para pra funcão dateDisable  true = desabilitar data  ----  false = habilitar data
      let condicao = ''
      let status = true

       this.arrayDeDatas.forEach((data)=>{
        if(ymdDate === data){
          condicao = false
          status = false
          this.destatacarDatasDisponiveis(data)
          
        } else {
          if(status){
            condicao = true
          }
        } 
      })
      return condicao
    },

    dateDisabled(ymd, date) { //Disabilita e habilita datas no calendario
      return this.dataExisteEmHorarios(ymd)

    },

    onContext(ctx){
      // if(this.statusLoader){
      //   this.isLoading = true
      // }
      this.horarioSelecionado = this.verificarSeDataEstaNaLista(this.value)
      // this.isLoading = false
    },


     selecionarHorario(horario) {
       this.$fire({
        title: "Deseja agendar a consulta?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: 'Agendar',
        cancelButtonText: 'Cancelar'
      }).then((result)=>{
         if (result.value) {
          bus.$emit("horarioSelecionado", horario);
        }
      });
    },
    formatDate(date) {
      date = new Date(date);
      return (
        this.countCaracter(date.getDate()) +
        "/" +
        this.countCaracter(date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        this.countCaracter(date.getHours()) +
        ":" +
        this.countCaracter(date.getMinutes())
      );
    },
    countCaracter(param) {
      let word = "";
      word = param + "";
      return word.length > 1 ? word : "0" + word;
    }
  },
  computed: {
      rows() {
        return this.horarios.length
      }
    }
};
</script>

<style scoped>
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
    background-color: #30a070 !important;
}

.card-horario{
  border-radius:8px;
  cursor:pointer;
  max-width:200px;
  margin: 0 1% 1% 0;
  padding: 0;
  /* background-color:#30A372; */
}





.span-hover{
  font-size:15px; 
  border-radius:6px 0px 0px 6px;
  height:100%; 
  background:#7F75B6;
}

.span-hover:hover{
  background-color: #283B96;
}
</style>
