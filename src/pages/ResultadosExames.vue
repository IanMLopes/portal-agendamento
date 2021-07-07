<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-70">
        <resultados-exames-component data-background-color="green">
        </resultados-exames-component>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/Cards/UserCard";
import ResultadosExamesComponent from '../components/ResultadosExamesComponent.vue';

export default {
  name: "AgendarConsulta",
  props: {},
  components: {
    UserCard,
    ResultadosExamesComponent
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
