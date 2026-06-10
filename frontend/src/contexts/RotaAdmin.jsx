import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Redireciona para /menu se não for admin, ou para / se não estiver logado.
export default function RotaAdmin({ children }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/" replace />;
  if (!usuario.isAdmin) return <Navigate to="/menu" replace />;

  return children;
}
