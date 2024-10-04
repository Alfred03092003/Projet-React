import React, { useState } from "react";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEnvelope } from "react-icons/fa"; // Importer les icônes
import mtpi from './Assets/mtpi.jpg'; // Remplacez par le chemin de votre image

function LoginForm() {
    const [values, setValues] = useState({
        email: '',
        motdepasse: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8081/login", { email: values.email, motdepasse: values.motdepasse })
            .then((res) => {
                console.log(res.data);
                alert("Connexion réussie !");
                navigate("/Home");
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setErrors({ motdepasse: 'Mot de passe incorrect' });
                } else {
                    console.error(err);
                    setErrors({ motdepasse: 'Erreur de connexion. Veuillez réessayer.' });
                }
            });
    };

    const handleForgotPassword = () => {
        navigate("/ForgotPassword");
    };

    return (
        <div className='global'>
        <div className='wrapper'>
        <div className='form-box login'>
        <center><img 
                        src={mtpi} // Utilisez le chemin vers votre image ici
                        alt="Profile" 
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    /> </center>
                    <h2>Se Connecter</h2>
                    <form onSubmit={handleSubmit}>
                    <div className='input-box'>
                                <input
                                    type="email"
                                    placeholder="Entre votre email"
                                    name="email"
                                    onChange={handleInput}  required
                                />
                                 <FaEnvelope className='icon'/>
                                 </div>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                            <div className='input-box'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Entre votre mot de passe"
                                    name="motdepasse"
                                    onChange={handleInput}  required
                                />
                                <FaLock className='icon'/>
                                </div>
                                <div className='remember-forgot'>

<label htmlFor="showPassword"><input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/> Afficher le mot de passe</label>

                            {errors.motdepasse && <span className="text-danger">{errors.motdepasse}</span>}
                            </div>
                        <button type="submit" >Se connecter</button>
                        <p className="phraseMot" onClick={handleForgotPassword} style={{ cursor: 'pointer', textAlign: 'center' }}>
                            Mot de passe oublié ?
                        </p>
                        <div className='register-link'>
                        <p>Vous n'avez pas de compte? <a href="/SignUp" > Créer un compte</a></p>
                        </div>
                    </form>
            </div>
        </div><br></br>
        
</div>
    );
}

export default LoginForm;
