import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./EsqueciSenha.css";

export default function EsqueciSenha() {
  const navigate = useNavigate();
  const { recuperarSenha } = useAuth();

  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleEnviar() {
    if (!email) {
      setErro("Informe seu e-mail.");
      return;
    }

    setCarregando(true);
    try {
      await recuperarSenha(email);
      setSucesso(true);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        setErro("Nenhuma conta encontrada com esse e-mail.");
      } else {
        setErro("Erro ao enviar e-mail. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  if (sucesso) {
    return (
      <div className="senha-page">
        <div className="senha-card">
          <h1>E-mail enviado!</h1>
          <p>
            Verifique sua caixa de entrada em <strong>{email}</strong> e siga
            as instruções para redefinir sua senha.
          </p>
          <button type="button" className="btn-primario" onClick={() => navigate("/")}>
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="senha-page">
      <div className="senha-card">
        <h1>Recuperar Senha</h1>
        <p>Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>

        <form className="senha-form">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErro(""); }}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <button type="button" className="btn-primario" onClick={handleEnviar} disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link de recuperação"}
          </button>
          <button type="button" className="btn-secundario" onClick={() => navigate("/")}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}
