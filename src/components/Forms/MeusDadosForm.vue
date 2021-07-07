<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ $route.name }}</h4>
      </md-card-header>
    <md-card-actions  style="border-top:none; m-0" md-alignment="space-between">
        <b-button
        @click="btnVoltar" 
        variant="outline-success"
        style="border:none"
          ><i :class="menuSelecionado == 0 ? '' : 'fas fa-arrow-left'"></i> {{menuSelecionado == 0 ? 'Início' : 'Voltar'}}
        </b-button>
      </md-card-actions>

      <md-card-content>
        <!-------------------------------------- Seleção do tipo de cosulta --------------------------------------------------------->
      <div
        class="md-layout"
        style="display: flex; justify-content: center;"
        v-if="menuSelecionado == 0"
        >
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoMenu(1)"
        >
          <md-card>
            <md-ripple>
              <md-card-content
                style="padding: 30px 0px 30px 0px;"
                class="cardItem"
              >
              <div class="md-card-avatar divCard" style="margin-bottom: 20px">
                <img
                  class="img imgCard"
                  src="../../assets/img/incons-card/Grupo 173@3x (1).png"
                  style="width: 45px; height: 50px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Dados pessoais</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
          @click="selecionarTipoMenu(2)"
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
                  src="../../assets/img/incons-card/user-edit-solid.svg"
                  style="width: 60px; height: 60px;"
                />
              </div>
              <div style="text-align: center;">
                <strong>Atualizar senha</strong>
              </div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
      </div>

      <!-- --------Form Meus Dados----- -->
        <div class="md-layout" v-if="menuSelecionado == 1">
          
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nome</label>
              <md-input v-model="titular.nome" type="text" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>RG</label>
              <md-input v-model="titular.rg" type="number" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>CPF</label>
              <md-input  v-model="titular.cpf" type="number" disabled></md-input>
            </md-field>
          </div>


          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email</label>
              <md-input v-model="titular.email" type="email" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Celular</label>
              <md-input v-model="titular.celular" type="number" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Gênero</label>
              <md-input v-model="genero" type="text" disabled></md-input>
            </md-field>
          </div>


          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Código da Carteirinha</label>
              <md-input v-model="titular.codCarteirinha" type="number" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Data de Nascimento</label>
              <md-input v-model="titular.nascimento2" type="text" disabled></md-input>
            </md-field>
          </div>

          <!-- Endereço -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Endereço</label>
              <md-input v-model="titular.endereco" type="text" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Número</label>
              <md-input
                v-model="titular.numero"
                type="number"
                disabled
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-field>
              <label>Complemento</label>
              <md-input v-model="titular.complemento" type="text" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Cep</label>
              <md-input v-model="titular.cep" type="text" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Bairro</label>
              <md-input v-model="titular.bairro" type="text" disabled></md-input>
            </md-field>
          </div>

          <div v-if="titular.municipio" class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Cidade</label>
              <md-input v-model="titular.municipio" type="text" disabled></md-input>
            </md-field>
          </div>

          <div v-if="titular.uf" class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Estado</label>
              <md-input v-model="titular.uf" type="text" disabled></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" href="/editardados">Editar dados</md-button>
          </div>
        </div>
        <editar-dados-form v-if="menuSelecionado == 3"></editar-dados-form>
        <atualizar-senha-form v-if="menuSelecionado == 2"></atualizar-senha-form>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>

import atualizarSenhaForm from '../Forms/AtualizarSenhaForm'
import editarDadosForm from '../Forms/EditarDadosForm.vue'



export default {
  name: "meus-dados-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    },

    titular: {
    type: Object,
    default: function () {
      return { message: 'Sem dados' }
      }
    }
  },
  components:{
    atualizarSenhaForm,
    editarDadosForm
  },
  mixins:[],
  directives:{},
  data(){
    return {
      genero: this.titular.sexo == 'F' ? 'Feminino' : 'Masculino',
      menuSelecionado: 0, //1 - Visualizar Dados 2-Editar Dados
    }
  },
  methods: {
    btnVoltar(){
      if(this.menuSelecionado != 0){
        this.menuSelecionado = 0
        return
      }

      this.$router.push('/inicio')
    },

    selecionarTipoMenu(menu){ 
      if(menu == 1){
        this.menuSelecionado = menu
        return
      }

      this.menuSelecionado = menu
    }
  }
};
</script>
<style></style>
