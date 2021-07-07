<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-70">
          <telemedicina-form data-background-color="green"></telemedicina-form>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/Cards/UserCard";
import TelemedicinaForm from '../components/Forms/TelemedicinaForm.vue';

export default {
  name: "AgendarConsulta",
  props: {},
  components: {
    UserCard,
    TelemedicinaForm
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
