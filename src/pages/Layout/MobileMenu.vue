<template>
  <ul class="nav nav-mobile-menu ">
  
    <li>
      <a href="/inicio" class="dropdown" data-toggle="dropdown" style="color:#2e2e2e !important">
        <i class="material-icons" style="color:#32a976 !important">dashboard</i>
        <p >INÍCIO</p></a>
    </li>
    <li>
      <a href="/meusdados" class="dropdown" data-toggle="dropdown" style="color:#2e2e2e !important">
        <i class="material-icons" style="color:#32a976 !important">person</i>
        <p>MEUS DADOS</p></a
      >
    </li>
    <li>
      <a href="/historico" class="dropdown" data-toggle="dropdown" style="color:#2e2e2e !important">
        <i class="material-icons" style="color:#32a976  !important">book</i>
        <p>HISTÓRICO</p></a
      >
    </li>
    <li>
      <a href="https://www.samel.com.br/fale-conosco/" class="dropdown" data-toggle="dropdown" style="color:#2e2e2e !important">
        <i class="material-icons" style="color:#32a976  !important">email</i>
        <p>FALE CONOSCO</p></a
      >
    </li>
    <li>
      <a href="#" class="dropdown" data-toggle="dropdown" style="position: relative; color:#2e2e2e !important">
        <i class="material-icons" style="position: absolute; left: -80px; color:#32a976  !important">cellphone</i>
        <p style="padding-left: 43px;">(92) 2129-2200</p></a
      >
    </li>
    <li>
      <drop-down>
 
        <a 

            slot="title" 
            data-toggle="dropdown"
            @click="obterNotificacoesCliente()"
            style="color:#2e2e2e !important" >
           
               <md-badge  :md-content="countBadge"  md-dense v-show="this.countBadge > 0" >
               </md-badge>
              <md-icon style="color:#32a976 !important; ">notifications</md-icon>
               <p>NOTIFICAÇÕES</p>
           
        </a>

            <div id="drop" class="dropdown-menu dropdown-menu-right overflow-auto" aria-labelledby="dropdownMenuButton" style="border-radius: 3%; max-height: 500px">
               <!-- <span class="dropdown-header text-body">{{ titulo }}</span> -->
              <li style="cursor: pointer;" class="overflow-hidden fundo" v-for="notificacao in listaNotificacoes" :key="notificacao.index" >
              <a class="dropdown-item d-flex flex-row bd-highlight p-2 " style="white-space: normal; width: auto; padding:0; margin:5px 0" v-on:click="notificacaoVisualizada(notificacao.NR_SEQUENCIA)">
                <div  class="d-inline-flex justify-content-center" >
                <img class="mr-2 img-circle" alt="50x50" src="../../assets/img/logo.jpg"  style="width: 30px; height: 20px; border-radius: 100%; border: 1px solid	#DCDCDC;">
                 </div>
                <div  class="d-inline-flex bd-highlight mr-2 p-0 container hovercor " style="display: flex; flex-direction: column;">
                  <div style=" display: flex;  justify-content: space-between; width:200px" >
                     <strong class="hovercor " style="color:#000; font-size: 12px; " >{{ notificacao.DS_TITULO }} </strong>
                      <span class="text-muted" style="font-size: 9px; min-width: 50px; color:#000; margin-right: 0px">{{ notificacao.DATA }}-{{ notificacao.HORA }}</span>
                    </div>
                     <div  style="line-height: 1.2; text-align: justify; color: #000">
                       <span>{{ notificacao.DESCRICAO }}</span>
                      </div>
                 </div>
                <div class="d-flex justify-content-center align-items-center" style="width: 30px;">
                 <div v-if="!notificacao.DT_VISUALIZADO" style="background-color: #32A976; width: 12px; height: 12px; border-radius: 100%;"></div>
                 </div>
              </a>
          </li>
        </div>
      </drop-down>
    </li>
     <li
              href="#"
              @click="
                Msg(
                  'Atenção!',
                  'Você deseja realmente encerrar a sessão?',
                  'warning',
                  '',
                  true,
                  'Sim',
                  true,
                  'Não'
                )
              "
            >
      <a  data-toggle="dropdown" class="dropdown" style="color:#2e2e2e !important">
      <i class="material-icons" style="color:#32a976  !important; " >logout</i>
      <p style="user-select: none;" >SAIR</p>
      </a>
     </li>

  </ul>
</template>
<script>

