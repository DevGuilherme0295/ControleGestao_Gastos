import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Redireciona para "/" se o usuário não estiver logado.
// Envolva as rotas privadas no App.jsx com este componente.
export default function RotaProtegida({ children }) {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/" replace />;
}
