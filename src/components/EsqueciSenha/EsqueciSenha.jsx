import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EsqueciSenha.css";

export default function EsqueciSenha() {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(1); // 1 = verificar email, 2 = nova senha
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function verificarEmail() {
    if (!email) {
      setErro("Informe seu e-mail.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some((u) => u.email === email);

    if (!existe) {
      setErro("Nenhuma conta encontrada com esse e-mail.");
      return;
    }

    setErro("");
    setEtapa(2);
  }

  function redefinirSenha() {
    if (!novaSenha || !confirmarSenha) {
      setErro("Preencha os dois campos.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosAtualizados = usuarios.map((u) =>
      u.email === email ? { ...u, senha: novaSenha } : u
    );

    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));

    setErro("");
    setSucesso(true);
  }

  if (sucesso) {
    return (
      <div className="senha-page">
        <div className="senha-card">
          <h1>Senha redefinida!</h1>
          <p>Sua senha foi atualizada com sucesso.</p>
          <button
            type="button"
            className="btn-primario"
            onClick={() => navigate("/")}
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="senha-page">
      <div className="senha-card">

        {etapa === 1 && (
          <>
            <h1>Recuperar Senha</h1>
            <p>Informe o e-mail cadastrado na sua conta.</p>

            <form className="senha-form">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErro(""); }}
              />

              {erro && <p className="erro-msg">{erro}</p>}

              <button type="button" className="btn-primario" onClick={verificarEmail}>
                Verificar e-mail
              </button>

              <button type="button" className="btn-secundario" onClick={() => navigate("/")}>
                Voltar
              </button>
            </form>
          </>
        )}

        {etapa === 2 && (
          <>
            <h1>Nova Senha</h1>
            <p>Defina uma nova senha para <strong>{email}</strong></p>

            <form className="senha-form">
              <label>Nova senha</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={novaSenha}
                onChange={(e) => { setNovaSenha(e.target.value); setErro(""); }}
              />

              <label>Confirmar nova senha</label>
              <input
                type="password"
                placeholder="Repita a nova senha"
                value={confirmarSenha}
                onChange={(e) => { setConfirmarSenha(e.target.value); setErro(""); }}
              />

              {erro && <p className="erro-msg">{erro}</p>}

              <button type="button" className="btn-primario" onClick={redefinirSenha}>
                Redefinir senha
              </button>

              <button type="button" className="btn-secundario" onClick={() => { setEtapa(1); setErro(""); }}>
                Voltar
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
