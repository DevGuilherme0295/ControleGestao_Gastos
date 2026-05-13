import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';


import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      
      <button className="logout-icon-button" onClick={() => navigate("/")}>
        <LogOut color="#ffffff" strokeWidth={3}/>
      </button>

      <h1 className="menu-title">Menu Principal</h1>

      <div className="menu-grid">
        <button
          className="menu-card"
          onClick={() => navigate("/registro-vendas")}
        >
          Registro de Vendas
        </button>

        <button
          className="menu-card"
          onClick={() => navigate("/gastos-despesas")}
        >
          Gastos / Despesas
        </button>

        <button className="menu-card" onClick={() => navigate("/fluxo-caixa")}>
          Fluxo de Caixa
        </button>

        <button className="menu-card" onClick={() => navigate("/estoque")}>
          Estoque
        </button>

        <button className="menu-card" onClick={() => navigate("/resumo-dia")}>
          Resumo Diário
        </button>

        <button
          className="menu-card"
          onClick={() => navigate("/resumo-semanal")}
        >
          Resumo Semanal
        </button>
      </div>
    </div>
  );
}
