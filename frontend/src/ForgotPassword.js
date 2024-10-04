import React, { useState } from "react";
import './LoginForm.css';
import axios from "axios";
import { FaEnvelope } from "react-icons/fa"
import mtpi from './Assets/mtpi.jpg'; 

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/forgot-password", { email })
            .then((res) => {
                setMessage(res.data.message);
                setError('');
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data);
                } else {
                    setError("Erreur du serveur");
                }
                setMessage('');
            });
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
            <h2>Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
            <div className='input-box'>
                <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FaEnvelope className='icon'/>
                 </div>
                <button type="submit">Envoyer le lien de réinitialisation</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
        </div>
    );
}

export default ForgotPassword;
