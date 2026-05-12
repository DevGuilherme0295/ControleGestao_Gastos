import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <h1>Cadastro</h1>
        <p>Crie uma conta para acessar o sistema.</p>

        <form className="cadastro-form">
          <label>Nome completo</label>
          <input type="text" placeholder="Digite seu nome" />

          <label>E-mail</label>
          <input type="email" placeholder="Digite seu e-mail" />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />

          <label>Confirmar senha</label>
          <input type="password" placeholder="Confirme sua senha" />

          <div className="cadastro-buttons">
            <button type="button" onClick={() => navigate("/")}>
              Voltar
            </button>

            <button type="button" onClick={() => navigate("/menu")}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}