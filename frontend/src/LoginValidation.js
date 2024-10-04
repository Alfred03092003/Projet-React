const Validation = (values) => {
    let errors = {};
  
    if (!values.nom.trim()) {
      errors.email = "Le nom est requis";
    }
    if (!values.motdepasse.trim()) {
      errors.motdepasse = "Le mot de passe est requis";
    }
  
    return errors;
  };
  
export default Validation;