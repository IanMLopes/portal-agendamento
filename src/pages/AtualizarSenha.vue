<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30 justify-content-center d-flex">
        <card-pacient-mobile v-if="dispositivo"></card-pacient-mobile>
        <user-card v-else> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-70">
        <atualizar-senha-form data-background-color="green"> </atualizar-senha-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { EditProfileForm, UserCard } from "@/pages";
import AtualizarSenhaForm from "../components/Forms/AtualizarSenhaForm"
import UserCard from "../components/Cards/UserCard"
import CardPacientMobile from "./Layout/CardPacientMobile.vue"

export default {
  name: 'MeusDados',
  props: {
  },
  components:{
    AtualizarSenhaForm,
    UserCard,
    CardPacientMobile
  },
  mixins:[],
  directives:{},
  data(){
    return {}
  },
  computed:{},
  filters:{},
  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){
  },
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},
  methods:{},
  watch:{},
}
</script>


