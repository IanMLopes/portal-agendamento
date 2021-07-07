<template>
    <div class='container mb-4 w-100 d-flex justify-content-center'>
        <a><i class="fas fa-tablets" style="font-size:60px; color:black;"></i></a> 

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
    <b-card no-body class="w-100">
        <b-tabs size="sm" content-class="mt-3" fill card justified>
            <!-----------------------------Medicação---------------------------------------------------------------- -->
            <b-tab @click="filtrarPrescricao('Medicamento')" title="Medicação" active>
                <div class="row mt-3" v-if="medicamento.length > 0">
                    <div class="col-md-12 col-lg-12 mb-2" v-for=" ( item, i ) in medicamento" :key="i" style="cursor: pointer;">
                            <div class="card cursor centrar w-100" >
                                <div class="no-body p-2 d-flex w-100">  
                                    <img src="../../../static/media/tablets-solid.svg" alt="remedios" style="width:45px; margin-right:3%; margin-left:3%;">       
                                    <p class="text-left"><b>Material:</b> {{item.dsMaterial}} 
                                    <br/><b>Horário:</b> {{item.dsHorario}} </p>
                                </div>
                            </div>    
                        <br> 
                    </div> 
                </div> 

                <div class="text-center mt-3" v-if="medicamento.length == 0"> <p class="lead"><b>Não existem prescrições para este grupo</b></p> </div>

                <div v-if="medicamento.length > 0" ><p class="color-samel m-0 p-0 mb-2 text-center">Algum problema com esta prescrição? 
                    <button type="button" class="btn btn-outline-success" @click="abrirCadastroFeedback(medicamento[0])">Informe aqui</button>
                    </p> 
                </div>
            </b-tab>

            <!-----------------------------Solução---------------------------------------------------------------- -->
            <b-tab @click="filtrarPrescricao('Solução')" title="Solução">
                <div class="row mt-3" v-if="solucao.length > 0">
                    <div class="col-md-12 col-lg-12 mb-2" v-for=" ( item, i ) in solucao" :key="i" style="cursor: pointer;">
                        <div class="card cursor centrar" >
                            <div class="card-body p-2 d-flex">  
                                <img src="../../../static/media/flask-solid.svg" alt="solucoes" style="width:30px; margin-right:3%; margin-left:3%;">            
                                <p class="text-left"><b>Material:</b> {{item.dsMaterial}} 
                                <br/><b>Horário:</b> {{item.dsHorario}} </p>
                            </div>
                        </div>    
                        <br> 
                    </div> 
                </div> 

                <div class="text-center mt-3" v-if="solucao.length == 0"> <p class="lead"><b>Não existem prescrições para este grupo</b></p> </div>
                <div v-if="solucao.length > 0" ><p class="color-samel m-0 p-0 mb-2 text-center">Algum problema com esta prescrição? 
                <b-button type="button" size="sm" variant="outline-success" style="border:none;" @click="abrirCadastroFeedback(solucao[0])">Informe aqui</b-button>
                    </p> 
                </div>
            </b-tab>

            <!-----------------------------Recomendação--------------------------------------------------------------- -->
            <b-tab @click="filtrarPrescricao('Recomendacoes')" title="Recomendação">
                    <div class="row mt-3" v-if="recomendacao.length > 0">
                        <div class="col-md-12 col-lg-12 mb-2" v-for=" ( item, i ) in recomendacao" :key="i" style="cursor: pointer;">
                                <div class="card cursor centrar" >
                                    <div class="card-body p-2 d-flex">  
                                         <img src="../../../static/media/notes-medical-solid.svg" alt="solucoes" style="width:30px; margin-right:3%; margin-left:3%;">            
                                        <p class="text-left"><b>Material:</b> {{item.dsMaterial}} 
                                        <br/><b>Horário:</b> {{item.dsHorario}} </p>
                                    </div>
                                </div>    
                            <br> 
                        </div> 
                    </div> 

                <div class="text-center mt-3" v-if="recomendacao.length == 0"> <p class="lead"><b>Não existem prescrições para este grupo</b></p> </div>
                <div v-if="recomendacao.length > 0" ><p class="color-samel m-0 p-0 mb-2 text-center">Algum problema com esta prescrição? 
                    <button type="button" class="btn btn-outline-success" @click="abrirCadastroFeedback(recomendacao[0])">Informe aqui</button></p>
                </div>
            </b-tab>
            <!-----------------------------Exame Lab--------------------------------------------------------------- -->
            <b-tab  @click="filtrarPrescricao('Laboratório')" title="Exame Lab">
                <div class="row mt-3" v-if="laboratorio.length > 0">
                    <div class="col-md-12 col-lg-12 mb-2" v-for=" ( item, i ) in laboratorio" :key="i" style="cursor: pointer;">
                            <div class="card cursor centrar" >
                                <div class="card-body p-2 d-flex">  
                                    <img src="../../../static/media/x-ray-solid.svg" alt="exames" style="width:45px; margin-right:3%; margin-left:3%;">           
                                    <p class="text-left"><b>Material:</b> {{item.dsMaterial}} 
                                    <br/><b>Horário:</b> {{item.dsHorario}} </p>
                                </div>
                            </div>    
                        <br> 
                    </div> 
                </div> 

                <div class="text-center mt-3" v-if="laboratorio.length == 0"> <p class="lead"><b>Não existem prescrições para este grupo</b></p> </div>
                <div v-if="laboratorio.length > 0" ><p class="color-samel m-0 p-0 mb-2 text-center">Algum problema com esta prescrição? 
                    <button type="button" class="btn btn-outline-success" @click="abrirCadastroFeedback(laboratorio[0])">Informe aqui</button></p> 
                </div>
            </b-tab>
        </b-tabs>
        <div class="text-center" v-if="prescricoes.length == 0"> <p class="lead"><b>Ainda não existe prescrição para esse horário</b></p> </div>
    </b-card>
    <!-- -------------------------------Modal Feedback --------------------------------------- -->
        <transition v-if="showModalFeedback" name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-container" style="border-radius:10px; padding:0;">

                    <div class="modal-header">
                    <span @click="showModalFeedback = false" class="close" style="margin-top: 48px;"></span>
                    </div>
                    <div class="row justify-content-md-center pb-3 w-100" style="margin-left:1px;">
                        <div class="col-md-12 mt-1 col-lg-10 row justify-content-md-center p-0 m-0">
                            <div class="col-md-12 col-lg-12 text-center">
                                <img src="../../../static/media/megaphone.svg" class="img-fluid rounded float-center" style="width:60px" />
                                <p class="p-0 mt-1">Tem algo que você gostaria de nos contar que tornaria a sua internação melhor?</p>
                                <div>
                                <md-field>
                                    <label>Deixe seu comentário aqui...</label>
                                    <md-textarea 
                                    v-model="cadastroFeedback.dsReclamacao" 
                                    id="valorDsReclamacao"
                                    class="border"
                                    :maxlength="max"
                                    ></md-textarea>
                                    </md-field>
                                </div>
                                <!-- <textarea class="form-control" :class="cadastroReclamacao.erroDsReclamacao ? 'is-invalid' : ''" v-model="cadastroReclamacao.dsReclamacao" id="valorDsReclamacao" rows="3"></textarea> -->
                                    <div v-if="cadastroFeedback.erroDsReclamacao" class="invalid-feedback">
                                    Você precisa preencher este campo
                                    </div>
                                    <div class="w-100 d-flex justify-content-center">
                                    <b-button class="mt-2" variant="success" @click="cadastrarFeedback()">Enviar</b-button>
                                    </div>

                            </div>
                        </div>              
                        </div>             

                    <!-- <div class="row justify-content-md-center pb-3" >

                        <div class="col-md-12 mt-1 col-lg-4 row justify-content-md-center p-0 m-0">
                            <div class="col-md-12 col-lg-12 text-center">
                                <img src="../../../static/media/megaphone.svg" class="img-fluid rounded float-center" style="width:55px" />

                                <p class="p-0 m-0 mt-1">Descreva aqui o problema:</p>

                                <div class="form-group col-md-12 col-lg-12 mt-1">
                                <textarea class="border" :class="cadastroFeedback.erroDsReclamacao ? 'is-invalid' : ''" v-model="cadastroFeedback.dsReclamacao" id="valorDsReclamacao" rows="3"></textarea>
                                    <div v-if="cadastroFeedback.erroDsReclamacao" class="invalid-feedback">
                                    Você precisa preencher este campo
                                    </div>
                                <button type="button" class="btn btn-success btn-block txt-pesquisar mt-2" @click="cadastrarFeedback()">Enviar</button>
                                </div>

                            
                            </div>

                        </div>              
                        
                    </div> -->

                </div>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
    import { bus } from '../../main'
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    import { loader } from '../../globalVaribles'

    import jwt from 'jsonwebtoken'

  export default {
    name: "cardsPrescricoes",
    props: ['prescricoes'],
    data() {
      return {
          medicamento: [],
          solucao:[],
          recomendacao: [],
          laboratorio: [],
          dsAgrupadorSelecionado: "",
          prescricaoSelecionadaFeedback: null,
          typeLoader: loader,
          isLoading: false,
          showModalFeedback: false,
          dsObservacao: "" ,
          cadastroFeedback:{
            dsReclamacao: "", 
            erroDsReclamacao: false
        },
        token:""         
      }
    },
    components: {
      Loading
    },
    created() {
    },
    mounted() {
        let that = this

        jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {  
            that.token = decoded.chave
        });

        //sempre começa filtrando por medicamento
        this.filtrarPrescricao('Medicamento')
    },
    watch: {
        prescricoes(val){
            this.filtrarPrescricao(this.dsAgrupadorSelecionado)
        }
    },
    methods: {
        abrirCadastroFeedback(item){
            this.prescricaoSelecionadaFeedback = item
            this.showModalFeedback = true
        },
        cadastrarFeedback(){
            if(this.validarFeedback()){
                this.isLoading = true

                let headers = {
                    'Content-Type': 'application/json',
                    'chave-autenticacao': /*'98142529-a555-4ecb-9e14-2b5ef862d8eb',*/this.token,
                    'identificador-dispositivo': 'request-android'
                }

                let json = {
                    idAtendimento:  this.prescricaoSelecionadaFeedback.idAtendimento,
                    dsReclamacao:   this.cadastroFeedback.dsReclamacao,  
                    idPrescricao:   this.prescricaoSelecionadaFeedback.idPrescricao,
                    idAgrupador:    this.prescricaoSelecionadaFeedback.idAgrupador,
                    dsAgrupador:    this.prescricaoSelecionadaFeedback.dsAgrupador,
                    dsHorario:      this.prescricaoSelecionadaFeedback.dsHorario,    
                } 
                
                this.axios.post('/Internacao/CadastrarFeedback', json, { headers: headers })
                    .then((response) => {

                        this.isLoading = false

                        if(response.data.codigo == 404){
                            this.criarAviso("Erro", response.data.mensagem, 2)
                            this.limparSessao()
                        }else{
                        
                            if(response.data.sucesso == true){     
                                //fecha o modal de avaliacao
                                this.showModalFeedback = false                   
                                //volta para o valor padrao
                                this.cadastroFeedback.dsReclamacao = ""
                                this.criarAviso("Sucesso", response.data.mensagem, 1)
                            }else{

                                this.criarAviso("Erro", response.data.mensagem, 2)
                            }                    
                        }  
                    })
                    .catch((error) => {
                        console.log("erro ao cadastrar feedback", error)
                        this.isLoading = false
                        this.criarAviso("Erro", "Não foi possível realizar operação", 2)
                    })
            }
        },
        filtrarPrescricao(tipo){

            this.dsAgrupadorSelecionado = tipo

            //zera lista de todos
            this.medicamento= []
            this.solucao=[]
            this.recomendacao= []
            this.laboratorio= []

            let dados = []
            
            for(let item of this.prescricoes){
                if(item.dsAgrupador == tipo){
                    dados.push(item)
                }
            }         

            switch (tipo) {
                case 'Solução':
                    this.solucao = dados
                    break;
                case 'Recomendacoes':
                    this.recomendacao = dados
                    break;
                case 'Laboratório':
                    this.laboratorio = dados
                    break;
                case 'Medicamento':
                    this.medicamento = dados
                    break;
            
                default:
                    break;
            }
        },
        validarFeedback(){
            //zera parametro erro de validacao antes de validar novamente
            this.cadastroFeedback.erroDsReclamacao =false;
            
            let result = true
            if(!this.cadastroFeedback.dsReclamacao || this.cadastroFeedback.dsReclamacao == '' || this.cadastroFeedback.dsReclamacao.trim().length <= 0){
                this.cadastroFeedback.erroDsReclamacao = true; 
                result = false
            }

            return result
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
    }
  }
</script>
<style scoped>

.bg-bt-horario{
  background:  rgb(71, 166, 234);
  color: #ffffff
}

.bg-bt-horario:hover{
  background:  rgb(47, 115, 163);
}

.color-samel{
   color: rgb(50, 169, 118);
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

</style>


