import './Login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { register as registerService } from "../../services/authServices";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");

    if(password !== confirmPassword){
        return setError("Şifreler eşleşmiyor.");
    }

    try {
        const response = await registerService({
            name: firstname,
            surname,
            username,
            email,
            password,
        });

      // Context ve localStorage'ı güncelle
      login(response.token, response.user.id);

      // Başarılı login sonrası ana sayfaya yönlendir
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Kayıt başarısız");
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
          Create Your Style System.
        </h2>
        <p className="banner-content">
          Dolabını dijitale taşı ve stilini organize etmeye başla.
        </p>
      </div>
    </div>
      <div className='login-card-container'>
      <div className="login-card">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container ">
            <label>Ad</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="Adınızı girin"
            />
          </div>
          <div className="input-container ">
            <label>Soyad</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              placeholder="Soyadınızı girin"
            />
          </div>
          <div className="input-container ">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
          <div className="input-container ">
            <label>Email</label>
            <input
              type="email"
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
           <div className="input-container">
            <label>Şifre Tekarı</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Şifrenizi tekrar girin"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Kayıt Ol</button>
          <p className='text-blue-600 text-center mt-2'>Hesabın var mı  
            <Link to="/login" className="underline ml-2 font-semibold">
            Giriş Yap
            </Link>          
          </p>
        </form>
    
     </div>
      </div>

    </div>
  );
}

export default Register;