// Movimentações (vendas + gastos)
export const getMovimentacoes = () =>
  JSON.parse(localStorage.getItem("movimentacoes")) || [];

export const saveMovimentacoes = (data) =>
  localStorage.setItem("movimentacoes", JSON.stringify(data));

// Estoque
export const getEstoque = () =>
  JSON.parse(localStorage.getItem("estoque")) || [];

export const saveEstoque = (data) =>
  localStorage.setItem("estoque", JSON.stringify(data));

// Usuários
export const getUsuarios = () =>
  JSON.parse(localStorage.getItem("usuarios")) || [];

export const saveUsuarios = (data) =>
  localStorage.setItem("usuarios", JSON.stringify(data));
