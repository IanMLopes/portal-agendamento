<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
          {{ $route.name }}
        </h4>
        <p class="category" v-if="tipoLaudo == 0">Selecione o tipo de laudo</p>
        <p class="category" v-if="tipoLaudo == 1">
          Você Escolheu: LAUDO DE EXAMES LABORATORIAIS
        </p>
        <p class="category" v-if="tipoLaudo == 2">
          Você Escolheu: LAUDO DE EXAMES CDI
        </p>
      </md-card-header>
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

      <md-card-actions  style="border-top:none; m-0" md-alignment="space-between">
        <b-button
        @click="btnVoltar" 
        variant="outline-success"
        style="border:none"
          ><i :class="!showBtnVoltar? '' : 'fas fa-arrow-left'"></i> {{!showBtnVoltar ? 'Início' : 'Voltar'}}
        </b-button>
    </md-card-actions>

      <!-------------------------------------- Seleção dos cards --------------------------------------------------------->
      <div
        class="md-layout"
        style="display: flex; justify-content: center;"
        v-if="showTipoLaudo == true"
      >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoExame(1)"
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
                    src="../assets/img/incons-card/vials-solid.svg"
                    style="width: 60px; height: 60px;"
                  />
                </div>
                <div style="text-align: center;">
                  <strong>Laudo de Exames</strong>
                </div>
                <div style="text-align: center;">
                  <strong>Laboratoriais</strong>
                </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>

        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoExame(2)"
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
                    src="../assets/img/incons-card/x-ray-solid.svg"
                    style="width: 60px; height: 60px;"
                  />
                </div>
                <div style="text-align: center;">
                  <strong>Laudo de Exames</strong>
                </div>
                <div style="text-align: center;">
                  <strong>CDI</strong>
                </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
      </div>
      <!-- ------------------------------------------------------------------------------------------- -->

      <!--------Mudar tipo de exame------>

      <div class="row p-4 mb-4" v-if="showlaudo" style="display:none;">
        <!-- <div class="mb-4">
          <b-button
            type="button"
            variant="outline-success"
            style="border:none"
            @click="
              showlaudo = false;
              showNomeLaudo = true;
              showTipoSelecionado = true;
            "
          ><i class="fas fa-arrow-left"></i> Voltar
          </b-button>
          <b-button
            type="button"
            class="btn btn-outline-secondary"
            @click="imprimirDocumento()"
            variant="outline-success"
            style="border:none"
          ><i class="fas fa-print"></i>
            Imprimir
          </b-button>
        </div> -->

        <div id="printMe">
          <!-- CABEÇALHO INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px;"
          >
            <div
              style="border: solid 1px #93b8a6; width: 150px; display: flex; justify-content: center;"
            >
              <img src="../assets/img/logo_plano.png" width="100" />
            </div>
            <div
              style="border: solid 1px #93b8a6; width: 850px; display: flex; flex-direction: column;"
            >
              <h5 style="margin: 20px 0px 0px 0px; text-align: center;">
                <strong
                  >SAMEL SERVICOS DE ASSISTENCIA MEDICO HOSPITALAR LTDA</strong
                >
              </h5>
              <p style="margin: 0px; display: flex; justify-content: center;">
                <small
                  >Rua Joaquim Nabuco, 1755 - Manaus - AM - CEP 69020030 - Fone:
                  21292200</small
                >
              </p>
              <p style="margin: 0px; display: flex; justify-content: center;">
                <small>CRF-RS 5-11649 CNPJ: 04159778000107 INSCRI. MUN.:</small>
              </p>
            </div>
          </div>
          <!-- CABAÇALHO FIM -->

          <!-- EXAMES / ATENDIEMENTO INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px;"
          >
            <div style="width: 500px; border: solid 1px #93b8a6">
              <p style="text-align: center"><strong>EXAMES</strong></p>
            </div>
            <div style="width: 500px; border: solid 1px #93b8a6">
              <p style="text-align: center">
                <strong>ATENDIMENTO: </strong
                ><strong>{{ exameSelecionado.nrAtendimento }}</strong>
              </p>
            </div>
          </div>
          <!-- EXAMES / ATENDIEMENTO FIM -->

          <!---->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px;"
          >
            <div
              style="width: 1000px; border: solid 1px #93b8a6; padding-left: 10px;"
            >
              <p style="margin: 5px 2px 2px 2px; text-align: center;">
                <strong>Médico(a) Solicitante:</strong> {{ medicoSolic }}
              </p>
            </div>
          </div>
          <!---->

          <!-- CORPO INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px; border: solid 1px #93b8a6; min-height: 875px;"
          >
            <div
              class="col-12"
              v-html="resultadoLaudo"
              style="width: 1000px; margin: 10px;"
            ></div>
          </div>
          <!-- CORPO FIM -->

          <!-- RODAPÉ INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px;"
          >
            <div
              style="width: 500px; border: solid 1px #93b8a6; padding-left: 10px;"
            >
              <p style="margin: 5px 0px 0px 0px;">
                <strong>Paciente:</strong> {{ exameSelecionado.nomeCliente }}
              </p>
              <p style="margin: 0px 0px 5px 0px;">
                <strong>Data Nasc:</strong>
                {{ exameSelecionado.dataNascimento }}
              </p>
            </div>
            <div
              style="width: 500px; border: solid 1px #93b8a6; padding-left: 10px;"
            >
              <p style="margin: 5px 0px 0px 0px;">
                <strong>Convênio:</strong> {{ exameSelecionado.dsConvenio }}
              </p>
              <p style="margin: 0px 0px 5px 0px;">
                <strong>Setor:</strong> {{ exameSelecionado.dsSetor }}
              </p>
            </div>
          </div>
          <!-- RODAPÉ FIM -->

          <!-- RODAPÉ 2 INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 750px; margin-bottom: 10px;"
          >
            <div
              style="width: 700px; border: solid 1px #93b8a6; padding-left: 10px;"
            >
              <p
                style="margin: 5px 0px 0px 0px; text-align: center;"
                v-if="tipoLaudo == 1"
              >
                <strong>Bioquímico(a):</strong> {{ medicoLaudo }}
              </p>
              <p
                style="margin: 5px 0px 0px 0px; text-align: center;"
                v-if="tipoLaudo == 2"
              >
                <strong>Médico(a):</strong> {{ medicoLaudo }}
              </p>
              <p style="margin: 0px 0px 5px 0px; text-align: center;">
                <strong>Data de Entrada:</strong>
                {{ exameSelecionado.dataEntrada }}
              </p>
            </div>
            <div
              style="width: 300px; border: solid 1px #93b8a6; padding-left: 10px;"
            >
              <p style="margin: 5px 0px 0px 0px;">
                <strong>Assinatura:</strong>
              </p>
              <p
                style="margin: 0px 0px 5px 0px; text-align: center;"
                v-html="assinatura"
              ></p>
            </div>
          </div>
          <!-- RODAPÉ 2 FIM -->
          <div style="display: flex; justify-content: center; width:750px;">
            <FooterExame></FooterExame>
          </div>
        </div>
      </div>

      <!-------Mudar tipo de exame-------->
      
      <div class="p-4" v-if="showNomeMedico">
        <h4 class="card-title" v-if="showNomeMedico && datas.length > 0">Selecione a data em que foi feito o exame: </h4>
        <cards-resultado-exames v-if="showNomeMedico && datas.length > 0" :datas="datas">
        </cards-resultado-exames>
        <div class="text-center" v-if="datas.length == 0">
            <p class="lead"><b>Ainda não existem dados </b></p>
        </div>
      </div>
      <!-------Nome do exame-------->
      <div class="p-4" v-if="showNomeLaudo">
       <tables-exames :datas="datas1" :tipoLaudo="tipoLaudo">
       </tables-exames>
       <div class="text-center" v-if="datas1.length == 0">
          <p class="lead"><b>Ainda não existem dados </b></p>
        </div> 
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import FooterExame from "../pages/Layout/FooterExame";

