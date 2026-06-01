import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar } from "../../services/dadosService";
import { dataAtualISO, formatarMoeda } from "../../utils/formatadores";
import "./ResumoDoDia.css";

export default function ResumoDoDia() {
  const navigate = useNavigate();

  const [todasMovimentacoes, setTodasMovimentacoes] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(dataAtualISO());

  useEffect(() => {
    listar("movimentacoes").then(setTodasMovimentacoes);
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
            <span>{formatarMoeda(totalEntradas)}</span>
          </div>

          <div className="resumo-card saida">
            <h2>Total de Saídas</h2>
            <span>{formatarMoeda(totalSaidas)}</span>
          </div>

          <div className="resumo-card saldo">
            <h2>Lucro do Dia</h2>
            <span>{formatarMoeda(lucroDia)}</span>
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
                    <td>{formatarMoeda(movimentacao.valor)}</td>
                    <td>{movimentacao.horario || "--:--"}</td>
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
