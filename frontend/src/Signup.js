import React, { useState } from "react";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope} from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import mtpi from './Assets/mtpi.jpg'; // Remplacez par le chemin de votre image

function Signup() {
    const [values, setValues] = useState({
        nom: '',
        role: '',
        email: '',
        motdepasse: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(values);
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    console.log(res.data);
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='global'>
        <div className='wrapper' style={{ width: '420px', height: '600px' }}>
             <div className='form-box login'>
            <center><img 
                        src={mtpi} // Utilisez le chemin vers votre image ici
                        alt="Profile" 
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    /> </center>
                    <form onSubmit={handleSubmit}>
                       <div className='input-box'>
                                <input
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    name="nom"
                                    onChange={handleInput}
                                />
                                 <FaUser className='icon'/>
                            </div>
                            {errors.nom && <span className="text-danger">{errors.nom}</span>}
                            <div className='input-box'>
                                <input
                                    type="text"
                                    placeholder="Entrez votre rôle"
                                    name="role"
                                    onChange={handleInput}
                                />
                                <BsPersonPlusFill className='icon'/>
                            </div>
                            {errors.role && <span className="text-danger">{errors.role}</span>}
                            <div className='input-box'>  
                                <input
                                    type="email"
                                    placeholder="Entrez votre email"
                                    name="email"
                                    onChange={handleInput}
                                />
                                 <FaEnvelope className='icon'/>
                            </div>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                            <div className='input-box'> 
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Entrez votre mot de passe"
                                    name="motdepasse"
                                    onChange={handleInput}
                                />
                                <FaLock className='icon'/>
                            </div>
                            <div className='remember-forgot'>

                   <label htmlFor="showPassword" > <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/> Afficher le mot de passe</label>

                            {errors.motdepasse && <span className="text-danger">{errors.motdepasse}</span>}
                            </div>
                        <button type="submit"> S'inscrire </button>
                        <div className='register-link'>
                        <p>Avez-vous déjà un compte? <a href="/" > se connecter</a></p>
                        </div>
                    </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;