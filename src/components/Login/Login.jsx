import { useNavigate } from "react-router-dom";
import { HouseIcon } from "lucide-react";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  function entrarSistema() {
    navigate("/menu");
  }

  return (
    <div className="login-page">
      <section className="login-banner">
        <div className="logo-box">
          <div className="logo-symbol">
            <HouseIcon size={50} strokeWidth={1.5}/>  
          </div>
          <h1>Feira-Livre</h1>
          <p>Sistema de Controle e Gestão de Gastos</p>
        </div>
      </section>

      <section className="login-content">
        <div className="login-card">
          <h2>Entrar</h2>
          <p>Acesse sua conta para continuar</p>

          <form>
            <label>E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" />

            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" />

            <button id="entrar" type="button" onClick={entrarSistema}>
              Entrar
            </button>
          </form>

          <a href="/esqueci-senha">Esqueceu a senha?</a>

          <button
            id="realizar-cadastro"
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Realizar Cadastro
          </button>
        </div>
      </section>
    </div>
  );
}
