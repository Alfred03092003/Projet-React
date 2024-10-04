import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <div className="d-flex flex-column justify-content-between vh-100" style={{ backgroundColor: '#f0f0f0' }}>
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="bg-white p-4 rounded w-25 border border-dark text-center">
                    <img 
                        src={mtpi} // Utilisez le chemin vers votre image ici
                        alt="Profile" 
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Nom"><strong>Nom</strong></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                <FaUser className='icon'/>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    name="nom"
                                    onChange={handleInput}
                                    className="form-control rounded-0"
                                />
                            </div>
                            {errors.nom && <span className="text-danger">{errors.nom}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role"><strong>Role</strong></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                <BsPersonPlusFill className='icon'/>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre rôle"
                                    name="role"
                                    onChange={handleInput}
                                    className="form-control rounded-0"
                                />
                            </div>
                            {errors.role && <span className="text-danger">{errors.role}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email"><strong>Email</strong></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaEnvelope className='icon'/>
                                </span>
                                <input
                                    type="email"
                                    placeholder="Entrez votre email"
                                    name="email"
                                    onChange={handleInput}
                                    className="form-control rounded-0"
                                />
                            </div>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Motdepasse"><strong>Mot de passe</strong></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                <FaLock className='icon'/>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Entrez votre mot de passe"
                                    name="motdepasse"
                                    onChange={handleInput}
                                    className="form-control rounded-0"
                                />
                            </div>
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword" className="ms-2">Afficher le mot de passe</label>
                            {errors.motdepasse && <span className="text-danger">{errors.motdepasse}</span>}
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0">
                            <strong>S'inscrire</strong>
                        </button>
                        <p className="text-center">J'accepte les termes et les politiques</p>
                        <Link
                            to="/LoginForm"
                            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                            Se Connecter
                        </Link>
                    </form>
                </div>
            </div>
            <footer className="bg-danger text-white text-center p-3" style={{ backgroundColor: '#a00', position: 'relative' }}>
                <p className="mb-0">Ministère des Travaux Publics</p>
            </footer>
        </div>
    );
}

export default Signup;
