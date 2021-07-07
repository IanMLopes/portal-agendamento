<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
          {{$route.name}}
        </h4>
        <p class="category">
          {{ tipo == 1 ? ' Você escolheu: ATESTADOS' : 
             tipo == 2 ? 'Você Escolheu: RECEITAS' : 
             tipo == 3 ? 'Você Escolheu: SOLICITAÇÃO DE EXAMES LABORATORIAIS' : 
             tipo == 4 ? 'Você Escolheu: SOLICITAÇÃO DE EXAMES DE IMAGENS' : 
             'Por favor, escolha o tipo de arquivo:'}}
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
          ><i :class="!showBtnVoltar ? '' : 'fas fa-arrow-left'"></i> {{!showBtnVoltar ? 'Início' : 'Voltar'}}
        </b-button>
    </md-card-actions>
    <!---------------------------------- Cards do Menu principal --------------------------------------------------->
    <div
        class="md-layout"
        style="display: flex; justify-content: center;"
        v-if="showTipo == true"
        >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
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
                  src="../assets/img/incons-card/file-medical-solid.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Atestados</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>

        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
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
                  src="../assets/img/incons-card/prescription-bottle-alt-solid.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Receitas</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>

         <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
          @click="selecionarTipoExame(3)"
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
                <strong>Pedido de Exames Laboratoriais</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>

        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
          @click="selecionarTipoExame(4)"
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
                <strong>Pedido de Exames CDI</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        
      </div>



      
      <div class="container">
        <!------------------------------------------Mostrar exame------------------------------------------------------------------------------------>
        <div class="row p-4 mb-4" style="display:none;" v-if="showlaudo">
          <div class="mb-4">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="
                showlaudo = false;
                showTipoSelecionado = true;
              "
            >
              Fechar
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="printDiv()"
            >
              Imprimir
            </button>
          </div>

          <div id="printMeExame">
            <!-- CABEÇALHO INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
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
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
            >
              <div style="width: 500px; border: solid 1px #93b8a6">
                <p style="text-align: center" v-if="tipo == 1">
                  <strong>ATESTADO</strong>
                </p>
                <p style="text-align: center" v-if="tipo == 2">
                  <strong>RECEITA</strong>
                </p>
              </div>
              <div style="width: 500px; border: solid 1px #93b8a6">
                <p style="text-align: center">
                  <strong>ATENDIMENTO: </strong
                  ><strong>{{ exameSelecionado.nrAtendimento }}</strong>
                </p>
              </div>
            </div>
            <!-- EXAMES / ATENDIEMENTO FIM -->

            <!-- CORPO INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; border: solid 1px #93b8a6; min-height: 800px; max-width: 800px;"
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
              style="display: flex; flex-direction: row; width: ; margin-bottom: 10px; max-width: 800px;"
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
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
            >
              <div
                style="width: 700px; border: solid 1px #93b8a6; padding-left: 10px;"
              >
                <p style="margin: 5px 0px 0px 0px; text-align: center;">
                  <strong>Médico(a):</strong>
                  {{ exameSelecionado.nomeProfissional }}
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

        

        <!---------------------------------------------- Tabela Com os documentos ------------------------------------------>
        <div class="md-layout-item justify-content-center md-xsmall-size-100 md-size-100" v-if="!showTipo && !showModalSolicitacao">
          <meu-prontuario-listar-docs v-if="datas.length > 0 || datasDetalhe.length > 0" :datas="datas" :tipo="tipo"></meu-prontuario-listar-docs>
          <div class="text-center" v-if="datas.length == 0">
            <p class="lead"><b>Ainda não existem dados</b></p>
          </div>
        </div>
        

        <!--------------------------SOLICITAÇÃO DE EXAMES--------------------------------------->
        <div class="row p-4 mb-4" style="display:none;">
          <div class="mb-4">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="
                showModalSolicitacao = false;
                showTipoSelecionado = true;
              "
            >
              Fechar
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="printDiv()"
            >
              Imprimir
            </button>
          </div>

          <div id="printMeSolicitacao">
            <!-- CABEÇALHO INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
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
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
            >
              <div style="width: 500px; border: solid 1px #93b8a6">
                <p style="text-align: center">
                  <strong>SOLICITAÇÃO DE EXAMES</strong>
                </p>
              </div>
              <div style="width: 500px; border: solid 1px #93b8a6">
                <p style="text-align: center">
                  <strong>ATENDIMENTO: </strong
                  ><strong>{{ solicitacaoSelecionada.nrAtendimento }}</strong>
                </p>
              </div>
            </div>
            <!-- EXAMES / ATENDIEMENTO FIM -->

            <!-- RODAPÉ INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; max-width: 800px;"
            >
              <div
                style="width: 700px; border: solid 1px #93b8a6; padding-left: 10px;"
              >
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Paciente:</strong>
                  {{ solicitacaoSelecionada.nomeCliente }}
                </p>
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Data Nasc:</strong>
                  {{ solicitacaoSelecionada.dataNascimento }}
                </p>
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Convênio:</strong>
                  {{ solicitacaoSelecionada.dsConvenio }}
                </p>
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Setor:</strong> {{ solicitacaoSelecionada.dsSetor }}
                </p>
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Médico(a):</strong>
                  {{ solicitacaoSelecionada.nomeProfissional }}
                </p>
                <p style="margin: 5px 0px 0px 0px;">
                  <strong>Data de Entrada:</strong>
                  {{ solicitacaoSelecionada.dataEntrada }}
                </p>
              </div>
              <div
                style="width: 300px; border: solid 1px #93b8a6; padding-left: 10px; text-align: center;"
              >
                <img :src="qrCodeFoto" width="60%" />
              </div>
            </div>
            <!-- RODAPÉ FIM -->

            <!-- CORPO INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 800px; margin-bottom: 10px; border: solid 1px #93b8a6; min-height: 800px; max-width: 800px;"
            >
              <!--DIV LISTA DE EXAMES DO PEDIDO-->

              <div
                id="lista"
                role="tabpanel"
                aria-labelledby="lista-tab"
                style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
              >
                <table
                  v-if="datasDetalhe.length > 0"
                  style=" border-collapse: collapse; width: 100%; margin: 10px;"
                >
                  <thead style="border-collapse: collapse; width: 100%;">
                    <tr style="text-align: left">
                      <th scope="col">Data</th>
                      <th scope="col">Exame</th>
                      <th scope="col">Setor</th>
                      <th scope="col">Médico</th>
                    </tr>
                  </thead>
                  <tbody style="border-collapse: collapse; width: 100%;">
                    <tr
                      id="tr"
                      v-for="data in datasDetalhe"
                      :key="data.id"
                      style="text-align: left"
                    >
                      <td>
                        {{ data.dataEntrada }}
                      </td>
                      <td>
                        {{ data.dsExame }}
                      </td>
                      <td>
                        {{ data.dsSetor }}
                      </td>
                      <td>
                        {{ data.nomeProfissional }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="text-center" v-if="datasDetalhe.length == 0">
                  <p class="lead"><b>Ainda não existem dados</b></p>
                </div>
              </div>
            </div>
            <!-- CORPO FIM -->

            <!-- RODAPÉ 2 INICIO -->
            <div
              style="display: flex; flex-direction: row; width: 100%; margin-bottom: 10px; max-width: 800px;"
            >
              <div
                style="width: 1000px; border: solid 1px #93b8a6; padding-left: 10px;"
              >
                <p style="margin: 5px 0px 0px 0px; text-align: center;">
                  <strong>Assinatura:</strong>
                </p>
                <p
                  style="margin: 0px 0px 5px 0px; text-align: center;"
                  v-html="assinatura"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </md-card-content>
  </md-card>
</template>


<script>

import QRious from "qrious";
import geodist from "geodist";


// Import component
import { bus } from "../main";
import Loading from "vue-loading-overlay";
import { loader } from '../globalVaribles'
import FooterExame from '../pages/Layout/FooterExame'
// import { jsPDF } from "jspdf";
// import html2canvas from 'html2canvas';

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import jwt from "jsonwebtoken";
import MeuProntuarioListarDocs from './Tables/TablesMeuProntuario.vue';


export default {
  name: "MeuProntuario",
  data() {
    return {
      typeLoader: loader,
      dataBackgroundColor: 'green',
      datas: [],
      datasDetalhe: [],
      blockGeo: false,
      isLoading: false,
      showlaudo: false,
      exameSelecionado: "",
      assinatura: "",
      showTipoSelecionado: false,
      showTipo: true,
      tipo: 0, //0 nenhum, 1-laudo exame lab, 2- laudo exa cdi
      resultadoLaudo: "",
      token: "",
      showModalSolicitacao: false,
      solicitacaoSelecionada: "",
      showBtnVoltar: false,
      qrCodeFoto: "",
      action: ''
    };
  },
  components: {
    Loading,
    MeuProntuarioListarDocs,
    FooterExame
  },
  created(){
    
  },
  mounted() {
    //Recebe dados do componente MeuProntuarioListarDocs
    bus.$on("documentoSelecionado", (result) => {
      //result[0]  == Documento selecionado  
      //result[1] == botão clicado 
      //ex: 0-> Visualizar , 1-> Imprimir
      if(result[1] == 1){
        if(this.tipo == 1 || this.tipo == 2){
          this.visualizarExame(result[0]) //Visualizar exame para imprimir
          this.imprimirDocumento('Exame')
          return
        }
        this.action = 1 //Imprimir
        this.visualizarSolicitacao(result[0], this.tipo) //Visualizar solicitação para imprimir
      // } else if(result[1] == 2){
      //   if(this.tipo == 1 || this.tipo == 2){
      //     this.visualizarExame(result[0]) //Visualizar exame para imprimir
      //     this.download('printMeExame')
      //     return
      //   }
      //   this.action = 2  //Baixar
      //   this.visualizarSolicitacao(result[0], this.tipo) 
      } else {
        if(this.tipo == 1 || this.tipo == 2){
          this.visualizarExame(result[0])
          this.mostrarDocumento('Exame')
          return

        }
        this.action = 0//Visualizar
        this.visualizarSolicitacao(result[0], this.tipo)
      }
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
    async validarPosicao() {
      return new Promise((resolve) => {
        let options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        //verifica a lat log atual do usuário
        navigator.geolocation.getCurrentPosition(
          (success) => {
            console.log(
              "coordenadas",
              success.coords.latitude,
              success.coords.longitude
            );

            let coordenadas = success.coords;

            let inicial = {
              lat: success.coords.latitude,
              lon: success.coords.longitude,
            };
            let final = { lat: -3.1262, lon: -60.020417 };

            //this.calcularDistancia(coordenadas, {latitude: -3.126200, longitude: -60.020417})

            var dist = geodist(inicial, final, { exact: true, unit: "meters" });
            console.log(
              "distancia entre a samel e o paciente " +
                dist.toFixed(0) +
                " metros"
            );

            if (dist.toFixed(0) <= 100) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.log("Erro ao carregar coordenadas", error);
            resolve(false);
          },
          options
        );
      });
    },
    abrirAtendimentoImg() {
      this.blockGeo = false;
      this.showModalSolicitacao = false;
      this.criarAviso(
        "Sucesso",
        "Seu atendimento foi aberto com sucesso. Aguarde ser chamado",
        1
      );
    },
    abrirAtendimentoLab() {
      this.blockGeo = false;
      this.showModalSolicitacao = false;
      this.criarAviso(
        "Sucesso",
        "Seu atendimento foi aberto com sucesso. Aguarde ser chamado",
        1
      );
    },
    async abrirAtendimento(tipo) {
      //3: lab, 4: img

      this.blockGeo = true;

      let resultado = await this.validarPosicao();

      if (resultado) {
        switch (tipo) {
          case 3:
            await this.abrirAtendimentoLab();
            break;

          case 4:
            await this.abrirAtendimentoImg();
            break;
        }
      } else {
        this.blockGeo = false;
        this.criarAviso(
          "Erro",
          "Não conseguimos identificar sua localização",
          2
        );
      }
    },
    carregarQrCodeFoto(nrPedido) {
      var qr = new QRious({
        value: nrPedido + "",
      });

      this.qrCodeFoto = qr.toDataURL("image/jpeg");
    },
    
    visualizarSolicitacao(solicitacao, tipo) {
      this.solicitacaoSelecionada = solicitacao;
      this.showTipo = false;
      this.showTipoSelecionado = false;
      this.showModalSolicitacao = false;

      this.carregarQrCodeFoto(this.solicitacaoSelecionada.nrPedido);
      this.carregarDetalheExames(tipo);
    },
    visualizarExame(exame) {
      this.showlaudo = true;
      this.exameSelecionado = exame;
      this.showTipo = false;
      this.showTipoSelecionado = false;
      this.resultadoLaudo = exame.dsResultado;
      this.assinatura = exame.dsAssinatura;
    },


    mostrarDocumento(tipoDocumento){
      this.isLoading = true
      setTimeout(()=>{
          let conteudo = this.$el.querySelector('#printMe'+tipoDocumento).innerHTML
          let tela_impressao = window.open('about:blank');
          tela_impressao.document.write(conteudo);
          this.isLoading = false
        },1000)
    },


    imprimirDocumento(tipoDocumento){
      this.isLoading = true
      setTimeout(()=>{
          let conteudo = this.$el.querySelector('#printMe'+tipoDocumento).innerHTML
          let tela_impressao = window.open('about:blank', "janela1","width=800, height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no");
          tela_impressao.document.write(conteudo);
          tela_impressao.window.print();
          tela_impressao.window.close();
          this.isLoading = false
        },1000)
    },

    
    selecionarTipoExame(tipo) {
      this.tipo = tipo;
      this.showTipo = false;
      this.showTipoSelecionado = true;
      this.showBtnVoltar = true

      switch (tipo) {
        case 1:
          this.carregarMeuProntuario(1);
          break;
        case 2:
          this.carregarMeuProntuario(2);
          break;
        case 3:
          this.carregarSolicitacao(1, false);
          break;
        case 4:
          this.carregarSolicitacao(2, false);
          break;
      }
    },

    carregarDetalheExames(tipo) {
      switch (tipo) {
        case 3:
          this.carregarSolicitacaoDetalhe(1, true);
          break;
        case 4:
          this.carregarSolicitacaoDetalhe(2, true);
          break;
      }
    },

    carregarMeuProntuario(tipo) {
      this.datas = [];

      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      //passa um array com os ids dos pacientes para listarem todos
      let ids = [];
      this.pacientes.map((item, index) =>
        ids.push(Number(item.cdPessoaFisica))
      );

      let json = {
        idCliente: ids,
        //"idCliente": [785553],
        tipo: Number(tipo),
      };

      this.axios
        .post("/Agenda/ListarMeuProntuario2", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            this.datas = response.data.dados;
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.criarAviso("Erro", "Erro ao carregar prontuário", 2);
        });
    },

    carregarSolicitacao(tipo, detalhe) {
      //tipo 1: solicitacao de exame lab, 2: solciitacao de exame de imagem

      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      //passa um array com os ids dos pacientes para listarem todos
      let ids = [];
      this.pacientes.map((item, index) =>
        ids.push(Number(item.cdPessoaFisica))
      );

      let json = {};

      if (detalhe) {
        this.datasDetalhe = [];

        json = {
          idCliente: ids,
          //"idCliente": [890261],
          tipo: Number(tipo),
          nrAtendimento: this.solicitacaoSelecionada.nrAtendimento,
        };
      } else {
        this.datas = [];

        json = {
          idCliente: ids,
          //"idCliente": [890261],
          tipo: Number(tipo),
        };
      }

      this.axios
        .post("/Agenda/ListarMeuProntuarioSolic", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.isLoading = false;
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            if (detalhe) {
              this.datasDetalhe = response.data.dados;
            } else {
              this.datas = response.data.dados;
            }
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.criarAviso("Erro", "Erro ao carregar prontuário", 2);
        });
    },

    carregarSolicitacaoDetalhe(tipo, detalhe) {
      //tipo 1: solicitacao de exame lab, 2: solciitacao de exame de imagem

      this.isLoading = true;

      let headers = {
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      //passa um array com os ids dos pacientes para listarem todos
      let ids = [];
      this.pacientes.map((item, index) =>
        ids.push(Number(item.cdPessoaFisica))
      );

      let json = {};

      if (detalhe) {
        this.datasDetalhe = [];

        json = {
          idCliente: ids,
          //"idCliente": [890261],
          tipo: Number(tipo),
          nrAtendimento: this.solicitacaoSelecionada.nrAtendimento,
        };
      } else {
        this.datas = [];

        json = {
          idCliente: ids,
          //"idCliente": [890261],
          tipo: Number(tipo),
        };
      }

      this.axios
        .post("/Agenda/ListarMeuProntuarioSolic", json, {
          headers: headers,
          params: {},
        })
        .then((response) => {
          this.isLoading = false;
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            if (detalhe) {
              this.datasDetalhe = response.data.dados;
            } else {
              this.datas = response.data.dados;
            }
            this.carregarHtml(this.action)
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.criarAviso("Erro", "Erro ao carregar prontuário", 2);
        });
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


  // download(htmlContent){
  //   let pdf = new jsPDF();
  //   let element = document.querySelector('#'+htmlContent);
  //   console.log(element.id)
  //   let width = element.style.width
  //   let height = element.style.height
  //   console.log(element.style.display + ' antes do html canvas')
  //   element.style.display = 'block'
  //   html2canvas(element, {scrollY: -window.scrollY}).then(canvas => {
  //       let image = canvas.toDataURL('image/jpeg');
  //       console.log(element.style.display + ' no html canvas')
  //       element.style.display = 'none'
  //       console.log(image)
  //       pdf.addImage(image, 'JPEG', 15, 40, 800, 1000);
  //       pdf.save('document.pdf')
  //       console.log(element.style.display +' no html canvas final')
        
  //   })
  // },

    btnVoltar(){
      this.showTipo = true;
      this.showTipoSelecionado = false;
      this.showModalSolicitacao = false;
      this.tipo = 0
      if(!this.showTipoSelecionado && !this.showBtnVoltar){
        this.$router.push('/inicio')
        return
      }
      this.showBtnVoltar = false

    },

    carregarHtml(action){
      if(action == 0){
        this.mostrarDocumento('Solicitacao')
        setTimeout(()=>{
          this.showlaudo = false
        },1000)
        return
      } else if(action == 1){
        this.imprimirDocumento('Solicitacao')
        setTimeout(()=>{
          this.showlaudo = false
        },1000)
        return
      }

      // this.download('printMeSolicitacao')
      
    },

    limparSessao() {
      this.$session.destroy();
      this.$router.push("/login");
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tr:nth-child(even) {
  background-color: #f2f2f2;
}

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

.close::after {
  content: "x";
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
  width: 70%;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  border: none;
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
