import { useNavigate } from "react-router-dom";
import "./EsqueciSenha.css";

export default function EsqueciSenha() {
  const navigate = useNavigate();

  return (
    <div className="senha-page">
      <div className="senha-card">
        <h1>Recuperar Senha</h1>
        <p>Informe seu e-mail para receber as instruções de recuperação.</p>

        <form className="senha-form">
          <label>E-mail</label>
          <input type="email" placeholder="Digite seu e-mail" />

          <button type="button">
            Enviar instruções
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}