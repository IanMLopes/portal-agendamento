<template>
 
    
    <footer class="footer" :style="$route.name == 'Login' ?  'padding:0; margin-top: 1%; !important': 'margin-top: -10px; !important'" >
    <div class="container">
      <div style=" margin-top:60px;   align-items: center; justify-content: center; width: auto">
        <ul style="display: flex;  flex-direction: column; justify-content: center; align-items: center; width: auto;">
           <strong style="color: #30A473; font-weight: 700;  text-align: center;">APP DISPONÍVEL</strong>
          <li style="margin-top: 21px">
            <a href="https://play.google.com/store/apps/details?id=com.appsamelv3" style="padding: 0px !important " >
              <img  src="../../assets/img/icons-rodape/android_2.png" style="width: 99px; height: 32px"/>
            </a>
          </li>
          <li style="margin-top: 7px !important;">
            <a href="https://apps.apple.com/br/app/samel-assist%C3%AAncia-medica/id1475154859" style="padding: 0px !important " >
              <img  src="../../assets/img/icons-rodape/apple_2.png" style="width: 99px; height: 30px;"/>
            </a>
          </li>
        </ul>
      </div>
      <div style=" margin-top:60px;  align-items: center; justify-content: center; width: auto">
        <ul style="display: flex;  flex-direction: column; justify-content: center; align-items: center; width: auto;">
           <strong style="color: #30A473; font-weight: 700;  text-align: center;">DESENVOLVIDO POR </strong>
          <li style="margin-top: 30px">
            <a href="https://healthtech.samel.com.br/" style="padding: 0px !important " class="ahref" >
              <img src="../../assets/img/icons-rodape/health-tech.svg" style="width: 142px !important; height: 62px !important; padding: 0px"/>
            </a>
          </li>
        </ul>
      </div>
      <div class="samel-link">
        <ul >
           <strong style="color: #30A473; font-weight: 700;  text-align: center;">SAMEL</strong>
         <a href="https://www.samel.com.br/" style="color: inherit; "><li style="margin-top: 24px">   <img class="imgahref" src="../../assets/img/icons-rodape/coolicon.svg" style="width: 6px !important; height: 11px !important; margin-bottom:2px"/> Site Samel</li></a> 
         <a href="https://blog.samel.com.br/" style="color: inherit; "> <li>  <img class="imgahref" src="../../assets/img/icons-rodape/coolicon.svg" style="width: 6px !important; height: 11px !important; margin-bottom:2px"/> Blog Samel</li></a>
         <a href="https://capsulavanessa.samel.com.br/" style="color: inherit; "><li>  <img class="imgahref" src="../../assets/img/icons-rodape/coolicon.svg" style="width: 6px !important; height: 11px !important; margin-bottom:2px"/> Cápsula Vanessa</li></a>
         <a href="https://healthtech.samel.com.br/" style="color: inherit; "> <li>  <img class="imgahref" src="../../assets/img/icons-rodape/coolicon.svg" style="width: 6px !important; height: 11px !important; margin-bottom:2px"/> Samel Health Tech</li></a>

        </ul>
      </div>
      <div style=" margin-top:60px;   align-items: center; justify-content: center; width: auto">
        <ul>
          <li style="color: #30A473; font-weight: 700;  text-align: center;">FIQUE CONECTADO</li>
        <ul style="display: flex;   justify-content: center; align-items: center; width: auto; margin-top: 24px">
          <li style="">
            <a href="https://www.facebook.com/sameloficial" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/facebook.png"/>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/oficialsamel" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/twitter.png"/>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/gruposamel" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/linkedin.png"/>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCKbEHhciz01QzgxftB3BVEw" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/youtube.png"/>
            </a>
          </li>
          <li>
            <a href="http://www.instagram.com/sameloficial" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/instagram.png"/>
            </a>
          </li>
        </ul>
        </ul>
      </div>
    </div>
    <div class="footer-bottom" >
        <div class="texto-footer">
        <strong>&copy; {{ new Date().getFullYear() }} © 2021 Samel Assistência Médica. Todos os direitos reservados. </strong>
        <strong> CNPJ 84.537.141/0001-38</strong>
        </div>
      </div>
    </footer>
  
</template>
<script>
export default {};
</script>
<style>

.ahref{
  padding: 0px;
  margin-left: -5px;
  margin-right: 15px;
}
.footer {
  padding: 0px;
  margin: 0px;
  background: #DFDFDF;
  height: 280px;
  width: 100%;
}
.imgahref{
  width: 35px;
  max-height: 35px;
}
.footer-bottom{
  display: flex;
  background: #30A473;
  height: 58px;
  width:100%;
  margin-top: 3.4%;

}

.texto-footer {
  display: flex;
  flex-direction: column;  
  margin: auto auto;
  color: #FFF;
  text-align: center;  
}
.samel-link li {
  text-align: left;
  margin-left: 70px
}

.samel-link{
 margin-top:60px;
 align-items: center;
 justify-content: center;
 width: auto
}
.samel-link ul{
  display: flex;  
  flex-direction: column;
  width: auto;
}

li ::marker {
  text-decoration: none;
}


</style>
