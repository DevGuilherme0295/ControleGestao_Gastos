import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar } from "../../services/dadosService";
import { formatarData, formatarMoeda, labelMes } from "../../utils/formatters";
import "./FluxoCaixa.css";

export default function FluxoCaixa() {
  const navigate = useNavigate();

  const [todasMovimentacoes, setTodasMovimentacoes] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("todos");

  useEffect(() => {
    listar("movimentacoes").then(setTodasMovimentacoes);
  }, []);

  const mesesDisponiveis = [
    ...new Set(todasMovimentacoes.filter((m) => m.data).map((m) => m.data.slice(0, 7))),
  ].sort((a, b) => (a < b ? 1 : -1));

  const movimentacoesFiltradas =
    mesSelecionado === "todos"
      ? todasMovimentacoes
      : todasMovimentacoes.filter((m) => m.data?.startsWith(mesSelecionado));

  const totalEntradas = movimentacoesFiltradas
    .filter((m) => m.tipo === "Entrada")
    .reduce((acc, m) => acc + Number(m.valor), 0);

  const totalSaidas = movimentacoesFiltradas
    .filter((m) => m.tipo === "Saída")
    .reduce((acc, m) => acc + Number(m.valor), 0);

  let saldoCorrido = 0;
  const paraExibir = [...movimentacoesFiltradas]
    .sort((a, b) => (a.data > b.data ? 1 : -1))
    .map((m) => {
      saldoCorrido += m.tipo === "Entrada" ? Number(m.valor) : -Number(m.valor);
      return { ...m, saldoApos: saldoCorrido };
    })
    .reverse();

  return (
    <div className="fluxo-page">
      <div className="fluxo-container">
        <div className="fluxo-header">
          <h1>Fluxo de Caixa</h1>
          <p>Evolução do saldo ao longo das movimentações.</p>
          <select className="fluxo-filtro" value={mesSelecionado} onChange={(e) => setMesSelecionado(e.target.value)}>
            <option value="todos">Todos os períodos</option>
            {mesesDisponiveis.map((m) => (
              <option key={m} value={m}>{labelMes(m)}</option>
            ))}
          </select>
        </div>

        <div className="fluxo-cards">
          <div className="fluxo-card entrada"><h2>Total Entradas</h2><span>{formatarMoeda(totalEntradas)}</span></div>
          <div className="fluxo-card saida"><h2>Total Saídas</h2><span>{formatarMoeda(totalSaidas)}</span></div>
          <div className="fluxo-card saldo"><h2>Saldo Final</h2><span>{formatarMoeda(totalEntradas - totalSaidas)}</span></div>
        </div>

        <div className="movimentacoes-box">
          <h2>Movimentações</h2>
          <table>
            <thead>
              <tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Saldo</th></tr>
            </thead>
            <tbody>
              {paraExibir.length === 0 ? (
                <tr><td colSpan="5" className="fluxo-vazio">Nenhuma movimentação encontrada.</td></tr>
              ) : (
                paraExibir.map((m) => (
                  <tr key={m.id}>
                    <td>{formatarData(m.data)}</td>
                    <td><span className={m.tipo === "Entrada" ? "tipo-entrada" : "tipo-saida"}>{m.tipo}</span></td>
                    <td>{m.descricao}</td>
                    <td>{formatarMoeda(m.valor)}</td>
                    <td className={m.saldoApos >= 0 ? "saldo-positivo" : "saldo-negativo"}>
                      {formatarMoeda(m.saldoApos)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button className="voltar-button" onClick={() => navigate("/menu")}>Voltar</button>
      </div>
    </div>
  );
}
