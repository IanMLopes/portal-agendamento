<template>
  <div>
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

    <!-------------------------------------------------------------- Card Profissionais ---------------------------------------->
    <md-card md-with-hover v-for=" ( professional, i ) in professionals" :key="i" md-theme="purple-card"   style="margin-top:40px; display:block; cursor:auto;">
      <div id="cardC1" v-if="(professional.idPergunta === 'C1' || professional.idPergunta === 'k1') && showRecepcao">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'" class="md-title">{{ professional.dsPergunta.split(':')[0]+':'}}</div>
                <div v-else class="md-title">{{professional.dsPergunta.length > 30 ? professional.dsPergunta.substring(0,29) : professional.dsPergunta}}</div>
                <div class="md-subhead" v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'"><b>Recepicionista: </b>{{professional.dsPergunta.split(':')[1]}}</div>
                <div class="md-subhead"><b>Setor: </b>{{professional.dsSetor}}</div>
                <b-form-rating 
                variant="warning"
                v-model="ratingRecepcao"
                show-value
                > 
                </b-form-rating>
            </md-card-header-text>

            <md-card-media>
              <img src="../../../static/media/recep.png">
            </md-card-media>
          </md-card-header> 
        <div class="p-3">
          <label>Como foi seu Atendimento? (Opcional)</label>
           <b-form-textarea
            :maxlength="max"
            style="overflow-y: hidden;"
            class="border"
            v-model="obsRecepcao"
            placeholder="Deixe seu comentário aqui..."
             rows="3"
             max-rows="6"
          ></b-form-textarea>
          <div class="d-flex justify-content-end">
             <b-button @click="cadastrarAvaliacao(professional, ratingRecepcao, obsRecepcao)" class="mt-2" variant="success" size="sm">Avaliar</b-button>
          </div>
        </div>
        </md-ripple>
      </div>

        <!-- -----------Card Medico A1--------- -->


        <div id="cardA1"  v-if="professional.idPergunta === 'A1' && showMedico">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'" class="md-title">{{ professional.dsPergunta.split(':')[0]+':'}}</div>
                <div v-else class="md-title">{{professional.dsPergunta.length > 30 ? professional.dsPergunta.substring(0,29) : professional.dsPergunta}}</div>
                <div class="md-subhead" v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'"><b>Recepicionista: </b>{{professional.dsPergunta.split(':')[1]}}</div>
                <div class="md-subhead"><b>Setor: </b>{{professional.dsSetor}}</div>
                <b-form-rating 
                variant="warning"
                v-model="ratingMedico"
                show-value
                >
                </b-form-rating>
            </md-card-header-text>

            <md-card-media>
              <img src="../../../static/media/medico.png">
            </md-card-media>
          </md-card-header> 
        <div class="p-3">
          <b-form-textarea
            id="textarea"
            :maxlength="max"
            style="overflow-y: hidden;"
            class="border"
            v-model="obsMedico"
            placeholder="Deixe seu comentário aqui..."
             rows="3"
             max-rows="6"
          ></b-form-textarea>
          <div class="d-flex justify-content-end">
             <b-button  @click="cadastrarAvaliacao(professional, ratingMedico, obsMedico)" class="mt-2" variant="success" size="sm">Avaliar</b-button>
          </div>
        </div>
        </md-ripple>
      </div>

        <!-- --------------------------Card B1 Enfermeiro------------------------- -->

         <div id="cardB1" v-if="professional.idPergunta === 'B1' && showEnfermagem">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'" class="md-title">{{ professional.dsPergunta.split(':')[0]+':'}}</div>
                <div v-else class="md-title">{{professional.dsPergunta.length > 30 ? professional.dsPergunta.substring(0,29) : professional.dsPergunta}}</div>
                <div class="md-subhead" v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'"><b>Recepicionista: </b>{{professional.dsPergunta.split(':')[1]}}</div>
                <div class="md-subhead"><b>Setor: </b>{{professional.dsSetor}}</div>
                <b-form-rating 
                variant="warning"
                v-model="ratingEnfermagem"
                show-value
                >
                </b-form-rating>
            </md-card-header-text>

            <md-card-media>
              <img src="../../../static/media/medico.png">
            </md-card-media>
          </md-card-header> 
        <div class="p-3">
          <label>Como foi seu Atendimento? (Opcional)</label>
          <b-form-textarea
            id="textarea"
            :maxlength="max"
            style="overflow-y: hidden;"
            class="border"
            v-model="obsEnfermagem"
            placeholder="Deixe seu comentário aqui..."
             rows="3"
             max-rows="6"
          ></b-form-textarea>
          <div class="d-flex justify-content-end">
             <b-button @click="cadastrarAvaliacao(professional, ratingEnfermagem, obsEnfermagem)" class="mt-2" variant="success" size="sm">Avaliar</b-button>
          </div>
        </div>
        </md-ripple>
      </div>

        <!-- --------------Card N1 Alimentação---------------------------- -->

         <div id="cardN1" v-if="professional.idPergunta === 'N1' && showAlimentacao">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'" class="md-title">{{ professional.dsPergunta.split(':')[0]+':'}}</div>
                <div v-else class="md-title">{{professional.dsPergunta.length > 30 ? professional.dsPergunta.substring(0,29) : professional.dsPergunta}}</div>
                <div class="md-subhead" v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'"><b>Recepicionista: </b>{{professional.dsPergunta.split(':')[1]}}</div>
                <div class="md-subhead"><b>Setor: </b>{{professional.dsSetor}}</div>
                <b-form-rating 
                variant="warning"
                v-model="ratingAlimentacao"
                show-value
                >
                </b-form-rating>
            </md-card-header-text>

            <md-card-media>
              <img src="../../../static/media/alimentacao.png">
            </md-card-media>
          </md-card-header> 
        <div class="p-3">
          <label>Como foi seu Atendimento? (Opcional)</label>
          <b-form-textarea
            v-model="obsAlimentacao"
            id="textarea"
            :maxlength="max"
            style="overflow-y: hidden;"
            class="border"
            placeholder="Deixe seu comentário aqui..."
             rows="3"
             max-rows="6"
          ></b-form-textarea>
          <div class="d-flex justify-content-end">
             <b-button  @click="cadastrarAvaliacao(professional, ratingAlimentacao, obsAlimentacao)" class="mt-2" variant="success" size="sm">Avaliar</b-button>
          </div>
        </div>
        </md-ripple>
      </div>


        <!-- ---------------Card H1 HIGIENIZAÇÃO----------------------------- -->

        <div id="cardH1" v-if="professional.idPergunta === 'H1' && showHigienizacao">
        <md-ripple >
          <md-card-header   style="background:#FFFFFF !important; box-shadow:none">
            <md-card-header-text>
                <div v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'" class="md-title">{{ professional.dsPergunta.split(':')[0]+':'}}</div>
                <div v-else class="md-title">{{professional.dsPergunta.length > 30 ? professional.dsPergunta.substring(0,29) : professional.dsPergunta}}</div>
                <div class="md-subhead" v-if="professional.idPergunta === 'C1' || professional.idPergunta === 'k1'"><b>Recepicionista: </b>{{professional.dsPergunta.split(':')[1]}}</div>
                <div class="md-subhead"><b>Setor: </b>{{professional.dsSetor}}</div>
                <b-form-rating 
                variant="warning"
                v-model="ratingHigienizacao"
                show-value
                >
                </b-form-rating>
            </md-card-header-text>

            <md-card-media>
              <img src="../../../static/media/limpeza.png">
            </md-card-media>
          </md-card-header> 
        <div class="p-3">
          <label>Como foi seu Atendimento? (Opcional)</label>
          <b-form-textarea
            v-model="obsHigienizacao"
            id="textarea"
            :maxlength="max"
            style="overflow-y: hidden;"
            class="border"
            placeholder="Deixe seu comentário aqui..."
             rows="3"
             max-rows="6"
          ></b-form-textarea>
          <div class="d-flex justify-content-end">
             <b-button  @click="cadastrarAvaliacao(professional, ratingHigienizacao, obsHigienizacao)" class="mt-2" variant="success" size="sm">Avaliar</b-button>
          </div>
        </div>
        </md-ripple>    
      </div>
    </md-card>
  </div> 
