import { useNavigate } from "react-router-dom";
import "./Estoque.css";

export default function Estoque() {
  const navigate = useNavigate();

  return (
    <div className="estoque-page">
      <div className="estoque-container">
        <div className="estoque-header">
          <h1>Estoque</h1>
          <p>Controle simples dos produtos disponíveis para venda.</p>
        </div>

        <div className="estoque-card">
          <h2>Adicionar produto</h2>

          <form className="estoque-form">
            <input type="text" placeholder="Nome do produto" />
            <input type="number" placeholder="Quantidade" />

            <select>
              <option>Kg</option>
              <option>Unidade</option>
              <option>Caixa</option>
              <option>Maço</option>
            </select>

            <button type="button">Adicionar</button>
          </form>
        </div>

        <div className="estoque-lista">
          <h2>Produtos em estoque</h2>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Tomate</td>
                <td>25</td>
                <td>Kg</td>
                <td>Disponível</td>
              </tr>

              <tr>
                <td>Banana</td>
                <td>8</td>
                <td>Kg</td>
                <td>Baixo estoque</td>
              </tr>

              <tr>
                <td>Alface</td>
                <td>15</td>
                <td>Maço</td>
                <td>Disponível</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="voltar-button" onClick={() => navigate("/menu")}>
          Voltar
        </button>
      </div>
    </div>
  );
}