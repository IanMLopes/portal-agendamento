<template>
    <div>
        <beautiful-chat
          :participants="participants"
          :titleImageUrl="titleImageUrl"
          :onMessageWasSent="onMessageWasSent"
          :messageList="messageList"
          :newMessagesCount="newMessagesCount"
          :isOpen="isChatOpen"
          :close="closeChat"
          :icons="icons"
          :open="openChat"
          :showEmoji="false"
          :showFile="false"
          :showEdition="true"
          :showDeletion="true"
          :showTypingIndicator="showTypingIndicator"
          :showLauncher="true"
          :showCloseButton="true"
          :colors="colors"
          :alwaysScrollToBottom="alwaysScrollToBottom"
          :messageStyling="messageStyling"
          @onType="handleOnType"
          @edit="editMessage"
          style="z-index: 2; position: absolute;"
          v-show="showChat"
          ></beautiful-chat>

        <div class="vld-parent">
            <loading
                :active.sync="isLoading"
                :can-cancel="false"
                loader='dots'
                color='#1e7e34'
                :is-full-page="true">
            </loading>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/ 
  import {bus} from '../main'
  import Loading from 'vue-loading-overlay'
//   import 'vue-loading-overlay/dist/vue-loading.css'
  import jwt from 'jsonwebtoken'
  const Swal = require("sweetalert2");
  // import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import CloseIcon from '../assets/img/img_chat/close-icon.png'
  import OpenIcon from '../assets/img/img_chat/logo-no-bg.png'
  import FileIcon from '../assets/img/img_chat/file.svg'
  import CloseIconSvg from '../assets/img/img_chat/close.svg'
  import samelImagem from '../assets/img/img_chat/samel.png'
  import doctorImagem from '../assets/img/img_chat/doctor.jpg'
  
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        // socket: io('http://192.168.6.104:8102/'),
        socket: io('https://api-stream-telemedicina.samel.com.br/', { transports: ['polling', 'websocket'], upgrade: false}),
        showChat: false,
        chatUsers: [],
        idConversas: [],
        titular: {},
        dadosConexao: null,
        patient: [],
        isLoading: false,
        titulo: "Sem Notificações",
        classObject: {
          'tab-pane': true,
          active: false
        },
        show: false,
        listaNotificacoes: [],
        countBadge: 0,
        cdPessoaFisica: '',
        icons:{
          open:{
            img: OpenIcon,
            name: 'default',
          },
          close:{
            img: CloseIcon,
            name: 'default',
          },
          file:{
            img: FileIcon,
            name: 'default',
          },
          closeSvg:{
            img: CloseIconSvg,
            name: 'default',
          },
        },
        participants: [
          {
            id: 'user1',
            name: 'Médico',
            imageUrl: doctorImagem
          }
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: samelImagem,
        messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
        newMessagesCount: 0,
        isChatOpen: false, // to determine whether the chat window should be open or closed
        showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
        colors: {
          header: {
            bg: '#32a976',
            text: '#ffffff'
          },
          launcher: {
            bg: '#32a976'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#32a976',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }, // specifies the color scheme for the component
        alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
        messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      }
    },

    
   created(){

      this.receberMsg()
      bus.$on('reloadDataClient', (result) => {
        if (result) {
           this.carregarDados()
          this.dataChat()
          bus.$emit('reloadDataClient', false)
        }
      })
   },
    components: {
      Loading
    },
    methods: {
      carregarDados(){
        return new Promise(async resolve=>{
          let that = this

          await jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
            try {
              that.titular = decoded.titular
            } catch (error) {
              //pass
            }
            
          });
       
          resolve(true)
        })
      },
      enviarMsg(param){
        let json = {
          id: this.titular.cdPessoaFisica,//id da sala
          //id: "883358",//id da sala
          dataUser:{
            idUser: this.titular.cdPessoaFisica,
            user: this.titular.nome,
          },
          dataMsg: param
        }

        json.dataMsg.author = this.titular.cdPessoaFisica
        this.socket.emit('sendMessage', json, function () {})
        json.dataMsg.author = "me"
      },

      dataChat(){
        let dados = {
          id: this.titular.cdPessoaFisica,//id da sala
          data:{
            idUser: this.titular.cdPessoaFisica,
            user: this.titular.nome, //gera um numero aleatorio
          }
        }

        this.socket.emit('joinSala', dados, function () {})

          try {
            if(this.$session.get('Msg').length > 0 || this.$session.get('Msg')){
              this.messageList = this.$session.get('Msg')
              this.showChat = true
            }
          } catch (error) {
            //pass
          }  
      },


      receberMsg(){
        this.socket.on('receiveMessage', async (data)=>{
          console.log(data)
          this.showChat = true
          this.openChat()
          this.participants[0].name = data.dataUser.user
          let texto = data.dataMsg.data.text
          if (texto.length > 0) {
            this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
            this.messageList.push({ type: 'text', author: `user1`, data: { text: texto } })
            this.$session.set('Msg', this.messageList)
          }
        })
      },

       

      Msg(title, msg, icon, time, btnConfirmar, titleBtnConfirmar, btnCancelar, titleBtnCancelar, data) {
        Swal.fire({
          position: "center",
          icon: '', //success, warning, error
          title: title,
          text: msg,
          showConfirmButton: btnConfirmar,
          confirmButtonText: titleBtnConfirmar,
          confirmButtonColor: '#32a976',
          showCancelButton: btnCancelar,
          cancelButtonColor: '#cd4949',
          cancelButtonText: titleBtnCancelar,
          timer: time
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location = data.click_action;
          }else{
          }
        })
      },


      recarregarDadosPaciente(){
        let that = this
        jwt.verify(this.$session.get('user'), '9j7d8k20f##', function(err, decoded) {
          try {
            that.token = decoded.chave
          } catch (error) {
            //pass
          }
        });

        jwt.verify(this.$session.get('titular'), '9j7d8k20f##', function(err, decoded) {
          try {
            that.cdPessoaFisica = decoded.titular.cdPessoaFisica
          } catch (error) {
            //pass
          }
          
        });
      },
      

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
              this.$emit('getDetails', this.patient)
            }

          })
          .catch((error) => {
            this.$router.push('/login')
            this.isLoading = false
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
      },

      sendMessage (text, author) {
        if (text.length > 0) {
          this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
          this.onMessageWasSent({ author: author, type: 'text', data: { text } })
        }
      },
      onMessageWasSent (message) {
        // called when the user sends a message
        this.messageList = [ ...this.messageList, message ]
        this.$session.set('Msg', this.messageList)

        this.enviarMsg(message)
      },
      openChat () {
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true
        this.newMessagesCount = 0
      },
      closeChat () {
        // called when the user clicks on the botton to close the chat
        this.isChatOpen = false
      },
      handleScrollToTop () {
        // called when the user scrolls message list to top
        // leverage pagination for loading another page of messages
      },
      handleOnType () {
        console.log('Emit typing event')
      },
      editMessage(message){
        const m = this.messageList.find(m=>m.id === message.id);
        m.isEdited = true;
        m.data.text = message.data.text;
      }
    }
  }
</script>

</script>