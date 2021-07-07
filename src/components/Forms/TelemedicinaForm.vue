<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
          {{ $route.name }}
        </h4>
        <p class="category">
          {{ dinamicSubtitle() }}
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
          ><i :class="!pacienteSelecionado ? '' : 'fas fa-arrow-left'"></i> {{!pacienteSelecionado ? 'Início' : 'Voltar'}}
        </b-button>
    </md-card-actions>

      <!----------------------------------------------Seleção de pacientes ---------------------------------------->
      <div class="md-layout" v-if="!pacienteSelecionado">
        <div
          class="pricing-header px-3 py-3 pt-md-4 pb-md-4 mx-auto text-center"
        >
          <cardsPacients :pacients="pacientes"></cardsPacients>
        </div>
      </div>
      <!-------------------------------------------------AQUI INSERE CARDS DAS CONSULTAS AGENDADAS------------------------------------------------------------>
      <div class="md-layout justify-content-center">
        <div
          class="mt-4 justify-content-center md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-80"
          style=" height: 100%;"
        >
          <cardsConsultasTelemedicina
            v-if="showConsultas"
            :consultas="consultas"
          ></cardsConsultasTelemedicina>
          <div class="text-center" v-if="consultas.length == 0 && showMenu">
            <p class="lead">
              <b>Você ainda não marcou alguma consulta para Telemedicina</b>
            </p>
          </div>
        </div>
      </div>
      <!----------------------------------------------------Numero do Agendamento no Telemedicina--------------------------------------------------->
      <div v-if="showMenu && consultas.length > 0">
        <!-- <div v-if='showMenu && consultas.length > 0 && !showConsultas' class="w-100 mt-2 mb-2">
                <p class="text-center"> <b>TELEMEDICINA {{consultaSelecionada.ieAgenda != '' ? consultaSelecionada.ieAgenda == 'S' ? ' - AGENDAMENTO: '+consultaSelecionada.id : ' - ATENDIMENTO: '+consultaSelecionada.id : ''}}</b></p>
            </div>        -->
        <div class="md-layout d-flex">
          <!---------------------------------------------- Card com os dados do paciente selecionado--------------------------------------------->
          <div
            v-if="!showConsultas && showMenu && (menuSelecionado == 1 || menuSelecionado == 2)"
            class="d-flex col-md-6 col-lg-6 col-sm-12 justify-content-center"
            style="margin-top:5%;"
          >
            <md-card
              class="md-primary mw-75"
              md-theme="purple-card"
              style="box-shadow:none; margin-top:auto; margin-bottom:auto; margin-left: -12px; width:320px"
            >
              <md-card-header
                class="borderCard"
                style="background:#FFFFFF !important;"
              >
                <md-card-header-text>
                  <div class="md-title">{{ pacienteSelecionado.nome }}</div>
                  <div class="md-subhead">
                    <b>CPF: </b>{{ pacienteSelecionado.cpf }}
                  </div>
                  <div class="md-subhead">
                    <b>Data de Nascimento: </b
                    >{{ pacienteSelecionado.nascimento2 }}
                  </div>
                  <div class="md-subhead">
                    <b>Código da Carteirinha: </b
                    >{{
                      pacienteSelecionado.codCarteirinha
                        ? pacienteSelecionado.codCarteirinha
                        : "Não possui"
                    }}
                  </div>
                </md-card-header-text>

                <md-card-media>
                  <img
                    v-if="pacienteSelecionado.sexo == 'F'"
                    src="../../../static/media/woman.svg"
                    class="m-2 img-fluid rounded card-img-top"
                    style="height: 100px;"
                  />
                  <img
                    v-if="pacienteSelecionado.sexo == 'M'"
                    src="../../../static/media/man.svg"
                    class="m-2 img-fluid rounded card-img-top"
                    style="height: 100px;"
                  />
                </md-card-media>
              </md-card-header>
              <md-card-actions style="justify-content: center !important;">
                <b-button
                  @click="mudarPaciente()"
                  type="button"
                  class="mt-4"
                  variant="danger"
                  ><i class="fas fa-exchange-alt" style="margin-right:10px;"></i
                  >Mudar Paciente</b-button
                >
              </md-card-actions>
            </md-card>
          </div>

          <!-- ---------------------------------------------- -->

          <div
            class="md-layout-content col-lg-6 col-md-6 col-sm-12"
            style="margin-left:auto; margin-right:auto;"
          >
            <div class="md-size-100" v-if="showMenuOperacoes">
              <div
                v-if="menuSelecionado == 1"
                class="card-pefil2"
                style="height:100%; border-radius:4px; background-color:#D4EDDA;"
              >
                <div class="card-body">
                  <b-alert show variant="warning">
                    <p class="mb-0 pb-0 ">
                      Faça seu checkin para a consulta selecionada
                    </p>
                    <p class="">
                      <b>Profissional:</b>
                      {{ consultaSelecionada.nomeProfissional }}<br />
                      <b>Horário:</b> {{ consultaSelecionada.dataAgenda }}
                      <br />
                    </p>
                  </b-alert>
                  <div class="row m-0 b-0">
                    <div v-show="showCamera" class="row m-0">
                      <div class="col-12 embed-responsive embed-responsive">
                        <video
                          ref="cVideo"
                          id="cVideo"
                          :src="cVideo"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>

                    <div v-show="!showCamera" class="col-12 midiaLocal">
                      <canvas id="fotoCanvas" width="400" height="300">
                      </canvas>
                    </div>
                  </div>

                  <div
                    v-show="showCamera"
                    class="col-12 row m-0 b-0 mt-2 d-flex justify-content-center"
                  >
                    <b-button
                      type="button"
                      @click="carregarCanvas()"
                      class="col-8 bg-body text-success"
                      size="sm"
                      pill
                      variant="success"
                      ><i class="far fa-images ml-2"></i> Capturar
                      Imagem</b-button
                    >
                    <p style="margin: 0px 0px 5px 0px; text-align:center;">
                      ou
                    </p>
                    <b-button
                      type="button"
                      @click="cadastrarTokenEmail()"
                      class="col-8 bg-body text-success"
                      size="sm"
                      pill
                      variant="success"
                      ><i class="fas fa-envelope ml-2"></i> Validar por
                      e-mail</b-button
                    >
                  </div>
                </div>
              </div>
              <!-- Card contendo a fila para  atendimento ------------------------->
              <div v-if="menuSelecionado == 2" class="card" style="height:100%">
                <div class="card-body">
                  <div
                    class="alert alert-primary alert-dismissible fade show"
                    role="alert"
                    style="background-color:#D4EDDA; color:#155724; border-color:#C3E6CB;"
                    v-if="showAlert"
                  >
                    <strong>Muito bem :)</strong> Você conseguiu realizar seu
                    checkin no atendimento. Acompanhe sua vez na fila de
                    atendimento
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      style="color:#155724;"
                      @click="showAlert = false"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <p class="lead">Aguarde sua vez na fila de Espera:</p>

                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Horário</th>
                        <th scope="col">Paciente</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, i) in filaEspera"
                        :key="i"
                        v-bind:class="[data.nome == 'Você' ? 'table-info' : '']"
                      >
                        <td>{{ data.horario }}</td>
                        <td>{{ data.nome }}</td>
                        <td v-if="data.status == 'O'">
                          <span class="badge bg-success">{{
                            data.statusDescricao
                          }}</span>
                        </td>
                        <td v-else-if="data.status == 'AC'">
                          <span class="badge bg-warning">{{
                            data.statusDescricao
                          }}</span>
                        </td>
                        <td v-else-if="data.status == 'M'">
                          <span class="badge bg-info">{{
                            data.statusDescricao
                          }}</span>
                        </td>
                        <td v-else>
                          <span class="badge bg-danger"
                            >Ainda não chegou</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-------------- Card para inserir tonken enviado por email---------  -->
              <div
                v-if="menuSelecionado == 3"
                class="mt-5 w-100"
                style="height:100%;"
              >
                <md-card style="box-shadow: none;">
                  <b-alert
                    style="background-color:#FFFFFF; color:black; box-shadow:none;"
                    show
                    variant="warning"
                    >Token enviado para o e-mail
                    <b>{{ pacienteSelecionado.email }}</b
                    >. Infome o código no campo abaixo:</b-alert
                  >
                  <md-card-content>
                    <md-field style="margin-bottom:0px; !important">
                      <label>Informe seu código de verificação</label>
                      <md-input v-model="dadosValidacaoToken.token"></md-input>
                    </md-field>
                  </md-card-content>

                  <md-card-actions style="border-top:none;">
                    <b-button
                      size="sm"
                      style="margin-right:2%;"
                      variant="success"
                      @click="validarTokenEmail()"
                      ><i class="fas fa-check"></i> Validar</b-button
                    >
                    <b-button
                      size="sm"
                      variant="danger"
                      @click="cancelarValidacaoToken()"
                      ><i class="fas fa-times"></i> Cancelar</b-button
                    >
                  </md-card-actions>
                </md-card>
              </div>
              <!-- --------------------------------------- -->
            </div>
          </div>
        </div>
      </div>

      <transition name="modal" v-if="showModalTelemedicina">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="row fixed-top" style="height: 100%;">
                <div class="col-12">
                  <div class="videoRemoto" v-if="showVideoUser == false">
                    <video
                      ref="rVideo"
                      id="rVideo"
                      :src="rVideo"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div
                    v-else
                    class="row justify-content-center text-center content-foto-user"
                  >
                    <img
                      src="../../../static/media/uservideo.svg"
                      class="mx-auto d-block"
                      width="30%"
                    />
                  </div>

                  <div class="videoLocal">
                    <video
                      ref="lVideo"
                      id="lVideo"
                      :src="lVideo"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div
                    class="fixed-bottom rodape"
                    @mouseover="showMenuRodape = true"
                    @mouseout="showMenuRodape = false"
                  >
                    <div
                      v-show="showMenuRodape"
                      class="fixed-bottom content-rodape row align-items-center justify-content-center m-0 p-0"
                    >
                      <ul
                        class="list-inline row mx-auto justify-content-center p-2"
                      >
                        <li
                          class="d-flex list-inline-item actions-telemedicina text-center"
                          v-if="showBotaoChat"
                        >
                          <img
                            class="mx-auto "
                            src="../../../static/media/chat.svg"
                            width="20"
                          />
                        </li>

                        <li
                          class="d-flex list-inline-item actions-telemedicina"
                          v-if="showBotaoAtender"
                          @click="atenderChamada()"
                        >
                          <img
                            class="mx-auto "
                            src="../../../static/media/atender.svg"
                            width="20"
                          />
                        </li>

                        <li
                          class="d-flex list-inline-item actions-telemedicina"
                          @click="mudarFullscreen()"
                        >
                          <img
                            class="mx-auto "
                            src="../../../static/media/fullscreen.svg"
                            width="20"
                          />
                        </li>

                        <li
                          class="d-flex list-inline-item actions-telemedicina-encerrar"
                          @click="recusarChamada(true)"
                        >
                          <img
                            class="mx-auto "
                            src="../../../static/media/encerrar.svg"
                            width="20"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </md-card-content>
  </md-card>
