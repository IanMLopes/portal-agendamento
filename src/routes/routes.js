/* eslint-disable */
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login";
import Inicio from "@/pages/Inicio";
import AgendarConsulta from "@/pages/AgendarConsulta.vue";
import AgendarExame from "@/pages/AgendarExame";
import MeusDados from "@/pages/MeusDados";
import EditarDados from "@/pages/EditarDados";
import AtualizarSenha from "@/pages/AtualizarSenha";
import Historico from "@/pages/Historico";
import VerCancelarConsultaExame from "@/pages/Ver-Cancelar-Consulta-Exame";
import ResultadosExames from "@/pages/ResultadosExames";
import recuperarSenha from '@/pages/RecuperarSenha';
import Registrar from '@/pages/Registrar';
import MeuProntuario from '@/pages/MeuProntuario'
import Telemedicina from '@/pages/Telemedicina'
import MinhaInternacao from '@/pages/MinhaInternacao'
import RedefinirSenha from '@/pages/RedefinirSenha'




const routes = [

  {
    path: "/",
    component: DashboardLayout,
    redirect: "/inicio",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: '/recuperarSenha',
        name: 'recuperarSenha',
        component: recuperarSenha
      },
      {
        path: '/registrar',
        name: 'Registrar',
        component: Registrar
      },
      {
        path: "inicio",
        name: "Início",
        component: Inicio
      },
      {
        path: "agendar/consulta",
        name: "Agendar Consulta",
        component: AgendarConsulta
      },
      {
        path: "agendar/exame",
        name: "Agendar Exame",
        component: AgendarExame
      },
      {
        path: "meusdados",
        name: "Meus dados",
        component: MeusDados
      },
      {
        path: "editardados",
        name: "Editar dados",
        component: EditarDados
      },
      {
        path: "atualizarsenha",
        name: "Atualizar senha",
        component: AtualizarSenha
      },
      {
        path: "historico",
        name: "Histórico",
        component: Historico
      },
      {
        path: "telemedicina",
        name: "Telemedicina",
        component: Telemedicina
      },
      {
        path: "ver-cancelar-consulta-exame",
        name: "Ver/Cancelar Consulta ou Exame",
        component: VerCancelarConsultaExame
      },
      {
        path: "resultado-de-exames",
        name: "Resultado de Exames",
        component: ResultadosExames
      },
      {
        path: "meu-prontuario",
        name: "Meu prontuario",
        component: MeuProntuario
      },
      {
        path: "minha-internacao",
        name: "Minha internação",
        component: MinhaInternacao
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      
    ]
  },
  
  {
        path: "/redefinirsenha/:hash",
        name: "redefinirsenha",
        component: RedefinirSenha
      },
];

export default routes;
