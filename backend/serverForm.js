// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route pour insérer un utilisateur dans la base de données
app.post('/api/utilisateurs', (req, res) => {
  const { nom, role, email, motdepasse } = req.body;
  const query = 'INSERT INTO utilisateurs (nom, role, email, motdepasse) VALUES (?, ?, ?, ?)';

  db.query(query, [nom, role, email, motdepasse], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    } else {
      res.status(200).json({ message: 'Utilisateur ajouté avec succès' });
    }
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});




//code axios 
// client/src/Form.js
import React, { useState } from 'react';
import axios from 'axios';  // Importer Axios

const Form = () => {
  const [formData, setFormData] = useState({
    nom: '',
    role: '',
    email: '',
    motdepasse: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prévenir le rechargement de la page

    try {
      // Utilisation d'Axios pour envoyer une requête POST
      const response = await axios.post('http://localhost:5000/api/utilisateurs', formData);

      // Axios gère automatiquement la transformation en JSON
      alert(response.data.message);  // Afficher la réponse du serveur
    } catch (error) {
      // Axios gère aussi les erreurs plus simplement
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom:</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
      </div>
      <div>
        <label>Rôle:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" name="motdepasse" value={formData.motdepasse} onChange={handleChange} required />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default Form;




// reussir
const express = require('express');
const cors = require('cors');
//const app = express();
const port = 8081;

// Middleware pour le traitement des JSON
app.use(express.json());
app.use(cors());

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API utilisateurs !');
});

// Autres routes (comme la route POST pour /api/utilisateurs)
app.post('/api/utilisateurs', (req, res) => {
  const { nom, role, email, motdepasse } = req.body;
  if (!nom || !role || !email || !motdepasse) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }
  // Ici, tu peux ajouter le code pour insérer l'utilisateur dans la base de données
  res.status(200).json({ message: 'Utilisateur ajouté avec succès' });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import profileImage from './path/to/your/image.jpg'; // Remplacez par le chemin de votre image

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
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f0f0f0' }}>
            <div className="bg-white p-4 rounded w-25 border border-dark text-center"> {/* Ajout de text-center pour centrer le contenu */}
                <img 
                    src={profileImage} // Utilisez le chemin vers votre image ici
                    alt="Profile" 
                    className="img-fluid rounded-circle mb-3" // Classes Bootstrap pour une image fluide et ronde
                    style={{ width: '100px', height: '100px' }} // Définir la taille de l'image
                />
                <h2>S'inscrire</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Nom"><strong>Nom</strong></label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
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
                                <FontAwesomeIcon icon={faBriefcase} />
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
                                <FontAwesomeIcon icon={faEnvelope} />
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
                                <FontAwesomeIcon icon={faLock} />
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
    );
}

export default Signup;
