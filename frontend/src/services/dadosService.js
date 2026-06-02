// Camada de serviço — abstrai a fonte de dados.
// Hoje usa localStorage. Quando o backend estiver pronto,
// troque SOURCE para "api" e as funções chamam a API automaticamente.

const SOURCE = import.meta.env?.VITE_DATA_SOURCE || "localStorage";
const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3000";

export async function listar(colecao) {
  if (SOURCE === "localStorage") {
    return JSON.parse(localStorage.getItem(colecao)) || [];
  }

  const res = await fetch(`${API_URL}/${colecao}`);
  if (!res.ok) throw new Error(`Erro ao listar ${colecao}`);
  return res.json();
}

export async function criar(colecao, dados) {
  if (SOURCE === "localStorage") {
    const existentes = await listar(colecao);
    localStorage.setItem(colecao, JSON.stringify([...existentes, dados]));
    return dados;
  }

  const res = await fetch(`${API_URL}/${colecao}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error(`Erro ao criar em ${colecao}`);
  return res.json();
}

export async function atualizar(colecao, id, dados) {
  if (SOURCE === "localStorage") {
    const existentes = await listar(colecao);
    const atualizados = existentes.map((item) =>
      item.id === id ? { ...item, ...dados } : item
    );
    localStorage.setItem(colecao, JSON.stringify(atualizados));
    return dados;
  }

  const res = await fetch(`${API_URL}/${colecao}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar ${colecao}/${id}`);
  return res.json();
}

export async function excluir(colecao, id) {
  if (SOURCE === "localStorage") {
    const existentes = await listar(colecao);
    localStorage.setItem(
      colecao,
      JSON.stringify(existentes.filter((item) => item.id !== id))
    );
    return;
  }

  const res = await fetch(`${API_URL}/${colecao}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Erro ao excluir ${colecao}/${id}`);
}
