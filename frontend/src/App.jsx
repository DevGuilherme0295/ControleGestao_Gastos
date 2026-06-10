import { Routes, Route } from "react-router-dom";

import RotaProtegida from "./contexts/RotaProtegida";
import RotaAdmin from "./contexts/RotaAdmin";

import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Menu from "./pages/Menu/Menu";
import RegistroVendas from "./pages/RegistroVendas/RegistroVendas";
import GastosDespesas from "./pages/GastosDespesas/GastosDespesas";
import FluxoCaixa from "./pages/FluxoCaixa/FluxoCaixa";
import Estoque from "./pages/Estoque/Estoque";
import ResumoDoDia from "./pages/ResumoDoDia/ResumoDoDia";
import ResumoSemanal from "./pages/ResumoSemanal/ResumoSemanal";
import ProjecaoIA from "./pages/ProjecaoIA/ProjecaoIA";
import Cadastro from "./pages/Cadastro/Cadastro";
import DetalheVenda from "./pages/DetalheVenda/Detalhes";
import EsqueciSenha from "./pages/EsqueciSenha/EsqueciSenha";

import "./index.css";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />

      {/* Rotas protegidas */}
      <Route path="/menu" element={<RotaProtegida><Menu /></RotaProtegida>} />
      <Route path="/registro-vendas" element={<RotaProtegida><RegistroVendas /></RotaProtegida>} />
      <Route path="/gastos-despesas" element={<RotaProtegida><GastosDespesas /></RotaProtegida>} />
      <Route path="/fluxo-caixa" element={<RotaProtegida><FluxoCaixa /></RotaProtegida>} />
      <Route path="/estoque" element={<RotaProtegida><Estoque /></RotaProtegida>} />
      <Route path="/resumo-dia" element={<RotaProtegida><ResumoDoDia /></RotaProtegida>} />
      <Route path="/resumo-semanal" element={<RotaProtegida><ResumoSemanal /></RotaProtegida>} />
      <Route path="/projecao-ia" element={<RotaProtegida><ProjecaoIA /></RotaProtegida>} />
      <Route path="/detalhe-venda" element={<RotaProtegida><DetalheVenda /></RotaProtegida>} />
      <Route path="/admin" element={<RotaAdmin><Admin /></RotaAdmin>} />
    </Routes>
  );
}

export default App;