</template>

<script>
import { bus } from "../../main";
import cardsPacients from "../Cards/CardsPacients.vue";
import cardsConsultasTelemedicina from "../Cards/CardsConsultasTelemedicina.vue";

import Loading from "vue-loading-overlay";
import { loader } from "../../globalVaribles";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// conexao p2p
import Peer from "peerjs";
//socket
import io from "socket.io-client";

import jwt from "jsonwebtoken";

export default {
  name: "Telemedicina",
  data() {
    return {
      dataBackgroundColor: "green",
      showAlert: true,
      typeLoader: loader,
      titular: {},
      //socket: io('http://localhost:3001'),
      socket: io("https://api-stream-telemedicina.samel.com.br/"),
      peer: null,
      menuSelecionado: 1, //1-menu checkin rec facial, 2-menu checkin email, 3-menu token email
      showMenu: false,
      showMenuOperacoes: false, //controla o menu lateral direito quando clicado em uma consulta
      showConsultas: false,
      showCamera: true, //campo da camera para tirar foto
      showModalTelemedicina: false,
      showMenuChat: true,
      showMenuRodape: false,
      showVideoUser: true,
      showBotaoAtender: true,
      showBotaoChat: false,
      pacienteSelecionado: null,
      pacientes: [],
      isLoading: false,
      fullscreen: false, //parametro usado na funcao de tela cheia
      consultas: [],
      filaEspera: [],
      consultaSelecionada: { ieAgenda: "", id: "" },
      cVideo: "", //valor do video para gerar uma foto
      lVideo: "", //valor do video local quando é usado para stream
      fotoCanvas: "", //armazaena o canvas de foto carregado
      dadosValidacaoToken: {
        token: "",
        erro: "",
      },
      dadosConexao: {
        id: "",
        status: false,
        peer: "",
        conexao: "", //conexao entre peers
        conexaoMedia: "", //conexao de stream
        idSocket: "",
      },
      token: "",
    };
  },
  components: {
    cardsPacients,
    cardsConsultasTelemedicina,
    Loading,
  },
  created() {
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

    jwt.verify(this.$session.get("titular"), "9j7d8k20f##", function(
      err,
      decoded
    ) {
      that.titular = decoded.titular;
    });

    this.socket.on("connection", () => {
    });
    //ESCUTA OS EMMITS DOS COMPONENTES
    bus.$on("pacienteSelecionado", (result) => {
      this.pacienteSelecionado = result;
      this.showListaAvaliacao = false;
      this.showMenu = true;
      this.showMenuOperacoes = false;
      // this.efetuarLoginInternacao(this.pacienteSelecionado.cdPessoaFisica)
      this.listarConsultas(this.pacienteSelecionado.cdPessoaFisica);
    });

    bus.$on("consultaSelecionada", (result) => {
      this.consultaSelecionada = result;
      this.showConsultas = false;
      this.showMenuOperacoes = true;
      this.showCamera = true;

      //tratamento caso dê algum imprevisto e o paciente tenha que refazer todo o fluxo
      if (this.consultaSelecionada.possuiAtendimento == "S") {
        this.menuSelecionado = 2;
        this.listarFila();

        //this.criarConexaoTelemedicina()
        this.criarConexaoSocket();
      } else {
        setTimeout(() => {
          this.carregarCamera("cVideo");
        }, 100);
      }
    });
  },
  methods: {
    async salvarIdConexao(status) {
      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idCliente: this.pacienteSelecionado.cdPessoaFisica,
        idSocket: this.dadosConexao.idSocket,
        status: status,
        idAgendamento: this.consultaSelecionada.id,
      };

      await this.axios
        .post("/Agenda/SalvarStatusConexao", params, { headers: headers })
        .then((response) => {
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
    async chamarPaciente(nome) {
      var audio = await new Audio("../../static/media/notificacao.wav");
      await audio.play();
      setTimeout(async () => {
        var voices = await window.speechSynthesis.getVoices();
        var msg = new SpeechSynthesisUtterance(
          `Paciente ${nome}, comparecer a Telemedicina`
        );
        msg.lang = "pt-BR";
        msg.voice = voices[16];

        await window.speechSynthesis.speak(msg);
      }, 2800);
    },
    mudarConsulta() {
      this.stopStream(this.cVideo);
      this.showConsultas = true;
      this.showMenuOperacoes = false;
      this.showCamera = false;
      this.listarConsultas(this.pacienteSelecionado.cdPessoaFisica);
    },
    addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    },
    carregarCamera(element) {
      this.showCamera = true;
      return new Promise((result) => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then(async (stream) => {
            this.cVideo = stream;
            this.lVideo = stream;
            var video = await document.getElementById(element);
            video.muted = true;
            this.addVideoStream(video, stream);

            result(true);
          })
          .catch((err) => {
            console.log("erro ao carregar camera para capturar foto", err);
            result(false);
          });
      });
    },
    carregarCanvas() {
      //tira da camera e mostra a foto
      this.showCamera = false;

      setTimeout(async () => {
        //carrega o video
        let video = this.$refs.cVideo;
        this.fotoCanvas = await document.getElementById("fotoCanvas");

        //defini proporcao de acordo com a resolução do video
        this.fotoCanvas.height = 300;
        this.fotoCanvas.width = 400;
        //informa a dimensao 2d
        var context = this.fotoCanvas.getContext("2d");
        //desenha no canvas
        context.drawImage(
          video,
          0,
          0,
          this.fotoCanvas.width,
          this.fotoCanvas.height
        );
        //chama a api de rec facial para validar a foto
        this.validacaoRecFacial();
      }, 900);
    },
    validacaoRecFacial() {
      let that = this;

      let img = this.fotoCanvas.toDataURL("image/jpeg");
      let imageSemType = img.replace(/^data:image\/[a-z]+;base64,/, ""); // Removendo strigs de identificação de imagem.

      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        cpf: this.titular.cpf,
        foto: imageSemType,
        cpfDependente:
          this.pacienteSelecionado.cpf == this.titular.cpf
            ? ""
            : this.pacienteSelecionado.cpf,
      };

      this.axios
        .post("/Cliente/ValidarRecFacial", params, { headers: headers })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.showConsultas = false;
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso === true) {
            if (
              response.data.dados.default_face_matching_classification === true
            ) {
              //validado
              this.stopStream(this.cVideo);
              this.abrirAtendimento();
            } else {
              //nao validado
              this.criarAviso(
                "Atenção",
                "Não conseguimos validar seu reconhecimento facial. Você pode tentar validar por e-mail",
                2
              );
              this.showCamera = true;
            }
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
            this.showCamera = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.showConsultas = false;
          this.consultas = [];
          this.criarAviso(
            "Erro",
            "Não foi possível listar consultas de telemedicina",
            2
          );
        });
    },
    cadastrarTokenEmail() {
      this.stopStream(this.cVideo);

      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idMedico: this.consultaSelecionada.idProfissional,
        idCliente: this.titular.cdPessoaFisica,
        email: this.titular.email,
        idAgendamento: this.consultaSelecionada.id,
        idDependente: this.pacienteSelecionado.cdPessoaFisica,
      };

      this.axios
        .post("/Agenda/CadastrarTokenTelemedicina", params, {
          headers: headers,
        })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.showConsultas = false;
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            //se ja existir um token criado entao mostra essa msg
            if (response.data.codigo == 2) {
              // this.criarAviso("Atenção", response.data.mensagem, 2)
              let texto =
                "Já existe um token que foi enviado para o email " +
                this.pacienteSelecionado.email +
                ", que irá expirar às 12:08. Verifique sua caixa de entrada ou Spam";
              this.criarAviso("Atenção", texto, 2);
            }
            this.menuSelecionado = 3;
          } else {
            this.showConsultas = false;
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.criarAviso(
            "Erro",
            "Não foi possível enviar token para o seu e-mail, tente novamente",
            2
          );
        });

      /////
    },
    validarTokenEmail() {
      this.dadosValidacaoToken.erro = false;

      if (this.dadosValidacaoToken.token.trim().length > 0) {
        this.isLoading = true;

        let headers = {
          "Content-Type": "application/json",
          "chave-autenticacao": this.token,
          "identificador-dispositivo": "request-android",
        };

        let params = {
          idCliente: this.titular.cdPessoaFisica,
          nrToken: this.dadosValidacaoToken.token,
          idAgendamento: this.consultaSelecionada.id,
          idDependente: this.pacienteSelecionado.cdPessoaFisica,
        };

        this.axios
          .post("/Agenda/ValidarTokenTelemedicina", params, {
            headers: headers,
          })
          .then((response) => {
            this.isLoading = false;

            if (response.data.codigo == 404) {
              this.showConsultas = false;
              this.limparSessao();
              this.criarAviso("Erro", response.data.mensagem, 2);
            } else if (response.data.sucesso) {
              //se der tudo certo entao abre atendimento
              this.abrirAtendimento();
            } else {
              this.showConsultas = false;
              this.criarAviso("Erro", response.data.mensagem, 2);
            }
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            this.criarAviso(
              "Erro",
              "Não foi possível validar seu token, tente novamente",
              2
            );
          });
      } else {
        this.dadosValidacaoToken.erro = true;
        this.criarAviso(
          "Atenção",
          "Você precisa informar o token para ser validado",
          2
        );
      }
    },
    cancelarValidacaoToken() {
      this.menuSelecionado = 1;
      this.showCamera = true;

      setTimeout(() => {
        this.carregarCamera("cVideo");
      }, 100);
    },
    listarConsultas(idCliente) {
      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idCliente: idCliente,
      };

      this.axios
        .post("/Agenda/ListarAgendamentosTele", params, { headers: headers })
        .then((response) => {
          this.isLoading = false;

          if (response.data.codigo == 404) {
            this.showConsultas = false;
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            this.showConsultas = true;
            this.consultas = response.data.dados;
          } else {
            this.showConsultas = false;
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.showConsultas = false;
          this.consultas = [];
          this.criarAviso(
            "Erro",
            "Não foi possível listar consultas de telemedicina",
            2
          );
        });
    },
    listarFila() {
      this.filaEspera = [];

      let url = ``;

      if (this.consultaSelecionada.ieAgenda == "S") {
        url = "/Agenda/ListarFilaTele";
      } else {
        url = "/Agenda/ListarFilaAtendimentoTele";
      }

      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };
      //nao é usado na lista de atendimento
      let params = {
        idAgenda: this.consultaSelecionada.idAgenda,
        idCliente: this.pacienteSelecionado.cdPessoaFisica,
      };

      //chama funcao que abre atendimento e gera fila
      this.axios
        .post(url, params, { headers: headers })
        .then((response) => {
          console.log("resultado da operacao fila", response.data);
          this.isLoading = false;
          //erro de sessao
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            let dados = response.data.dados;

            for (let item of dados) {
              if (item.idCliente == this.pacienteSelecionado.cdPessoaFisica) {
                item["nome"] = "Você";
              } else {
                item["nome"] = "Paciente";
              }
              this.filaEspera.push(item);
            }
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
          // this.criarAviso("Erro", "Não foi possível abrir seu atendimento", 2)
        });
    },
    async abrirAtendimento() {
      this.isLoading = true;

      let headers = {
        "Content-Type": "application/json",
        "chave-autenticacao": this.token,
        "identificador-dispositivo": "request-android",
      };

      let params = {
        idAgendamento: this.consultaSelecionada.id,
      };

      //chama funcao que abre atendimento e gera fila
      this.axios
        .post("/Atendimento/ConfirmarAberturaAtendimentoConsulta", params, {
          headers: headers,
        })
        .then((response) => {
          console.log("resultado da operacao", response.data);
          this.isLoading = false;
          //erro de sessao
          if (response.data.codigo == 404) {
            this.limparSessao();
            this.criarAviso("Erro", response.data.mensagem, 2);
          } else if (response.data.sucesso) {
            //chegou aqui deu sucesso
            this.menuSelecionado = 2;
            this.listarFila();

            //this.criarConexaoTelemedicina()
            this.criarConexaoSocket();
          } else {
            this.criarAviso("Erro", response.data.mensagem, 2);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
          this.criarAviso("Erro", "Não foi possível abrir seu atendimento", 2);
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
    limparSessao() {
      this.$session.destroy();
      this.$router.push("/login");
    },
    mudarPaciente() {
      //se o menu tiver habilitado entao o video esta ativo e precisa ser parado
      if (this.showMenuOperacoes) {
        this.stopStream(this.cVideo);
      }
      if (this.peer) {
        //sair da conexao do servidor
        this.desconectarPeer();
      }

      this.pacienteSelecionado = null;
      this.showMenu = false;
      this.menuSelecionado = 1;
    },
    stopStream(stream) {
      try {
        stream.getTracks().forEach(function(track) {
          if (track.readyState == "live") {
            track.stop();
          }
        });
      } catch (error) {}
    },
    criarConexaoTelemedicina(idConexao) {
      let id = null;
      if (idConexao) {
        id = idConexao;
      } else {
        id =
          this.consultaSelecionada.id +
          "P" +
          this.pacienteSelecionado.cdPessoaFisica;
      }

      //padrao de codigo de conexao: id do idhorario + P + codigo pessoa fisica
      // let id = this.consultaSelecionada.id+"P"+this.pacienteSelecionado.cdPessoaFisica
      this.dadosConexao.idSocket = id;

      this.peer = new Peer(id, {
        host: "api-stream-telemedicina.samel.com.br",
        port: 443,
        /*host: 'localhost',
            port: 3001,*/
        path: "/mypeer",
      });

      this.peer.on("open", () => {
        this.dadosConexao.id = this.peer.id;
        this.dadosConexao.status = true;
        this.$cookie.set("idConexao", this.peer.id);
        console.log("Conectado ao servidor: ", this.peer.id);
      });

      this.peer.on("close", function() {
        console.log("Desconectdo do servidor");
      });

      this.escutarEventosConexao();
      if (this.pacienteSelecionado) this.salvarIdConexao(true);
    },
    criarConexaoSocket() {
      let dados = {
        nome: this.pacienteSelecionado.nome,
        id: this.pacienteSelecionado.cdPessoaFisica,
        sala: this.consultaSelecionada.id,
      };

      this.socket.emit("join", dados, function() {});

      this.escutarEventosSocket();
    },
    escutarEventosConexao() {
      //evento de conexao com outro peer
      this.peer.on("connection", (connection) => {
        this.dadosConexao.conexao = connection;
        this.dadosConexao.peer = connection.peer;

        console.log("Voce esta conectado com o peer", this.dadosConexao.peer);
      });

      //evento de erro
      this.peer.on("error", (err) => {
        console.log("Erro ao conectar ao peer", err);
      });

      //evento de ligacao recebida
      this.peer.on("call", async (call) => {
        this.showBotaoAtender = true;
        this.showBotaoChat = false;
        this.fullscreen = false;
        this.dadosConexao.conexaoMedia = call;
        this.showModalTelemedicina = true;
        this.showVideoUser = true;

        if (this.pacienteSelecionado)
          this.chamarPaciente(this.pacienteSelecionado.nome);

        setTimeout(() => {
          this.carregarCamera("lVideo");
          this.showMenuRodape = true;
        }, 800);
      });
    },
    escutarEventosSocket() {
      this.socket.on("chamarTelemedicina", async (data) => {
        console.log("teste chamada--->", data);
        await this.criarConexaoTelemedicina(data.idCliente);
      });

      this.socket.on("atualizarAtendimento", (data) => {
        if (data.tipo == "Telemedicina") {
          this.listarFila();
        }
      });

      this.socket.on("sendMsg", (data) => {
        console.log("Envio de msg", data);
      });

      this.socket.on("leavePeer", (data) => {
        console.log("alguem saiu da videochamada", data);

        //verifica se nao foi o usuario atual que disparou esse evento
        if (this.pacienteSelecionado) {
          if (data.id != this.pacienteSelecionado.cdPessoaFisica) {
            this.recusarChamada(false);
          }
        }

        this.desconectarPeer();
      });
    },
    atenderChamada() {
      //desabilita o  botao de atender quando clicado
      this.showBotaoAtender = false;
      this.showBotaoChat = true;
      this.dadosConexao.conexaoMedia.answer(this.lVideo);
      this.dadosConexao.conexaoMedia.on("stream", (remoteStream) => {
        this.showVideoUser = false;
        this.rVideo = remoteStream;

        setTimeout(async () => {
          var video = await document.getElementById("rVideo");
          video.muted = false;
          this.addVideoStream(video, remoteStream);
          this.mudarFullscreen();
        }, 800);
      });

      this.dadosConexao.conexaoMedia.on("close", () => {
        console.log("Evento de ecerramento quando atende ligacao");
        this.rVideo = "";
      });
    },
    recusarChamada(param) {
      //para o stream de video local
      this.stopStream(this.lVideo);
      this.showModalTelemedicina = false;
      this.desconectarMedia();

      let dados = {
        id: this.pacienteSelecionado.cdPessoaFisica,
        nome: this.pacienteSelecionado.nome,
        sala: this.consultaSelecionada.id,
      };

      //quando manda false significa que o outro usuario que fechou
      //true o usuario local que disparou

      if (param) this.socket.emit("leavePeer", dados);
    },
    mudarFullscreen() {
      this.$fullscreen.toggle(this.$el.querySelector(".modal-container"), {
        wrap: false,
        callback: this.fullscreenChange,
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    desconectarMedia() {
      //se existir conexao entao fecha
      if (this.dadosConexao.conexaoMedia) {
        this.dadosConexao.conexaoMedia.close();
      }
    },
    desconectarPeer() {
      this.dadosConexao.status = false;
      this.peer.disconnect();
    },
    desconectarSocket() {
      let dados = {
        id: this.pacienteSelecionado.cdPessoaFisica,
        nome: this.pacienteSelecionado.nome,
        sala: this.consultaSelecionada.id,
      };

      this.socket.emit("leave", dados, function() {});
    },

    dinamicSubtitle() {
      if (!this.pacienteSelecionado) {
        return "Informe para quem será este agendamento";
      }
      if (this.pacienteSelecionado && this.consultas.length > 0) {
        if (!this.showConsultas) {
          if (this.menuSelecionado == 1) {
            return `${
              this.consultaSelecionada.ieAgenda != ""
                ? this.consultaSelecionada.ieAgenda == "S"
                  ? " NUMERO DE AGENDAMENTO: " + this.consultaSelecionada.id
                  : " - ATENDIMENTO: " + this.consultaSelecionada.id
                : ""
            }, realize o check-in por e-mail ou confirmação por foto.`;
          }
          if(this.menuSelecionado == 2){
            return 'Fila de espera para atendimento.'
          }

          if (this.menuSelecionado == 3) {
            return "Check-in por e-mail.";
          }
        }
        return "Consultas agendadas / Realizar checkin";
      }
    },

    btnVoltar() {
      if (
        this.showConsultas &&
        this.consultas.length > 0 &&
        this.pacienteSelecionado
      ) {
        this.mudarPaciente();
        this.showConsultas = false;
        return;
      }

      if (
        this.showConsultas &&
        this.pacienteSelecionado
      ) {
        this.mudarPaciente();
        this.showConsultas = false;
        return;
      }

      if (this.pacienteSelecionado && this.menuSelecionado == 1) {// VOltar da tela de
        this.mudarConsulta();
        return;
      }

      if(this.pacienteSelecionado && this.menuSelecionado == 2){ //Voltar da tela da fila de espera
        this.menuSelecionado = 0
        this.showConsultas = true
        return
      }

      if(this.pacienteSelecionado && this.menuSelecionado == 3){
        this.cancelarValidacaoToken()
        return
      }

      if(!this.pacienteSelecionado){
        this.$router.push('/inicio')
        return
      }
    },
  },
  beforeDestroy() {
    //se o menu tiver habilitado entao o video esta ativo e precisa ser parado
    if (this.showMenuOperacoes) {
      this.stopStream(this.cVideo);
    }

    //sair da conexao do servidor
    this.desconectarPeer();
    //this.desconectarSocket()
    this.salvarIdConexao(false);

    bus.$off();
  },
};
</script>

<style scoped>
#lVideo {
  margin-right: 5px !important;
  background: #000;
  border-radius: 5px;
}

.container-chat {
  height: 100% !important;
}

.midiaLocal {
  height: 300px;
  background: #000;
}

.rodape-foto {
  position: absolute;
  z-index: 999;
  bottom: 0;
}

.list-inline-item:hover {
  cursor: pointer;
}

.botao-foto {
  width: 50px;
  height: 50px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
}

.botao-foto:hover {
  /* background-color: rgba(0, 0, 0, 0.1); */
  background: #cacaca;
  cursor: pointer;
}

.menus-card {
  cursor: pointer;
}

.menus-card:hover {
  background: rgb(50, 169, 118);
  color: #fff;
}

.bg-bt-pesquisar {
  background: rgb(50, 169, 118);
  color: #ffffff;
}

.bg-bt-pesquisar:hover {
  background: rgb(28, 92, 65);
}

.progress-bar.indeterminate {
  position: relative;
  animation: progress-indeterminate 2s linear infinite;
}

@keyframes progress-indeterminate {
  from {
    left: -100%;
    width: 100%;
  }
  to {
    left: 100%;
    width: 95%;
  }
}

/**CSS DO MODAL */
.menu-esquerdo {
  height: 100%;
}
.content-menu-esquerdo {
  width: 300px;
  height: 100%;
  background: #fff;
}

.menu-esquerdo {
  z-index: 9999;
}

.rodape {
  /*width: 100%;*/
  height: 10%;
  padding: 10px 0;
}

.content-rodape {
  width: 100%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.1s;
}

.content-foto-user {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.content-rodape:hover {
  opacity: 1;
}

.actions-telemedicina {
  width: 50px;
  height: 50px;
  background: rgb(50, 169, 118);
  border-radius: 50%;
}

.actions-telemedicina-encerrar {
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 50%;
}

.actions-telemedicina:hover,
.actions-telemedicina-encerrar:hover {
  opacity: 0.7;
}

.rodape:hover {
}

.botao-end {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  padding: 2px;
  border-radius: 50%;
  background: #ffffff;
}

.videoLocal {
  width: 200px;
  height: 150px;
  margin-top: 5px;
  margin-right: 5px;
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
}

.videoRemoto {
  width: 100%;
  height: 100%;
}

.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0 0;
}

.modal-default-button {
  float: right;
}

/****CSS LOADING SELECT */
.progress-bar.indeterminate {
  position: relative;
  animation: progress-indeterminate 2s linear infinite;
}

@keyframes progress-indeterminate {
  from {
    left: -100%;
    width: 100%;
  }
  to {
    left: 100%;
    width: 95%;
  }
}
</style>
