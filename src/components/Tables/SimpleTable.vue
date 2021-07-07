<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Data">{{ item.data }}</md-table-cell>
        <md-table-cell md-label="Paciente">{{ item.paciente }}</md-table-cell>
        <md-table-cell md-label="Médico">{{ item.medico }}</md-table-cell>
        <md-table-cell md-label="Especialidade">{{ item.especialidade }}</md-table-cell>
        <md-table-cell md-label="Unidade">{{ item.unidade }}</md-table-cell>
        <md-table-cell md-label="Ação">{{ item.acao }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        },
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        },
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        },
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        },
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        },
        {
          data: "31/03/2021 17:10:00",
          paciente: "Hugo Martins De Lima",
          medico: "Daniel Do Nascimento Fonseca",
          especialidade: "Ambulatorio Saúde",
          unidade: "Centro Médico Getúlio Vargas",
          acao: ""
        }
      ]
    };
  }
};
</script>
