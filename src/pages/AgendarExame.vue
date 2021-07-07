<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <agendar-exame-form data-background-color="green">
        </agendar-exame-form>
      </div>
    </div>
  </div>
</template>

<script>
import AgendarExameForm from "../components/AgendarExameComponent.vue";
import UserCard from "../components/Cards/UserCard";

export default {
  name: "AgendarConsulta",
  props: {},
  components: {
    AgendarExameForm,
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
