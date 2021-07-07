<template>
  <div class="agendarConsultaHorarios">
    

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        loader="dots"
        color="#1e7e34"
        :is-full-page="true"
      >
      </loading>
    </div>

    <div class="container" v-if="showTipoLaudo == true">
      <div class="row">
        <div class="col-6" style="height: 100%;">
          <div
            class="card text-center selecionado"
            @click="selecionarTipoExame(1)"
          >
            <div class="card-body">
              <div class="m-2 img-fluid icondash">
                <i class="fas fa-vials"></i>
              </div>
              <p>Laudo de Exames Laboratoriais</p>
            </div>
          </div>
        </div>

        <div class="col-6" style="height: 100%;">
          <div
            class="card text-center selecionado"
            @click="selecionarTipoExame(2)"
          >
            <div class="card-body">
              <div class="m-2 img-fluid icondash">
                <i class="fas fa-x-ray"></i>
              </div>
              <p>Laudo de Exames CDI</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!--Mudar tipo de exame-->
      <div v-if="showTipoSelecionado">
        <div class="card text-center mb-2" v-if="tipoLaudo == 1">
          <div class="card-body">
            <div class="m-2 img-fluid icondash">
              <i class="fas fa-vials"></i>
            </div>
            <p class="lead">
              <b>Você Escolheu: </b> LAUDO DE EXAMES LABORATORIAIS
              <button
                type="button"
                class="btn btn-outline-info"
                @click="
                  showTipoLaudo = true;
                  showTipoSelecionado = false;
                  showNomeLaudo = false;
                  showNomeMedico = false;
                  showlaudo = false;
                "
              >
                Mudar
              </button>
            </p>
          </div>
        </div>

        <div class="card text-center mb-2" v-if="tipoLaudo == 2">
          <div class="card-body">
            <div class="m-2 img-fluid icondash">
              <i class="fas fa-x-ray"></i>
            </div>
            <p class="lead">
              <b>Você Escolheu: </b> LAUDO DE EXAMES CDI
              <button
                type="button"
                class="btn btn-outline-info"
                @click="
                  showTipoLaudo = true;
                  showTipoSelecionado = false;
                  showNomeLaudo = false;
                  showNomeMedico = false;
                  showlaudo = false;
                "
              >
                Mudar
              </button>
            </p>
          </div>
        </div>
      </div>

      <!--------Mudar tipo de exame------>

      <div class="row p-4 mb-4" v-if="showlaudo">
        <div class="mb-4">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="
              showlaudo = false;
              showNomeLaudo = true;
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

        <div id="printMe">
          <!-- CABEÇALHO INICIO -->
          <div
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
          >
            <div
              style="border: solid 1px #93b8a6; width: 150px; display: flex; justify-content: center;"
            >
              <img src="../../static/media/logo_plano.png" width="100" />
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
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
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
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
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
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px; border: solid 1px #93b8a6; min-height: 875px;"
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
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
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
            style="display: flex; flex-direction: row; width: 1000px; margin-bottom: 10px;"
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
          <div style="display: flex; justify-content: center;">
           
          </div>
        </div>
      </div>

      <!-------Mudar tipo de exame-------->

      <div class="card p-4 table-responsive" v-if="showNomeMedico">
        <table class="table table-striped" v-if="datas.length > 0">
          <thead>
            <tr>
              <!-- <th scope="col"></th> -->
              <th scope="col">Data</th>
              <th scope="col">Paciente</th>
              <th scope="col">Médico</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="data in datas"
              :key="data.id"
              @click="visualizarNomeExame(data)"
              class="linha"
            >
              <!-- <th scope="row">
                <button class="btn btn-info"  @click="visualizarExame(data)">Visualizar Exame</button>
              </th> -->
              <td>
                {{ data.dataEntrada }}
              </td>
              <td>
                {{ data.nomeCliente }}
              </td>
              <td>
                {{ data.nomeProfissional }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center" v-if="datas.length == 0">
          <p class="lead"><b>Ainda não existem dados </b></p>
        </div>
      </div>

      <!-------Nome do exame-------->

      <div class="card p-4 table-responsive" v-if="showNomeLaudo">
        <table class="table table-striped" v-if="datas1.length > 0">
          <thead>
            <tr>
              <!-- <th scope="col"></th> -->
              <th scope="col">Exame</th>
              <th scope="col">Paciente</th>
              <th scope="col">Médico</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="data1 in datas1"
              :key="data1.id"
              @click="visualizarExame(data1)"
              class="linha"
            >
              <td v-if="tipoLaudo == 1">
                {{ data1.procedimentoExame }}
              </td>
              <td v-if="tipoLaudo == 2">
                {{ data1.ds_titulo_laudo }}
              </td>
              <td>
                {{ data1.nomeCliente }}
              </td>
              <td>
                {{ data1.nomeProfissional }}
              </td>
              <td>
                {{ data1.dtLaudo }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center" v-if="datas1.length == 0">
          <p class="lead"><b>Ainda não existem dados </b></p>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>


import moment from "moment";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";



import jwt from "jsonwebtoken";

export default {
  name: "AgendarExameLaudos",
  data() {
    return {
      datas: [],
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
    Loading
  },
  mounted() {
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
    linha() {
      alert("de4u certo");
    },

    printDiv() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
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

    visualizarExame(exame) {
      this.showlaudo = true;
      this.showNomeLaudo = false;
      this.exameSelecionado = exame;
      this.showTipoLaudo = false;
      this.showTipoSelecionado = false;
      this.showNomeMedico = false;

      //this.loadFile(exame.dsResultado)
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
      //console.log("teste", rtf)

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
    imprimir() {
      window.print();
    },
    selecionarTipoExame(tipo) {
      this.tipoLaudo = tipo;
      this.showTipoLaudo = false;
      this.showNomeLaudo = false;
      this.showNomeMedico = true;

      this.showTipoSelecionado = true;

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
    download(filename, text) {
      this.isLoading = true;
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

      this.isLoading = false;
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
