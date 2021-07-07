<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <editar-dados-form data-background-color="green" :titular="titular"> </editar-dados-form>
      </div>
    </div>
  </div>
</template>

<script>
import EditarDadosForm from "../components/Forms/EditarDadosForm"
import UserCard from "../components/Cards/UserCard"

export default {
  name: 'MeusDados',
  props: {
    
  },
  components:{
    EditarDadosForm,
    UserCard
  },
  mixins:[],
  directives:{},
  data(){
    return {
      // msg: '',
      // patient: [],
      // isLoading: false,
    
      // foto: '',
    }
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
  methods:{
  },
  watch:{},
}
</script>


