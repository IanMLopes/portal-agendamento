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
      <template #cell(actions)="{ item }">
        <b-button
          size="sm"
          pill
          variant="link"
          @click="selecionarData(item)"
          ><img style="width:30px" src="../../assets/img/chevron-circle-right-solid.svg">
        </b-button>
      </template>
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
  props: ["datas"],
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      fields:
            [
              { key: 'selected', label: "" } ,
              { key: "dataEntrada", label: "Data", sortable: true },
              { key: "nomeCliente", label: "Paciente" },
              { key: "nomeProfissional", label: "Médico" },
              { key: 'actions', label: 'Ver exames'}
            ]
    };
  },
  methods: {
    selecionarData(data){
        bus.$emit("dataSelecionada", data);
    }
  },
  computed: {
    rows() {
      return this.datas.length;
    },
  },
};
</script>
