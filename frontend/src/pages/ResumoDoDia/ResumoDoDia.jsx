import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar } from "../../services/dadosService";
import { formatarData, formatarMoeda, getHoje } from "../../utils/formatters";
import "./ResumoDoDia.css";

export default function ResumoDoDia() {
  const navigate = useNavigate();

  const [todasMovimentacoes, setTodasMovimentacoes] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(getHoje());
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listar("movimentacoes").then((dados) => {
      setTodasMovimentacoes(dados);
      setCarregando(false);
    });
  }, []);

  const movimentacoes = todasMovimentacoes.filter((m) => m.data === dataSelecionada);

  const totalEntradas = movimentacoes
    .filter((m) => m.tipo === "Entrada")
    .reduce((acc, m) => acc + Number(m.valor), 0);

  const totalSaidas = movimentacoes
    .filter((m) => m.tipo === "Saída")
    .reduce((acc, m) => acc + Number(m.valor), 0);

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
          <h2>Movimentações do dia</h2>
          {carregando ? (
            <p style={{ color: "#888", textAlign: "center", padding: "24px" }}>Carregando...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Tipo</th><th>Descrição</th><th>Valor</th><th>Data</th><th>Ação</th>
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
                  movimentacoes.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <span className={m.tipo === "Entrada" ? "tipo-entrada" : "tipo-saida"}>
                          {m.tipo}
                        </span>
                      </td>
                      <td>{m.descricao}</td>
                      <td>{formatarMoeda(m.valor)}</td>
                      <td>{formatarData(m.data)}</td>
                      <td>
                        <button
                          className="detalhes-button"
                          onClick={() => navigate("/detalhe-venda", { state: m })}
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <button className="voltar-button" onClick={() => navigate("/menu")}>Voltar</button>
      </div>
    </div>
  );
}
