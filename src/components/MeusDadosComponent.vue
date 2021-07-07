<template>
  <md-card>
    <md-card-content>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">
          {{ $route.name }}
        </h4>
        <p class="category"> Subtitulo </p>
      </md-card-header>
      <div class="vld-parent">
    </div>
    <!-------------- Content ----------->
     <!-------------------------------------- Seleção do tipo de cosulta --------------------------------------------------------->
      <div
        class="md-layout"
        style="display: flex; justify-content: center;"
        >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoConsulta(1)"
        >
          <md-card>
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
              <div class="md-card-avatar divCard">
                <img
                  class="img imgCard"
                  src="../assets/img/file-medical-solid.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Atestados</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
      </div>


    </md-card-content>
  </md-card>
</template>

