import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const { usuario, sair } = useAuth();

  async function fazerLogout() {
    await sair();
    navigate("/");
  }

  return (
    <div className="menu-page">
      <div className="menu-top-buttons">
        {usuario?.isAdmin && (
          <button className="admin-icon-button" onClick={() => navigate("/admin")} title="Administração">
            <ShieldCheck color="#ffffff" strokeWidth={2} />
          </button>
        )}
        <button className="logout-icon-button" onClick={fazerLogout} title="Sair">
          <LogOut color="#ffffff" strokeWidth={3} />
        </button>
      </div>

      <h1 className="menu-title">Menu Principal</h1>

      <div className="menu-grid">
        <button className="menu-card" onClick={() => navigate("/registro-vendas")}>
          Registro de Vendas
        </button>
        <button className="menu-card" onClick={() => navigate("/gastos-despesas")}>
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
        <button className="menu-card" onClick={() => navigate("/resumo-semanal")}>
          Resumo Semanal
        </button>
        <button className="menu-card menu-card-ia" onClick={() => navigate("/projecao-ia")}>
          ✨ Projeção com IA
        </button>
      </div>
    </div>
  );
}
