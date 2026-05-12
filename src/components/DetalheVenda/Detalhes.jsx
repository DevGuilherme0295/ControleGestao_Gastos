import { useLocation, useNavigate } from "react-router-dom";
import "./Detalhes.css";

export default function DetalheVenda() {
  const navigate = useNavigate();
  const location = useLocation();
  const tipo = location.state?.tipo || "Movimentação";

  return (
    <div className="detalhe-page">
      <div className="detalhe-card">
        <h1>Detalhes</h1>
        <p>Informações completas da movimentação selecionada</p>

        <div className="detalhe-info">
          <div>
            <strong>Tipo:</strong>
            <span>{tipo}</span>
          </div>

          <div>
            <strong>Descrição:</strong>
            <span>Tomate</span>
          </div>

          <div>
            <strong>Quantidade:</strong>
            <span>10 Kg</span>
          </div>

          <div>
            <strong>Valor:</strong>
            <span>R$ 80,00</span>
          </div>

          <div>
            <strong>Forma de pagamento:</strong>
            <span>Pix</span>
          </div>

          <div>
            <strong>Data:</strong>
            <span>12/05/2026</span>
          </div>
        </div>

        <div className="detalhe-buttons">
          <button onClick={() => navigate("/resumo-dia")}>Voltar</button>

          <button>Editar</button>

          <button>Excluir</button>
        </div>
      </div>
    </div>
  );
}
