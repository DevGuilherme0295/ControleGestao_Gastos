import { useNavigate } from "react-router-dom";
import "./ResumoSemanal.css";

export default function ResumoSemanal() {
  const navigate = useNavigate();

  return (
    <div className="semanal-page">
      <div className="semanal-container">
        <div className="semanal-header">
          <h1>Resumo Semanal</h1>
          <p>Desempenho financeiro geral da semana.</p>
        </div>

        <div className="semanal-cards">
          <div className="semanal-card entrada">
            <h2>Total de Entradas</h2>
            <span>R$ 7.450,00</span>
          </div>

          <div className="semanal-card saida">
            <h2>Total de Saídas</h2>
            <span>R$ 2.830,00</span>
          </div>

          <div className="semanal-card saldo">
            <h2>Lucro Semanal</h2>
            <span>R$ 4.620,00</span>
          </div>
        </div>

        <div className="semanal-infos">
          <div className="info-box">
            <h2>Produto Mais Vendido</h2>
            <span>Tomate</span>
            <p>245 Kg vendidos na semana</p>
          </div>

          <div className="info-box">
            <h2>Maior Receita Diária</h2>
            <span>R$ 1.500,00</span>
            <p>Sexta-feira</p>
          </div>

          <div className="info-box">
            <h2>Maior Gasto</h2>
            <span>Compra de Mercadoria</span>
            <p>R$ 1.120,00</p>
          </div>
        </div>

        <button
          className="voltar-button"
          onClick={() => navigate("/menu")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}