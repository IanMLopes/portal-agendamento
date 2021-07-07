<template>
  <footer class="footer" :style="$route.name == 'Login' ?  'padding:0; margin-top: 1%;' : 'padding:0; margin-top: -28px;'" >
    <div class="container">
      <div>
        <strong>REDES SOCIAIS</strong>
         <ul>
          <li>
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
      </div>
      <div>
        <strong>APLICATIVO DISPONÍVEL PARA</strong>
        <ul>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.appsamelv3" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/android.png"/>
            </a>
          </li>
          <li>
            <a href="https://apps.apple.com/br/app/samel-assist%C3%AAncia-medica/id1475154859" class="ahref">
              <img class="imgahref" src="../../assets/img/icons-rodape/apple.png"/>
            </a>
          </li>
        </ul>
      </div>
      <div>
          <strong>Samel Health Tech &copy; {{ new Date().getFullYear() }}</strong>
          <ul>
            <li>
              <div class="copyright text-center">
                <a href="http://healthtech.samel.com.br/" target="_blank" class="ahref" style="color: #32a976;">
                  <img  src="../../assets/img/logo_healt_tech.png" style="width:60px; margin-top:-15px;"/>
                </a><!-- , made with <i class="fa fa-heart heart"></i> for a better web -->
              </div>
              
            </li>
          </ul>
        </div>
      <nav>

      </nav>
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

.imgahref{
  width: 35px;
  max-height: 35px;
}
</style>
