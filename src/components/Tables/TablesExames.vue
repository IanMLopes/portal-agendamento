<template>
  <div>
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
          @click="selecionarExame(item, 0)"
          ><img style="width:30px" src="../../assets/img/seconds-icons/documento_icon.png">
        </b-button>
      </template>
      <template #cell(print)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarExame(item, 1)"
          ><img style="width:30px" src="../../assets/img/seconds-icons/imprimir_icon.png">
        </b-button>
      </template>
      <!-- <template #cell(download)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarExame(item, 2)"
          ><img style="width:30px" src="../../assets/img/seconds-icons/download_icon.png">
        </b-button>
      </template> -->
    </b-table>
    <b-pagination
      v-if="datas.length > 5"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>

import { bus } from "../../main";

export default {
  name: "listaResultadoExame",
  props: ["datas", "tipoLaudo"],
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      fields:
        [
            this.tipoLaudo == 1 ? { key: "procedimentoExame", label: "Exame" } : { key: "ds_titulo_laudo", label: "Exame" },
            { key: "nomeCliente", label: "Paciente" },
            { key: "nomeProfissional", label: "Médico" },
            { key: "dataEntrada", label: "Data", sortable: true },
            { key: "details", label: "Detalhes" },
            { key: "print", label: "Imprimir" },
            // { key: "download", label: "Baixar" }
        ]
    };
  },
  methods: {
    selecionarExame(exame, btnSelecionado){
      console.log('Emitiu evento')
      bus.$emit("documentoSelecionado", [exame, btnSelecionado]);
    }
  },
  computed: {
    rows() {
      return this.datas.length;
    },
  },
};
</script>