import moment from "moment";

// Import component
import Loading from "vue-loading-overlay";
import { loader } from "../globalVaribles";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import { bus } from '../main'

import jwt from "jsonwebtoken";
import CardsResultadoExames from '../components/Tables/TablesResultadoExames.vue';
import TablesExames from './Tables/TablesExames.vue';


export default {
  name: "AgendarExameLaudos",
  data() {
    return {
      datas: [],
      showBtnVoltar: false,
      typeLoader: loader,
      dataBackgroundColor: "green",
      datas1: [],
      datasCorpo: [],
      dataLaudo: [],
      idCliente: "",
      nrAtendimento: "",
      assinatura: "",
      isLoading: false,
      showlaudo: false,
      showNomeLaudo: false,
      exameSelecionado: "",
      showNomeMedico: false,
      showTipoSelecionado: false,
      showTipoLaudo: true,
      tipoLaudo: 0, //0 nenhum, 1-laudo exame lab, 2- laudo exa cdi
      resultadoLaudo: "",
      medicoLaudo: "",
      medicoSolic: "",
      tipo: "",
      token: "",
    };
  },
  components: {
    Loading,
    FooterExame,
    CardsResultadoExames,
    TablesExames
  },

  mounted() {
     bus.$on("dataSelecionada", (result) => {
    if(result){
      this.visualizarNomeExame(result)
      }
    });

    bus.$on("documentoSelecionado", (result) => {
      this.showlaudo = true
      this.visualizarExame(result[0], result[1])
      if(result[1] == 0){
        this.mostrarDocumento()
        this.showBtnVoltar = false
        return
        }
        this.imprimirDocumento()
        this.showBtnVoltar = true
    });

    let that = this;

    jwt.verify(this.$session.get("user"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.token = decoded.chave;
    });

    jwt.verify(this.$session.get("listToSchedule"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.pacientes = decoded.listAllPacient;
    });
  },
  methods: {
    imprimirDocumento(){
      this.isLoading = true;
      this.showlaudo = true
      setTimeout(()=>{
        let conteudo = this.$el.querySelector('#printMe').innerHTML
        if(!conteudo){
          this.showlaudo = true
          conteudo = this.$el.querySelector('#printMe').innerHTML
        }
        let tela_impressao = window.open('about:blank', "janela1","width=800, height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no")
        tela_impressao.document.write(conteudo);
        tela_impressao.window.print();
        tela_impressao.window.close();
      }, 500)
      setTimeout(()=>{
        this.showlaudo = false;
        this.showNomeLaudo = true;
        this.showTipoSelecionado = true;
        this.showBtnVoltar = true
        this.isLoading = false;
      },1000)
    },

    mostrarDocumento(){
      this.isLoading = true;
      setTimeout(()=>{
        let conteudo = ''
        conteudo = this.$el.querySelector('#printMe').innerHTML
        let tela_impressao = window.open('about:blank');
        tela_impressao.document.write(conteudo);
        this.showlaudo = false;
        this.showNomeLaudo = true;
        this.showTipoSelecionado = true;
        this.showBtnVoltar = true
        this.isLoading = false;
      }, 500)
      
    },

    obterExamesLaudoLab() {
      this.datas = [];
      this.isLoading = true;
      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      //passa um array com os ids dos pacientes para listarem todos
      let ids = [];
      //this.pacientes = JSON.parse(this.$cookie.get('listToSchedule'))
      this.pacientes.map((item, index) =>
        ids.push(Number(item.cdPessoaFisica))
      );

      let json = {
        idCliente: ids,
      };

      this.axios
        .post("/Agenda/Procedimento/ObterExamesLaudoLabMaster", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else {
            this.datas = response.data.dados;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    ObterExamesLaudoLabDetalhe(idCliente, nrAtendimento) {
      this.datas1 = [];
      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let json = {
        idCliente: idCliente,
        idAtendimento: nrAtendimento,
      };

      this.axios
        .post("/Agenda/Procedimento/ObterExamesLaudoLabDetalhe", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.datas1 = response.data.dados.map((result) => {
            if (result.dtLaudo) {
              let a = new moment(result.dtLaudo);
              result.dtLaudo = a.format("DD/MM/YYYY");
            }
            return result;
          });

          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    obterExamesLaudoCdi() {
      this.datas = [];

      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      //passa um array com os ids dos pacientes para listarem todos
      let ids = [];
      //this.pacientes = JSON.parse(this.$cookie.get('listToSchedule'))
      this.pacientes.map((item, index) =>
        ids.push(Number(item.cdPessoaFisica))
      );

      let json = {
        idCliente: ids,
      };

      this.axios
        .post("/Agenda/Procedimento/ObterExamesLaudoCdiMaster", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else {
            this.datas = response.data.dados;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    ObterExamesLaudoCdiDetalhe(idCliente, nrAtendimento) {
      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let json = {
        idCliente: idCliente,
        idAtendimento: nrAtendimento,
      };

      this.axios
        .post("/Agenda/Procedimento/ObterExamesLaudoCdiDetalhe", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.datas1 = response.data.dados;

          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    visualizarNomeExame(exame) {
      this.showNomeLaudo = true;
      this.showlaudo = false;
      this.exameSelecionado = exame;
      this.showTipoLaudo = false;
      this.showTipoSelecionado = true;
      this.showNomeMedico = false;
      this.showBtnVoltar = true

      //this.loadFile(exame.dsResultado)
      this.resultadoLaudo = exame.dsResultado;

      this.idCliente = exame.idCliente;
      this.nrAtendimento = exame.nrAtendimento;

      if (this.tipoLaudo == 1) {
        this.ObterExamesLaudoLabDetalhe(exame.idCliente, exame.nrAtendimento);
      } else {
        this.ObterExamesLaudoCdiDetalhe(exame.idCliente, exame.nrAtendimento);
      }
    },

    visualizarExame(exame, action) {
      //action 0 - Visualizar       action 1 - Imprimir
      if(action == 0){
        this.showlaudo = true
      }else {
        this.showlaudo = false
      }
      this.showNomeLaudo = false;
      this.exameSelecionado = exame;
      this.showTipoLaudo = false;
      this.showTipoSelecionado = false;
      this.showNomeMedico = false;
      this.showBtnVoltar = true
      this.resultadoLaudo = exame.dsResultado;

      this.idCliente = exame.idCliente;
      this.nrAtendimento = exame.nrAtendimento;

      if (this.tipoLaudo == 1) {
        this.resultadoLaudo = exame.dsResultado;
        this.assinatura = exame.dsAssinatura;
        this.medicoLaudo = exame.medicoLaudo;
        this.medicoSolic = exame.nm_medico_solic;
      } else {
        this.resultadoLaudo = exame.dsResultado;
        this.assinatura = exame.dsAssinatura;
        this.medicoLaudo = exame.medicoLaudo;
        this.medicoSolic = exame.nomeProfissional;
      }
    },

    stringToArrayBuffer(string) {
      var buffer = new ArrayBuffer(string.length);
      var bufferView = new Uint8Array(buffer);
      for (var i = 0; i < string.length; i++) {
        bufferView[i] = string.charCodeAt(i);
      }
      return buffer;
    },
    loadFile(rtf) {

      document.getElementById("resultadoLaudo").append(rtf);
      /*let that = this

        const doc = new RTFJS.Document(this.stringToArrayBuffer(rtf))
        const meta = doc.metadata()

        doc.render().then(function(htmlElements) {

          //titulo o texto
          document.getElementById('resultadoLaudo').innerHTML = `<b>${htmlElements[0].innerText}</b>`
          //remove a primeira div que é do titulo
          htmlElements.splice(0,1)
          //adiciona as demais
          for(let item of htmlElements){
            document.getElementById('resultadoLaudo').append(item)
          }


        }).catch(error => {
          console.error(error) })*/
    },
    selecionarTipoExame(tipo) {
      this.tipoLaudo = tipo;
      this.showTipoLaudo = false;
      this.showNomeLaudo = false;
      this.showNomeMedico = true;

      this.showTipoSelecionado = true;
      this.showBtnVoltar = true

      switch (tipo) {
        case 1:
          this.obterExamesLaudoLab();
          break;

        case 2:
          this.obterExamesLaudoCdi();
          break;

        default:
          break;
      }
    },
    criarAviso(title, msg, tipo) {
      let type = "";

      switch (tipo) {
        case 1:
          type = "success";
          break;
        case 2:
          type = "warning";
          break;
      }

      this.$alert(msg, title, type).then(() => console.log("Closed"));
    },

    btnVoltar(){
      if(this.showTipoLaudo == false && this.showNomeLaudo == false && this.showNomeMedico == true && this.showTipoSelecionado == true){
        this.showTipoLaudo = true 
        this.showNomeLaudo = false 
        this.showNomeMedico = false 
        this.showTipoSelecionado = false
        this.showBtnVoltar = false
        return
      }

      if(this.showNomeLaudo == true && this.showlaudo == false && this.showTipoLaudo == false && this.showTipoSelecionado == true && this.showNomeMedico == false){
        this.showTipoLaudo = false  
        this.showNomeLaudo = false  
        this.showNomeMedico = true 
        this.showTipoSelecionado = true
        return
      }

      if(this.showNomeLaudo == true && this.showlaudo == false && this.showTipoLaudo == false && this.showTipoSelecionado == true && this.showNomeMedico == false){
        this.showNomeLaudo = true;
        this.showlaudo = false;
        this.showTipoLaudo = false;
        this.showTipoSelecionado = true;
        this.showNomeMedico = false;
        return
      }

      if(!this.showBtnVoltar){
        this.$router.push('/inicio')
        return
      }
      
    },

    limparSessao() {
      this.$session.destroy();
      this.$router.push("/login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.linha:hover {
  cursor: pointer;
  color: rgb(255, 255, 255);
  background: rgb(92, 198, 186);
}

.linha:active {
  cursor: pointer;
  color: rgb(255, 255, 255);
  background: rgb(80, 173, 162);
  -webkit-box-shadow: 0px 0px 5px 3px rgba(80, 173, 162, 0.8);
  -moz-box-shadow: 0px 0px 5px 3px rgba(80, 173, 162, 0.8);
  box-shadow: 0px 0px 5px 3px rgba(80, 173, 162, 0.8);
}

.bg-bt-visualizar {
  background: rgb(71, 166, 234);
  color: #ffffff;
}

.bg-bt-visualizar:hover {
  background: rgb(47, 115, 163);
}

.centralizar {
  margin: 0 auto;
}

.card-pefil {
  border: 1px solid #ffffff;
  background: #28a745;
  border-radius: 10px;
  height: 170px;
  color: #fff;
}

.selecionado:hover {
  cursor: pointer;
}

.border-samel {
  border-color: #62c078;
}
</style>
