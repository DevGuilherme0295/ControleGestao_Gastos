import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ResumoDoDia.css";

export default function ResumoDoDia() {
  const navigate = useNavigate();

  const hoje = new Date().toISOString().split("T")[0];

  const [todasMovimentacoes, setTodasMovimentacoes] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(hoje);

  useEffect(() => {
    const movimentacoesSalvas =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];
    setTodasMovimentacoes(movimentacoesSalvas);
  }, []);

  const movimentacoes = todasMovimentacoes.filter(
    (m) => m.data === dataSelecionada
  );

  const totalEntradas = movimentacoes
    .filter((movimentacao) => movimentacao.tipo === "Entrada")
    .reduce((total, movimentacao) => total + Number(movimentacao.valor), 0);

  const totalSaidas = movimentacoes
    .filter((movimentacao) => movimentacao.tipo === "Saída")
    .reduce((total, movimentacao) => total + Number(movimentacao.valor), 0);

  const lucroDia = totalEntradas - totalSaidas;

  return (
    <div className="resumo-page">
      <div className="resumo-container">
        <div className="resumo-header">
          <h1>Resumo do Dia</h1>
          <p>Visualização rápida das movimentações do dia.</p>
          <input
            type="date"
            className="resumo-data"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>

        <div className="resumo-cards">
          <div className="resumo-card entrada">
            <h2>Total de Entradas</h2>
            <span>R$ {totalEntradas.toFixed(2)}</span>
          </div>

          <div className="resumo-card saida">
            <h2>Total de Saídas</h2>
            <span>R$ {totalSaidas.toFixed(2)}</span>
          </div>

          <div className="resumo-card saldo">
            <h2>Lucro do Dia</h2>
            <span>R$ {lucroDia.toFixed(2)}</span>
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
                <th>Data</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {movimentacoes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="lista-vazia">
                    Nenhuma movimentação encontrada para este dia.
                  </td>
                </tr>
              ) : (
                movimentacoes.map((movimentacao, index) => (
                  <tr key={index}>
                    <td>
                      <span className={movimentacao.tipo === "Entrada" ? "tipo-entrada" : "tipo-saida"}>
                        {movimentacao.tipo}
                      </span>
                    </td>
                    <td>{movimentacao.descricao}</td>
                    <td>R$ {Number(movimentacao.valor).toFixed(2)}</td>
                    <td>{movimentacao.data.split("-").reverse().join("/")}</td>
                    <td>
                      <button
                        className="detalhes-button"
                        onClick={() =>
                          navigate("/detalhe-venda", {
                            state: movimentacao,
                          })
                        }
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
