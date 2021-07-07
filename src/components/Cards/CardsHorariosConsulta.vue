<template>
  <div v-if="horarios.length > 0">
    <p class="lead" v-if="horarios.length > 0">
      <b>Agenda do Profissional:</b> {{ profissional.nome }} <br />
      <b>Especialidade:</b> {{ especialidade.descricao }}
    </p>
    <b-table 
    :items="horarios" 
    :fields="fields"
    :select-mode="selectMode"
    ref="selectableTable"
    selectable
    @row-selected="onRowSelected"
    :per-page="perPage"
    :current-page="currentPage"
    striped
    stacked="md"
    >
      <template #cell(actions)="{ rowSelected, item }">
        <b-button
          v-if="rowSelected"
          size="sm"
          pill
          variant="success"
           @click="selecionarHorario(item)"
        >
          {{item.horaEspecial === 'N' ? 'Agendar' : 'Agendar horário especial'}}
        </b-button>
      </template>

      <template :if="window.innerWidth > 540" #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <b-pagination
    v-if="horarios.length > 5"
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
  name: "cardsHorarios",
  props: ["horarios", "profissional", "especialidade"],
  data: () => ({
    perPage: 4,
    currentPage: 1,
    selectMode: 'single',
    fields: [
      window.innerWidth > 540 ? { key: 'selected', label: "" } : '',
      { key: "data2", label: "Data da Consulta", sortable: true },
      { key: "unidade.nome", label: "Unidade" },
      { key: "actions", label: window.innerWidth <= 540 ? '': 'Ações'},
    ],
    selected: []
  }),

  mounted(){
    this.loadData()
  },
  methods: {
    loadData(){
      console.log('Execultou loadData')
      let lista = this.$el.querySelectorAll("tbody > tr.b-table-row-selected.table-active > td")
      let device = window.innerWidth
      console.log(device)
      if(device <= 540){
        lista.forEach((el)=>{  
            if(el.dataset.label === 'Ações'){
                el.dataset.label = ''
                console.log('Alterou')
            }
        })
      }
    },
    onRowSelected(items) {
      this.selected = items
        
      },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    selectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.selectRow(2)
    },
    unselectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.unselectRow(2)
    },
     selecionarHorario(horario) {
      bus.$emit("horarioSelecionado", horario);
    },
    formatDate(date) {
      date = new Date(date);
      return (
        this.countCaracter(date.getDate()) +
        "/" +
        this.countCaracter(date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        this.countCaracter(date.getHours()) +
        ":" +
        this.countCaracter(date.getMinutes())
      );
    },
    countCaracter(param) {
      let word = "";
      word = param + "";
      return word.length > 1 ? word : "0" + word;
    }
  },
  computed: {
      rows() {
        return this.horarios.length
      }
    }
};
</script>

<style scoped>
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
    background-color: #30a070 !important;
}
</style>
