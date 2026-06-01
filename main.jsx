.vendas-page {
  min-height: 100vh;
  width: 100%;
  background: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}

.vendas-card {
  width: 520px;
  background: #323232;
  padding: 36px;
  border-radius: 18px;
  color: white;
}

.vendas-card h1 {
  margin-bottom: 8px;
  font-size: 32px;
}

.vendas-card p {
  margin-bottom: 28px;
  color: #cfcfcf;
}

.vendas-form {
  display: flex;
  flex-direction: column;
}

.vendas-form label {
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 14px;
}

.vendas-form input,
.vendas-form select {
  height: 44px;
  margin-bottom: 16px;
  border: none;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
}

.vendas-buttons {
  display: flex;
  gap: 14px;
  margin-top: 12px;
}

.vendas-buttons button {
  flex: 1;
  height: 46px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.vendas-buttons button:first-child {
  background: #555;
}

.vendas-buttons button:last-child {
  background: #0047d8;
}

.estoque-info {
  margin-top: -10px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #a0c4ff;
}

.erro-msg { 
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px; 
  font-size: 13px;
  color: white;
  background-color: #ff6b6b;
  font-weight: bold;
  border-radius: 8px;
}