import {bus} from '../../main'
import jwt from "jsonwebtoken";
const Swal = require("sweetalert2");



export default {
  data() {
    return {
      titulo: "Sem Notificações",
      listaNotificacoes: [],
      countBadge:0,
      cdPessoaFisica: '',
      token:'',
      search: null,
      selectedEmployee: null,
      tokenFirebase:''

     
    };
  },

  beforeCreate() {
    let urlLen = window.location.href.split('/').length
    let route = window.location.href.split('/')[urlLen-1]
    if (!this.$session.exists()) {
      if(route != 'recuperarSenha' && route != 'registrar'){
        this.$router.push("/login");
      }
    }
  },

  created() {
    // this.receberMsg()
    bus.$on('reloadDataClient', (result) => {
      if (result) {
        this.obterNotificacoesCliente()
        bus.$emit('reloadDataClient', false)
      }
    })
  },

mounted() {
  if(this.$route.name != 'Login'){
    this.carregarDados()
    this.fireBase()
    this.obterNotificacoesCliente()
  }
    
  },

methods: {
    carregarDados(){
        return new Promise(async resolve=>{
          let that = this

          await jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            that.titular = decoded.titular
          });
       
          resolve(true)
        })
      },


    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    fireBase() {
      if (!('serviceWorker' in navigator)) {
        console.warn('serviceWorker not working')
        return
      }else{
      }

      if (!('PushManager' in window)) {
        console.warn('PushManager not working')
        return
      }else{
      }
      this.hasServiceWorker = true
      this.askForPermission()
      },

    askForPermission () {
      if (!this.hasServiceWorker) {
        return
      }
      this.tokenFirebase = sessionStorage.getItem('tokenFire')
      },
      
      obterNotificacoesCliente(){
        this.recarregarDadosPaciente()
        let headers = {
          'identificador-dispositivo': 'request-android',
          'chave-autenticacao': this.token
        }
        let data = {
          idCliente: this.cdPessoaFisica
        }

        this.axios.post('/notificacao/ObterNotificacoesCliente', data, { headers: headers })
        .then((response) => {
          this.listaNotificacoes = response.data.dados
          this.titulo = "Notificações"
          if(this.listaNotificacoes.length > 0){
            response.data.dados.map((e) => {
                let dataString = e.DATA_FORMATADA
                let dataVetor = dataString.split(" ");

                e.DATA = dataVetor[0]
                e.HORA = dataVetor[1]
                return e
            });

            let count = this.listaNotificacoes.filter(item => {
              return item.DT_VISUALIZADO == null;
            })

            this.countBadge = count.length
          }else{
            this.titulo = "Sem Notificações"
          }
        })
        .catch((error) => {
          console.log(error);
        })
      },

      notificacaoVisualizada(nrSequencia){
        let headers = {
          'identificador-dispositivo': 'request-android',
          'chave-autenticacao': this.token
        }
        let data = {
          idCliente: this.cdPessoaFisica,
          idNotificacao: nrSequencia
        }

        this.axios.post('/notificacao/NotificacaoVisualizada', data, { headers: headers })
        .then((response) => {
          this.obterNotificacoesCliente()
        })
        .catch((error) => {
          console.log(error);
        })
      },

    Msg(
      title,
      msg,
      icon,
      time,
      btnConfirmar,
      titleBtnConfirmar,
      btnCancelar,
      titleBtnCancelar
    ) {
      Swal.fire({
        position: "center",
        icon: icon, //success, warning, error
        title: title,
        text: msg,

        showConfirmButton: btnConfirmar,
        confirmButtonText: titleBtnConfirmar,
        confirmButtonColor: "#32a976",

        showCancelButton: btnCancelar,
        cancelButtonColor: "#cd4949",
        cancelButtonText: titleBtnCancelar,

        timer: time,
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        } else {
        }
      });
    },

    recarregarDadosPaciente(){
        let that = this
        jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {
            that.token = decoded.chave
          });

          jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            that.cdPessoaFisica = decoded.titular.cdPessoaFisica
          });
      },

    logout() {
      this.$session.destroy();
      this.$router.push("/login");
      location.reload()
    }
  },


};
</script>

<style>
.lilateral{
  width: 100%;
}
.sidebarx{
  max-height: 60px;
}
.md-badge {
  margin-left:-16px !important;
  position: relative !important;
  right: -10px !important;
  margin-top: -8px;
}

</style>
