// client/src/Form.js
import React, { useState } from 'react';

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
    e.preventDefault();
    console.log("Form data:", formData); // Pour voir si les données sont bien récupérées
    try {
      const response = await fetch('http://localhost:8081/api/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response status:", response.status); // Pour voir le statut de la réponse
      const result = await response.json();
      console.log("Result:", result); // Afficher la réponse du backend
      if (response.ok) {
        alert(result.message);
      } else {
        alert('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (err) {
      console.error('Erreur:', err); // Afficher l'erreur s'il y en a une
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
