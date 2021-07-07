<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
       
        <user-card></user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <agendar-consulta-form data-background-color="green">
        </agendar-consulta-form>
      </div>
    </div>
  </div>
</template>

<script>
import AgendarConsultaForm from "../components/AgendarConsultaComponent.vue";
import UserCard from "../components/Cards/UserCard";

export default {
  name: "AgendarConsulta",
  props: {},
  components: {
    AgendarConsultaForm,
    UserCard,
  },
  mixins: [],
  directives: {},
  data() {
    return {
    };
  },
  computed: {},
  filters: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
  watch: {},
};
</script>
