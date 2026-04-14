import './Login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginService } from "../../services/authServices";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginService({
        email,
        password,
      });

      // Context ve localStorage'ı güncelle
     // login(response.data.token, response.data.user.id);
     login(response.token, response.user.id);

      // Başarılı login sonrası ana sayfaya yönlendir
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Giriş başarısız");
    }
  };

  return (
    <div className="login-page">
     <div className="login-banner">
      <h1 className="banner-back-text">
        VENTI
      </h1>
      <div className="banner-title-container">
        <h2 className="banner-title">
          Style, Simplified.
        </h2>
        <p className="banner-content">
          Kombinlerini oluştur, planla ve tekrar etmeden stilini yönet.  
          Venti ile dolabın artık dijital.
        </p>
      </div>
    </div>
      <div className='login-card-container'>
      <div className="login-card">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container ">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Emailinizi girin"
            />
          </div>

          <div className="input-container">
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Şifrenizi girin"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Giriş Yap</button>
          <p className='text-blue-600 text-center mt-2'>Hesabın yok mu  
            <a className='underline ml-2 font-semibold' href="/register">Kayıt Ol</a>
          </p>
        </form>
    
     </div>
      </div>

    </div>
  );
}

export default Login;