<template>
  <div>
    <nav class="navbar navbar-expand-xl navbar-light" >
      <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto"  >
          <li class="nav-item mx-3">
            <a class="nav-item nav-link mx-3" href="https://www.samel.com.br"><span>Samel</span></a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-item nav-link mx-3" href="http://healthtech.samel.com.br"><span>Samel Health Tech</span></a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-item nav-link mx-3" href="https://capsulavanessa.samel.com.br"><span>Cápsula Vanessa</span></a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-item nav-link mx-3" href="https://blog.samel.com.br"><span>Blog Samel</span></a>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  </div>

</template>
<script>
   // Import component
//   import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';
  
  export default {
    data() {
      return {
        patient: [],
        isLoading: false
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
   },
    mounted() {
      //this.$cookie.get('user') ? (this.getDetailsPatient()) : this.$router.push('/login')     
    },
    components: {
    //   Loading,
    },
    methods: {
      getDetailsPatient() {

        this.isLoading = true

        let headers = {
          'chave-autenticacao': this.$cookie.get('user'),
          'identificador-dispositivo': 'request-android'
        }
        this.axios.get('/Cliente/ObterBeneficiarioConvenioSamel',
          {
            headers: headers
          })
          .then((response) => {

            this.isLoading = false

             if(response.data.codigo ==404){
              this.limparSessao()
              this.criarAviso("Erro", response.data.mensagem, 2)
            }else{
              this.patient = response.data.dados
            //   this.$emit('getDetails', this.patient)
            }
           
          })
          .catch((error) => {
            this.$router.push('/login')
            this.isLoading = false
          })
      },
      logout() {

        let data = {}

        let headers = {
          'Content-Type': 'application/json',
          'chave-autenticacao': this.$cookie.get('user'),
          'identificador-dispositivo': 'request-android'
        }
       
        this.axios.post('/Login/EfetuarLogout', data, { headers: headers })
        .then((response) => {
          this.limparSessao() 
        })
        .catch((error) => {
      
        })       

      },
       limparSessao(){

        this.$session.destroy()     
        this.$router.push('/login')  
      },
      criarAviso(title,msg, tipo){
        let type = ''

        switch (tipo) {
          case 1:
            type = 'success';
            break;
          case 2:
            type = 'warning'; 
            break;
        }
        
        this.$alert(
            msg,
            title,
            type
        ).then(() => console.log("Closed"));
      }
    }
  }
</script>

<style scoped>
.navbar-expand-xl{
        background: #226944;
        /* margin-top: -30px; */
}

.nav-item {
    color: #ffffff !important;
    font-family: "Roboto", sans-serif !important;
    font-weight: 400;
    font-size: 16px;
}

</style>
