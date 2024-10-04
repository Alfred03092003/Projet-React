const Validation = (values) => {
    let errors = {};
  
    if (!values.nom.trim()) {
      errors.nom = "Le nom est requis";
    }
    if (!values.role.trim()) {
      errors.role = "Le rôle est requis";
    }
    if (!values.email.trim()) {
      errors.email = "L'email est requis";
    }
    if (!values.motdepasse.trim()) {
      errors.motdepasse = "Le mot de passe est requis";
    }
  
    return errors;
  };
  
export default Validation;