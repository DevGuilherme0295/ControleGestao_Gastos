import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovimentacoes } from "../../utils/storage";
import { formatarMoeda } from "../../utils/formatters";
import { DIAS_SEMANA } from "../../utils/constants";
import "./ResumoSemanal.css";

function getIntervaloSemana(offsetSemanas) {
  const hoje = new Date();
  const diaSemana = hoje.getDay();
  const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

  const segunda = new Date(hoje);
  segunda.setDate(hoje.getDate() + diffParaSegunda + offsetSemanas * 7);
  segunda.setHours(0, 0, 0, 0);

  const domingo = new Date(segunda);
  domingo.setDate(segunda.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  return { inicio: segunda, fim: domingo };
}

function formatarExibicao(date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export default function ResumoSemanal() {
  const navigate = useNavigate();

  const [offsetSemana, setOffsetSemana] = useState(0);
  const [todasMovimentacoes, setTodasMovimentacoes] = useState([]);

  useEffect(() => {
    setTodasMovimentacoes(getMovimentacoes());
  }, []);

  const { inicio, fim } = getIntervaloSemana(offsetSemana);

  const movimentacoesSemana = todasMovimentacoes.filter((m) => {
    const dataMov = new Date(m.data + "T00:00:00");
    return dataMov >= inicio && dataMov <= fim;
  });

  const entradas = movimentacoesSemana.filter((m) => m.tipo === "Entrada");
  const saidas = movimentacoesSemana.filter((m) => m.tipo === "Saída");

  const totalEntradas = entradas.reduce((acc, m) => acc + Number(m.valor), 0);
  const totalSaidas = saidas.reduce((acc, m) => acc + Number(m.valor), 0);
  const lucroSemanal = totalEntradas - totalSaidas;

  // Produto mais vendido (por quantidade)
  const produtosMap = {};
  entradas.forEach((m) => {
    const chave = m.produto || m.descricao;
    if (!produtosMap[chave]) produtosMap[chave] = { quantidade: 0, unidade: m.unidade || "" };
    produtosMap[chave].quantidade += Number(m.quantidade) || 0;
  });
  const produtoMaisVendido = Object.entries(produtosMap)
    .sort((a, b) => b[1].quantidade - a[1].quantidade)[0];

  // Maior receita diária
  const receitaPorDia = {};
  entradas.forEach((m) => {
    receitaPorDia[m.data] = (receitaPorDia[m.data] || 0) + Number(m.valor);
  });
  const melhorDiaEntry = Object.entries(receitaPorDia).sort((a, b) => b[1] - a[1])[0];
  const melhorDia = melhorDiaEntry
    ? { nome: DIAS_SEMANA[new Date(melhorDiaEntry[0] + "T00:00:00").getDay()], valor: melhorDiaEntry[1] }
    : null;

  // Maior gasto por categoria
  const gastosMap = {};
  saidas.forEach((m) => {
    const cat = m.categoria || "Outros";
    gastosMap[cat] = (gastosMap[cat] || 0) + Number(m.valor);
  });
  const maiorGasto = Object.entries(gastosMap).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="semanal-page">
      <div className="semanal-container">
        <div className="semanal-header">
          <h1>Resumo Semanal</h1>
          <p>Desempenho financeiro geral da semana.</p>
          <div className="semana-navegacao">
            <button onClick={() => setOffsetSemana((o) => o - 1)}>← Anterior</button>
            <span className="semana-periodo">
              {formatarExibicao(inicio)} – {formatarExibicao(fim)}/{fim.getFullYear()}
            </span>
            <button
              onClick={() => setOffsetSemana((o) => o + 1)}
              disabled={offsetSemana === 0}
              className={offsetSemana === 0 ? "btn-desabilitado" : ""}
            >
              Próxima →
            </button>
          </div>
        </div>

        <div className="semanal-cards">
          <div className="semanal-card entrada">
            <h2>Total de Entradas</h2>
            <span>{formatarMoeda(totalEntradas)}</span>
          </div>
          <div className="semanal-card saida">
            <h2>Total de Saídas</h2>
            <span>{formatarMoeda(totalSaidas)}</span>
          </div>
          <div className="semanal-card saldo">
            <h2>Lucro Semanal</h2>
            <span>{formatarMoeda(lucroSemanal)}</span>
          </div>
        </div>

        {movimentacoesSemana.length === 0 ? (
          <p className="sem-dados">Nenhuma movimentação registrada nessa semana.</p>
        ) : (
          <div className="semanal-infos">
            <div className="info-box">
              <h2>Produto Mais Vendido</h2>
              {produtoMaisVendido ? (
                <>
                  <span>{produtoMaisVendido[0]}</span>
                  <p>{produtoMaisVendido[1].quantidade} {produtoMaisVendido[1].unidade} vendidos na semana</p>
                </>
              ) : (
                <span className="sem-info">—</span>
              )}
            </div>
            <div className="info-box">
              <h2>Maior Receita Diária</h2>
              {melhorDia ? (
                <>
                  <span>{formatarMoeda(melhorDia.valor)}</span>
                  <p>{melhorDia.nome}</p>
                </>
              ) : (
                <span className="sem-info">—</span>
              )}
            </div>
            <div className="info-box">
              <h2>Maior Gasto</h2>
              {maiorGasto ? (
                <>
                  <span>{maiorGasto[0]}</span>
                  <p>{formatarMoeda(maiorGasto[1])}</p>
                </>
              ) : (
                <span className="sem-info">—</span>
              )}
            </div>
          </div>
        )}

        <button className="voltar-button" onClick={() => navigate("/menu")}>Voltar</button>
      </div>
    </div>
  );
}