</template>
<script>


import { bus } from '../../main'
import { loader } from '../../globalVaribles'
import jwt from 'jsonwebtoken'
import Loading from "vue-loading-overlay";


/* eslint-disable */

  export default {
    name: "cardsProfessionalsAvaliacao",
    props: ['professionals'],
    components: {
      Loading
        },
    data() {
      return {
        max:250,
        showMedico:true,
        showEnfermagem:true,
        showHigienizacao:true,
        showRecepcao:true,
        showAlimentacao:true,
        obsMedico:'',
        obsEnfermagem:'',
        obsHigienizacao:'',
        obsRecepcao:'',
        obsAlimentacao:'',
        ratingMedico:3,
        ratingEnfermagem:3,
        ratingHigienizacao:3,
        ratingRecepcao:3,
        ratingAlimentacao:3,
        typeLoader: loader,
        isLoading: false,
        showModal: false,
        valorAvaliacao: 3, //padrao 3
        dsObservacao: "",
        profissionalSelecionado: null,
        token: "" 
      }
    },
    
    emits: ['atualizarAvaliacoes']
    ,
    watch: {},
    created() {

      let that = this
      
      jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {  
        that.token = decoded.chave
      });
    },
    methods: {
      // Enviar dados da avaliação
      cadastrarAvaliacao(professional, valorAvalicao, observacao){
        this.dsObservacao = observacao
        this.profissionalSelecionado = professional
        this.valorAvaliacao = valorAvalicao
        this.isLoading = true
        

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb',*/ this.token,
          'identificador-dispositivo': 'request-android'
        }

        let json = {

            idAtendimento:  this.profissionalSelecionado.idAtendimento,
            idPergunta: this.profissionalSelecionado.idPergunta,
            dsDescricao: this.valorAvaliacao+".0", //no banco é salvo dessa forma
            idEvolucao: this.profissionalSelecionado.idEvolucao,
            dsObservacao: this.dsObservacao     
        }

        
        this.axios.post('/Internacao/CadastrarResposta', json, { headers: headers })
          .then((response) => {
              this.isLoading = false
              if(response.data.codigo == 404){
                  this.criarAviso("Erro", response.data.mensagem, 2)
                  this.limparSessao()
              }else{
                  if(response.data.sucesso == true){
                    bus.$emit('atualizarAvaliacoes', true)
                    this.ocultarCards(this.profissionalSelecionado.idPergunta)
                    this.criarAviso("Sucesso", response.data.mensagem, 1)
                  }else{
                      this.showListaAvaliacao = false
                      this.avaliacoes = []
                      this.criarAviso("Erro", response.data.mensagem, 2)
                  }                    
              }  
          })
          .catch((error) => {
            console.log("erro ao cadastrar avaliacao", error)
            this.isLoading = false
            this.criarAviso("Erro", "Não foi possível realizar operação", 2)
          })
      },

      ocultarCards(idPergunta){
        if(idPergunta == 'C1' || idPergunta == 'K1'){
          this.showRecepcao = false
          return 
        }
        if(idPergunta == 'A1'){
          this.showMedico = false
          return  
        }
        if(idPergunta == 'B1'){
          this.showEnfermagem = false
          return  
        }
        if(idPergunta == 'N1'){
          this.showAlimentacao = false
          return  
        }
        if(idPergunta == 'H1'){
          this.showHigienizacao = false
          return  
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
       limparSessao(){
        this.$session.destroy()     
        this.$router.push('/login') 
      }
    },
    beforeDestroy() {
    }      
}
</script>
<style scoped>
.txt-pesquisar{
  color: rgb(50, 169, 118);
}

.form-control{
  background-image: none !important;
}
</style>


