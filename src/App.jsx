import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import RegistroVendas from "./components/RegistroVendas/RegistroVendas";
import GastosDespesas from "./components/GastosDespesas/GastosDespesas";
import FluxoCaixa from "./components/FluxoCaixa/FluxoCaixa";
import Estoque from "./components/Estoque/Estoque";
import ResumoDoDia from "./components/ResumoDoDia/ResumoDoDia";
import ResumoSemanal from "./components/ResumoSemanal/ResumoSemanal";
import Cadastro from "./components/Cadastro/Cadastro";
import DetalheVenda from "./components/DetalheVenda/Detalhes";

import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/registro-vendas" element={<RegistroVendas />} />
      <Route path="/gastos-despesas" element={<GastosDespesas />} />
      <Route path="/fluxo-caixa" element={<FluxoCaixa />} />
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/resumo-dia" element={<ResumoDoDia />} />
      <Route path="/resumo-semanal" element={<ResumoSemanal />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/detalhe-venda" element={<DetalheVenda />} />
    </Routes>
  );
}

export default App;