<template>
  <md-card class="d-flex justify-content-center bg-img" style="margin-top:25px; min-height:220px;  max-height:220px; max-width:411px;">
    <b-avatar variant="info" :src="foto" class="mt-5" style="width:90px; height:90px; margin-left:5%;"></b-avatar>
    <md-card-content class="mt-4">
      <h4 class="card-title text-light">{{titular.nome}}</h4>
      <h6 class="category text-light text-center">Carteirinha Digital: {{titular.codCarteirinha ? titular.codCarteirinha : 'Não possui'}}</h6>


      <div style="margin-top: 6px;"> 
        <md-button v-if="$route.name == 'Editar dados' || $route.name == 'Meus dados' ? false : true" class="md-round md-success buttons" style="margin: 10px 5px 0px 5px;" href="/editardados">Editar dados</md-button>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>


import jwt from 'jsonwebtoken'

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.png")
    }
  },
  data() {
    return {
      titular:{},
       token: '',
       foto: ''
    };
  },
  mounted(){
    this.carregarDados()
  },

  methods: {
     getFoto(){
        //FUNÇÃO TA PRONTA, MAS PRECISO ENCONTRAR UMA FORMA DE ARMAZENAR O BASE64, O COOKIE NAO ARMAZENA POR SER UM STRING MT GRANDE
        let headers = {
        'Content-Type': 'application/json',
        'chave-autenticacao': this.token,
        'identificador-dispositivo': 'request-android'
        }

        this.axios.get('/Cliente/ObterFoto', { headers: headers })
          .then((response) => {
           
            if(response.data.dados.length >0){
              this.foto = `data:image/png;base64,`+response.data.dados
            }else{
                this.foto = this.titular.sexo == 'F' ? '../../../static/media/woman.svg' : '../../../static/media/man.svg'
            }

          })
          .catch((error) => {
              console.log(error)
              //deu erro entao coloca a foto do sistema
              //porem verifica o sexo
              this.foto = this.titular.sexo == 'F' ? '../../../static/media/woman.svg' : '../../../static/media/man.svg'
              
          })
      },
    carregarDados(){
        return new Promise(async resolve=>{
          let that = this

          await jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {  
            that.token = decoded.chave
          });

          await jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            that.titular = decoded.titular
          });
          
          await this.getFoto()

          resolve(true)
        })
      }
  }
};
</script>
<style scoped>
.buttons{
  margin: 0px 20px 0px 5px;
}

.bg-img{
  background-image: url(../../assets/img/menu_icons/carteirinha_paciente.png) !important;
  background: no-repeat;
  border-radius: 25px;
  background-size:cover;
}

</style>
