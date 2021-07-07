<template>
  <div>
    <md-card md-with-hover v-for=" ( consulta, i ) in consultas" :key="i" md-theme="purple-card"   style="margin-top:40px; display:block;">
      <div @click="selecionarConsulta(consulta)">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div class="md-title">{{consulta.nomeProfissional.length > 30 ? consulta.nomeProfissional.substring(0,29) : consulta.nomeProfissional}}</div>
                <div class="md-subhead"><b>Especialidade: </b>{{consulta.descricaoEspecialidade}}</div>
                <div class="md-subhead"><b>Horário: </b>{{consulta.dataAgenda}}</div>
                <div v-if="consulta.tipoAgenda == 'Agenda Especial'" class="md-subhead"><b>Tipo de Agenda:</b> ESPECIAL</div>
                <div v-if="consulta.possuiAtendimento == 'S'" class="alert alert-success mt-2" role="alert">
                <strong>Atenção: </strong> Você fez checkin nesta consulta. Clique aqui para iniciar o atendimento
                </div>
                <div v-else class="alert alert-warning mt-2" role="alert">
                    <strong>Atenção: </strong> Para iniciar o atendimento, click aqui para fazer o checkin
                </div>
            </md-card-header-text>
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
    name: "cardsconsultassConsulta",
    props: ['consultas'],
    data() {
      return {

      }
    },
    created() {},
    mounted() {},
    watch: {},
    methods: {
       selecionarConsulta(consulta){

          bus.$emit('consultaSelecionada', consulta)
      }      
    }
  }
</script>
<style scoped>
.txt-pesquisar{
  color: rgb(50, 169, 118);
}
</style>


