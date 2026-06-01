.login-page {
  min-height: 100vh;
  display: flex;
  background: #f5f5f5;
  font-family: Arial, sans-serif;
}

.login-banner {
  width: 45%;
  background: #242424;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-box {
  text-align: center;
}

.logo-symbol {
  font-size: 64px;
  margin-bottom: 16px;
}

.logo-box h1 {
  font-size: 42px;
  margin: 0;
}

.logo-box p {
  margin-top: 12px;
  font-size: 18px;
  opacity: 0.9;
}

.login-content {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 380px;
  background: white;
  padding: 40px;
  border-radius: 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.login-card h2 {
  margin: 0;
  font-size: 30px;
  color: #3a3939;
}

.login-card p {
  color: #666;
  margin-bottom: 28px;
}

.login-card form {
  display: flex;
  flex-direction: column;
}

.login-card label {
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 14px;
}

.login-card input {
  height: 44px;
  margin-bottom: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
}

#entrar {
  height: 46px;
  border: none;
  border-radius: 10px;
  background: #0047d8;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}

#realizar-cadastro {
  display: block;
  width: 220px;
  height: 38px;
  border: 3px solid grey;
  border-radius: 10px;
  background: #F5F5F5;
  color: #0047d8;
  font-size: 14px;
  cursor: pointer;
  margin: 18px auto 0 auto;
}

.login-card a,
.link-button {
  display: block;
  text-align: center;
  margin-top: 18px;
  color: #0047d8;
  font-weight: bold;
  font-size: 14px;
  background: transparent;
  border: 0;
  cursor: pointer;
  width: 100%;
}

.erro-msg {
  color: #e53935;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 12px;
}
