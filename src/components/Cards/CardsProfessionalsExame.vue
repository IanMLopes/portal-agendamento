<template>
  <div>
    <md-card md-with-hover v-for=" ( professional, i ) in professionals" :key="i" md-theme="purple-card"   style="margin-top:40px; display:block;">
      <div @click="selecionarProfessional(professional)">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
              <div class="md-title">{{professional.nome.length > 30 ? professional.nome.substring(0,29) : professional.nome}}</div>
              <div class="md-subhead"><b>{{professional.ie_sigla_conselho}}: </b>{{professional.nr_conselho}}</div>
              <div class="md-subhead"><b>Especialidade: </b>{{propSpecialty.descricao}}</div>
              <div class="md-subhead"><b>Disponivel a partir de: </b>{{professional.dataAgenda}}</div>
              <div v-if="professional.tipoAgenda == 'Agenda Especial'" class="md-subhead"><b>Tipo de Agenda:</b> ESPECIAL</div>
              <div class="md-subhead"><b>Unidade:</b> {{professional.unidade.descricao}}</div>
              <div class="md-subhead"><b>Endereço:</b> {{professional.unidade.logradouro}}, 
                        {{professional.unidade.numeroLogradouro ? (professional.unidade.numeroLogradouro+", ") : ""}} {{professional.unidade.bairro}}</div>
            </md-card-header-text>

            <md-card-media>
              <img v-if="professional.ieSexo == 'F'" src="../../../static/media/doctor_m.svg">
              <img v-if="professional.ieSexo == 'M'" src="../../../static/media/doctor_f.svg"> 
            </md-card-media>
          </md-card-header> 
        </md-ripple>      
      </div>
    </md-card>
  </div> 
   



</template>
<script>


import { bus } from '../../main'
/* eslint-disable */

  export default {
    name: "cardsProfessionalsConsulta",
    props: ['professionals', 'propSpecialty'],
    data() {
      return {

      }
    },
    created() {},
    mounted() {},
    watch: {},
    methods: {
      selecionarProfessional(professional){
          console.log(professional)
          bus.$emit('profissionalSelecionado', professional)
      }      
    }
  }
</script>
<style scoped>
.txt-pesquisar{
  color: rgb(50, 169, 118);
}
</style>


