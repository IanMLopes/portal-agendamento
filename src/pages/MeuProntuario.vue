<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-70">
        <meu-prontuario-component data-background-color="green">
        </meu-prontuario-component>
      </div>
    </div>
  </div>
</template>

<script>
import MeuProntuarioComponent from "../components/MeuProntuarioComponent";
import UserCard from "../components/Cards/UserCard";

export default {
  name: "AgendarConsulta",
  props: {},
  components: {
    MeuProntuarioComponent,
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
