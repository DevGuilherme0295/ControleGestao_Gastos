const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// Agrupa as movimentações por mês e monta um resumo textual para o prompt
function prepararResumo(movimentacoes) {
  if (!movimentacoes || movimentacoes.length === 0) return null;

  const porMes = {};

  movimentacoes.forEach((m) => {
    if (!m.data) return;
    const mes = m.data.slice(0, 7); // "YYYY-MM"

    if (!porMes[mes]) porMes[mes] = { entradas: 0, saidas: 0, gastos: {} };

    if (m.tipo === "Entrada") {
      porMes[mes].entradas += Number(m.valor) || 0;
    } else {
      porMes[mes].saidas += Number(m.valor) || 0;
      const cat = m.categoria || "Outros";
      porMes[mes].gastos[cat] = (porMes[mes].gastos[cat] || 0) + (Number(m.valor) || 0);
    }
  });

  const mesesOrdenados = Object.keys(porMes).sort();
  if (mesesOrdenados.length === 0) return null;

  return mesesOrdenados
    .map((mes) => {
      const [ano, m] = mes.split("-");
      const nomeMes = `${MESES[Number(m) - 1]}/${ano}`;
      const dados = porMes[mes];
      const lucro = dados.entradas - dados.saidas;

      const gastosStr =
        Object.entries(dados.gastos).length > 0
          ? Object.entries(dados.gastos)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, val]) => `    - ${cat}: R$ ${val.toFixed(2)}`)
              .join("\n")
          : "    - Nenhum gasto registrado";

      return `📅 ${nomeMes}:
  Receitas (vendas): R$ ${dados.entradas.toFixed(2)}
  Despesas totais:   R$ ${dados.saidas.toFixed(2)}
  Lucro:             R$ ${lucro.toFixed(2)}
  Detalhamento das despesas:
${gastosStr}`;
    })
    .join("\n\n");
}

export async function gerarProjecao(movimentacoes) {
  if (!API_KEY) throw new Error("Chave da API Gemini não configurada no .env");

  const resumo = prepararResumo(movimentacoes);
  if (!resumo) throw new Error("Sem dados financeiros suficientes para gerar a projeção.");

  const prompt = `Você é um assistente financeiro especializado em ajudar feirantes a gerenciar melhor seu negócio.

Abaixo está o histórico financeiro de um feirante, organizado por mês:

${resumo}

Com base nesse histórico, forneça:
1. **Análise do desempenho recente**: como está o negócio, tendências de melhora ou piora
2. **Projeção para o próximo mês**: estimativa realista de receitas, despesas e lucro esperado
3. **Principais alertas**: gastos que merecem atenção ou tendências preocupantes
4. **Dicas práticas**: 2 a 3 sugestões simples e diretas para melhorar o resultado

Responda em português brasileiro, de forma clara e acessível, como se estivesse conversando diretamente com o feirante. Use valores em R$ quando mencionar números.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Erro ${response.status} ao consultar a IA.`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Não foi possível gerar a projeção. Tente novamente."
  );
}
