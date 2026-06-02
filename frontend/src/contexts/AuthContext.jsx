import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Hoje valida contra localStorage.
// Quando o backend estiver pronto, trocar o bloco de `entrar` por uma chamada fetch.
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    () => JSON.parse(localStorage.getItem("usuarioLogado")) || null
  );

  async function entrar(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const encontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!encontrado) throw new Error("E-mail ou senha incorretos.");

    localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
    setUsuario(encontrado);
  }

  async function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
