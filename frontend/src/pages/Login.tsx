import './Login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      // Context ve localStorage'ı güncelle
      login(response.data.token, response.data.user.id);

      // Başarılı login sonrası ana sayfaya yönlendir
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Giriş başarısız");
    }
  };

  return (
    <div className="login-page grid grid-cols-1 md:grid-cols-6">
     <div className="login-banner col-span-1 md:col-span-2">

      {/* Arka dekoratif büyük yazı */}
      <h1 className="absolute text-[140px] font-bold 
                    text-white/10 select-none">
        VENTI
      </h1>

      {/* İçerik */}
      <div className="z-10 text-center px-8">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Style, Simplified.
        </h2>

        <p className="text-white/80 leading-relaxed">
          Kombinlerini oluştur, planla ve tekrar etmeden stilini yönet.  
          Venti ile dolabın artık dijital.
        </p>
      </div>
    </div>
      <div className='login-card-container  col-span-4'>
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
            <a className='underline ml-2' href="/">Kayıt Ol</a>
          </p>
        </form>
    
     </div>
      </div>

    </div>
  );
}

export default Login;