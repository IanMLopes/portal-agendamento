<template>
    <md-card-content class="md-layout" id="">
        <div  style="display: flex; justify-content: center;" v-for=" ( pacient, i ) in pacients" :key="i" >
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"  v-on:click="selectPacient(pacient)" >
                <md-card md-with-hover style="border-radius: 8px;">
                    <md-ripple>
                        <md-card-content>
                            <div class="md-card-avatar divCard">
                                <img  v-if="pacient.sexo == 'F'" src="../../../static/media/woman.svg" class="img-fluid  rounded" style="width:70px;margin-bottom:20px" >
                                <img  v-if="pacient.sexo == 'M'" src="../../../static/media/man.svg" class="img-fluid  rounded" style="width:70px;margin-bottom:20px" >
                            </div>                            
                            <div style="text-align: center;">
                                <strong>{{pacient.nome.length > 20 ? ""+pacient.nome.substring(0,20) : pacient.nome}}</strong>
                                <p class="text-center"> {{pacient.tipo}} </p>
                            </div>
                        </md-card-content>
                    </md-ripple>
                </md-card> 
            </div>  
        </div>
    </md-card-content>         
</template>

<script>
import { bus } from '../../main'

  export default {
    name: "cardsPacients",
    props: ['pacients'],
    data() {
      return {
        specialty: '',
        IDinsurance: 0
      }
    },
    created() { 
    },
    mounted() {
      this.pacients.map(result => {
      })
    },
    watch: {
      
    },
    methods: {
      selectPacient(pacient){
        bus.$emit('pacienteSelecionado', pacient)
        return ; 
      }
    },

    emits: ['pacienteSelecionado']
  }
</script>
<style scoped>   
    body{
    font-family: 'Nunito', sans-serif;
    padding: 50px;
    }

    .cursor:hover{
        cursor:pointer;
      
    }

    .divCard {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
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
</style>


