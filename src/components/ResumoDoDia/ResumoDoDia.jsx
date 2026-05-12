import { useNavigate } from "react-router-dom";
import "./ResumoDoDia.css";

export default function ResumoDoDia() {
  const navigate = useNavigate();

  return (
    <div className="resumo-page">
      <div className="resumo-container">
        <div className="resumo-header">
          <h1>Resumo do Dia</h1>
          <p>Visualização rápida das movimentações do dia.</p>
        </div>

        <div className="resumo-cards">
          <div className="resumo-card entrada">
            <h2>Total de Entradas</h2>
            <span>R$ 1.850,00</span>
          </div>

          <div className="resumo-card saida">
            <h2>Total de Saídas</h2>
            <span>R$ 620,00</span>
          </div>

          <div className="resumo-card saldo">
            <h2>Lucro do Dia</h2>
            <span>R$ 1.230,00</span>
          </div>
        </div>

        <div className="resumo-lista">
          <h2>Movimentações recentes</h2>

          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Horário</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Entrada</td>
                <td>Venda de banana</td>
                <td>R$ 120,00</td>
                <td>08:15</td>
                <td>
                  <button className="detalhes-button" onClick={() => 
                  navigate("/detalhe-venda", {state: { tipo: "Entrada" }})
                    }
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr>
                <td>Saída</td>
                <td>Compra de sacolas</td>
                <td>R$ 35,00</td>
                <td>09:40</td>
                <td>
                  <button className="detalhes-button" onClick={() => 
                  navigate("/detalhe-venda", {state: { tipo: "Saída" }})
                    }
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr>
                <td>Entrada</td>
                <td>Venda de tomate</td>
                <td>R$ 210,00</td>
                <td>11:10</td>
                <td>
                  <button className="detalhes-button" onClick={() => 
                  navigate("/detalhe-venda", {state: { tipo: "Entrada" }})
                    }
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr>
                <td>Saída</td>
                <td>Gasolina</td>
                <td>R$ 70,00</td>
                <td>12:30</td>
                <td>
                  <button className="detalhes-button" onClick={() => 
                  navigate("/detalhe-venda", {state: { tipo: "Saída" }})
                    }
                  >
                    Ver detalhes
                  </button>
                </td>
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
