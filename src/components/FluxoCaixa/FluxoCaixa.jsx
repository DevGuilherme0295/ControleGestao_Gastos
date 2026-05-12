import { useNavigate } from "react-router-dom";
import "./FluxoCaixa.css";

export default function FluxoCaixa() {
  const navigate = useNavigate();

  return (
    <div className="fluxo-page">
      <div className="fluxo-container">

        <div className="fluxo-header">
          <h1>Fluxo de Caixa</h1>
          <p>Resumo financeiro das movimentações do negócio.</p>
        </div>

        <div className="fluxo-cards">

          <div className="fluxo-card entrada">
            <h2>Entradas</h2>
            <span>R$ 2.450,00</span>
          </div>

          <div className="fluxo-card saida">
            <h2>Saídas</h2>
            <span>R$ 980,00</span>
          </div>

          <div className="fluxo-card saldo">
            <h2>Saldo Atual</h2>
            <span>R$ 1.470,00</span>
          </div>

        </div>

        <div className="movimentacoes-box">
          <h2>Últimas movimentações</h2>

          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Entrada</td>
                <td>Venda de tomate</td>
                <td>R$ 120,00</td>
                <td>12/05/2026</td>
              </tr>

              <tr>
                <td>Saída</td>
                <td>Compra de mercadoria</td>
                <td>R$ 80,00</td>
                <td>12/05/2026</td>
              </tr>

              <tr>
                <td>Entrada</td>
                <td>Venda de banana</td>
                <td>R$ 210,00</td>
                <td>11/05/2026</td>
              </tr>
            </tbody>
          </table>
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