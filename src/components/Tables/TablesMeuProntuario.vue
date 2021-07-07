<template>
  <div>
    <div v-if="datas[0].dsStatus" class="d-flex">
      <div class="d-flex mt-2">
        <img src="../../assets/img/vial-solid (1).svg" alt="realizado" style="width:16px; height:16px; margin-right:3%;"><p>Coletado</p>
      </div>
      <div class="d-flex mt-2" style="margin-left:3%;">
        <img  src="../../assets/img/exclamation-solid.svg" alt="pendente" style="width:15px; height:15px; margin-right:3%;"><p>Pendente</p>
      </div>
    </div>
    <b-table
    striped
      hover
      :items="datas"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm"
    >
      <template #cell(details)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarDocumento(item, 0)"
          ><img style="width:30px" src="../../assets/img/seconds-icons/documento_icon.png">
        </b-button>
      </template>
      <template #cell(print)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarDocumento(item, 1)"
          ><img style="width:30px" src="../../assets/img/seconds-icons/imprimir_icon.png">
        </b-button>
      </template>
      <template #cell(dsStatus)="{ item }">
        <div class="d-flex mt-2" v-if="item.dsStatus === 'Realizado'">
          <img src="../../assets/img/vial-solid (1).svg" alt="realizado" style="width:25px; height:25px; margin-right:3%;">
        </div>
        <div class="d-flex mt-2" v-else>
          <img  src="../../assets/img/exclamation-solid.svg" alt="pendente" style="width:25px; height:25px; margin-right:3%;">
        </div>
        
      </template>
      <!-- <template #cell(download)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarDocumento(item, 2)"
          ><img style="width:30px" src="../assets/img/seconds-icons/download_icon.png">
        </b-button>
      </template> -->
    </b-table>
    <b-pagination
      v-if="datas.length > 10"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      pills
      variant="success"
      size="sm"
    ></b-pagination>
  </div>
</template>

<script>

import { bus } from "../../main";

export default {
  name: "listarDocumentos",
  props: ["datas", "tipo"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields:
        this.tipo == 3 || this.tipo == 4
          ? [
              { key: "dataEntrada", label: "Data", sortable: true, tdClass: 'tdStyle' },
              { key: "nomeCliente", label: "Paciente" },
              { key: "nomeProfissional", label: "Médico" },
              { key: "dsEspecialidade", label: "Especialidade" },
              { key: "details", label: "Detalhes" },
              { key: "print", label: "Imprimir" },
              { key: "dsStatus", label: "Status"}
              // { key: "download", label: "Baixar" }
            ]
          : [
              { key: "dataEntrada", label: "Data", sortable: true ,tdClass: 'tdStyle'},
              { key: "nomeCliente", label: "Paciente" },
              { key: "nomeProfissional", label: "Médico" },
              { key: "details", label: "Detalhes" },
              { key: "print", label: "Imprimir" },
              // { key: "download", label: "Baixar" }
            ],
    };
  },
  methods: {
    selecionarDocumento(documento, origemDoClique){
        bus.$emit("documentoSelecionado", [documento, origemDoClique]);
    }
  },
  computed: {
    rows() {
      return this.datas.length;
    },
  },
};
</script>

<style scoped>
.tdStyle{
  background-color: #48B39D !important;
}
</style>
