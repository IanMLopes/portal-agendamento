import Swal from "sweetalert2";

 //CONFIGURAÇÃO FIRE BASE
 const firebaseConfig = {
    apiKey: "AIzaSyAyZhY9fA5rhFHuemdrXIhQ0W-jymPgFlU",
    authDomain: "appsamelv2-88114.firebaseapp.com",
    databaseURL: "https://appsamelv2-88114.firebaseio.com",
    projectId: "appsamelv2-88114",
    storageBucket: "appsamelv2-88114.appspot.com",
    messagingSenderId: "624377792513",
    appId: "1:624377792513:web:3d60c79b5e6ce315c3d800"
  };

  function Msg(title, msg, icon, time, btnConfirmar, titleBtnConfirmar, btnCancelar, titleBtnCancelar, data) {
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
  }

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.usePublicVapidKey('BM-6oB87qqnDp1HI1bXBRkR4YS9ndyOBAeDmDL0JFjBjdpf7JMRrPZP7Wou58yob5Pf4AMgrhXV_PLfsFdxGVi8')

  messaging.requestPermission()
  .then(function(){
    // console.log('Tem permissao')
    return messaging.getToken();
  })
  .then(function(token){
    sessionStorage.setItem('tokenFire', token)
    // console.log("Esse é o token: " + token);
    
  })
  .catch(function(err){
    console.log("Error meu:" + err)
  })

  messaging.onMessage((payload) => {
    if(payload.data.tipo == 'Notificacao'){
      Msg(payload.notification.title, payload.notification.body, 'warning', '', false, 'Confirmar', false, 'Cancelar', payload.notification)
    }else{
      Msg(payload.notification.title, payload.notification.body, 'warning', '', true, 'Confirmar', true, 'Cancelar', payload.notification)
    }

    self.registration.showNotification(notificationTitle, notificationOptions);

    var notification = new Notification(notificationTitle,notificationOptions);
    notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(payload.notification.click_action , '_blank');
        notification.close();
    }
  })




    
